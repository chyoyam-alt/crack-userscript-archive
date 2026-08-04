(function () {
  'use strict';

  const NS = window.CrackArchive = window.CrackArchive || {};
  const CACHE_KEY = 'crack-archive:last-catalog:v3';
  const RAW_REPOSITORY_BASE = 'https://raw.githubusercontent.com/chyoyam-alt/crack-userscript-archive/main/';
  const RECOMMENDATION_TAGS = new Set(['추천', '에디터 추천', '관리자 추천', '공식 추천']);

  function asArray(value) { return Array.isArray(value) ? value : []; }
  function clean(value) { return String(value ?? '').trim(); }
  function normalizePerformance(value) { return ['light', 'medium', 'heavy', 'unknown'].includes(value) ? value : 'unknown'; }
  function normalizeSupport(value) { return ['yes', 'no', 'unknown'].includes(value) ? value : 'unknown'; }

  function normalizeOriginalSources(extension) {
    const seen = new Set();
    return [...asArray(extension.originalSources), extension.originalSource].filter(Boolean).map((source) => ({
      url: isSafeWebUrl(source?.url) ? clean(source.url) : '',
      label: clean(source?.label),
      author: clean(source?.author),
      note: clean(source?.note)
    })).filter((source) => source.url && !seen.has(source.url) && seen.add(source.url));
  }

  function normalizeExtension(raw) {
    const extension = raw && typeof raw === 'object' ? raw : {};
    const updatedAt = clean(extension.updatedAt) || newestHistoryDate(extension.history);
    const tags = uniqueStrings(extension.tags);
    const originalSources = normalizeOriginalSources(extension);
    const recommendationEnabled = Boolean(
      extension.recommendation?.enabled
      || extension.recommended
      || extension.featured
      || tags.some((tag) => RECOMMENDATION_TAGS.has(tag))
    );
    return {
      id: clean(extension.id),
      status: ['active', 'deprecated', 'archived'].includes(extension.status) ? extension.status : 'active',
      name: clean(extension.name || extension.id || '이름 없음'),
      summary: clean(extension.summary),
      description: clean(extension.description),
      categories: uniqueStrings(extension.categories),
      features: uniqueStrings(extension.features),
      aliases: uniqueStrings(extension.aliases),
      tags,
      platforms: {
        pc: normalizeSupport(extension.platforms?.pc),
        mobile: normalizeSupport(extension.platforms?.mobile),
        evidence: extension.platforms?.evidence || {}
      },
      performance: {
        pc: normalizePerformance(extension.performance?.pc),
        mobile: normalizePerformance(extension.performance?.mobile),
        evidence: clean(extension.performance?.evidence || 'unknown')
      },
      relations: {
        conflictsWith: uniqueStrings(extension.relations?.conflictsWith),
        requires: uniqueStrings(extension.relations?.requires),
        goodWith: uniqueStrings(extension.relations?.goodWith)
      },
      version: clean(extension.version || '확인 필요'),
      installUrl: isSafeInstallUrl(extension.installUrl) ? clean(extension.installUrl) : '',
      file: clean(extension.file),
      namespace: clean(extension.namespace),
      match: uniqueStrings(extension.match),
      grant: uniqueStrings(extension.grant),
      runAt: clean(extension.runAt),
      lastTestedAt: clean(extension.lastTestedAt),
      updatedAt,
      history: Array.isArray(extension.history) ? extension.history.slice() : [],
      creatorNote: clean(extension.creatorNote),
      introductionPage: {
        url: isSafeWebUrl(extension.introductionPage?.url || extension.introduction?.url) ? clean(extension.introductionPage?.url || extension.introduction?.url) : '',
        label: clean(extension.introductionPage?.label || extension.introduction?.label) || '소개 페이지'
      },
      originalSources,
      originalSource: originalSources[0] || { url: '', label: '', author: '', note: '' },
      recommendation: {
        enabled: recommendationEnabled,
        label: clean(extension.recommendation?.label || extension.recommendationLabel) || '추천',
        priority: Number.isFinite(Number(extension.recommendation?.priority)) ? Number(extension.recommendation.priority) : 0
      },
      presentation: {
        coverImageUrl: isSafeMediaUrl(extension.presentation?.coverImageUrl) ? clean(extension.presentation.coverImageUrl) : '',
        coverImageAlt: clean(extension.presentation?.coverImageAlt),
        coverImageCreditUrl: isSafeWebUrl(extension.presentation?.coverImageCreditUrl) ? clean(extension.presentation.coverImageCreditUrl) : '',
        coverImageCreditLabel: clean(extension.presentation?.coverImageCreditLabel)
      },
      stale: false
    };
  }

  function normalizeCatalog(raw, site) {
    if (!raw || !Array.isArray(raw.extensions)) throw new Error('카탈로그 형식이 올바르지 않습니다.');
    const seen = new Set();
    const extensions = raw.extensions.map(normalizeExtension).filter((item) => {
      if (!item.id || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
    const staleDays = Number(site?.staleAfterDays || 120);
    extensions.forEach((item) => {
      item.stale = isStale(item.lastTestedAt, staleDays);
    });
    return {
      schemaVersion: Number(raw.schemaVersion || 1),
      generatedAt: raw.generatedAt || null,
      sampleData: Boolean(raw.sampleData),
      extensions,
      byId: new Map(extensions.map((item) => [item.id, item]))
    };
  }

  async function loadAll() {
    const [site, presets] = await Promise.all([
      fetchFreshJson('data/site.json', { schemaVersion: 1, staleAfterDays: 120, issueNewUrl: '', repositoryUrl: '', assistant: { name: '모아', role: '확프 추천 도우미' }, heroMedia: {} }),
      fetchFreshJson('data/presets.json', { schemaVersion: 1, presets: [] })
    ]);
    const loadedCatalog = await loadCatalog(site);
    return {
      ...loadedCatalog,
      presets: Array.isArray(presets.presets) ? presets.presets : [],
      site
    };
  }

  async function refreshCatalog(site) {
    return loadCatalog(site || {});
  }

  async function loadCatalog(site) {
    let rawCatalog;
    let source = 'network';
    if (window.CRACK_ARCHIVE_PREVIEW && window.CRACK_CATALOG_FALLBACK) {
      rawCatalog = window.CRACK_CATALOG_FALLBACK;
      source = 'preview';
    } else try {
      const freshCatalog = await fetchFreshJsonRequired('data/catalog.json');
      rawCatalog = freshCatalog.value;
      source = freshCatalog.source;
      try { localStorage.setItem(CACHE_KEY, JSON.stringify(rawCatalog)); } catch (_) { /* cache is optional */ }
    } catch (error) {
      if (window.CRACK_CATALOG_FALLBACK) {
        rawCatalog = window.CRACK_CATALOG_FALLBACK;
        source = 'fallback';
      } else {
        try {
          rawCatalog = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
          if (!rawCatalog) throw new Error('캐시 없음');
          source = 'cache';
        } catch (_) {
          throw new Error(`카탈로그를 불러오지 못했습니다: ${error.message}`);
        }
      }
    }
    return {
      catalog: normalizeCatalog(rawCatalog, site),
      dataSource: source
    };
  }

  async function fetchFreshJson(path, fallback) {
    try { return (await fetchFreshJsonRequired(path)).value; } catch (_) { return fallback; }
  }

  async function fetchJsonRequired(url) {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error(`${url} HTTP ${response.status}`);
    return response.json();
  }

  async function fetchFreshJsonRequired(path) {
    const stamp = Date.now();
    const separator = path.includes('?') ? '&' : '?';
    const localUrl = `${path}${separator}v=${stamp}`;
    const candidates = window.CRACK_ARCHIVE_PREVIEW
      ? [[localUrl, 'preview']]
      : [[`${RAW_REPOSITORY_BASE}${path}${separator}v=${stamp}`, 'github'], [localUrl, 'network']];
    let lastError;
    for (const [url, source] of candidates) {
      try { return { value: await fetchJsonRequired(url), source }; }
      catch (error) { lastError = error; }
    }
    throw lastError || new Error(`${path}을(를) 불러오지 못했습니다.`);
  }

  function getSearchText(extension) {
    return [
      extension.name, extension.summary, extension.description,
      ...extension.categories, ...extension.features, ...extension.aliases, ...extension.tags
    ].join(' ').toLocaleLowerCase('ko-KR');
  }

  function isSafeInstallUrl(value) { return isSafeUrl(value, ['https:', 'http:', 'file:']); }
  function isSafeWebUrl(value) { return isSafeUrl(value, ['https:', 'http:']); }
  function isSafeMediaUrl(value) { return isSafeUrl(value, ['https:', 'http:', 'data:', 'file:']); }
  function isSafeUrl(value, protocols) {
    if (!value || typeof value !== 'string') return false;
    try {
      const url = new URL(value, window.location.href);
      return protocols.includes(url.protocol);
    } catch (_) { return false; }
  }

  function uniqueStrings(value) {
    return [...new Set(asArray(value).map(clean).filter(Boolean))];
  }

  function newestHistoryDate(history) {
    return asArray(history).map((item) => clean(item?.date)).filter(Boolean).sort().at(-1) || '';
  }

  function isStale(value, days) {
    if (!value) return false;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return false;
    return Date.now() - date.getTime() > days * 86400000;
  }

  NS.catalog = { loadAll, refreshCatalog, getSearchText, isSafeInstallUrl, isSafeWebUrl, isSafeMediaUrl, normalizeCatalog };
})();
