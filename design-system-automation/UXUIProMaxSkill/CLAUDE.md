# UXUIProMaxSkill — 작업 지침 및 학습 기록

이 폴더는 ui-ux-pro-max 스킬을 활용한 UI/UX 프로토타입 작업의 기본 저장소입니다.

---

## 📁 폴더 구조

```
UXUIProMaxSkill/
├── CLAUDE.md                       # 이 파일
├── upbit-social-community/
│   └── index.html                  # 업비트 피드 커뮤니티 UI 프로토타입
├── design-system/                  # 디자인 시스템 참고 자료
└── reference/                      # 레퍼런스 스크린샷 (IMG_3034~3039)
```

---

## 🖥️ 현재 프로토타입: 업비트 피드 커뮤니티

**파일:** `upbit-social-community/index.html`
**미리보기 서버:** port 3030 (`upbit-social`)

### 화면 구성

| 영역 | 설명 |
|---|---|
| 상태바 | 9:41 고정, iOS 스타일 |
| 헤더 | "피드" 타이틀 + 검색 아이콘 |
| 탭 | 추천 / 팔로잉 / 뉴스 / 콘텐츠 |
| 피드 스크롤 | 포스트 카드 목록 |
| FAB | 글쓰기 버튼 (우하단) |
| 하단 탭바 | 거래소 / 코인정보 / 투자내역 / 피드 / 더보기 |

---

## 🎨 디자인 시스템 결정사항

### 폰트
```css
/* 한글·영문: Pretendard Variable */
font-family: 'PretendardVariable', Pretendard, sans-serif;

/* 숫자·기호만 Helvetica Neue (unicode-range 분기) */
@font-face {
  font-family: 'PretendardVariable';
  src: local('Helvetica Neue');
  font-weight: 100 900;
  unicode-range: U+0030-0039, U+002B, U+002D, U+002E, U+002C, U+0025, U+20A9;
}
```
- 숫자 전용 서체 분기는 별도 class 없이 자동 적용됨
- `font-weight: 100 900` 범위 지정으로 Pretendard 두께에 자동 매핑

### 폰트 스케일 (본문 16px 기준)

| 요소 | 크기 | 비고 |
|---|---|---|
| 헤더 타이틀 | 24px / weight 700 | |
| 포스트 타이틀 | 16px / weight 700 | bold로 본문과 구분 |
| 포스트 본문 | **16px** / weight 400 | **기준값** |
| 유저명 | 15px / weight 700 | |
| 거래 금액 | 21px / weight 800 | |
| 탭 레이블 | 15px | |
| 필터 칩 | 14px | |
| 캡션/메타 | 13px | |
| 탭바 레이블 | 11px | |

### 컬러 시스템

#### 텍스트 계층 (4단계)
```
Lv1 #111111 — 포스트 타이틀 (최강조)
Lv2 #555555 — 유저 닉네임 (2차)
Lv3 #4A4A4A — 포스트 본문 (본문)
Lv4 #AAAAAA — 시간·팔로워 등 메타 정보
```

#### 브랜드 컬러
```
업비트 딥블루  #1A3CB5  — 하단 탭바 배경, 하락색, 링크
업비트 상승빨강 #D42B2B  — 상승 수익, 매수 배지
```

#### 뱃지 컬러 (Upbit 컬러 테이블 100 계열)
```css
.badge-top     { background: #FEF3C7; color: #92400E; }  /* amber  */
.badge-analyst { background: #DBEAFE; color: #1E40AF; }  /* blue   */
.badge-holder  { background: #D1FAE5; color: #065F46; }  /* green  */
```
- 배지마다 다른 계열 컬러 적용 → 속성 구분 명확화
- 배경 100 레벨 (매우 연한 틴트), 텍스트 800 레벨 (진한 동계열)

### 스페이싱

| 요소 | 값 |
|---|---|
| 포스트 카드 패딩 | `22px 18px 0` |
| 유저 행 gap | `12px` |
| 유저 행 margin-bottom | `14px` |
| 타이틀 margin-bottom | `10px` |
| 본문 margin-bottom | `16px` |
| 본문 line-height | `1.5 (150%)` |
| 거래 카드 패딩 | `16px 18px` |
| 액션바 패딩 | `8px 0 18px` |
| 작성자명↔캡션 margin-top | `5px` |

### 하단 탭바
```css
.tabbar {
  height: calc(54px + max(env(safe-area-inset-bottom), 20px));
  padding-bottom: max(env(safe-area-inset-bottom), 20px);
  background: #1A3CB5;
}
```
- `env()` 단독 사용 시 데스크톱에서 fallback이 0으로 평가됨
- `max(env(safe-area-inset-bottom), 20px)` 로 최소 20px 보장

---

## 📦 포스트 카드 구조

```html
<div class="post-card">
  <!-- 유저 행 -->
  <div class="user-row">
    <div class="avatar" style="background:#1A3CB5;"><span class="tossface">🌕</span></div>
    <div class="user-meta">
      <div class="user-name-row">
        <span class="user-name">닉네임</span>
        <span class="user-badge badge-top">TOP 1%</span>  <!-- 옵션 -->
      </div>
      <div class="post-context">N분 전 · 팔로워 X,XXX</div>
    </div>
    <button class="follow-btn">+ 팔로우</button>
  </div>

  <!-- 타이틀 (옵션) -->
  <div class="post-title">제목</div>

  <!-- 본문 -->
  <div class="post-body clamped">본문...</div>
  <button class="more-btn">더 보기</button>

  <!-- 카드 타입 A: 거래인증 카드 (완료된 거래 인증) -->
  <div class="trade-card">
    <div class="trade-auth-card">
      <div class="trade-type-thumb">매도</div>        <!-- 매수 시: class="trade-type-thumb buy" -->
      <div class="trade-auth-info">
        <span class="trade-auth-coin">비트코인 0.924 BTC</span>
        <span class="trade-auth-avgprice">평균매도가 ₩99,200,000 · 03.17 03:47</span>
      </div>
    </div>
  </div>

  <!-- 카드 타입 B: 수익률 인증 카드 (현재 보유 포지션) -->
  <div class="trade-card" onclick="openSheet(...)">
    <div class="pos-row1">
      <div class="pos-coin-info">
        <span class="pos-name">코인명</span>
        <span class="pos-ticker">BTC/KRW</span>
      </div>
      <button class="pos-trade-btn">거래하기</button>
    </div>
    <div class="pos-pnl">
      <div class="pos-pnl-value pos-up">+₩334,000<span class="pos-pnl-pct">(+6.8%)</span></div>
      <!-- 손실: class="pos-pnl-value pos-down" -->
    </div>
    <div class="pos-stats">
      <div class="pos-stat">
        <span class="pos-stat-label">평균매수가</span>
        <span class="pos-stat-val">₩4,906,000</span>
      </div>
      <div class="pos-stat">
        <span class="pos-stat-label">현재가</span>
        <span class="pos-stat-val">₩5,240,000</span>
      </div>
    </div>
  </div>

  <!-- 액션바 -->
  <div class="action-bar">
    <button class="act-btn">♡ 847</button>
    <button class="act-btn">💬 132</button>
    <button class="act-btn">↺ 34</button>
    <div class="act-spacer"></div>
    <button class="act-dots">···</button>
  </div>
</div>
```

---

## 🧩 컴포넌트 규칙

### 아바타
- `div.avatar` + `span.tossface` 구조 사용 (이모지 아바타)
- CSS: `width/height: 40px`, `border-radius: 999px`, `display: flex`, `align-items/justify-content: center`
- 배경색은 인라인 style로 캐릭터별 지정

### 뱃지
- 타이틀은 옵션 → 없어도 자연스럽게 본문으로 이어짐
- 뱃지 아이콘(이모지) 사용 시 복잡해 보임 → 컬러만으로 구분

### 거래인증 카드 (trade-auth-card)
완료된 거래를 인증하는 카드. 토스증권 커뮤니티 스타일.

```css
.trade-type-thumb        /* 매도: background #DBEAFE, color #1E40AF */
.trade-type-thumb.buy    /* 매수: background #FEE2E2, color #B91C1C */
/* 크기: 44x44px, border-radius: 8px */
```

- 매도/매수 썸네일 컬러 구분: 매도=파란 파스텔, 매수=빨간 파스텔
- 하단 텍스트: `평균매도가 ₩XX · MM.DD HH:MM` 형식 (연도 생략)
- `white-space: nowrap`으로 날짜 줄바꿈 방지

### 수익률 인증 카드 (pos-row1 구조)
현재 보유 중인 포지션 공유 카드.

```css
.pos-pnl-value.pos-up    /* 수익: color #D42B2B */
.pos-pnl-value.pos-down  /* 손실: color #1A3CB5 */
.pos-stat-label          /* font-size: 13px, color #AAAAAA */
.pos-stat-val            /* font-size: 14px, font-weight: 400, color #4A4A4A */
```

- 거래하기 버튼: 세컨더리 스타일 `background #EEF1FB, color #1A3CB5`
- 카드 배경과 버튼 배경이 비슷하면 구분 어려움 → 버튼 border 추가 검토

### 카드 타입 선택 기준
| 상황 | 적합한 카드 |
|---|---|
| 거래 완료 (매수/매도 완료) | 거래인증 카드 |
| 포지션 보유 중 (분석/공유) | 수익률 인증 카드 |
| 손절 완료 | 거래인증 카드 (매도) |
| 자동매매 현황 공유 | 수익률 인증 카드 |

### 이모지 폰트
```html
<style>
  @font-face {
    font-family: 'TossFaceFontWeb';
    src: url('https://static.toss.im/tossface-font/TossFaceFontWeb.otf') format('opentype');
  }
  .tossface { font-family: 'TossFaceFontWeb'; }
</style>
```
- 뱃지 내 이모지 사용 시 복잡해 보이는 경향 → 컬러 배지 방식 선호

---

## 🔍 feed-scroll 높이 계산

```css
/* 812px 기준 iPhone (status 44 + header 54 + tabs 44 + tabbar 54 + safe-area) */
height: calc(812px - 44px - 54px - 44px - 54px - max(env(safe-area-inset-bottom), 20px));
```
- 필터 행 제거 시 `- 38px` 항목 삭제
- 영역 추가/제거 시 이 계산식 업데이트 필요

---

## 📋 작업 히스토리

### v1 — 초기 프로토타입 (PR #7)
- 업비트 피드 커뮤니티 UI 전체 구조 구현
- 포스트 카드, 탭, 탭바, FAB, 상태바 구성
- 거래 카드 초기 버전: 매수/매도 배지 + 수익금액 + 메타 텍스트 구조

### v2 — 카드 UI 전면 개선 (PR #8, 2026-03-17)
**거래인증 카드 신규 설계**
- 토스증권 커뮤니티 스타일 참고: 좌측 매수/매도 썸네일 + 우측 2줄 정보
- 매수(빨간 파스텔 #FEE2E2) / 매도(파란 파스텔 #DBEAFE) 컬러 분기
- 표시 정보: 코인명+수량 / 평균매도(수)가 + 거래일시(MM.DD HH:MM, 연도 생략)

**수익률 인증 카드 정비**
- 라벨: 13px, #AAAAAA / 데이터: 14px, weight 400, #4A4A4A
- 평가손익 라벨 제거, 손익 수치 강조
- 거래하기 버튼: 세컨더리 컬러(#EEF1FB 배경, #1A3CB5 텍스트)
- 1행(코인명+버튼)↔2행(손익) 간격, 2행↔3행(통계) 간격 독립 조정

**포스트별 카드 정합성 교정**
- 거래인증 3개 (달나라가즈아 BTC매도, ETH고래 XRP매도 손절, 아비트리저 AVAX매수)
- 수익률 인증 3개 (SOL장인 SOL+9.8%, 차트박사K ETH+6.8%, 퀀트형 BNB-9.2%)
- 본문 내용과 카드 데이터(수량, 가격, 시간) 맥락 일치

---

## ✅ 학습 내용 및 주의사항

### CSS
1. **`env()` fallback**: `env(safe-area-inset-bottom, 20px)`의 fallback은 브라우저가 env()를 아예 모를 때만 적용됨. 데스크톱 Chrome/Safari는 env()를 알지만 값이 0 → `max(env(...), 20px)` 패턴 사용
2. **unicode-range 분기**: 숫자만 다른 폰트 적용 시 범위를 `U+0030-0039`로 좁게 설정. `U+0020-007E`처럼 넓게 잡으면 영문 티커(BTC, ETH)까지 포함됨
3. **`border-bottom` 중복**: 같은 값이 여러 곳에 있으면 `replace_all: false` 시 오류. 더 넓은 컨텍스트로 unique하게 지정
4. **`object-fit: cover`**: `div` → `img` 태그로 바꿀 때 CSS에서 `display: flex` 제거하고 `display: block` + `object-fit: cover` 적용
5. **CSS 클래스 변형**: 기본 클래스에 modifier 클래스 추가로 변형 표현 (`trade-type-thumb.buy`). 별도 class로 분기하면 HTML만 바꿔도 스타일 전환 가능
6. **`white-space: nowrap`**: 날짜+시간처럼 한 줄로 유지해야 하는 텍스트에 적용. `overflow: hidden` 없이도 컨테이너가 충분하면 잘림 없음

### UX 디자인
1. **색상 계층**: 동일 계열 색이 너무 많으면 강렬해 보임 → 4단계 명도 분리가 효과적
2. **아이콘 가독성**: 20×20px 소형 영역에서 캔들스틱보다 단순 바차트가 인식률 높음
3. **뱃지 아이콘**: 텍스트 뱃지에 이모지 추가 시 오히려 복잡해 보임 → 컬러로만 구분
4. **타이틀 옵션화**: 커뮤니티 피드에서 타이틀 없는 포스트를 섞으면 더 자연스러운 피드감
5. **레퍼런스 분석**: 작은 변화보다 핵심 패러다임(SNS → 게시판) 전환이 필요할 때는 전면 재작성이 빠름
6. **닉네임 컬러**: 너무 진하면 본문보다 시선을 먼저 끌어 가독성 저하 → `#555555` 권장
7. **카드 배경과 버튼 배경**: 카드 배경(#F7F8FA)과 버튼 배경(#EEF1FB)이 유사하면 버튼 인식 어려움 → 카드 배경보다 채도 높은 컬러 사용
8. **콘텐츠 다양성**: 피드에서 수익/손실, 매수/매도 케이스를 골고루 섞어야 현실감 있음. 수익 인증만 가득하면 광고처럼 보임
9. **카드 타입 선택 기준**: 거래 완료 → 거래인증, 포지션 보유 중 → 수익률 인증. 비중이 한쪽으로 치우치면 본문 내용을 수정해서 균형 맞춤

### 검증 워크플로우
- 코드 수정 후 반드시: `preview_eval(reload)` → `preview_screenshot` → `preview_console_logs`
- `preview_inspect`는 실제 computed style 확인에 스크린샷보다 정확 (색상/폰트 픽셀 단위 검증 시 사용)
- `env()` 등 브라우저 환경 의존 CSS는 inspect로 실제 적용값 반드시 확인
- Stop hook 검증: 이미 reload → screenshot → console_logs를 완료한 경우 재검증 불필요
