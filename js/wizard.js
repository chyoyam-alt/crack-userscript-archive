(function () {
  'use strict';

  const NS = window.CrackArchive = window.CrackArchive || {};
  const rank = { light: 1, medium: 2, unknown: 2, heavy: 3 };
  const purposeTerms = {
    convenience: ['채팅 편의', '편의', '입력', '에디터', 'ui', '채팅창'],
    visual: ['꾸미기', '시각 효과', '테마', '배경', '마법', '날씨', '효과'],
    archive: ['로그', '저장', '백업', '아카이브', '기록'],
    management: ['관리', '설정', '대시보드', '상태', '정리']
  };

  const originalRenderCards = NS.render.renderCards;
  NS.render.renderCards = function renderFilteredCards(items) {
    const filtered = filterItems(items || []);
    NS.state.value.filtered = filtered;
    originalRenderCards(filtered);

    if (!filtered.length && hasActiveFilters()) {
      const empty = document.getElementById('emptyState');
      const message = empty?.querySelector('p');
      if (message) message.textContent = '필터 조건을 줄이거나 해제해보세요.';
    }
  };

  function open() {
    syncFormFromFilters();
    document.getElementById('wizardDialog').showModal();
  }

  function apply() {
    const form = new FormData(document.getElementById('wizardForm'));
    const filters = NS.state.value.filters;

    filters.platform = String(form.get('platform') || 'all');
    filters.performance = String(form.get('performance') || 'all');
    filters.purposes = form.getAll('purpose').map(String);

    NS.app.applyFilters();
    syncControls();
    document.getElementById('wizardDialog').close();

    const count = NS.state.value.filtered.length;
    NS.render.toast(hasActiveFilters() ? `필터 조건에 맞는 확프 ${count}개를 표시합니다.` : '전체 확프 목록을 표시합니다.');
  }

  function reset() {
    const filters = NS.state.value.filters;
    filters.platform = 'all';
    filters.performance = 'all';
    filters.purposes = [];

    syncFormFromFilters();
    NS.app.applyFilters();
    syncControls();

    const dialog = document.getElementById('wizardDialog');
    if (dialog?.open) dialog.close();
    NS.render.toast('필터를 해제했습니다.');
  }

  function syncFormFromFilters() {
    const form = document.getElementById('wizardForm');
    const filters = NS.state.value.filters;
    const platform = filters.platform || 'all';
    const performance = filters.performance || 'all';
    const purposes = new Set(filters.purposes || []);

    const platformInput = form.querySelector(`input[name="platform"][value="${platform}"]`);
    const performanceInput = form.querySelector(`input[name="performance"][value="${performance}"]`);
    if (platformInput) platformInput.checked = true;
    if (performanceInput) performanceInput.checked = true;

    form.querySelectorAll('input[name="purpose"]').forEach((input) => {
      input.checked = purposes.has(input.value);
    });
  }

  function filterItems(items) {
    const filters = NS.state.value.filters;
    const platform = filters.platform || 'all';
    const performance = filters.performance || 'all';
    const purposes = filters.purposes || [];

    if (platform === 'all' && performance === 'all' && !purposes.length) return items;

    return items.filter((item) => {
      if (platform !== 'all' && item.platforms[platform] !== 'yes') return false;

      if (performance !== 'all') {
        const itemPerformance = relevantPerformance(item, platform);
        if (rank[itemPerformance] > rank[performance]) return false;
      }

      if (purposes.length) {
        const haystack = NS.catalog.getSearchText(item);
        const matches = purposes.some((purpose) => (purposeTerms[purpose] || []).some((term) => haystack.includes(term.toLocaleLowerCase('ko-KR'))));
        if (!matches) return false;
      }

      return true;
    });
  }

  function relevantPerformance(item, platform) {
    if (platform === 'pc' || platform === 'mobile') return item.performance[platform] || 'unknown';

    const supported = [];
    if (item.platforms.pc === 'yes') supported.push(item.performance.pc || 'unknown');
    if (item.platforms.mobile === 'yes') supported.push(item.performance.mobile || 'unknown');
    const values = supported.length ? supported : [item.performance.pc || 'unknown', item.performance.mobile || 'unknown'];
    return values.reduce((worst, value) => rank[value] > rank[worst] ? value : worst, 'light');
  }

  function hasActiveFilters() {
    const filters = NS.state.value.filters;
    return (filters.platform || 'all') !== 'all'
      || (filters.performance || 'all') !== 'all'
      || Boolean((filters.purposes || []).length);
  }

  function activeFilterCount() {
    const filters = NS.state.value.filters;
    return Number((filters.platform || 'all') !== 'all')
      + Number((filters.performance || 'all') !== 'all')
      + (filters.purposes || []).length;
  }

  function syncControls() {
    const active = hasActiveFilters();
    const openButton = document.getElementById('openWizardButton');
    const clearButton = document.getElementById('clearWizardFilterButton');

    if (openButton) {
      openButton.classList.toggle('is-active', active);
      openButton.setAttribute('aria-pressed', String(active));
      openButton.textContent = active ? `필터 · ${activeFilterCount()}` : '필터';
    }
    if (clearButton) clearButton.hidden = !active;
  }

  document.getElementById('clearWizardFilterButton')?.addEventListener('click', reset);
  syncControls();

  NS.wizard = { open, reset, apply, syncControls, hasActiveFilters };
})();
