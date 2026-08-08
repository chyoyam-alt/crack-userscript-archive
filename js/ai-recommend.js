(function () {
  'use strict';

  const NS = window.CrackArchive = window.CrackArchive || {};
  const PREF_KEY = 'crack-archive:ai-recommend-prefs:v1';
  let busy = false;
  let resultItems = [];
  let recommendationInstruction = '';
  let catalogRefreshPromise = null;
  let conversationStatusNode = null;

  function init() {
    recommendationInstruction = NS.aiInstructions.DEFAULT_RECOMMENDATION_INSTRUCTIONS;
    fetch('data/ai-recommendation-instructions.md', { cache: 'no-cache' })
      .then((response) => response.ok ? response.text() : '')
      .then((text) => { if (text.trim()) recommendationInstruction = text.trim(); })
      .catch(() => {});
    document.getElementById('openAiRecommendButton').addEventListener('click', open);
    document.getElementById('aiLauncherButton').addEventListener('click', open);
    document.getElementById('aiSettingsToggle').addEventListener('click', () => openSettings(true));
    document.getElementById('aiSettingsCloseButton').addEventListener('click', () => openSettings(false));
    document.getElementById('aiRecommendDialog').addEventListener('close', handleDialogClose);
    document.getElementById('recommendAiProvider').addEventListener('change', onProviderChange);
    document.getElementById('recommendAiModel').addEventListener('change', onModelChange);
    document.getElementById('recommendAiCustomModel').addEventListener('input', () => { refreshReasoning(); savePrefs(); resetConnectionVerification(); });
    document.getElementById('recommendAiReasoning').addEventListener('change', savePrefs);
    document.getElementById('recommendLoadModelsButton').addEventListener('click', loadModels);
    document.getElementById('recommendTestButton').addEventListener('click', testConnection);
    document.getElementById('recommendRunButton').addEventListener('click', run);
    document.getElementById('recommendApplyButton').addEventListener('click', apply);
    document.getElementById('recommendPrompt').addEventListener('keydown', handlePromptKeydown);
    document.querySelectorAll('.ai-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        document.getElementById('recommendPrompt').value = chip.textContent.trim();
        run();
      });
    });
    restorePrefs();
  }

  function handlePromptKeydown(event) {
    if (event.key !== 'Enter' || event.shiftKey || event.isComposing || event.keyCode === 229) return;
    event.preventDefault();
    run();
  }

  function open() {
    const dialog = document.getElementById('aiRecommendDialog');
    if (!dialog.open) dialog.show();
    document.getElementById('aiLauncherButton').hidden = true;
    document.body.classList.add('ai-helper-open');
    NS.assistantAvatar?.wave();
    updateCandidateCount();
    refreshCatalogForAi();
    setTimeout(() => document.getElementById('recommendPrompt').focus(), 160);
  }

  function updateCandidateCount(stateText) {
    const count = NS.state.value.catalog?.extensions?.length || 0;
    document.getElementById('recommendCandidateCount').textContent = String(count);
    document.getElementById('recommendCatalogFreshness').textContent = stateText || '현재 카탈로그';
    return count;
  }

  function refreshCatalogForAi() {
    if (catalogRefreshPromise) return catalogRefreshPromise;
    updateCandidateCount('최신 확인 중…');
    catalogRefreshPromise = (async () => {
      try {
        const result = await NS.app.refreshCatalog();
        updateCandidateCount(result.dataSource === 'cache' ? '이전 저장본 사용 중' : '최신 확인됨');
        return result;
      } catch (error) {
        console.error(error);
        updateCandidateCount('갱신 실패 · 현재 목록 사용');
        return { count: NS.state.value.catalog?.extensions?.length || 0, changed: false, dataSource: 'current' };
      } finally {
        catalogRefreshPromise = null;
      }
    })();
    return catalogRefreshPromise;
  }

  function openSettings(open) {
    const panel = document.getElementById('aiSettingsPanel');
    panel.hidden = !open;
    document.getElementById('aiSettingsToggle').setAttribute('aria-expanded', String(open));
    if (open) panel.querySelector('select, input, textarea, button')?.focus();
  }

  function handleDialogClose() {
    openSettings(false);
    document.getElementById('aiLauncherButton').hidden = false;
    document.body.classList.remove('ai-helper-open');
    NS.assistantAvatar?.setState('idle');
  }

  function onProviderChange() {
    refreshProviderFields();
    savePrefs();
    resetConnectionVerification();
    setBadge('연결 전', 'idle');
  }

  function onModelChange() {
    document.getElementById('recommendCustomModelField').hidden = document.getElementById('recommendAiModel').value !== 'custom';
    refreshReasoning();
    savePrefs();
    resetConnectionVerification();
  }

  function refreshProviderFields() {
    const provider = document.getElementById('recommendAiProvider').value;
    document.getElementById('recommendGeminiFields').hidden = provider !== 'gemini';
    document.getElementById('recommendDeepSeekFields').hidden = provider !== 'deepseek';
    document.getElementById('recommendFirebaseFields').hidden = provider !== 'firebase';
    populateModels(NS.aiProviders.getProviderDefinition(provider).models);
    onModelChange();
  }

  function populateModels(models, selected) {
    const select = document.getElementById('recommendAiModel');
    const previous = selected || select.value;
    select.replaceChildren();
    models.forEach(([id, label]) => {
      const option = document.createElement('option'); option.value = id; option.textContent = label; select.append(option);
    });
    if (![...select.options].some((option) => option.value === 'custom')) {
      const custom = document.createElement('option'); custom.value = 'custom'; custom.textContent = '직접 입력'; select.append(custom);
    }
    if ([...select.options].some((option) => option.value === previous)) select.value = previous;
    document.getElementById('recommendCustomModelField').hidden = select.value !== 'custom';
  }

  function refreshReasoning() {
    const provider = document.getElementById('recommendAiProvider').value;
    const selected = document.getElementById('recommendAiModel').value;
    const model = selected === 'custom' ? document.getElementById('recommendAiCustomModel').value.trim() : selected;
    const select = document.getElementById('recommendAiReasoning');
    const previous = select.value;
    select.replaceChildren();
    NS.aiProviders.getReasoningOptions(provider, model).forEach(([value, label]) => {
      const option = document.createElement('option'); option.value = value; option.textContent = label; select.append(option);
    });
    if ([...select.options].some((option) => option.value === previous)) select.value = previous;
    else select.value = provider === 'deepseek' ? 'high' : (model.startsWith('gemini-2.5') ? 'auto' : 'medium');
  }

  function settings() {
    const provider = document.getElementById('recommendAiProvider').value;
    return {
      provider,
      model: document.getElementById('recommendAiModel').value,
      customModel: document.getElementById('recommendAiCustomModel').value.trim(),
      reasoning: document.getElementById('recommendAiReasoning').value,
      apiKey: provider === 'gemini'
        ? document.getElementById('recommendGeminiApiKey').value.trim()
        : document.getElementById('recommendDeepSeekApiKey').value.trim(),
      baseUrl: document.getElementById('recommendDeepSeekBaseUrl').value.trim(),
      firebaseConfig: document.getElementById('recommendFirebaseConfig').value.trim(),
      appCheckSiteKey: document.getElementById('recommendFirebaseAppCheckSiteKey').value.trim(),
      appCheckDebugToken: document.getElementById('recommendFirebaseAppCheckDebugToken').value.trim()
    };
  }

  async function loadModels() {
    if (busy) return;
    try {
      setBusy(true, 'models'); setBadge('조회 중', 'working'); setConnectionFeedback('사용 가능한 모델을 확인하고 있슴다…', 'working');
      const models = await NS.aiProviders.listModels(settings());
      populateModels([...models, ['custom', '직접 입력']], NS.aiProviders.resolveModel(settings()));
      refreshReasoning(); setBadge(`모델 ${models.length}개`, 'success');
      setConnectionFeedback(`모델 ${models.length}개를 불러왔슴다. 사용할 모델을 고른 뒤 연결 테스트를 눌러주십셔.`, 'success');
      NS.render.toast(`모델 ${models.length}개를 불러왔어요.`);
    } catch (error) {
      const message = error.message || '모델을 불러오지 못했습니다.';
      console.error(error); NS.assistantAvatar?.setState('error'); setTimeout(() => NS.assistantAvatar?.setState('idle'), 1600); setBadge('조회 실패', 'error'); setConnectionFeedback(message, 'error'); NS.render.toast(message);
    } finally { setBusy(false); }
  }

  async function testConnection() {
    if (busy) return;
    try {
      setBusy(true, 'connection'); setBadge('테스트 중', 'working'); setConnectionFeedback('API 연결을 확인하고 있슴다…', 'working');
      const response = await NS.aiProviders.testConnection(settings());
      const message = response.message || 'AI 연결 성공';
      setBadge('연결됨', 'success');
      setConnectionFeedback(`✓ ${message}. 이제 설정을 닫고 원하는 기능을 말해주십셔.`, 'success');
      appendAssistantMessage(`${message}! 이제 원하는 기능을 말해주시면 카탈로그 안에서 골라오겠슴다.`, 'success');
      NS.render.toast(message);
    } catch (error) {
      const message = error.message || '연결 테스트에 실패했습니다.';
      console.error(error); NS.assistantAvatar?.setState('error'); setTimeout(() => NS.assistantAvatar?.setState('idle'), 1600); setBadge('실패', 'error');
      setConnectionFeedback(`연결하지 못했슴다. ${message}`, 'error');
      appendAssistantMessage(`연결 테스트에 실패했슴다. 설정값을 다시 확인해주십셔.`, 'error');
      NS.render.toast(message);
    } finally { setBusy(false); }
  }

  async function run() {
    if (busy) return;
    const request = document.getElementById('recommendPrompt').value.trim();
    if (!request) { NS.render.toast('원하는 기능을 입력하세요.'); return; }
    beginConversation(request);
    const config = settings();
    if (!hasConnectionInput(config)) {
      setConversationStatus('먼저 오른쪽 위 ⚙에서 API 정보를 넣고 연결 테스트를 눌러주십셔.', 'error');
      setRunStatus('API 연결이 필요합니다.', 'error');
      setConnectionFeedback(connectionInputGuide(config.provider), 'error');
      openSettings(true);
      return;
    }
    try {
      setBusy(true, 'recommend'); setRunStatus('추천 작업 중…', 'working');
      setConversationStatus('최신 카탈로그를 확인하고 있슴다…', 'working');
      await refreshCatalogForAi();
      const catalogCandidates = NS.state.value.catalog.extensions.map((item) => ({
        id: item.id, status: item.status, name: item.name, summary: item.summary,
        categories: item.categories, features: item.features, aliases: item.aliases, tags: item.tags,
        platforms: item.platforms, performance: item.performance, relations: item.relations
      }));
      const catalogCandidateCount = catalogCandidates.length;
      updateCandidateCount('AI 전달 준비 완료');
      setConversationStatus(`카탈로그 ${catalogCandidateCount}개 확인 완료. 요청에 맞는 후보를 골라오는 중임다…`, 'working');
      const prompt = [
        '다음 사용자 요청에 맞는 확프를 추천하세요.',
        '', '## 사용자 요청', request,
        '', '## 현재 사이트에서 선택된 항목', JSON.stringify([...NS.state.value.selected]),
        '', '## catalogCandidateCount', String(catalogCandidateCount),
        '위 숫자는 사이트가 배열 길이로 확인한 정확한 값입니다. 다시 세거나 다른 숫자로 표현하지 마세요.',
        '', '## catalogCandidates', JSON.stringify(catalogCandidates, null, 2)
      ].join('\n');
      const raw = await NS.aiProviders.analyze(settings(), {
        systemInstruction: recommendationInstruction || NS.aiInstructions.DEFAULT_RECOMMENDATION_INSTRUCTIONS,
        prompt,
        schema: NS.aiInstructions.RECOMMENDATION_SCHEMA,
        maxOutputTokens: 4096
      });
      const normalized = normalizeResult(raw);
      renderResult(normalized, request);
      document.getElementById('recommendPrompt').value = '';
      setRunStatus(`${catalogCandidateCount}개 후보 확인 · 추천 완료`, 'success');
    } catch (error) {
      const message = error.message || 'AI 추천에 실패했습니다.';
      console.error(error); NS.assistantAvatar?.setState('error'); setTimeout(() => NS.assistantAvatar?.setState('idle'), 1800); setRunStatus(message, 'error');
      setConversationStatus(`추천 중 문제가 생겼슴다. API 연결과 설정을 확인해주십셔.`, 'error');
      NS.render.toast('AI 추천에 실패했습니다. API 연결 상태를 확인하세요.');
    } finally { setBusy(false); }
  }

  function beginConversation(request) {
    document.getElementById('recommendExamples').hidden = true;
    const container = document.getElementById('recommendResult');
    container.replaceChildren(createUserMessage(request));
    conversationStatusNode = null;
    resultItems = [];
    document.getElementById('recommendApplyButton').disabled = true;
    scrollConversationToBottom();
  }

  function createUserMessage(request) {
    const message = create('div', 'ai-user-message');
    message.append(create('span', '', '나'), create('p', '', request));
    return message;
  }

  function createAssistantMessage(text, state) {
    const message = create('div', 'ai-msg ai-msg--conversation');
    const face = create('span', 'ai-msg__face', state === 'error' ? '•︵•' : '•ᴗ•');
    face.setAttribute('aria-hidden', 'true');
    const bubble = create('div', 'ai-msg__bubble');
    if (state) bubble.dataset.state = state;
    bubble.append(create('strong', '', '모아'), create('p', '', text));
    message.append(face, bubble);
    return message;
  }

  function appendAssistantMessage(text, state) {
    const container = document.getElementById('recommendResult');
    if (!container) return null;
    const message = createAssistantMessage(text, state);
    container.append(message);
    scrollConversationToBottom();
    return message;
  }

  function setConversationStatus(text, state) {
    const container = document.getElementById('recommendResult');
    if (!container) return;
    if (!conversationStatusNode?.isConnected) {
      conversationStatusNode = createAssistantMessage(text, state);
      conversationStatusNode.classList.add('ai-progress-message');
      container.append(conversationStatusNode);
    } else {
      const face = conversationStatusNode.querySelector('.ai-msg__face');
      const bubble = conversationStatusNode.querySelector('.ai-msg__bubble');
      const paragraph = bubble?.querySelector('p');
      if (face) face.textContent = state === 'error' ? '•︵•' : '•ᴗ•';
      if (bubble) bubble.dataset.state = state || '';
      if (paragraph) paragraph.textContent = text;
    }
    scrollConversationToBottom();
  }

  function scrollConversationToBottom() {
    requestAnimationFrame(() => {
      const scroll = document.querySelector('#aiRecommendDialog .ai-scroll');
      if (scroll) scroll.scrollTop = scroll.scrollHeight;
    });
  }

  function normalizeResult(raw) {
    const catalog = NS.state.value.catalog;
    const seen = new Set();
    const warnings = cleanList(raw?.warnings, 12);
    const selected = normalizeItems(raw?.selected, 'selected');
    const optional = normalizeItems(raw?.optional, 'optional');
    const excluded = normalizeItems(raw?.excluded, 'excluded');

    function normalizeItems(value, group) {
      const result = [];
      for (const item of Array.isArray(value) ? value : []) {
        const id = String(item?.id || '').trim();
        const extension = catalog.byId.get(id);
        if (!extension || seen.has(`${group}:${id}`)) continue;
        if ((group === 'selected' || group === 'optional') && extension.status === 'archived') continue;
        seen.add(`${group}:${id}`);
        result.push({ id, reason: String(item?.reason || '').trim() || '요청과 가까운 후보임다.' });
      }
      return result;
    }

    for (let i = selected.length - 1; i >= 0; i -= 1) {
      const entry = selected[i];
      const extension = catalog.byId.get(entry.id);
      if (extension?.status !== 'active') {
        selected.splice(i, 1);
        optional.push({ ...entry, reason: `${entry.reason} (현재 ${extension?.status === 'deprecated' ? '교체 권장' : '비활성'} 상태)` });
      }
    }

    const selectedIds = new Set(selected.map((item) => item.id));
    let changed = true;
    while (changed) {
      changed = false;
      for (const id of [...selectedIds]) {
        const extension = catalog.byId.get(id);
        for (const requiredId of extension?.relations.requires || []) {
          const required = catalog.byId.get(requiredId);
          if (required?.status === 'active' && !selectedIds.has(requiredId)) {
            selectedIds.add(requiredId); selected.push({ id: requiredId, reason: `${extension.name} 사용에 필요한 필수 항목임다.` }); changed = true;
          }
        }
      }
    }
    for (let i = selected.length - 1; i >= 0; i -= 1) {
      const item = selected[i]; const extension = catalog.byId.get(item.id);
      const conflict = extension?.relations.conflictsWith.find((id) => selectedIds.has(id));
      if (conflict && selected.findIndex((entry) => entry.id === conflict) < i) {
        selected.splice(i, 1); selectedIds.delete(item.id);
        optional.push({ ...item, reason: `${item.reason} 다만 ${catalog.byId.get(conflict)?.name || conflict}와 충돌 관계라 선택 후보로 내렸습니다.` });
        warnings.push(`${extension.name}는 충돌 관계 때문에 기본 선택에서 제외했습니다.`);
      }
    }
    return { summary: String(raw?.summary || '').trim(), selected, optional: dedupe(optional, selectedIds), excluded, warnings: [...new Set(warnings)] };
  }

  function dedupe(items, selectedIds) {
    const seen = new Set();
    return items.filter((item) => !selectedIds.has(item.id) && !seen.has(item.id) && seen.add(item.id));
  }

  function renderResult(result, request) {
    const container = document.getElementById('recommendResult');
    container.replaceChildren(createUserMessage(request));
    conversationStatusNode = null;
    resultItems = [];
    container.append(createAssistantMessage(result.summary || '요청에 맞는 후보를 골라왔슴다.', 'success'));
    appendGroup(container, '기본 추천', result.selected, true);
    appendGroup(container, '선택 추천', result.optional, false);
    appendExcluded(container, result.excluded);
    if (result.warnings.length) {
      const box = create('section', 'ai-recommend-warnings'); box.append(create('h3', '', '확인할 점'));
      const list = document.createElement('ul'); result.warnings.forEach((item) => list.append(create('li', '', item))); box.append(list); container.append(box);
    }
    document.getElementById('recommendApplyButton').disabled = !resultItems.length;
    scrollConversationToBottom();
  }

  function appendGroup(parent, title, items, checked) {
    if (!items.length) return;
    const section = create('section', 'ai-recommend-group');
    section.append(create('h3', '', title));
    items.forEach((item) => {
      const extension = NS.state.value.catalog.byId.get(item.id);
      if (!extension) return;
      const row = create('div', 'ai-recommend-item');
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.value = item.id;
      input.checked = checked;
      input.setAttribute('aria-label', `${extension.name} 추천 적용`);
      const body = create('div', 'ai-recommend-item__body');
      body.append(create('span', 'ai-recommend-item__name', extension.name), create('small', '', item.reason));
      const actions = create('div', 'ai-recommend-item__actions');
      const add = create('button', 'ai-item-add', NS.state.value.selected.has(item.id) ? '✓ 담김' : '+ 바로 담기');
      add.type = 'button';
      add.disabled = NS.state.value.selected.has(item.id);
      add.addEventListener('click', () => {
        NS.state.addSelected([item.id]);
        NS.app.refreshAll();
        input.checked = true;
        add.textContent = '✓ 담김';
        add.disabled = true;
        NS.render.toast(`${extension.name}을(를) 선택 목록에 담았습니다.`);
      });
      const introduction = extension.introductionPage?.url ? create('a', 'ai-item-introduction', '↗ 소개') : null;
      if (introduction) {
        introduction.href = extension.introductionPage.url;
        introduction.target = '_blank';
        introduction.rel = 'noopener noreferrer';
        introduction.setAttribute('aria-label', `${extension.name} 소개 페이지 새 탭에서 열기`);
      }
      const detail = create('button', '', '상세');
      detail.type = 'button';
      detail.addEventListener('click', () => NS.app.openDetail(item.id));
      actions.append(add);
      if (introduction) actions.append(introduction);
      actions.append(detail);
      row.append(input, body, actions);
      section.append(row);
      resultItems.push(input);
    });
    parent.append(section);
  }

  function appendExcluded(parent, items) {
    if (!items.length) return;
    const details = document.createElement('details'); details.className = 'ai-recommend-excluded';
    const summary = document.createElement('summary'); summary.textContent = `제외 설명 ${items.length}개`; details.append(summary);
    const list = document.createElement('ul'); items.forEach((item) => {
      const extension = NS.state.value.catalog.byId.get(item.id); if (extension) list.append(create('li', '', `${extension.name} — ${item.reason}`));
    });
    details.append(list); parent.append(details);
  }

  function apply() {
    const ids = resultItems.filter((input) => input.checked).map((input) => input.value).filter((id) => NS.state.value.catalog.byId.has(id));
    if (!ids.length) { NS.render.toast('담을 추천 항목을 하나 이상 선택하세요.'); return; }
    NS.state.addSelected(ids);
    NS.app.refreshAll();
    document.querySelectorAll('.ai-item-add').forEach((button) => {
      const row = button.closest('.ai-recommend-item');
      const input = row?.querySelector('input[type="checkbox"]');
      if (input?.checked) { button.textContent = '✓ 담김'; button.disabled = true; }
    });
    NS.render.toast(`${ids.length}개 추천을 선택 목록에 담았습니다.`);
  }

  function restorePrefs() {
    let prefs = {};
    try { prefs = JSON.parse(localStorage.getItem(PREF_KEY) || '{}'); } catch (_) { /* ignore */ }
    if (['gemini', 'deepseek', 'firebase'].includes(prefs.provider)) document.getElementById('recommendAiProvider').value = prefs.provider;
    if (prefs.customModel) document.getElementById('recommendAiCustomModel').value = prefs.customModel;
    refreshProviderFields();
    if (prefs.model && [...document.getElementById('recommendAiModel').options].some((option) => option.value === prefs.model)) document.getElementById('recommendAiModel').value = prefs.model;
    onModelChange();
    if (prefs.reasoning && [...document.getElementById('recommendAiReasoning').options].some((option) => option.value === prefs.reasoning)) document.getElementById('recommendAiReasoning').value = prefs.reasoning;
  }

  function savePrefs() {
    const prefs = {
      provider: document.getElementById('recommendAiProvider').value,
      model: document.getElementById('recommendAiModel').value,
      customModel: document.getElementById('recommendAiCustomModel').value.trim(),
      reasoning: document.getElementById('recommendAiReasoning').value
    };
    try { localStorage.setItem(PREF_KEY, JSON.stringify(prefs)); } catch (_) { /* optional */ }
  }

  function hasConnectionInput(config) {
    if (config.provider === 'firebase') return Boolean(config.firebaseConfig);
    return Boolean(config.apiKey);
  }

  function connectionInputGuide(provider) {
    return provider === 'firebase'
      ? 'Firebase 설정 코드를 넣은 뒤 연결 테스트를 눌러주십셔.'
      : 'API 키를 넣은 뒤 연결 테스트를 눌러주십셔.';
  }

  function resetConnectionVerification() {
    setBadge('연결 전', 'idle');
    const status = document.getElementById('recommendConnectionStatus');
    if (status) {
      status.hidden = true;
      status.textContent = '';
      status.dataset.state = '';
    }
  }

  function setConnectionFeedback(text, state) {
    const status = document.getElementById('recommendConnectionStatus');
    if (!status) return;
    status.hidden = !text;
    status.textContent = text || '';
    status.dataset.state = state || '';
  }

  function setBusy(value, task) {
    busy = value;
    if (!value || task === 'recommend') NS.assistantAvatar?.setState(value ? 'thinking' : 'idle');
    ['recommendLoadModelsButton', 'recommendTestButton', 'recommendRunButton'].forEach((id) => { document.getElementById(id).disabled = value; });
    document.getElementById('recommendRunButton').textContent = value && task === 'recommend' ? '추천 중…' : '추천받기';
  }
  function setBadge(text, state) { const el = document.getElementById('recommendConnectionBadge'); el.textContent = text; el.dataset.state = state; }
  function setRunStatus(text, state) { const el = document.getElementById('recommendRunStatus'); el.hidden = !text; el.textContent = text; el.dataset.state = state; }
  function cleanList(value, limit) { return [...new Set((Array.isArray(value) ? value : []).map((item) => String(item || '').trim()).filter(Boolean))].slice(0, limit); }
  function create(tag, className, text) { const el = document.createElement(tag); if (className) el.className = className; if (text !== undefined) el.textContent = text; return el; }

  NS.aiRecommend = { init, open, run };
})();
