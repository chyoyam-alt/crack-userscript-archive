(function () {
  'use strict';
  const NS = window.CrackArchive = window.CrackArchive || {};
  const FIREBASE_SDK_VERSION = '12.16.0';

  const providerDefinitions = {
    gemini: {
      label: 'Gemini API',
      models: [
        ['gemini-3.5-flash', 'Gemini 3.5 Flash · 권장'],
        ['gemini-3.1-flash-lite', 'Gemini 3.1 Flash-Lite · 저비용'],
        ['gemini-3.1-pro-preview', 'Gemini 3.1 Pro Preview · 정밀'],
        ['gemini-2.5-flash', 'Gemini 2.5 Flash · 호환'],
        ['gemini-2.5-pro', 'Gemini 2.5 Pro · 정밀'],
        ['custom', '직접 입력']
      ]
    },
    deepseek: {
      label: 'DeepSeek API',
      models: [
        ['deepseek-v4-flash', 'DeepSeek V4 Flash · 권장'],
        ['deepseek-v4-pro', 'DeepSeek V4 Pro · 정밀'],
        ['custom', '직접 입력']
      ]
    },
    firebase: {
      label: 'Firebase AI Logic (Gemini)',
      models: [
        ['gemini-3.5-flash', 'Gemini 3.5 Flash · 권장'],
        ['gemini-3.1-flash-lite', 'Gemini 3.1 Flash-Lite · 저비용'],
        ['gemini-3.1-pro-preview', 'Gemini 3.1 Pro Preview · 정밀'],
        ['gemini-2.5-flash', 'Gemini 2.5 Flash · 호환'],
        ['gemini-2.5-pro', 'Gemini 2.5 Pro · 정밀'],
        ['custom', '직접 입력']
      ]
    }
  };

  function getProviderDefinition(id) { return providerDefinitions[id] || providerDefinitions.gemini; }

  function getReasoningOptions(provider, model) {
    const id = String(model || '');
    if (provider === 'deepseek') return [['off', '추론 끄기'], ['high', '추론 높음 · 권장'], ['max', '추론 최대']];
    if (id.startsWith('gemini-2.5')) {
      const options = [['auto', '자동 · 동적 추론']];
      if (!id.includes('pro')) options.push(['off', '추론 끄기']);
      options.push(['1024', '예산 1,024'], ['4096', '예산 4,096'], ['8192', '예산 8,192'], ['16384', '예산 16,384'], ['24576', '예산 24,576']);
      if (id.includes('pro')) options.push(['32768', '예산 32,768']);
      return options;
    }
    const options = [['auto', '자동 · 모델 기본값']];
    if (!id.includes('3.1-pro') && !id.includes('3-pro')) options.push(['minimal', '최소']);
    options.push(['low', '낮음'], ['medium', '보통 · 권장'], ['high', '높음']);
    return options;
  }

  function resolveModel(settings) { return settings.model === 'custom' ? String(settings.customModel || '').trim() : settings.model; }

  async function listModels(settings) {
    if (settings.provider === 'gemini') return listGeminiModels(settings);
    if (settings.provider === 'deepseek') return listDeepSeekModels(settings);
    return providerDefinitions.firebase.models.filter(([id]) => id !== 'custom');
  }

  async function listGeminiModels(settings) {
    requireValue(settings.apiKey, 'Gemini API 키');
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models', { headers: { 'x-goog-api-key': settings.apiKey } });
    const data = await parseResponse(response);
    return (data.models || []).filter((model) => (model.supportedGenerationMethods || []).includes('generateContent')).map((model) => {
      const id = String(model.name || '').replace(/^models\//, '');
      return [id, model.displayName ? `${model.displayName} · ${id}` : id];
    }).filter(([id]) => id.includes('gemini'));
  }

  async function listDeepSeekModels(settings) {
    requireValue(settings.apiKey, 'DeepSeek API 키');
    const baseUrl = normalizeBaseUrl(settings.baseUrl || 'https://api.deepseek.com');
    let response;
    try { response = await fetch(`${baseUrl}/models`, { headers: { Authorization: `Bearer ${settings.apiKey}` } }); }
    catch (error) { throw corsError('DeepSeek', error); }
    const data = await parseResponse(response);
    return (data.data || []).map((model) => [model.id, model.id]);
  }

  async function testConnection(settings) {
    if (settings.provider === 'gemini' || settings.provider === 'deepseek') {
      const models = await listModels(settings);
      return { ok: true, message: `연결됨 · 사용 가능한 모델 ${models.length}개` };
    }
    const result = await generateFirebase(settings, {
      systemInstruction: 'Return only valid JSON.', prompt: 'Return {"ok":true}.',
      schema: { type: 'object', properties: { ok: { type: 'boolean' } }, required: ['ok'] }, maxOutputTokens: 64
    });
    return { ok: Boolean(result.ok), message: 'Firebase AI Logic 연결됨' };
  }

  async function analyze(settings, payload) {
    try { return await generate(settings, payload); }
    catch (error) {
      if (error.code !== 'AI_JSON_PARSE' || !error.raw) throw error;
      const repairPayload = {
        systemInstruction: 'You repair malformed model output. Return only one valid JSON object matching the supplied schema. Do not add explanations.',
        prompt: `다음 출력물을 유효한 JSON으로 복구하세요. 의미를 추가하거나 삭제하지 마세요.\n\n${error.raw}`,
        schema: payload.schema,
        maxOutputTokens: payload.maxOutputTokens || 8192
      };
      return generate(settings, repairPayload);
    }
  }

  function generate(settings, payload) {
    if (settings.provider === 'gemini') return generateGemini(settings, payload);
    if (settings.provider === 'deepseek') return generateDeepSeek(settings, payload);
    if (settings.provider === 'firebase') return generateFirebase(settings, payload);
    throw new Error('지원하지 않는 AI 제공자입니다.');
  }

  async function generateGemini(settings, payload) {
    requireValue(settings.apiKey, 'Gemini API 키');
    const model = resolveModel(settings); requireValue(model, '모델명');
    const generationConfig = {
      responseMimeType: 'application/json', responseSchema: payload.schema,
      maxOutputTokens: payload.maxOutputTokens || 8192
    };
    const thinkingConfig = buildGeminiThinking(model, settings.reasoning);
    if (thinkingConfig) generationConfig.thinkingConfig = thinkingConfig;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': settings.apiKey },
      body: JSON.stringify({ systemInstruction: { parts: [{ text: payload.systemInstruction }] }, contents: [{ role: 'user', parts: [{ text: payload.prompt }] }], generationConfig })
    });
    const data = await parseResponse(response);
    return parseJsonText(extractGeminiText(data));
  }

  async function generateDeepSeek(settings, payload) {
    requireValue(settings.apiKey, 'DeepSeek API 키');
    const model = resolveModel(settings); requireValue(model, '모델명');
    const baseUrl = normalizeBaseUrl(settings.baseUrl || 'https://api.deepseek.com');
    const enabled = settings.reasoning !== 'off';
    const body = {
      model,
      messages: [{ role: 'system', content: payload.systemInstruction }, { role: 'user', content: `${payload.prompt}\n\n반드시 유효한 JSON 객체만 출력하세요.` }],
      response_format: { type: 'json_object' }, max_tokens: payload.maxOutputTokens || 8192,
      thinking: { type: enabled ? 'enabled' : 'disabled' }
    };
    if (enabled) body.reasoning_effort = settings.reasoning === 'max' ? 'max' : 'high';
    let response;
    try {
      response = await fetch(`${baseUrl}/chat/completions`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${settings.apiKey}` }, body: JSON.stringify(body) });
    } catch (error) { throw corsError('DeepSeek', error); }
    const data = await parseResponse(response);
    return parseJsonText(data.choices?.[0]?.message?.content);
  }

  async function generateFirebase(settings, payload) {
    const firebaseConfig = parseFirebaseConfig(settings.firebaseConfig);
    const modelName = resolveModel(settings); requireValue(modelName, '모델명');
    const appModuleUrl = `https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}/firebase-app.js`;
    const aiModuleUrl = `https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}/firebase-ai.js`;
    const appCheckModuleUrl = `https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}/firebase-app-check.js`;
    const [{ initializeApp, getApps, getApp }, { getAI, getGenerativeModel, GoogleAIBackend, Schema }] = await Promise.all([import(appModuleUrl), import(aiModuleUrl)]);
    const appName = `crack-archive-${hashString(JSON.stringify(firebaseConfig))}`;
    const app = getApps().some((item) => item.name === appName) ? getApp(appName) : initializeApp(firebaseConfig, appName);
    if (settings.appCheckSiteKey) {
      if (settings.appCheckDebugToken) self.FIREBASE_APPCHECK_DEBUG_TOKEN = settings.appCheckDebugToken === 'true' ? true : settings.appCheckDebugToken;
      const { initializeAppCheck, ReCaptchaEnterpriseProvider } = await import(appCheckModuleUrl);
      try { initializeAppCheck(app, { provider: new ReCaptchaEnterpriseProvider(settings.appCheckSiteKey), isTokenAutoRefreshEnabled: true }); }
      catch (error) { if (!String(error?.message || '').toLowerCase().includes('already')) throw error; }
    }
    const ai = getAI(app, { backend: new GoogleAIBackend() });
    const generationConfig = {
      responseMimeType: 'application/json', responseSchema: toFirebaseSchema(payload.schema, Schema), maxOutputTokens: payload.maxOutputTokens || 8192
    };
    const thinkingConfig = buildGeminiThinking(modelName, settings.reasoning);
    if (thinkingConfig) generationConfig.thinkingConfig = thinkingConfig;
    const model = getGenerativeModel(ai, { model: modelName, systemInstruction: payload.systemInstruction, generationConfig });
    const result = await model.generateContent(payload.prompt);
    return parseJsonText(result.response.text());
  }

  function toFirebaseSchema(node, Schema) {
    if (!node || typeof node !== 'object') return Schema.string();
    if (node.enum && node.type === 'string') return Schema.enumString({ enum: node.enum });
    if (node.type === 'object') {
      const properties = {};
      for (const [key, value] of Object.entries(node.properties || {})) properties[key] = toFirebaseSchema(value, Schema);
      const required = new Set(node.required || []);
      const optionalProperties = Object.keys(properties).filter((key) => !required.has(key));
      return Schema.object({ properties, optionalProperties });
    }
    if (node.type === 'array') return Schema.array({ items: toFirebaseSchema(node.items || { type: 'string' }, Schema), ...(node.maxItems ? { maxItems: node.maxItems } : {}) });
    if (node.type === 'number' || node.type === 'integer') return Schema.number();
    if (node.type === 'boolean') return Schema.boolean();
    return Schema.string();
  }

  function buildGeminiThinking(model, reasoning) {
    if (!reasoning || reasoning === 'auto') return undefined;
    if (String(model).startsWith('gemini-2.5')) {
      if (reasoning === 'off') return { thinkingBudget: String(model).includes('pro') ? -1 : 0 };
      const budget = Number(reasoning); return Number.isFinite(budget) ? { thinkingBudget: budget } : { thinkingBudget: -1 };
    }
    return { thinkingLevel: reasoning };
  }

  function extractGeminiText(data) {
    const parts = data.candidates?.[0]?.content?.parts || [];
    const answer = parts.filter((part) => !part.thought && part.text).map((part) => part.text).join('');
    if (!answer) throw new Error(`Gemini가 분석 결과를 반환하지 않았습니다: ${data.candidates?.[0]?.finishReason || data.promptFeedback?.blockReason || '응답 없음'}`);
    return answer;
  }

  async function parseResponse(response) {
    const raw = await response.text(); let data;
    try { data = raw ? JSON.parse(raw) : {}; }
    catch (_) { throw new Error(`API 응답을 읽지 못했습니다. HTTP ${response.status}${raw ? ` · ${raw.slice(0, 240)}` : ''}`); }
    if (!response.ok) throw new Error(`API 오류 ${response.status}: ${data.error?.message || data.message || JSON.stringify(data).slice(0, 500)}`);
    return data;
  }

  function parseJsonText(text) {
    if (typeof text !== 'string' || !text.trim()) throw new Error('AI가 빈 응답을 반환했습니다.');
    const cleaned = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
    try { return JSON.parse(cleaned); }
    catch (_) {
      const start = cleaned.indexOf('{'); const end = cleaned.lastIndexOf('}');
      if (start >= 0 && end > start) { try { return JSON.parse(cleaned.slice(start, end + 1)); } catch (_) { /* repair below */ } }
      const error = new Error('AI 응답이 올바른 JSON 형식이 아니어서 한 번 복구를 시도합니다.'); error.code = 'AI_JSON_PARSE'; error.raw = cleaned.slice(0, 120000); throw error;
    }
  }

  function parseFirebaseConfig(value) {
    let raw = String(value || '').trim().replace(/^```(?:js|javascript|json)?\s*/i, '').replace(/\s*```$/, '');
    if (!raw) throw new Error('Firebase 설정을 입력해 주세요.');
    const firstBrace = raw.indexOf('{'); const lastBrace = raw.lastIndexOf('}');
    if (firstBrace >= 0 && lastBrace > firstBrace) raw = raw.slice(firstBrace, lastBrace + 1);
    let parsed;
    try { parsed = JSON.parse(raw); }
    catch (_) {
      try {
        const jsonLike = raw.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '').replace(/([{,]\s*)([A-Za-z_$][\w$]*)(\s*:)/g, '$1"$2"$3').replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, (_, value) => JSON.stringify(value.replace(/\\'/g, "'"))).replace(/,\s*([}\]])/g, '$1');
        parsed = JSON.parse(jsonLike);
      } catch (_) { throw new Error('Firebase 설정 형식을 읽지 못했습니다. 콘솔의 `const firebaseConfig = { ... };` 코드 또는 순수 JSON을 붙여넣어 주세요.'); }
    }
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Firebase 설정 객체를 입력해 주세요.');
    requireValue(parsed.apiKey, 'Firebase apiKey'); requireValue(parsed.projectId, 'Firebase projectId'); requireValue(parsed.appId, 'Firebase appId');
    return parsed;
  }

  function corsError(provider, error) { return new Error(`${provider} 브라우저 직접 연결에 실패했습니다. CORS 정책 또는 네트워크를 확인하세요. (${error.message})`); }
  function normalizeBaseUrl(value) { return String(value || '').trim().replace(/\/+$/, ''); }
  function requireValue(value, label) { if (!String(value || '').trim()) throw new Error(`${label}을(를) 입력해 주세요.`); }
  function hashString(value) { let hash = 2166136261; for (let i = 0; i < value.length; i += 1) { hash ^= value.charCodeAt(i); hash = Math.imul(hash, 16777619); } return (hash >>> 0).toString(36); }

  NS.aiProviders = { definitions: providerDefinitions, getProviderDefinition, getReasoningOptions, listModels, testConnection, analyze, resolveModel, parseFirebaseConfig, toFirebaseSchema };
})();
