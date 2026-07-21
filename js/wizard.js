(function () {
  'use strict';
  const NS = window.CrackArchive = window.CrackArchive || {};
  const rank = { light: 1, medium: 2, unknown: 2, heavy: 3 };
  const purposeTerms = {
    convenience: ['채팅 편의', '편의', '입력', 'ui', '모바일'],
    visual: ['꾸미기', '시각 효과', '테마', '배경', '마법', '날씨'],
    archive: ['로그', '저장', '백업', '아카이브'],
    management: ['관리', '설정', '대시보드', '상태']
  };

  function open() {
    renderInstalled();
    document.getElementById('wizardDialog').showModal();
  }

  function renderInstalled() {
    const list = document.getElementById('wizardInstalledList');
    list.replaceChildren();
    NS.state.value.catalog.extensions.filter((item) => item.status === 'active').forEach((extension) => {
      const label = NS.render.create('label', 'choice-card');
      const input = document.createElement('input'); input.type = 'checkbox'; input.name = 'installed'; input.value = extension.id;
      const span = NS.render.create('span', '', extension.name); label.append(input, span); list.append(label);
    });
  }

  function reset() {
    const form = document.getElementById('wizardForm'); form.reset();
    form.elements.namedItem('platform').value = 'all'; form.elements.namedItem('performance').value = 'medium';
  }

  function apply() {
    const form = new FormData(document.getElementById('wizardForm'));
    const platform = String(form.get('platform') || 'all');
    const maxPerformance = String(form.get('performance') || 'medium');
    const purposes = form.getAll('purpose').map(String);
    const installed = new Set(form.getAll('installed').map(String));
    const candidates = NS.state.value.catalog.extensions
      .filter((item) => item.status === 'active' && !installed.has(item.id))
      .map((item) => ({ item, score: score(item, { platform, maxPerformance, purposes }) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name, 'ko'))
      .slice(0, 6)
      .map(({ item }) => item.id);

    if (!candidates.length) {
      NS.render.toast('조건에 맞는 추천 항목을 찾지 못했습니다. 조건을 조금 넓혀 보세요.');
      return;
    }
    const finalIds = includeRequirements(candidates);
    NS.state.replaceSelected(finalIds);
    NS.app.refreshAll();
    document.getElementById('wizardDialog').close();
    NS.render.toast(`${finalIds.length}개를 추천 목록에 담았습니다.`);
  }

  function score(item, options) {
    if (options.platform !== 'all' && item.platforms[options.platform] === 'no') return -100;
    const performance = options.platform === 'all'
      ? worstPerformance(item.performance.pc, item.performance.mobile)
      : item.performance[options.platform];
    if (rank[performance] > rank[options.maxPerformance]) return -50;

    let value = 1;
    if (options.platform !== 'all') value += item.platforms[options.platform] === 'yes' ? 4 : 1;
    value += Math.max(0, 4 - rank[performance]);
    const haystack = NS.catalog.getSearchText(item);
    if (!options.purposes.length) value += 1;
    for (const purpose of options.purposes) {
      const hits = (purposeTerms[purpose] || []).filter((term) => haystack.includes(term.toLocaleLowerCase('ko-KR'))).length;
      value += hits * 3;
    }
    return value;
  }

  function worstPerformance(a, b) {
    return rank[a] >= rank[b] ? a : b;
  }

  function includeRequirements(ids) {
    const result = new Set(ids); const catalog = NS.state.value.catalog;
    let changed = true;
    while (changed) {
      changed = false;
      [...result].forEach((id) => {
        const item = catalog.byId.get(id);
        item?.relations.requires.forEach((required) => {
          if (catalog.byId.has(required) && !result.has(required)) { result.add(required); changed = true; }
        });
      });
    }
    return [...result];
  }

  NS.wizard = { open, reset, apply };
})();
