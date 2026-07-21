(function () {
  'use strict';

  const NS = window.CrackArchive = window.CrackArchive || {};

  function startFromSelection() {
    const ids = [...NS.state.value.selected];
    if (!ids.length) {
      NS.render.toast('먼저 설치할 확프를 선택해 주세요.');
      return;
    }
    NS.state.createQueue(ids);
    NS.render.renderQueue();
    document.getElementById('queueDialog').showModal();
  }

  function openCurrent() {
    const current = NS.state.getCurrentQueueItem();
    if (!current) return;
    const extension = NS.state.value.catalog.byId.get(current.id);
    if (!extension?.installUrl) {
      NS.render.toast('이 항목은 설치 링크가 아직 등록되지 않았어요.');
      return;
    }
    const opened = window.open(extension.installUrl, '_blank');
    if (opened) opened.opener = null;
    if (!opened) {
      NS.render.toast('팝업이 차단됐어요. 이 사이트의 팝업을 허용해 주세요.');
      return;
    }
    current.state = 'opened';
    NS.state.saveQueue();
    NS.render.renderQueue();
  }

  function markDone() {
    NS.state.markCurrentQueueItem('done');
    NS.render.renderQueue();
  }

  function skip() {
    NS.state.markCurrentQueueItem('skipped');
    NS.render.renderQueue();
  }

  NS.queue = { startFromSelection, openCurrent, markDone, skip };
})();
