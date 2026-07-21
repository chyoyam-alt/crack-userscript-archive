(function () {
  'use strict';
  const NS = window.CrackArchive = window.CrackArchive || {};
  const dialogs = ['detailDialog', 'selectionDialog', 'queueDialog', 'wizardDialog', 'guideDialog'];
  const THEME_KEY = 'crack-archive:theme:v1';

  async function init() {
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
    if (sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    if (sort === 'updated') result.sort((a, b) => String(b.updatedAt || b.lastTestedAt || '').localeCompare(String(a.updatedAt || a.lastTestedAt || '')) || a.name.localeCompare(b.name, 'ko'));
    NS.state.value.filtered = result;
    NS.render.renderCards(result);
    animateScan();
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
    const dialog = document.getElementById('detailDialog');
    if (!dialog.open) dialog.showModal();
  }

  function toggleSelection(id, fromDialog) {
    const selected = NS.state.toggleSelected(id);
    refreshAll();
    if (fromDialog && NS.state.value.detailId === id) NS.render.renderDetail(NS.state.value.catalog.byId.get(id));
    NS.render.toast(selected ? '선택 목록에 추가했습니다.' : '선택에서 제외했습니다.');
  }

  function refreshAll() {
    applyFilters();
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
