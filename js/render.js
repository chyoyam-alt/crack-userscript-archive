(function () {
  'use strict';
  const NS = window.CrackArchive = window.CrackArchive || {};
  const labels = {
    status: { active: '사용 가능', deprecated: '교체 권장', archived: '보관됨' },
    platform: { yes: '지원', no: '미지원', unknown: '미확인' },
    performance: { light: '가벼움', medium: '보통', heavy: '높음', unknown: '미확인' },
    evidence: { verified: '확인됨', inferred: '추론', reported: '제보', unknown: '미확인' }
  };

  function create(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }
  function badge(text, type) { return create('span', `badge${type ? ` badge--${type}` : ''}`, text); }

  function renderCards(items) {
    const grid = document.getElementById('cardGrid');
    const empty = document.getElementById('emptyState');
    grid.replaceChildren();
    document.getElementById('resultCount').textContent = `${items.length}개 표시 중`;
    empty.hidden = items.length !== 0;
    if (!items.length) {
      const hasCatalog = Boolean(NS.state.value.catalog?.extensions?.length);
      empty.querySelector('strong').textContent = hasCatalog ? '조건에 맞는 확프가 없습니다.' : '아직 등록된 확프가 없습니다.';
      empty.querySelector('p').textContent = hasCatalog
        ? '검색어를 줄이거나 정렬·필터를 바꿔보세요.'
        : '관리자 화면에서 실제 확프를 등록한 뒤 catalog.source.json을 교체하세요.';
      return;
    }
    const fragment = document.createDocumentFragment();
    items.forEach((extension) => fragment.append(createCard(extension)));
    grid.append(fragment);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    }, { threshold: .06 });
    [...grid.children].forEach((card, index) => {
      card.style.transitionDelay = `${Math.min(index * 34, 180)}ms`;
      observer.observe(card);
    });
  }

  function createCard(extension) {
    const selected = NS.state.value.selected.has(extension.id);
    const card = create('article', `script-card${selected ? ' is-selected' : ''}`);
    card.dataset.id = extension.id;
    card.tabIndex = 0;
    card.setAttribute('aria-label', `${extension.name} 상세 정보 열기`);

    const top = create('div', 'card-top');
    const statuses = create('div', 'card-status-row');
    const status = create('span', 'status-badge', labels.status[extension.status]);
    status.dataset.status = extension.status;
    statuses.append(status);
    if (extension.originalSource?.url) {
      const originalSourceBadge = badge('원본 링크', 'accent');
      originalSourceBadge.classList.add('original-source-mark');
      statuses.append(originalSourceBadge);
    }
    if (!extension.installUrl) statuses.append(badge('링크 미등록', 'warning'));
    if (extension.stale) statuses.append(badge('재확인 필요', 'warning'));
    top.append(statuses, platformBadge(extension));

    const title = create('h3', '', extension.name);
    const summary = create('p', '', extension.summary || '설명이 아직 등록되지 않았습니다.');
    const badgeRow = create('div', 'badge-row');
    extension.categories.slice(0, 2).forEach((item) => badgeRow.append(badge(item)));
    const performance = relevantPerformance(extension);
    badgeRow.append(badge(`부담 ${labels.performance[performance]}`, performance === 'heavy' ? 'warning' : ''));
    if (extension.stale) card.append(create('div', 'card-stale', '마지막 실사용 확인이 오래되었습니다.'));

    const actions = create('div', 'card-actions');
    const hint = create('span', 'card-open-hint', '카드 눌러 보기 →');
    const select = create('button', `card-select${selected ? ' is-selected' : ''}`);
    select.type = 'button';
    select.setAttribute('aria-label', selected ? `${extension.name} 선택 해제` : `${extension.name} 선택 목록에 추가`);
    select.addEventListener('click', (event) => {
      event.stopPropagation();
      NS.app.toggleSelection(extension.id);
    });
    actions.append(hint, select);
    card.append(top, title, summary, badgeRow, actions);

    card.addEventListener('click', () => NS.app.openDetail(extension.id));
    card.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      NS.app.openDetail(extension.id);
    });
    return card;
  }

  function platformBadge(extension) {
    const pc = extension.platforms.pc; const mobile = extension.platforms.mobile;
    let text = '지원 미확인';
    if (pc === 'yes' && mobile === 'yes') text = 'PC · 모바일';
    else if (pc === 'yes') text = 'PC';
    else if (mobile === 'yes') text = '모바일';
    return badge(text, 'accent');
  }
  function relevantPerformance(extension) {
    const platform = NS.state.value.filters.platform;
    if (platform === 'pc' || platform === 'mobile') return extension.performance[platform];
    const values = [extension.performance.pc, extension.performance.mobile];
    if (values.includes('heavy')) return 'heavy';
    if (values.includes('medium')) return 'medium';
    if (values.includes('light')) return 'light';
    return 'unknown';
  }

  function renderDetail(extension) {
    document.getElementById('detailName').textContent = extension.name;
    const status = document.getElementById('detailStatus');
    status.textContent = labels.status[extension.status];
    status.dataset.status = extension.status;
    const content = document.getElementById('detailContent');
    content.replaceChildren();
    const cover = coverMedia(extension);
    if (cover) content.append(cover);
    content.append(
      section('설명', create('p', '', extension.description || extension.summary || '설명이 없습니다.')),
      section('기능', chipList(extension.features, '등록된 기능이 없습니다.')),
      section('검색어·태그', chipList([...extension.tags, ...extension.aliases], '등록된 검색어가 없습니다.')),
      section('환경', environmentGrid(extension)),
      section('관계', relationGrid(extension))
    );
    if (extension.originalSource?.url) content.append(section('원본 확프', originalSourceInfo(extension.originalSource)));
    content.append(section('배포 정보', distributionInfo(extension)));
    if (extension.history.length) content.append(section('변경 이력', historyList(extension.history)));
    if (extension.stale) content.append(section('재확인', create('p', 'muted', '마지막 실사용 확인일이 오래되었습니다. 현재 크랙 UI에서 다시 확인하는 편이 안전합니다.')));

    const selectButton = document.getElementById('detailSelectButton');
    selectButton.textContent = NS.state.value.selected.has(extension.id) ? '선택 해제' : '선택 목록에 추가';
    selectButton.onclick = () => NS.app.toggleSelection(extension.id, true);
    const installButton = document.getElementById('detailInstallButton');
    installButton.textContent = extension.installUrl ? '단독 설치 링크 열기' : '설치 링크 미등록';
    installButton.disabled = !extension.installUrl;
    installButton.onclick = () => NS.app.openInstallUrl(extension);
    const reportButton = document.getElementById('detailReportButton');
    reportButton.hidden = !NS.state.value.site.issueNewUrl;
    reportButton.onclick = () => NS.app.reportIssue(extension);
  }

  function coverMedia(extension) {
    const media = extension.presentation || {};
    if (!media.coverImageUrl) return null;
    const box = create('figure', 'detail-cover');
    box.style.setProperty('--cover-image', `url("${String(media.coverImageUrl).replace(/"/g, '%22')}")`);
    const blur = create('div', 'detail-cover__blur');
    blur.setAttribute('aria-hidden', 'true');
    const image = document.createElement('img');
    image.src = media.coverImageUrl;
    image.alt = media.coverImageAlt || `${extension.name} 소개 이미지`;
    box.append(blur, image);
    if (media.coverImageCreditUrl) {
      const credit = create('a', 'detail-cover__credit', media.coverImageCreditLabel || '이미지 출처');
      credit.href = media.coverImageCreditUrl;
      credit.target = '_blank';
      credit.rel = 'noopener noreferrer';
      box.append(credit);
    }
    return box;
  }

  function originalSourceInfo(source) {
    const box = create('div', 'original-source-box');
    box.append(create('strong', '', source.label || '이 확프의 원본 페이지'));
    const details = [source.author ? `작성자: ${source.author}` : '', source.note || ''].filter(Boolean).join('\n');
    if (details) box.append(create('p', '', details));
    const link = create('a', 'button button--secondary', '원본 확프 링크 열기');
    link.href = source.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    box.append(link);
    return box;
  }

  function section(title, body) { const el = create('section', 'detail-section'); el.append(create('h3', '', title), body); return el; }
  function chipList(items, fallback) {
    if (!items.length) return create('p', 'muted', fallback);
    const list = create('ul', 'detail-list');
    [...new Set(items)].forEach((item) => { const li = document.createElement('li'); li.append(badge(item)); list.append(li); });
    return list;
  }
  function environmentGrid(extension) {
    const grid = create('div', 'detail-meta');
    grid.append(
      metaBox('PC 지원', labels.platform[extension.platforms.pc], labels.evidence[extension.platforms.evidence?.pc || 'unknown']),
      metaBox('모바일 지원', labels.platform[extension.platforms.mobile], labels.evidence[extension.platforms.evidence?.mobile || 'unknown']),
      metaBox('PC 성능 부담', labels.performance[extension.performance.pc], labels.evidence[extension.performance.evidence || 'unknown']),
      metaBox('모바일 성능 부담', labels.performance[extension.performance.mobile], labels.evidence[extension.performance.evidence || 'unknown'])
    );
    return grid;
  }
  function metaBox(label, value, evidence) { const box = create('div', 'meta-box'); box.append(create('span', '', label), create('strong', '', value)); if (evidence) box.append(create('small', 'muted', evidence)); return box; }
  function relationGrid(extension) {
    const box = create('div', 'relation-list');
    const groups = [['필수', extension.relations.requires], ['충돌', extension.relations.conflictsWith], ['함께 추천', extension.relations.goodWith]];
    groups.forEach(([label, ids]) => {
      const row = create('div', 'relation-row'); row.append(create('span', '', label));
      if (!ids.length) row.append(create('span', 'muted', '없음'));
      ids.forEach((id) => {
        const target = NS.state.value.catalog.byId.get(id);
        const button = create('button', 'text-button', target?.name || id); button.type = 'button';
        button.addEventListener('click', () => NS.app.openDetail(id)); row.append(button);
      });
      box.append(row);
    });
    return box;
  }
  function distributionInfo(extension) {
    const box = create('div', 'detail-meta');
    box.append(
      metaBox('버전', extension.version),
      metaBox('마지막 테스트', extension.lastTestedAt || '미기록'),
      metaBox('최근 수정', extension.updatedAt || '미기록'),
      metaBox('설치 상태', extension.installUrl ? '설치 링크 있음' : '설치 링크 미등록')
    );
    return box;
  }
  function historyList(history) {
    const list = create('ul', 'history-list');
    [...history].sort((a, b) => String(b.date || '').localeCompare(String(a.date || ''))).slice(0, 10).forEach((item) => {
      const li = create('li', 'history-item');
      li.append(create('strong', '', item.version ? `v${item.version}` : '업데이트'), create('small', '', item.date || '날짜 없음'), create('div', '', item.note || ''));
      list.append(li);
    });
    return list;
  }

  function renderSelectionDialog() {
    const list = document.getElementById('selectionList'); const warningBox = document.getElementById('selectionWarnings');
    list.replaceChildren(); warningBox.replaceChildren();
    const selected = [...NS.state.value.selected].map((id) => NS.state.value.catalog.byId.get(id)).filter(Boolean);
    selected.forEach((extension) => {
      const item = create('div', 'selection-item'); const body = create('div', 'selection-item__body');
      body.append(create('strong', '', extension.name), create('small', '', extension.summary));
      const remove = create('button', 'icon-button', '×'); remove.type = 'button'; remove.setAttribute('aria-label', `${extension.name} 선택 해제`);
      remove.addEventListener('click', () => NS.app.toggleSelection(extension.id, true)); item.append(body, remove); list.append(item);
    });
    NS.app.getSelectionWarnings().forEach((warning) => {
      const item = create('div', 'warning-item'); const body = create('div', 'warning-item__body', warning.message); item.append(body);
      if (warning.action === 'add-required' && warning.relatedId) {
        const button = create('button', 'warning-item__action', '필수 추가'); button.type = 'button';
        button.addEventListener('click', () => { NS.state.addSelected([warning.relatedId]); NS.app.refreshAll(); }); item.append(button);
      }
      warningBox.append(item);
    });
    document.getElementById('selectionInstallButton').disabled = selected.length === 0;
  }

  function renderSelectionBar() {
    const count = NS.state.value.selected.size; const bar = document.getElementById('selectionBar'); bar.hidden = count === 0;
    document.getElementById('selectedCount').textContent = String(count);
    const warnings = NS.app.getSelectionWarnings(); const warningCount = document.getElementById('warningCount');
    warningCount.hidden = warnings.length === 0; warningCount.textContent = warnings.length ? `⚠ 경고 ${warnings.length}` : '';
  }

  function renderQueue() {
    const queue = NS.state.value.queue; const progress = document.getElementById('queueProgress'); const currentBox = document.getElementById('queueCurrent'); const list = document.getElementById('queueList');
    list.replaceChildren();
    if (!queue?.items?.length) { progress.textContent = '설치할 항목이 없습니다.'; currentBox.replaceChildren(create('p', '', '선택 목록에서 설치 큐를 만드세요.')); setQueueButtonsDisabled(true); return; }
    const completed = queue.items.filter((item) => ['done', 'skipped'].includes(item.state)).length;
    progress.textContent = `${completed} / ${queue.items.length} 처리됨`;
    const current = NS.state.getCurrentQueueItem(); const extension = current ? NS.state.value.catalog.byId.get(current.id) : null;
    currentBox.replaceChildren();
    if (!extension) { currentBox.append(create('h3', '', '설치 큐 완료'), create('p', '', '모든 항목을 처리했습니다. 실제 설치 여부는 유저스크립트 관리자에서 확인하세요.')); setQueueButtonsDisabled(true); }
    else { currentBox.append(create('h3', '', `${queue.cursor + 1}. ${extension.name}`), create('p', '', extension.installUrl ? extension.summary : '설치 링크가 없어 열 수 없습니다.')); setQueueButtonsDisabled(false, !extension.installUrl); }
    queue.items.forEach((entry, index) => {
      const itemExtension = NS.state.value.catalog.byId.get(entry.id); if (!itemExtension) return;
      const item = create('div', 'queue-item'); if (index === queue.cursor) item.dataset.state = 'current'; if (['done', 'skipped'].includes(entry.state)) item.dataset.state = entry.state;
      const body = create('div', 'queue-item__body'); body.append(create('strong', '', itemExtension.name), create('small', '', queueStateLabel(entry.state)));
      item.append(create('span', 'queue-state', String(index + 1)), body); list.append(item);
    });
  }
  function queueStateLabel(state) { return { waiting: '대기', opened: '설치 링크 열림', done: '완료로 표시', skipped: '건너뜀' }[state] || state; }
  function setQueueButtonsDisabled(all, openOnly) { document.getElementById('queueOpenButton').disabled = all || openOnly; document.getElementById('queueDoneButton').disabled = all; document.getElementById('queueSkipButton').disabled = all; }

  function renderPresets(presets) {
    const sectionEl = document.getElementById('presetSection'); const list = document.getElementById('presetList'); list.replaceChildren();
    sectionEl.hidden = !presets.length;
    presets.forEach((preset) => {
      const button = create('button', 'preset-card'); button.type = 'button';
      button.append(create('strong', '', preset.name || preset.id), create('small', '', preset.description || ''));
      button.addEventListener('click', () => NS.app.applyPreset(preset)); list.append(button);
    });
  }

  function renderRecent(catalog) {
    const events = [];
    catalog.extensions.forEach((extension) => extension.history.forEach((item) => events.push({ extension, item })));
    events.sort((a, b) => String(b.item.date || '').localeCompare(String(a.item.date || '')));
    const sectionEl = document.getElementById('recentSection'); const list = document.getElementById('recentList'); list.replaceChildren();
    const shown = events.slice(0, 6); sectionEl.hidden = !shown.length;
    shown.forEach(({ extension, item }) => {
      const card = create('article', 'recent-card');
      card.append(create('strong', '', extension.name), create('small', '', `${item.date || '날짜 없음'} · ${item.note || '업데이트'}`));
      const button = create('button', 'text-button', '자세히 보기'); button.type = 'button'; button.addEventListener('click', () => NS.app.openDetail(extension.id)); card.append(button); list.append(card);
    });
  }

  function toast(message) { const region = document.getElementById('toastRegion'); const item = create('div', 'toast', message); region.append(item); setTimeout(() => item.remove(), 3400); }
  NS.render = { create, badge, renderCards, renderDetail, renderSelectionDialog, renderSelectionBar, renderQueue, renderPresets, renderRecent, toast };
})();