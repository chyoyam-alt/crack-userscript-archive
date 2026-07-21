(function () {
  'use strict';
  const NS = window.CrackArchive = window.CrackArchive || {};
  let state = 'idle';
  let blinkTimer = null;

  function avatars() { return [...document.querySelectorAll('.assistant-avatar')]; }
  function setState(next = 'idle') {
    state = next;
    avatars().forEach((avatar) => {
      avatar.classList.remove('is-idle', 'is-thinking', 'is-wave', 'is-error');
      avatar.classList.add(`is-${next}`);
    });
    const label = document.getElementById('aiStaffState');
    if (label) label.textContent = {
      idle: label?.dataset.idleText || '확프 추천 도우미',
      thinking: '카탈로그 확인 중…',
      wave: '추천 준비됨',
      error: '연결 상태를 확인하세요' 
    }[next] || label?.dataset.idleText || '확프 추천 도우미';
  }
  function blink() {
    const nodes = avatars();
    nodes.forEach((avatar) => avatar.classList.add('is-blinking'));
    setTimeout(() => {
      nodes.forEach((avatar) => avatar.classList.remove('is-blinking'));
      if (Math.random() < .2) setTimeout(() => {
        nodes.forEach((avatar) => avatar.classList.add('is-blinking'));
        setTimeout(() => nodes.forEach((avatar) => avatar.classList.remove('is-blinking')), 95);
      }, 120);
      scheduleBlink();
    }, 115);
  }
  function scheduleBlink() {
    clearTimeout(blinkTimer);
    blinkTimer = setTimeout(blink, 2800 + Math.random() * 3600);
  }
  function wave() { setState('wave'); setTimeout(() => setState('idle'), 1150); }
  function init() {
    setState('idle'); scheduleBlink();
    document.getElementById('aiLauncherButton')?.addEventListener('mouseenter', wave);
  }
  NS.assistantAvatar = { init, setState, wave, scheduleBlink };
  document.addEventListener('DOMContentLoaded', init, { once: true });
})();