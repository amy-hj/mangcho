/* ============================================================
   Hamnal — 사주팔자 · 대운 · 자미두수 명반 · 대한  (saju.js)
   의존: assets/lib/lunar.js (lunar-javascript, 6tail)
         assets/lib/iztro.min.js (iztro, SylarLong)  ※ 둘 다 파일 동봉
   로드 순서: … app.js → saju.js → features.js
   제공 전역: SAJU.calc(form) / SAJU.ziwei(form) / SAJU.fortune(form, date)
   화면: 'saju'(사주팔자+대운), 'ziwei'(명반+대한)
   ============================================================ */
var SAJU = (function () {
  var GAN_KO = { 甲:'갑',乙:'을',丙:'병',丁:'정',戊:'무',己:'기',庚:'경',辛:'신',壬:'임',癸:'계' };
  var ZHI_KO = { 子:'자',丑:'축',寅:'인',卯:'묘',辰:'진',巳:'사',午:'오',未:'미',申:'신',酉:'유',戌:'술',亥:'해' };
  var SS_KO  = { 比肩:'비견',劫财:'겁재',食神:'식신',伤官:'상관',偏财:'편재',正财:'정재',七杀:'편관',正官:'정관',偏印:'편인',正印:'정인' };
  var WX_KO  = { 木:'목',火:'화',土:'토',金:'금',水:'수' };
  var GAN_WX = { 甲:'木',乙:'木',丙:'火',丁:'火',戊:'土',己:'土',庚:'金',辛:'金',壬:'水',癸:'水' };
  var ZHI_WX = { 子:'水',丑:'土',寅:'木',卯:'木',辰:'土',巳:'火',午:'火',未:'土',申:'金',酉:'金',戌:'土',亥:'水' };
  var GAN_DESC = {
    甲:'큰 나무의 기운 · 곧고 주도적', 乙:'화초의 기운 · 유연하고 감수성이 높음',
    丙:'태양의 기운 · 밝고 표현이 큼',   丁:'촛불의 기운 · 섬세하고 오래 타는 열',
    戊:'큰 산의 기운 · 묵직하고 포용적', 己:'논밭의 기운 · 실속 있고 배려 깊음',
    庚:'원석의 기운 · 결단력과 의리',    辛:'보석의 기운 · 예리하고 완벽 지향',
    壬:'바다의 기운 · 자유롭고 스케일이 큼', 癸:'이슬비의 기운 · 조용하고 깊은 감성'
  };

  function ganKo(g){ return GAN_KO[g] || g; }
  function zhiKo(z){ return ZHI_KO[z] || z; }
  function ganzhiKo(gz){ return ganKo(gz[0]) + zhiKo(gz[1]); }

  /* form: { year, month, day, hour, minute, unknownTime, gender } */
  function toSolar(form) {
    var y = +form.year, m = +form.month, d = +form.day;
    var h = form.unknownTime ? 12 : +form.hour, mi = form.unknownTime ? 0 : +form.minute;
    return Solar.fromYmdHms(y, m, d, h || 0, mi || 0, 0);
  }

  function calc(form) {
    var solar = toSolar(form);
    var ec = solar.getLunar().getEightChar();
    var pillars = [
      { key:'time',  label:'시주', gz: ec.getTime(),  ssGan: ec.getTimeShiShenGan(),  ssZhi: ec.getTimeShiShenZhi(),  hide: !!form.unknownTime },
      { key:'day',   label:'일주', gz: ec.getDay(),   ssGan: '일간',                  ssZhi: ec.getDayShiShenZhi() },
      { key:'month', label:'월주', gz: ec.getMonth(), ssGan: ec.getMonthShiShenGan(), ssZhi: ec.getMonthShiShenZhi() },
      { key:'year',  label:'년주', gz: ec.getYear(),  ssGan: ec.getYearShiShenGan(),  ssZhi: ec.getYearShiShenZhi() }
    ];
    pillars.forEach(function (p) {
      p.gan = p.gz[0]; p.zhi = p.gz[1];
      p.ganKo = ganKo(p.gan); p.zhiKo = zhiKo(p.zhi);
      p.ssGanKo = SS_KO[p.ssGan] || p.ssGan;
      p.ssZhiKo = (p.ssZhi || []).map(function (s) { return SS_KO[s] || s; }).join('·');
    });
    /* 오행 분포 (천간+지지 8글자, 시주 모르면 6글자) */
    var wx = { 木:0, 火:0, 土:0, 金:0, 水:0 };
    pillars.forEach(function (p) { if (p.hide) return; wx[GAN_WX[p.gan]]++; wx[ZHI_WX[p.zhi]]++; });
    /* 대운 */
    var male = /남/.test(form.gender || '');
    var yun = ec.getYun(male ? 1 : 0);
    var daYun = yun.getDaYun().slice(1, 9).map(function (d) {
      return { gz: d.getGanZhi(), gzKo: ganzhiKo(d.getGanZhi()), startAge: d.getStartAge(), endAge: d.getEndAge(), startYear: d.getStartYear() };
    });
    var nowYear = new Date().getFullYear();
    daYun.forEach(function (d) { d.current = nowYear >= d.startYear && nowYear < d.startYear + 10; });
    return {
      pillars: pillars, dayGan: ec.getDayGan(), dayGanKo: ganKo(ec.getDayGan()),
      dayGanDesc: GAN_DESC[ec.getDayGan()] || '', wx: wx, wxKo: WX_KO,
      yunStart: yun.getStartYear() + '년 ' + yun.getStartMonth() + '개월 후', daYun: daYun,
      solar: solar
    };
  }

  /* 자미두수 (iztro) */
  function timeIndex(form) {
    if (form.unknownTime) return 6; /* 시간 모름 → 午時 기준(정오) */
    var h = +form.hour || 0;
    return Math.floor((h + 1) / 2) % 12;
  }
  function ziwei(form) {
    var dateStr = (+form.year) + '-' + (+form.month) + '-' + (+form.day);
    var gender = /남/.test(form.gender || '') ? '男' : '女';
    return iztro.astro.bySolar(dateStr, timeIndex(form), gender, true, 'ko-KR');
  }

  /* ---------- 오늘의 운세: 일간 × 오늘 일진 → 십성 ---------- */
  var FORTUNE_BY_SS = {
    비견: { base: 72, quote: '“오늘은 내 편을 만드는 날이에요.”', body: ['나와 닮은 기운이 들어와 자기 확신이 강해지는 날이에요.', '경쟁보다 협력을 택하면 오히려 내 자리가 단단해져요.', '고집이 세질 수 있으니 한 번은 양보해보세요.'] },
    겁재: { base: 58, quote: '“지갑과 감정, 둘 다 단속하세요.”', body: ['에너지가 넘치지만 밖으로 새기 쉬운 날이에요.', '충동 지출과 즉흥 약속을 조심하면 무난히 지나가요.', '누군가의 부탁엔 하루만 미뤄 답하세요.'] },
    식신: { base: 84, quote: '“하고 싶은 말을 꺼내기 좋은 날.”', body: ['표현의 기운이 들어와 말과 글이 술술 풀려요.', '미뤄둔 제안, 오늘 꺼내면 반응이 좋아요.', '맛있는 걸 먹으면 운이 더 붙는 날이에요.'] },
    상관: { base: 66, quote: '“날카로운 통찰, 부드럽게 전하세요.”', body: ['평소보다 눈이 날카로워지는 날이에요.', '틀린 걸 짚어내는 힘이 강해지니, 말투만 한 톤 낮추세요.', '창의적인 작업엔 최고의 날이에요.'] },
    편재: { base: 78, quote: '“움직이는 만큼 들어와요.”', body: ['활동적으로 움직일수록 기회가 붙는 날이에요.', '뜻밖의 소식이나 소소한 이득이 생길 수 있어요.', '큰돈 결정만 오늘은 보류하세요.'] },
    정재: { base: 80, quote: '“차곡차곡, 오늘의 성실이 쌓여요.”', body: ['꾸준함이 보상받는 안정적인 날이에요.', '루틴을 지키고 할 일을 마무리하기 좋아요.', '새 시도보다 정리와 점검에 운이 있어요.'] },
    편관: { base: 55, quote: '“압박은 오늘의 날씨일 뿐이에요.”', body: ['눌리는 기운이 들어와 부담이 커질 수 있는 날이에요.', '상사·마감·평가가 유독 크게 느껴져도 나를 탓하지 마세요.', '일찍 눕는 것이 오늘 최고의 개운법이에요.'] },
    정관: { base: 76, quote: '“규칙 안에서 빛나는 날.”', body: ['책임감이 인정받는 날이에요.', '공식적인 자리, 보고, 약속이 잘 풀려요.', '원칙대로 하면 손해 볼 일이 없어요.'] },
    편인: { base: 62, quote: '“생각이 많아지는 날, 기록으로 풀어요.”', body: ['머릿속이 바빠지고 직감이 예민해지는 날이에요.', '혼자만의 시간이 필요하니 억지로 사람을 만나지 마세요.', '떠오른 생각은 적어두면 나중에 재료가 돼요.'] },
    정인: { base: 82, quote: '“배우고 받아들이기 좋은 날.”', body: ['도움과 조언이 자연스럽게 들어오는 날이에요.', '공부, 상담, 문서 정리에 운이 있어요.', '칭찬을 받으면 튕기지 말고 그냥 받으세요.'] }
  };
  var LUCKY_COLOR = { 木:'초록', 火:'빨강', 土:'노랑', 金:'하양', 水:'파랑' };
  var LUCKY_FOOD  = { 木:'샐러드', 火:'마라탕', 土:'감자전', 金:'흰죽', 水:'물회' };
  var LUCKY_ITEM  = { 木:'화분', 火:'양초', 土:'머그컵', 金:'반지', 水:'텀블러' };
  var LUCKY_NUM   = { 木:'3, 8', 火:'2, 7', 土:'5, 10', 金:'4, 9', 水:'1, 6' };

  function fortune(form, date) {
    date = date || new Date();
    var natal = calc(form);
    var today = Solar.fromYmd(date.getFullYear(), date.getMonth() + 1, date.getDate()).getLunar();
    var todayGan = today.getDayGan(), todayZhi = today.getDayZhi();
    /* 오늘 일간이 내 일간에 대해 갖는 십성 (lunar 내장 계산) */
    var ssTable = { 甲:0, 乙:1, 丙:2, 丁:3, 戊:4, 己:5, 庚:6, 辛:7, 壬:8, 癸:9 };
    /* 십성은 오행 생극 + 음양으로 정해지므로 라이브러리 내장 십성표를 사용 */
    var ss = SS_KO[LunarUtil.SHI_SHEN[natal.dayGan + todayGan]] || '비견';
    var f = FORTUNE_BY_SS[ss];
    /* 날짜 기반 결정론적 변동 (-7 ~ +7) */
    var seed = (date.getFullYear() * 372 + (date.getMonth() + 1) * 31 + date.getDate()) * 7 + ssTable[natal.dayGan];
    var jitter = (seed % 15) - 7;
    var score = Math.max(40, Math.min(98, f.base + jitter));
    var wx = ZHI_WX[todayZhi] || '土';
    return {
      ss: ss, dayGanKo: natal.dayGanKo, todayGz: ganzhiKo(todayGan + todayZhi),
      scoreLabel: '오늘의 운세 점수', score: score + '점', quote: f.quote, body: f.body,
      summaryLabel: '오늘의 행운',
      items: [['행운의 색', LUCKY_COLOR[wx]], ['행운의 숫자', LUCKY_NUM[wx]], ['추천 아이템', LUCKY_ITEM[wx]], ['추천 음식', LUCKY_FOOD[wx]]]
    };
  }

  return { calc: calc, ziwei: ziwei, fortune: fortune, ganzhiKo: ganzhiKo, ganKo: ganKo, zhiKo: zhiKo };
})();

/* ============================================================
   화면: 사주팔자 + 대운
   ============================================================ */
function sajuForm() {
  /* 온보딩/마이에서 입력 중인 state.form 이 항상 최신 → 우선. 없으면 저장본, 그다음 기본값 */
  if (typeof state !== 'undefined' && state.form && +state.form.year) return state.form;
  if (typeof FEAT !== 'undefined' && FEAT.form && +FEAT.form.year) return FEAT.form;
  return PROFILE_FORM;
}
function sajuFormError(f) {
  var y = +f.year, m = +f.month, d = +f.day;
  if (!(y >= 1900 && y <= 2100)) return '태어난 해가 비어 있거나 잘못됐어요 (' + (f.year || '없음') + ')';
  if (!(m >= 1 && m <= 12)) return '태어난 달이 잘못됐어요 (' + (f.month || '없음') + ')';
  if (!(d >= 1 && d <= 31)) return '태어난 날이 잘못됐어요 (' + (f.day || '없음') + ')';
  return '';
}
function sajuErrScreen(msg) {
  return '<div class="screen screen--paper">' + statusBar() + subBar('my', '내 명반') +
    '<div class="sj-err"><p>' + esc(msg) + '</p><button class="gray-btn sj-err-btn" data-go="my-edit">회원정보 수정하기</button></div></div>';
}

function scSaju(state) {
  var f = sajuForm(), r, err = sajuFormError(f);
  if (err) return sajuErrScreen(err);
  try { r = SAJU.calc(f); } catch (e) { return sajuErrScreen('사주 계산 오류: ' + (e && e.message ? e.message : e)); }

  var cols = r.pillars.map(function (p) {
    if (p.hide) return '<div class="sj-col sj-col--hide"><span class="sj-lbl">' + p.label + '</span><span class="sj-unknown">시간<br>모름</span></div>';
    return '<div class="sj-col' + (p.key === 'day' ? ' sj-col--day' : '') + '">' +
      '<span class="sj-lbl">' + p.label + '</span>' +
      '<span class="sj-ss">' + esc(p.ssGanKo) + '</span>' +
      '<span class="sj-gan sj-wx-' + WXCLASS(p.gan) + '">' + p.gan + '<small>' + p.ganKo + '</small></span>' +
      '<span class="sj-zhi sj-wx-' + WXCLASS(p.zhi) + '">' + p.zhi + '<small>' + p.zhiKo + '</small></span>' +
      '<span class="sj-ss sj-ss--zhi">' + esc(p.ssZhiKo) + '</span>' +
    '</div>';
  }).join('');

  var wxBars = Object.keys(r.wx).map(function (k) {
    return '<div class="sj-wx-row"><span class="sj-wx-k sj-wx-' + WXCLASS(k) + '">' + k + ' ' + r.wxKo[k] + '</span>' +
      '<span class="sj-wx-bar"><i style="width:' + (r.wx[k] * 12.5) + '%"></i></span><span class="sj-wx-n">' + r.wx[k] + '</span></div>';
  }).join('');

  var dy = r.daYun.map(function (d) {
    return '<div class="sj-dy' + (d.current ? ' on' : '') + '">' +
      '<span class="sj-dy-age">' + d.startAge + '세</span>' +
      '<span class="sj-dy-gz">' + d.gz + '</span>' +
      '<span class="sj-dy-ko">' + d.gzKo + '</span>' +
      '<span class="sj-dy-yr">' + d.startYear + '</span>' +
    '</div>';
  }).join('');

  return '' +
    '<div class="screen screen--paper">' + statusBar() + subBar('my', '내 명반') +
      '<div class="sj-tabs"><button class="sj-tab on" data-go="saju">사주팔자</button><button class="sj-tab" data-go="ziwei">자미두수</button></div>' +
      '<div class="sj-body">' +
        '<div class="my-card sj-card">' +
          '<p class="card-title">나의 사주 원국</p>' +
          '<div class="sj-grid">' + cols + '</div>' +
          '<p class="sj-daygan">일간 <b>' + r.dayGan + '(' + r.dayGanKo + ')</b> — ' + esc(r.dayGanDesc) + '</p>' +
        '</div>' +
        '<div class="my-card sj-card">' +
          '<p class="card-title">오행 분포</p>' + wxBars +
        '</div>' +
        '<div class="my-card sj-card">' +
          '<p class="card-title">대운 <span class="sj-sub">' + esc(r.yunStart) + ' 시작 · 10년 주기</span></p>' +
          '<div class="sj-dy-row">' + dy + '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
}
function WXCLASS(ch) {
  var m = { 甲:'wood',乙:'wood',寅:'wood',卯:'wood', 丙:'fire',丁:'fire',巳:'fire',午:'fire', 戊:'earth',己:'earth',丑:'earth',辰:'earth',未:'earth',戌:'earth', 庚:'metal',辛:'metal',申:'metal',酉:'metal', 壬:'water',癸:'water',子:'water',亥:'water', 木:'wood',火:'fire',土:'earth',金:'metal',水:'water' };
  return m[ch] || 'earth';
}

/* ============================================================
   화면: 자미두수 명반 + 대한 (12궁 4×4 배치, 가운데 기본정보)
   ============================================================ */
var ZW_LAYOUT = [ /* 표준 배치: 지지별 격자 위치 [행, 열] */
  ['사',0,0],['오',0,1],['미',0,2],['신',0,3],
  ['진',1,0],                         ['유',1,3],
  ['묘',2,0],                         ['술',2,3],
  ['인',3,0],['축',3,1],['자',3,2],['해',3,3]
];

function scZiwei(state) {
  var f = sajuForm(), a, err = sajuFormError(f);
  if (err) return sajuErrScreen(err);
  try { a = SAJU.ziwei(f); } catch (e) { return sajuErrScreen('명반 계산 오류: ' + (e && e.message ? e.message : e)); }

  var nowYear = new Date().getFullYear();
  var age = nowYear - (+f.year) + 1; /* 세는 나이 */
  var byBranch = {};
  a.palaces.forEach(function (p) { byBranch[p.earthlyBranch] = p; });

  function starHtml(s, cls) {
    var mut = s.mutagen ? '<i class="zw-mut zw-mut--' + esc(s.mutagen) + '">' + esc(s.mutagen) + '</i>' : '';
    var BR = { '[+3]':'묘', '[+2]':'왕', '[+1]':'득', '[0]':'이', '[-1]':'평', '[-2]':'불', '[-3]':'함' };
    var br  = s.brightness ? '<u>' + esc(BR[s.brightness] || s.brightness) + '</u>' : '';
    return '<span class="zw-star ' + cls + '">' + esc(s.name) + br + mut + '</span>';
  }

  var cells = [];
  for (var r = 0; r < 4; r++) for (var c = 0; c < 4; c++) cells.push(null);
  ZW_LAYOUT.forEach(function (L) {
    var p = byBranch[L[0]];
    if (!p) return;
    var isCur = p.decadal && age >= p.decadal.range[0] && age <= p.decadal.range[1];
    cells[L[1] * 4 + L[2]] =
      '<div class="zw-cell' + (p.name === '명궁' ? ' zw-cell--ming' : '') + (p.isBodyPalace ? ' zw-cell--body' : '') + (isCur ? ' zw-cell--cur' : '') + '">' +
        '<div class="zw-major">' + p.majorStars.map(function (s) { return starHtml(s, 'zw-star--major'); }).join('') + '</div>' +
        '<div class="zw-minor">' + p.minorStars.map(function (s) { return starHtml(s, 'zw-star--minor'); }).join('') + '</div>' +
        '<div class="zw-adj">' + p.adjectiveStars.map(function (s) { return starHtml(s, 'zw-star--adj'); }).join('') + '</div>' +
        '<div class="zw-foot">' +
          '<span class="zw-name">' + esc(p.name) + (p.isBodyPalace ? '<em>·신궁</em>' : '') + '</span>' +
          '<span class="zw-gz">' + esc(p.heavenlyStem + p.earthlyBranch) + '</span>' +
          '<span class="zw-dec">' + (p.decadal ? p.decadal.range[0] + '~' + p.decadal.range[1] : '') + '</span>' +
        '</div>' +
      '</div>';
  });
  var center = '<div class="zw-center">' +
    '<p class="zw-c-title">' + esc(f.name || '') + ' 명반</p>' +
    '<p>' + esc(a.solarDate) + ' · ' + esc(a.chineseDate) + '</p>' +
    '<p>' + esc(a.fiveElementsClass) + ' · 명주 ' + esc(a.soul) + ' · 신주 ' + esc(a.body) + '</p>' +
    '<p class="zw-c-note">굵은 테두리 = 명궁 · 노란 배경 = 현재 대한(' + age + '세)</p>' +
  '</div>';
  var grid = '';
  for (var i = 0; i < 16; i++) {
    if (i === 5) grid += center; /* 가운데 2×2 병합 위치 */
    if (i === 6 || i === 9 || i === 10) continue;
    if (cells[i]) grid += cells[i];
  }

  return '' +
    '<div class="screen screen--paper">' + statusBar() + subBar('my', '내 명반') +
      '<div class="sj-tabs"><button class="sj-tab" data-go="saju">사주팔자</button><button class="sj-tab on" data-go="ziwei">자미두수</button></div>' +
      '<div class="zw-wrap"><div class="zw-grid">' + grid + '</div>' +
      '<p class="zw-legend">사화: <i class="zw-mut zw-mut--록">록</i><i class="zw-mut zw-mut--권">권</i><i class="zw-mut zw-mut--과">과</i><i class="zw-mut zw-mut--기">기</i> · 주성/<small>보조성</small>/<small class="dim">잡성</small></p></div>' +
    '</div>';
}

SCREENS['saju']  = scSaju;
SCREENS['ziwei'] = scZiwei;
SCREEN_INDEX.push(
  { id: 'saju',  cat: '명반', label: '사주팔자 · 대운' },
  { id: 'ziwei', cat: '명반', label: '자미두수 · 대한' }
);
