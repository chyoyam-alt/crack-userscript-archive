(function () {
  'use strict';
  const NS = window.CrackArchive = window.CrackArchive || {};
  const dialogs = ['detailDialog', 'selectionDialog', 'queueDialog', 'wizardDialog', 'guideDialog'];
  const THEME_KEY = 'crack-archive:theme:v1';

  async function init() {
    installCatalogEnhancementStyles();
    bindStaticEvents();
    NS.aiRecommend.init();
    NS.state.loadSelected();
    NS.state.loadQueue();
    restoreTheme();
    try {
      const loaded = await NS.catalog.loadAll();
      Object.assign(NS.state.value, loaded);
      NS.state.sanitizeSelection();
      applySharedSelection();
      showDataNotice();
      renderHeroInfo();
      renderAssistantIdentity();
      NS.render.renderPresets(NS.state.value.presets);
      NS.render.renderRecent(NS.state.value.catalog);
      applyFilters();
      NS.render.renderSelectionBar();
      if (NS.state.value.queue?.items?.length && NS.state.value.queue.cursor < NS.state.value.queue.items.length) {
        NS.render.toast('진행 중인 설치 큐가 남아 있습니다. 선택 목록에서 다시 열 수 있습니다.');
      }
    } catch (error) {
      showFatalError(error.message);
    }
  }

  function installCatalogEnhancementStyles() {
    if (document.getElementById('catalog-enhancement-styles')) return;
    const style = document.createElement('style');
    style.id = 'catalog-enhancement-styles';
    style.textContent = `
      .script-card.is-recommended {
        border-color: color-mix(in srgb, var(--acid) 58%, var(--line));
      }
      .script-card.is-recommended::before {
        background: linear-gradient(to bottom, var(--acid), var(--accent));
        transform: scaleY(1);
      }
      .recommendation-badge {
        position: relative;
        isolation: isolate;
        overflow: hidden;
        gap: 6px;
        color: color-mix(in srgb, var(--text) 78%, var(--acid-deep));
        border: 1px solid color-mix(in srgb, var(--acid) 68%, var(--line));
        background: color-mix(in srgb, var(--acid-soft) 82%, var(--surface-solid));
        box-shadow: 0 0 0 1px color-mix(in srgb, var(--acid) 8%, transparent);
      }
      .recommendation-badge::before {
        content: "";
        width: 6px;
        height: 6px;
        flex: 0 0 auto;
        background: var(--acid);
        box-shadow: 0 0 0 0 color-mix(in srgb, var(--acid) 40%, transparent);
        animation: recommendation-dot 2.6s ease-in-out infinite;
      }
      .recommendation-badge::after {
        content: "";
        position: absolute;
        inset: -40% auto -40% -36%;
        z-index: -1;
        width: 28%;
        transform: skewX(-18deg);
        background: linear-gradient(90deg, transparent, color-mix(in srgb, white 52%, transparent), transparent);
        animation: recommendation-sheen 4.8s 1.2s ease-in-out infinite;
      }
      @keyframes recommendation-dot {
        50% { box-shadow: 0 0 0 4px color-mix(in srgb, var(--acid) 0%, transparent); transform: scale(.82); }
      }
      @keyframes recommendation-sheen {
        0%, 68% { left: -36%; opacity: 0; }
        74% { opacity: .75; }
        88%, 100% { left: 112%; opacity: 0; }
      }
      .card-source-link {
        text-decoration: none;
        cursor: pointer;
        transition: color .18s ease, border-color .18s ease, background .18s ease;
      }
      .card-source-link:hover {
        color: var(--text);
        border-color: var(--accent);
        background: color-mix(in srgb, var(--accent-soft) 80%, var(--surface-solid));
      }
      .detail-original-button {
        text-decoration: none;
        white-space: nowrap;
      }
      @media (max-width: 700px) {
        #detailDialog .detail-original-button {
          grid-column: 1 / -1;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .recommendation-badge::before,
        .recommendation-badge::after {
          animation: none !important;
        }
      }
    `;
    document.head.append(style);
  }

  function bindStaticEvents() {
    const search = document.getElementById('searchInput');
    search.addEventListener('input', () => {
      NS.state.value.filters.query = search.value.trim().toLocaleLowerCase('ko-KR');
      document.getElementById('clearSearchButton').hidden = !search.value;
      applyFilters();
    });
    document.getElementById('clearSearchButton').addEventListener('click', () => {
      search.value = '';
      NS.state.value.filters.query = '';
      document.getElementById('clearSearchButton').hidden = true;
      applyFilters();
      search.focus();
    });
    document.getElementById('sortSelect').addEventListener('change', (event) => {
      NS.state.value.filters.sort = event.target.value;
      applyFilters();
      animateScan();
    });
    document.getElementById('themeToggleButton').addEventListener('click', toggleTheme);
    document.getElementById('openGuideButton').addEventListener('click', () => document.getElementById('guideDialog').showModal());
    document.getElementById('openWizardButton').addEventListener('click', NS.wizard.open);
    document.getElementById('wizardResetButton').addEventListener('click', NS.wizard.reset);
    document.getElementById('wizardApplyButton').addEventListener('click', NS.wizard.apply);
    document.getElementById('openSelectionButton').addEventListener('click', openSelectionDialog);
    document.getElementById('startInstallButton').addEventListener('click', NS.queue.startFromSelection);
    document.getElementById('selectionInstallButton').addEventListener('click', () => {
      document.getElementById('selectionDialog').close();
      NS.queue.startFromSelection();
    });
    document.getElementById('clearSelectionButton').addEventListener('click', () => {
      NS.state.clearSelected();
      refreshAll();
      document.getElementById('selectionDialog').close();
    });
    ['shareSelectionButton', 'selectionShareButton'].forEach((id) => document.getElementById(id).addEventListener('click', shareSelection));
    document.getElementById('queueOpenButton').addEventListener('click', NS.queue.openCurrent);
    document.getElementById('queueDoneButton').addEventListener('click', NS.queue.markDone);
    document.getElementById('queueSkipButton').addEventListener('click', NS.queue.skip);
    document.querySelectorAll('.dialog-close').forEach((button) => button.addEventListener('click', () => button.closest('dialog').close()));
    dialogs.forEach((id) => document.getElementById(id).addEventListener('click', (event) => {
      if (event.target === event.currentTarget) event.currentTarget.close();
    }));
  }

  function showDataNotice() {
    const notice = document.getElementById('dataNotice');
    const { catalog, dataSource } = NS.state.value;
    const messages = [];
    if (catalog.sampleData) messages.push('디자인 미리보기용 샘플 데이터입니다. 실제 공개 카탈로그에는 포함되지 않습니다.');
    if (dataSource === 'cache') messages.push('네트워크 연결 문제로 이전 카탈로그를 표시하고 있습니다.');
    notice.hidden = !messages.length;
    notice.textContent = messages.join(' ');
  }

  function renderHeroInfo() {
    const catalog = NS.state.value.catalog;
    const extensions = catalog.extensions;
    document.getElementById('heroExtensionCount').textContent = `확프 ${extensions.length}개`;
    const mobile = extensions.filter((item) => item.platforms.mobile === 'yes').length;
    document.getElementById('heroMobileCount').textContent = `모바일 지원 ${mobile}개`;
    const dates = extensions.map((item) => item.updatedAt || item.lastTestedAt).filter(Boolean).sort();
    document.getElementById('heroUpdatedAt').textContent = dates.length ? `최근 정리 ${dates.at(-1)}` : '최근 정리 미기록';

    const media = NS.state.value.site?.heroMedia || {};
    const wrapper = document.getElementById('heroMedia');
    if (media.enabled && NS.catalog.isSafeMediaUrl(media.imageUrl)) {
      const image = document.getElementById('heroMediaImage');
      image.src = media.imageUrl;
      image.alt = media.alt || '';
      wrapper.style.setProperty('--hero-image', `url("${String(media.imageUrl).replace(/"/g, '%22')}")`);
      const credit = document.getElementById('heroMediaCredit');
      if (NS.catalog.isSafeWebUrl(media.creditUrl)) {
        credit.href = media.creditUrl;
        credit.textContent = media.creditLabel || '이미지 출처';
        credit.hidden = false;
      } else credit.hidden = true;
      wrapper.hidden = false;
    } else wrapper.hidden = true;
  }

  function renderAssistantIdentity() {
    const assistant = NS.state.value.site?.assistant || {};
    const name = String(assistant.name || '모아').trim() || '모아';
    const role = String(assistant.role || '확프 추천 도우미').trim() || '확프 추천 도우미';
    const nav = document.getElementById('aiNavName');
    const launcherName = document.getElementById('aiLauncherName');
    const launcherRole = document.getElementById('aiLauncherRole');
    const dialogName = document.getElementById('aiHelperName');
    if (nav) nav.textContent = name;
    if (launcherName) launcherName.textContent = name;
    if (launcherRole) launcherRole.textContent = role;
    if (dialogName) dialogName.textContent = name;
    const stateLabel = document.getElementById('aiStaffState');
    if (stateLabel) { stateLabel.dataset.idleText = role; stateLabel.textContent = role; }
  }

  function applyFilters() {
    const { catalog, filters } = NS.state.value;
    if (!catalog) return;
    let result = catalog.extensions.filter((extension) => {
      if (extension.status === 'archived') return false;
      return !filters.query || NS.catalog.getSearchText(extension).includes(filters.query);
    });
    const sort = filters.sort || 'recommended';
    if (sort === 'recommended') {
      result.sort((a, b) => Number(isRecommended(b)) - Number(isRecommended(a))
        || String(b.updatedAt || b.lastTestedAt || '').localeCompare(String(a.updatedAt || a.lastTestedAt || ''))
        || a.name.localeCompare(b.name, 'ko'));
    }
    if (sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    if (sort === 'updated') result.sort((a, b) => String(b.updatedAt || b.lastTestedAt || '').localeCompare(String(a.updatedAt || a.lastTestedAt || '')) || a.name.localeCompare(b.name, 'ko'));
    NS.state.value.filtered = result;
    NS.render.renderCards(result);
    decorateCatalogCards(result);
    animateScan();
  }

  function isRecommended(extension) {
    return Boolean(extension?.recommendation?.enabled);
  }

  function decorateCatalogCards(items) {
    items.forEach((extension) => {
      const card = document.querySelector(`#cardGrid .script-card[data-id="${CSS.escape(extension.id)}"]`);
      if (!card) return;
      const statuses = card.querySelector('.card-status-row');

      card.classList.toggle('is-recommended', isRecommended(extension));
      if (isRecommended(extension) && statuses && !statuses.querySelector('.recommendation-badge')) {
        const badge = document.createElement('span');
        badge.className = 'badge recommendation-badge';
        badge.textContent = extension.recommendation?.label || '추천';
        badge.setAttribute('aria-label', `${badge.textContent} 확프`);
        statuses.prepend(badge);
      }

      if (extension.originalSource?.url && statuses) {
        const existing = statuses.querySelector('.original-source-mark');
        const link = document.createElement('a');
        link.className = 'badge badge--accent original-source-mark card-source-link';
        link.href = extension.originalSource.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = '원문 보기 ↗';
        link.setAttribute('aria-label', `${extension.name} 원문 새 탭에서 열기`);
        link.addEventListener('click', (event) => event.stopPropagation());
        link.addEventListener('pointerdown', (event) => event.stopPropagation());
        link.addEventListener('keydown', (event) => event.stopPropagation());
        if (existing) existing.replaceWith(link);
        else statuses.append(link);
      }
    });
  }

  function animateScan() {
    const dots = [...document.querySelectorAll('.scan-state i')];
    if (!dots.length) return;
    let index = 0;
    dots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === 0));
    const timer = setInterval(() => {
      index += 1;
      dots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === index % dots.length));
      if (index > dots.length + 1) {
        clearInterval(timer);
        dots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === 0));
      }
    }, 95);
  }

  function openDetail(id) {
    const extension = NS.state.value.catalog.byId.get(id);
    if (!extension) return;
    NS.state.value.detailId = id;
    NS.render.renderDetail(extension);
    syncDetailOriginalButton(extension);
    const dialog = document.getElementById('detailDialog');
    if (!dialog.open) dialog.showModal();
  }

  function syncDetailOriginalButton(extension) {
    const group = document.querySelector('#detailDialog .dialog__footer-group');
    if (!group) return;
    let button = document.getElementById('detailOriginalButton');
    if (!button) {
      button = document.createElement('a');
      button.id = 'detailOriginalButton';
      button.className = 'button button--ghost detail-original-button';
      button.target = '_blank';
      button.rel = 'noopener noreferrer';
      group.insertBefore(button, document.getElementById('detailSelectButton'));
    }
    const url = extension?.originalSource?.url || '';
    button.hidden = !url;
    if (!url) {
      button.removeAttribute('href');
      button.textContent = '';
      return;
    }
    button.href = url;
    button.textContent = '원문 보기';
    button.setAttribute('aria-label', `${extension.name} 원문 새 탭에서 열기`);
  }

  function toggleSelection(id, fromDialog) {
    const selected = NS.state.toggleSelected(id);
    refreshAll();
    if (fromDialog && NS.state.value.detailId === id) {
      const extension = NS.state.value.catalog.byId.get(id);
      NS.render.renderDetail(extension);
      syncDetailOriginalButton(extension);
    }
    NS.render.toast(selected ? '선택 목록에 추가했습니다.' : '선택에서 제외했습니다.');
  }

  function syncCardSelectionState() {
    const selected = NS.state.value.selected;
    document.querySelectorAll('#cardGrid .script-card[data-id]').forEach((card) => {
      const id = card.dataset.id;
      const isSelected = selected.has(id);
      card.classList.toggle('is-selected', isSelected);
      const button = card.querySelector('.card-select');
      if (!button) return;
      button.classList.toggle('is-selected', isSelected);
      const extension = NS.state.value.catalog?.byId?.get(id);
      const name = extension?.name || id;
      button.setAttribute('aria-label', isSelected ? `${name} 선택 해제` : `${name} 선택 목록에 추가`);
    });
  }

  function refreshAll() {
    syncCardSelectionState();
    NS.render.renderSelectionBar();
    if (document.getElementById('selectionDialog').open) NS.render.renderSelectionDialog();
  }

  function openSelectionDialog() {
    NS.render.renderSelectionDialog();
    document.getElementById('selectionDialog').showModal();
  }

  function openInstallUrl(extension) {
    if (!extension.installUrl) {
      NS.render.toast('설치 링크가 아직 등록되지 않았습니다.');
      return;
    }
    const opened = window.open(extension.installUrl, '_blank', 'noopener');
    if (!opened) NS.render.toast('팝업이 차단되었습니다. 이 사이트의 팝업을 허용하세요.');
  }

  function getSelectionWarnings() {
    return NS.rules.checkSelection(NS.state.value.catalog, NS.state.value.selected, 'all');
  }

  function applyPreset(preset) {
    let ids = (preset.extensions || []).filter((id) => NS.state.value.catalog.byId.has(id));
    if (!ids.length && preset.rules) ids = rulePreset(preset.rules);
    if (!ids.length) {
      NS.render.toast('이 추천 세트에 사용할 수 있는 항목이 없습니다.');
      return;
    }
    if (NS.state.value.selected.size && !window.confirm('현재 선택을 이 추천 세트로 바꿀까요? 취소하면 기존 선택에 합침다.')) NS.state.addSelected(ids);
    else NS.state.replaceSelected(ids);
    refreshAll();
    NS.render.toast(`${preset.name} 적용을 완료했습니다.`);
  }

  function rulePreset(rules) {
    const max = { light: 1, medium: 2, unknown: 2, heavy: 3 }[rules.maxPerformance || 'heavy'];
    return NS.state.value.catalog.extensions.filter((item) => {
      if (item.status !== 'active') return false;
      if (rules.platform && rules.platform !== 'all' && item.platforms[rules.platform] !== 'yes') return false;
      const values = rules.platform === 'mobile' ? [item.performance.mobile] : rules.platform === 'pc' ? [item.performance.pc] : [item.performance.pc, item.performance.mobile];
      if (Math.max(...values.map((value) => ({ light: 1, medium: 2, unknown: 2, heavy: 3 }[value]))) > max) return false;
      return !(rules.categories || []).length || item.categories.some((category) => rules.categories.includes(category));
    }).map((item) => item.id).slice(0, 8);
  }

  async function shareSelection() {
    const ids = [...NS.state.value.selected];
    if (!ids.length) {
      NS.render.toast('공유할 선택 항목이 없습니다.');
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.set('set', ids.join(','));
    url.hash = '';
    try {
      await navigator.clipboard.writeText(url.toString());
      NS.render.toast('선택 목록 링크를 복사했습니다.');
    } catch (_) {
      window.prompt('아래 링크를 복사하세요.', url.toString());
    }
  }

  function applySharedSelection() {
    const url = new URL(window.location.href);
    const raw = url.searchParams.get('set');
    if (!raw) return;
    const ids = raw.split(',').map((id) => id.trim()).filter((id) => NS.state.value.catalog.byId.has(id));
    if (!ids.length) return;
    NS.state.replaceSelected(ids);
    const notice = document.getElementById('sharedSetNotice');
    notice.hidden = false;
    notice.textContent = `공유받은 선택 목록 ${ids.length}개를 불러왔습니다. 설치 전에 경고와 상세 설명을 확인하세요.`;
  }

  function reportIssue(extension) {
    const base = NS.state.value.site.issueNewUrl;
    if (!base) return;
    const url = new URL(base);
    url.searchParams.set('title', `[${extension.name}] 문제 제보`);
    url.searchParams.set('body', [`확프: ${extension.name}`, `ID: ${extension.id}`, `버전: ${extension.version}`, `플랫폼: ${navigator.platform || '확인 불가'}`, `브라우저: ${navigator.userAgent}`, '', '문제 상황:', ''].join('\n'));
    window.open(url.toString(), '_blank', 'noopener');
  }

  function restoreTheme() {
    let theme = 'light';
    try { theme = localStorage.getItem(THEME_KEY) || 'light'; } catch (_) { /* optional */ }
    document.documentElement.dataset.theme = theme === 'dark' ? 'dark' : 'light';
  }

  function toggleTheme() {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(THEME_KEY, next); } catch (_) { /* optional */ }
  }

  function showFatalError(message) {
    const grid = document.getElementById('cardGrid');
    grid.replaceChildren();
    const box = document.createElement('div');
    box.className = 'empty-state';
    box.append(NS.render.create('strong', '', '카탈로그를 열지 못했습니다.'), NS.render.create('p', '', message));
    grid.append(box);
    document.getElementById('resultCount').textContent = '오류';
  }

  function syncPlatformButtons() { /* legacy compatibility for wizard */ }

  NS.app = { init, applyFilters, openDetail, toggleSelection, openInstallUrl, getSelectionWarnings, refreshAll, applyPreset, syncPlatformButtons, reportIssue };
  document.addEventListener('DOMContentLoaded', init, { once: true });
})();