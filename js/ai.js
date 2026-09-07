/* ============================================================
   Hamnal — 실제 AI 대화 연결 (ai.js)   [v1]
   로드 순서: … features.js → letter-gen.js → ai.js (맨 마지막)
   다른 파일은 수정하지 않습니다. app.js 의 speak() 를 감싸서
   ① AI 응답 시도 → ② 실패/지연 시 기존 시나리오 응답으로 자동 폴백.

   ★ 설정: 아래 AI_ENDPOINT 에 Vercel 배포 주소를 넣으세요.
     비워두면(''), AI 없이 기존 시나리오로만 동작합니다 — 안전.
   ============================================================ */

var AI_ENDPOINT = '';   /* 예: 'https://mangcho-ai.vercel.app/api/chat' */
var AI_TIMEOUT = 9000;  /* ms — 이 시간 안에 응답 없으면 시나리오 폴백 */

var _speakScenario = speak;   /* 기존 시나리오 발화(타이핑 효과 포함) 보존 */

speak = function (arr, lines, i) {
  /* 내부 재귀 호출(i 있음)이나 AI 미설정 시엔 원래 방식 그대로 */
  if (i !== undefined || !AI_ENDPOINT) return _speakScenario(arr, lines, i);

  var who = (typeof roomCharId === 'function' ? roomCharId() : (state.charId || 'melang'));
  var typing = { side: 'other', who: '햄찌', text: '···', at: now(), typing: true };
  arr.push(typing);
  rerenderIfChat();
  if (typeof state !== 'undefined') { var st = document.querySelector('#viewport .chat-status'); }

  var done = false;
  var timer = setTimeout(function () { fail('timeout'); }, AI_TIMEOUT);

  function removeTyping() {
    var idx = arr.indexOf(typing);
    if (idx !== -1) arr.splice(idx, 1);
  }
  function fail(reason) {
    if (done) return; done = true; clearTimeout(timer);
    if (window.console) console.warn('[ai] 폴백(시나리오) 사용:', reason);
    removeTyping();
    _speakScenario(arr, lines);           /* 기존 키워드 응답으로 자연스럽게 */
  }
  function ok(text) {
    if (done) return; done = true; clearTimeout(timer);
    removeTyping();
    /* 문단 단위로 말풍선 분할 (빈 줄 기준, 최대 3개) */
    var parts = String(text).split(/\n+/).map(function (t) { return t.trim(); }).filter(Boolean).slice(0, 3);
    if (!parts.length) return _speakScenario(arr, lines);
    parts.forEach(function (t) { arr.push({ side: 'other', who: '햄찌', text: t, at: now() }); });
    save();
    rerenderIfChat();
    if (window.console) console.log('[ai] 응답 수신 (' + parts.length + '문장)');
  }

  try {
    fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        charId: who,
        hamName: (typeof FEAT !== 'undefined' && who === FEAT.onbCharId) ? FEAT.hamName : '',
        userName: (state.form && state.form.name) || '',
        messages: arr.filter(function (m) { return !m.typing; }).slice(-12)
      })
    }).then(function (r) {
      if (!r.ok) return r.text().then(function (t) { fail('HTTP ' + r.status + ' ' + t.slice(0, 80)); });
      return r.json().then(function (d) { d && d.text ? ok(d.text) : fail('빈 응답'); });
    }).catch(function (e) { fail(e && e.message); });
  } catch (e) { fail(e && e.message); }
};

if (window.console) console.log('[ai] v1 로드됨 — endpoint ' + (AI_ENDPOINT ? '설정됨' : '미설정(시나리오 모드)'));
