/* moa-flourish.js
 * 모아 연출 전용 (기존 app.js / render.js 와 충돌하지 않는 새 UI 동작만 담당)
 *  - 목록 옆 모아 코멘트: 카오모지 + 말풍선 순환 / 클릭하면 조용 / 다시 클릭하면 재개
 *  - 비주얼노벨·동숲식 비프음(글자마다 띠딕) — 첫 사용자 입력 후 활성(브라우저 자동재생 정책)
 *  - 우하단 모아 대화창: 비모달 도킹(showModal ❌ → show ✅)이라 열려 있어도 검색·목록 그대로 사용
 *  - '모션 줄이기' OS 설정이면 타이핑·소리 자동 비활성
 */
(function () {
  'use strict';

  /* #cardGrid는 ul이라 브라우저 기본 왼쪽 padding이 붙는다. 목록 자체만 정확히 초기화한다. */
  var listResetStyle = document.createElement('style');
  listResetStyle.id = 'archive-list-reset';
  listResetStyle.textContent = '.list{margin:10px 0 0!important;padding:0!important;padding-inline-start:0!important;list-style:none!important;}';
  document.head.appendChild(listResetStyle);

  /* 모아 설정 패널은 완전히 불투명하게 덮고, 호출 버튼은 정사각형 아이콘으로 축소한다. */
  var moaUiStyle = document.createElement('style');
  moaUiStyle.id = 'moa-ui-polish';
  moaUiStyle.textContent = [
    '#aiRecommendDialog{isolation:isolate;}',
    '#aiRecommendDialog .ai-settings{background:var(--solid)!important;-webkit-backdrop-filter:none!important;backdrop-filter:none!important;box-shadow:inset 0 0 0 1px var(--line-2);}',
    '#aiRecommendDialog .ai-settings__head,#aiRecommendDialog .ai-settings__scroll{background:var(--solid)!important;}',
    '#aiRecommendDialog .ai-settings[hidden]{display:none!important;}',
    '.ailauncher{width:52px!important;height:52px!important;min-width:52px!important;padding:0!important;gap:0!important;justify-content:center!important;border-radius:10px!important;}',
    '.ailauncher__txt{display:none!important;}',
    '.ailauncher__face{width:32px!important;height:32px!important;}',
    '@media(max-width:520px){.ailauncher{width:48px!important;height:48px!important;min-width:48px!important;border-radius:9px!important;}.ailauncher__face{width:30px!important;height:30px!important;}}'
  ].join('');
  document.head.appendChild(moaUiStyle);

  /* 사람이 직접 읽는 화면은 한글 우선. 확프명·설명·버전 같은 실제 데이터는 건드리지 않는다. */
  var exactKorean = {
    'ACTIVE': '사용 가능',
    'REPLACE': '교체 권장',
    'ARCHIVED': '보관됨',
    'NO LINK': '링크 없음',
    'RECHECK': '재확인',
    'DETAIL →': '상세보기 →',
    'DESCRIPTION': '설명',
    'FEATURES': '기능',
    'SEARCH TAGS': '검색어·태그',
    'ENVIRONMENT': '사용 환경',
    'RELATIONS': '함께 쓰기',
    'ORIGINAL SOURCE': '원문 정보',
    'DISTRIBUTION': '배포 정보',
    'CHANGELOG': '변경 이력',
    'PC SUPPORT': 'PC 지원',
    'MOBILE SUPPORT': '모바일 지원',
    'PC LOAD': 'PC 성능 부담',
    'MOBILE LOAD': '모바일 성능 부담',
    'VERSION': '버전',
    'LAST TEST': '마지막 확인',
    'UPDATED': '최근 수정',
    'INSTALL': '설치 상태',
    'SYSTEM': '관리',
    'ARCHIVE': '보관',
    'UTILITY': '편의',
    'VISUAL': '꾸미기',
    'SCRIPT': '기타'
  };

  function localizeText(text) {
    var value = String(text || '');
    var trimmed = value.trim();
    if (!trimmed) return value;
    if (exactKorean[trimmed]) return value.replace(trimmed, exactKorean[trimmed]);
    if (/^\d+\s+items$/.test(trimmed)) return value.replace(trimmed, trimmed.replace(' items', '개 표시'));
    if (/^\d+\s*·\s*(SYSTEM|ARCHIVE|UTILITY|VISUAL|SCRIPT)$/.test(trimmed)) {
      return value.replace(/(SYSTEM|ARCHIVE|UTILITY|VISUAL|SCRIPT)$/, function (word) { return exactKorean[word] || word; });
    }
    if (/^(PC\+MOBILE|PC|MOBILE|SUPPORT \?)\s*·\s*LOAD\s*(LOW|MID|HIGH|\?)(.*)$/.test(trimmed)) {
      return value.replace('SUPPORT ?', '지원 미확인')
        .replace(' · LOAD LOW', ' · 부담 낮음')
        .replace(' · LOAD MID', ' · 부담 보통')
        .replace(' · LOAD HIGH', ' · 부담 높음')
        .replace(' · LOAD ?', ' · 부담 미확인');
    }
    return value;
  }

  function localizeNode(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      var next = localizeText(root.nodeValue);
      if (next !== root.nodeValue) root.nodeValue = next;
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      var localized = localizeText(node.nodeValue);
      if (localized !== node.nodeValue) node.nodeValue = localized;
    }
  }

  localizeNode(document.body);
  new MutationObserver(function (records) {
    records.forEach(function (record) {
      record.addedNodes.forEach(localizeNode);
      if (record.type === 'characterData') localizeNode(record.target);
    });
  }).observe(document.body, { childList: true, subtree: true, characterData: true });

  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* ── 비프음 (WebAudio) ── */
  var _ac, _on = false;
  function ctx() { if (!_ac) { try { _ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } return _ac; }
  function unlock() { var c = ctx(); if (c && c.state === 'suspended') c.resume(); _on = true; removeEventListener('pointerdown', unlock); removeEventListener('keydown', unlock); }
  addEventListener('pointerdown', unlock); addEventListener('keydown', unlock);
  function blip(ch) {
    if (!_on) return; var c = ctx(); if (!c) return;
    var o = c.createOscillator(), g = c.createGain(), f = 470 + (ch.charCodeAt(0) % 13) * 24;
    o.type = 'square'; o.frequency.value = f; o.connect(g); g.connect(c.destination);
    var t = c.currentTime;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.045, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
    o.start(t); o.stop(t + 0.08);
  }

  /* ── 타이핑 효과 ── */
  function type(el, text, done) {
    if (!el) return;
    el.textContent = '';
    if (reduce) { el.textContent = text; if (done) done(); return; }
    var i = 0;
    (function step() {
      if (i >= text.length) { if (done) done(); return; }
      var ch = text[i++]; el.textContent += ch;
      if (ch.trim()) blip(ch);
      setTimeout(step, 46 + Math.random() * 40);
    })();
  }

  /* ── 목록 옆 모아 코멘트 ── */
  var quips = [
    ['•ᴗ•', '원하는 기능을 말해보십셔'],
    ['⌐■_■', '골라 담고 한 번에 설치함다'],
    ['¬‿¬', '무거운 효과는 걸러드림다'],
    ['ᕕ( ᐛ )ᕗ', '모바일용도 다 챙겨놨슴다'],
    ['(๑•̀ᴗ•́)', '검색이 꽤 빠름다'],
    ['°ロ°', '고민되면 저를 부르십셔'],
    ['˘ᵕ˘', '천천히 둘러보십셔'],
    ['ᗒ ᗨ ᗕ', '오늘도 좋은 확프 되십셔']
  ];
  var qEl = document.querySelector('.moa-quip'),
      qFace = document.querySelector('.moa-quip__face'),
      qText = document.querySelector('.moa-quip__text'),
      qi = 0, qTimer = null, quiet = false;
  function nextQuip() {
    if (quiet || !qText) return;
    var q = quips[qi++ % quips.length];
    if (qFace) qFace.textContent = q[0];
    type(qText, q[1]);
    qTimer = setTimeout(nextQuip, 6500);
  }
  if (qText) setTimeout(nextQuip, 600);
  if (qEl) qEl.addEventListener('click', function () {
    if (!quiet) {
      quiet = true; if (qTimer) clearTimeout(qTimer); qEl.classList.remove('is-muted');
      if (qFace) qFace.textContent = 'm(_ _)m';
      type(qText, '알겠슴다! 조용히 하겠슴다', function () {
        setTimeout(function () { qEl.classList.add('is-muted'); if (qFace) qFace.textContent = '˘_˘'; }, 800);
      });
    } else {
      quiet = false; qEl.classList.remove('is-muted'); nextQuip();
    }
  });

  /* ── 우하단 모아 대화창 (비모달 도킹) ── */
  var aiDlg = document.getElementById('aiRecommendDialog'),
      aiLauncher = document.getElementById('aiLauncherButton'),
      openBtn = document.getElementById('openAiRecommendButton'),
      greetEl = document.querySelector('.ai-greet-text'),
      greeted = false;
  function moaOpen() {
    if (!aiDlg || aiDlg.open) return;
    if (aiDlg.show) aiDlg.show();
    if (aiLauncher) aiLauncher.hidden = true;
    document.body.classList.add('ai-helper-open');
    if (window.CrackArchive && window.CrackArchive.assistantAvatar) {
      window.CrackArchive.assistantAvatar.wave();
    }
    setTimeout(function () {
      var prompt = document.getElementById('recommendPrompt');
      if (prompt) prompt.focus();
    }, 160);
    if (!greeted && greetEl) {
      greeted = true;
      setTimeout(function () { type(greetEl, '어서 오십셔. 필요한 걸 말해주시면 카탈로그 안에서만 골라오겠슴다.'); }, 260);
    }
  }
  function ownOpen(event) {
    if (event) event.stopImmediatePropagation();
    moaOpen();
  }
  if (openBtn) openBtn.addEventListener('click', ownOpen, true);
  if (aiLauncher) aiLauncher.addEventListener('click', ownOpen, true);
  if (aiDlg) {
    aiDlg.addEventListener('close', function () {
      if (aiLauncher) aiLauncher.hidden = false;
      document.body.classList.remove('ai-helper-open');
      if (window.CrackArchive && window.CrackArchive.assistantAvatar) {
        window.CrackArchive.assistantAvatar.setState('idle');
      }
    });
  }

  /* ── 예시 칩 → 입력창 자동 입력 ── */
  var chips = document.querySelectorAll('.ai-chip');
  for (var k = 0; k < chips.length; k++) {
    (function (c) {
      c.addEventListener('click', function () {
        var t = document.getElementById('recommendPrompt');
        if (t) { t.value = c.textContent; t.focus(); }
      });
    })(chips[k]);
  }
})();
