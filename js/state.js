(function () {
  'use strict';
  const NS = window.CrackArchive = window.CrackArchive || {};
  const STORAGE_KEY = 'crack-archive:selected:v2';
  const QUEUE_KEY = 'crack-archive:queue:v2';

  const state = {
    catalog: null,
    presets: [],
    site: {},
    dataSource: '',
    filtered: [],
    selected: new Set(),
    filters: { query: '', platform: 'all', category: 'all', performance: 'all', includeInactive: false, sort: 'recommended' },
    detailId: null,
    queue: null
  };

  function loadSelected() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      state.selected = new Set(Array.isArray(value) ? value.map(String) : []);
    } catch (_) {
      state.selected = new Set();
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  function saveSelected() { safeSet(STORAGE_KEY, JSON.stringify([...state.selected])); }
  function toggleSelected(id, force) {
    const shouldSelect = typeof force === 'boolean' ? force : !state.selected.has(id);
    if (shouldSelect) state.selected.add(id); else state.selected.delete(id);
    saveSelected();
    return shouldSelect;
  }
  function replaceSelected(ids) {
    state.selected = new Set((ids || []).map(String));
    sanitizeSelection();
    saveSelected();
  }
  function addSelected(ids) {
    (ids || []).forEach((id) => state.selected.add(String(id)));
    sanitizeSelection();
    saveSelected();
  }
  function clearSelected() { state.selected.clear(); saveSelected(); }
  function sanitizeSelection() {
    if (!state.catalog) return;
    let changed = false;
    for (const id of [...state.selected]) {
      if (!state.catalog.byId.has(id)) { state.selected.delete(id); changed = true; }
    }
    if (changed) saveSelected();
  }
  function loadQueue() {
    try {
      const parsed = JSON.parse(localStorage.getItem(QUEUE_KEY) || 'null');
      if (parsed && Array.isArray(parsed.items)) state.queue = parsed;
    } catch (_) { localStorage.removeItem(QUEUE_KEY); }
  }
  function saveQueue() { state.queue ? safeSet(QUEUE_KEY, JSON.stringify(state.queue)) : localStorage.removeItem(QUEUE_KEY); }
  function createQueue(ids) {
    state.queue = { createdAt: new Date().toISOString(), cursor: 0, items: ids.map((id) => ({ id, state: 'waiting' })) };
    saveQueue();
    return state.queue;
  }
  function getCurrentQueueItem() {
    if (!state.queue?.items?.length || state.queue.cursor >= state.queue.items.length) return null;
    return state.queue.items[state.queue.cursor] || null;
  }
  function markCurrentQueueItem(nextState) {
    const item = getCurrentQueueItem();
    if (!item) return;
    item.state = nextState;
    if (nextState === 'done' || nextState === 'skipped') {
      const nextIndex = state.queue.items.findIndex((entry, index) => index > state.queue.cursor && !['done', 'skipped'].includes(entry.state));
      state.queue.cursor = nextIndex === -1 ? state.queue.items.length : nextIndex;
    }
    saveQueue();
  }
  function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (_) { /* selection remains in memory */ }
  }

  NS.state = { value: state, loadSelected, saveSelected, toggleSelected, replaceSelected, addSelected, clearSelected, sanitizeSelection, loadQueue, saveQueue, createQueue, getCurrentQueueItem, markCurrentQueueItem };
})();
