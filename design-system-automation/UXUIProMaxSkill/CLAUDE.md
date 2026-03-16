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
    <img class="avatar" src="[dicebear url]" />
    <div class="user-meta">
      <div class="user-name-row">
        <span class="user-name">닉네임</span>
        <span class="user-badge badge-top">TOP 1%</span>  <!-- 옵션 -->
      </div>
      <div class="post-context">N분 전 · 팔로워 X,XXX</div>
    </div>
    <button class="follow-btn">팔로우</button>
  </div>

  <!-- 타이틀 (옵션) -->
  <div class="post-title">제목</div>

  <!-- 본문 -->
  <div class="post-body clamped">본문...</div>
  <button class="more-btn">더 보기</button>

  <!-- 거래 인증 카드 (옵션) -->
  <div class="trade-card">
    <div class="trade-card-top">
      <span class="trade-badge sell">매도</span>
      <span class="trade-coin-name">비트코인 0.029 BTC</span>
      <div class="trade-verified">✓ 업비트 인증</div>
    </div>
    <div class="trade-amount">+₩2,847,000 <span>(+24.3%)</span></div>
    <div class="trade-meta">1코인당 97,420,000원 · 14일 보유</div>
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
- DiceBear `shapes` 스타일 사용 (사람 없는 추상 도형)
- URL 패턴: `https://api.dicebear.com/9.x/shapes/svg?seed=[닉네임영문]&backgroundColor=[hex]`
- CSS: `width/height: 40px`, `border-radius: 999px`, `object-fit: cover`

### 뱃지
- 타이틀은 옵션 → 없어도 자연스럽게 본문으로 이어짐
- 뱃지 아이콘(이모지) 사용 시 복잡해 보임 → 컬러만으로 구분

### 거래 카드
- 매수 수익: `color: #D42B2B` (빨강)
- 매수 손실: `color: #1A3CB5` (파랑)
- 배경: `#F7F8FA`, border-radius: `12px`

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

## ✅ 학습 내용 및 주의사항

### CSS
1. **`env()` fallback**: `env(safe-area-inset-bottom, 20px)`의 fallback은 브라우저가 env()를 아예 모를 때만 적용됨. 데스크톱 Chrome/Safari는 env()를 알지만 값이 0 → `max(env(...), 20px)` 패턴 사용
2. **unicode-range 분기**: 숫자만 다른 폰트 적용 시 범위를 `U+0030-0039`로 좁게 설정. `U+0020-007E`처럼 넓게 잡으면 영문 티커(BTC, ETH)까지 포함됨
3. **`border-bottom` 중복**: 같은 값이 여러 곳에 있으면 `replace_all: false` 시 오류. 더 넓은 컨텍스트로 unique하게 지정
4. **`object-fit: cover`**: `div` → `img` 태그로 바꿀 때 CSS에서 `display: flex` 제거하고 `display: block` + `object-fit: cover` 적용

### UX 디자인
1. **색상 계층**: 동일 계열 색이 너무 많으면 강렬해 보임 → 4단계 명도 분리가 효과적
2. **아이콘 가독성**: 20×20px 소형 영역에서 캔들스틱보다 단순 바차트가 인식률 높음
3. **뱃지 아이콘**: 텍스트 뱃지에 이모지 추가 시 오히려 복잡해 보임 → 컬러로만 구분
4. **타이틀 옵션화**: 커뮤니티 피드에서 타이틀 없는 포스트를 섞으면 더 자연스러운 피드감
5. **레퍼런스 분석**: 작은 변화보다 핵심 패러다임(SNS → 게시판) 전환이 필요할 때는 전면 재작성이 빠름
6. **닉네임 컬러**: 너무 진하면 본문보다 시선을 먼저 끌어 가독성 저하 → `#555555` 권장

### 검증 워크플로우
- 코드 수정 후 반드시: `preview_eval(reload)` → `preview_screenshot` → `preview_inspect` → `preview_console_logs`
- `preview_inspect`는 실제 computed style 확인에 스크린샷보다 정확
- `env()` 등 브라우저 환경 의존 CSS는 inspect로 실제 적용값 반드시 확인
