(function () {
  'use strict';
  const NS = window.CrackArchive = window.CrackArchive || {};

  function checkSelection(catalog, selected, platform) {
    const warnings = [];
    if (!catalog) return warnings;
    selected.forEach((id) => {
      const extension = catalog.byId.get(id);
      if (!extension) return;
      if (!extension.installUrl) warnings.push(warn('MISSING_URL', id, `${extension.name}: 설치 링크가 등록되지 않았습니다.`, 'high'));
      if (extension.status === 'deprecated') warnings.push(warn('DEPRECATED', id, `${extension.name}: 교체가 권장되는 항목입니다.`, 'medium'));
      if (extension.status === 'archived') warnings.push(warn('ARCHIVED', id, `${extension.name}: 보관 항목이라 신규 설치를 권장하지 않습니다.`, 'high'));
      if (extension.stale) warnings.push(warn('STALE', id, `${extension.name}: 실사용 확인일이 오래되어 재확인이 필요합니다.`, 'low'));
      if (platform && platform !== 'all' && extension.platforms[platform] === 'no') {
        warnings.push(warn('PLATFORM', id, `${extension.name}: 선택한 ${platform === 'pc' ? 'PC' : '모바일'} 환경을 지원하지 않는 것으로 등록되어 있습니다.`, 'high'));
      }
      extension.relations.requires.forEach((requiredId) => {
        if (!selected.has(requiredId)) {
          const required = catalog.byId.get(requiredId);
          warnings.push({ ...warn('MISSING_REQUIRED', id, `${extension.name}: ${required?.name || requiredId} 항목이 함께 필요합니다.`, 'medium'), relatedId: requiredId, action: 'add-required' });
        }
      });
      extension.relations.conflictsWith.forEach((conflictId) => {
        if (selected.has(conflictId) && id.localeCompare(conflictId) < 0) {
          warnings.push({ ...warn('CONFLICT', id, `${extension.name}와 ${catalog.byId.get(conflictId)?.name || conflictId}는 함께 사용 시 충돌 가능성이 등록되어 있습니다.`, 'high'), relatedId: conflictId });
        }
      });
    });
    return warnings;
  }

  function warn(code, id, message, severity) { return { code, id, message, severity }; }
  NS.rules = { checkSelection };
})();
