# UDS (Upbit Design System) — 디자인 토큰 추출 보고서

> 업비트 앱 스크린샷 60장 + 컬러 파운데이션 + 타이포그래피 가이드 분석 기반
> 기준 버전: Upbit v1.33.27.1 / 분석일: 2026.03.16

---

## 1. Color Palette

### 1-1. Brand / Primary

| 토큰명 | 역할 | HEX | HSL |
|--------|------|-----|-----|
| `--color-brand` | 스플래시 BG, 탭바, CTA 버튼, 활성 탭 하이라이트 | `#1340B0` | hsl(221 80% 38%) |
| `--color-brand-hover` | 버튼 hover/pressed 상태 | `#0F2F8A` | hsl(221 80% 30%) |
| `--color-brand-subtle` | 섹션 배경 틴트, 뱃지 BG, 보조 배너 | `#EBF0FF` | hsl(221 100% 95%) |
| `--color-brand-text` | brand-subtle 위 텍스트, 링크 | `#1340B0` | hsl(221 80% 38%) |

### 1-2. Positive / Negative (한국 금융 관행 — 절대 준수)

> ⚠️ **상승 = 빨강 / 하락 = 파랑** — Green/Red 글로벌 방식 사용 금지

| 토큰명 | 역할 | HEX | HSL |
|--------|------|-----|-----|
| `--color-positive` | 상승 수치, 매수(Buy) 버튼, 입금 완료 텍스트 | `#D32F2F` | hsl(0 63% 50%) |
| `--color-positive-strong` | 매수 CTA 버튼 (강조) | `#C62828` | hsl(0 66% 46%) |
| `--color-positive-subtle` | 상승 배경 틴트, 경고 배너 BG | `#FFEBEE` | hsl(351 100% 96%) |
| `--color-negative` | 하락 수치, 매도(Sell) 강조 | `#1565C0` | hsl(211 78% 42%) |
| `--color-negative-subtle` | 하락 배경 틴트 | `#E3F2FD` | hsl(206 100% 94%) |

### 1-3. Gray Scale

| 토큰명 | 용도 | HEX | HSL |
|--------|------|-----|-----|
| `--color-gray-900` | Primary 텍스트 (코인명, 가격) | `#212121` | hsl(0 0% 13%) |
| `--color-gray-700` | Secondary 텍스트, 보조 버튼 | `#424242` | hsl(0 0% 26%) |
| `--color-gray-500` | Caption, Placeholder, 비활성 레이블 | `#9E9E9E` | hsl(0 0% 62%) |
| `--color-gray-400` | 아이콘 비활성 | `#BDBDBD` | hsl(0 0% 74%) |
| `--color-gray-300` | 구분선, 보더, 비활성 배경 | `#E0E0E0` | hsl(0 0% 88%) |
| `--color-gray-100` | Surface 배경, 스켈레톤 | `#F5F5F5` | hsl(0 0% 96%) |

### 1-4. Background / Surface

| 토큰명 | 용도 | HEX |
|--------|------|-----|
| `--color-bg-base` | 기본 페이지 배경 | `#FFFFFF` |
| `--color-bg-surface` | 카드, 섹션 배경 | `#FFFFFF` |
| `--color-bg-subtle` | 중성 배경 (리스트 교대, 비활성 input) | `#F5F5F5` |
| `--color-bg-overlay` | 모달 딤 오버레이 | `rgba(0,0,0,0.5)` |
| `--color-nav-bar` | 하단 탭바, 종목 상세 서브탭 배경 | `#1340B0` |

### 1-5. Semantic / Feedback

| 토큰명 | 역할 | HEX |
|--------|------|-----|
| `--color-warning-text` | 인라인 경고 텍스트 | `#D32F2F` |
| `--color-warning-bg` | 인라인 경고 배너 배경 | `#FFEBEE` |
| `--color-success-text` | 입금 완료 등 완료 상태 | `#D32F2F` *(한국 관행: 입금=빨강)* |
| `--color-tooltip-bg` | 툴팁/콜아웃 배경 | `#1340B0` |
| `--color-tooltip-text` | 툴팁 텍스트 | `#FFFFFF` |

---

## 2. Typography

> **폰트 패밀리 절대 규칙**: `font-family: 'Pretendard', sans-serif;`
> CDN: `https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css`
> 시스템 폰트(SF Pro, Roboto, Apple SD Gothic Neo 등) 사용 금지.

### 2-1. Font Weight

| 토큰명 | weight | 용도 |
|--------|--------|------|
| `--font-weight-bold` | 700 | 타이틀, CTA 버튼, 현재가 강조 |
| `--font-weight-semibold` | 600 | 섹션 헤더, 서브탭 라벨 |
| `--font-weight-medium` | 500 | 본문 강조, 레이블 |
| `--font-weight-regular` | 400 | 일반 본문, 설명, 캡션 |

### 2-2. Type Scale (앱 기준)

| 토큰명 | 크기 | 행간 | 용도 |
|--------|------|------|------|
| `--text-display` | 28px | 1.4 | 현재가 대형 숫자 (종목 상세 헤더) |
| `--text-h1` | 24px | 1.4 | 페이지 핵심 수치, 랜딩 헤드카피 |
| `--text-h2` | 22px | 1.4 | 페이지 타이틀 (네비바 중앙), 모달 헤더 |
| `--text-h3` | 18px | 1.5 | 섹션 타이틀, 카드 주요 수치 |
| `--text-h4` | 16px | 1.5 | 서브섹션 헤더, 강조 본문 |
| `--text-body1` | 15px | 1.5 | 코인명, 주요 항목명 |
| `--text-body2` | 14px | 1.5 | 일반 본문, 데이터 수치 |
| `--text-body3` | 13px | 1.5 | 보조 설명, 서브 정보 |
| `--text-caption1` | 12px | 1.4 | 캡션, 단위, 날짜 |
| `--text-caption2` | 11px | 1.4 | 최소 텍스트 (탭바 라벨, 미세 주석) |

### 2-3. 자간 (Letter Spacing)

| 적용 범위 | 값 |
|-----------|----|
| 대형 숫자 (24px+) | `−0.03em` ~ `−0.04em` |
| 일반 한글 본문 | `−0.01em` ~ `0em` |
| 영문/숫자 혼용 | `0em` |

### 2-4. 타이포 조합 패턴

| 패턴명 | 크기 / 굵기 / 색상 | 적용 화면 |
|--------|--------------------|-----------|
| 현재가 (상승) | 28px Bold `--color-positive` | 종목 상세 헤더 |
| 현재가 (하락) | 28px Bold `--color-negative` | 종목 상세 헤더 |
| 변화율 | 14px Regular `--color-positive` or `--color-negative` | 거래소 목록, 상세 |
| 네비바 타이틀 | 17px SemiBold `--color-gray-900` | 일반 서브 화면 |
| 네비바 타이틀 (거래소 탭) | 22px Bold `--color-brand` | 종목 상세 |
| 섹션 헤더 | 16px SemiBold `--color-gray-900` | 보유자산, 스테이킹 |
| 보조 레이블 | 13px Regular `--color-gray-500` | 서브 정보, 단위 |

---

## 3. Shapes & Radius

| 토큰명 | 값 | 적용 컴포넌트 |
|--------|----|--------------|
| `--radius-xs` | 4px | 뱃지, 태그, 세그먼트 버튼 선택 indicator |
| `--radius-sm` | 6px | 소형 인라인 버튼 (신청, 주문, 모으기), 출금방식 탭 |
| `--radius-md` | 8px | 풀와이드 CTA 버튼, 정보 박스, 드롭다운 |
| `--radius-lg` | 12px | 카드 컴포넌트, 입력창(Input), 선택 박스 |
| `--radius-xl` | 16px | 모달/바텀시트 상단 코너 |
| `--radius-full` | 9999px | 플로팅 Pill 버튼, 스테이킹 수익률 칩 |

### 핵심 관찰
- 전체적으로 **Flat 디자인** 기조 — 그림자 거의 없음
- 모달은 딤(dim) + 흰 카드, 상단 radius 16px만 적용
- 드롭다운은 미세 `box-shadow: 0 2px 8px rgba(0,0,0,0.12)` 수준

---

## 4. Spacing System

> 기본 단위: **4px 그리드**

| 토큰명 | 값 | 주요 용도 |
|--------|----|----------|
| `--space-1` | 4px | 아이콘↔텍스트 간격, 미세 여백 |
| `--space-2` | 8px | 인라인 요소 간격, 뱃지 패딩 |
| `--space-3` | 12px | 버튼 내부 수직 패딩, 리스트 행 상하 |
| `--space-4` | 16px | 화면 좌우 기본 패딩, 섹션 내부 패딩 |
| `--space-5` | 20px | 카드 패딩, 섹션 간격 |
| `--space-6` | 24px | 주요 섹션 상하 여백 |
| `--space-8` | 32px | 대형 섹션 분리, 모달 상하 패딩 |

### 레이아웃 규칙
| 항목 | 값 |
|------|----|
| 화면 좌우 여백 (Screen Margin) | `16px` |
| 네비게이션 바 높이 | `44px` |
| 하단 탭바 높이 | `~80px` (safe area 포함) |
| 리스트 아이템 최소 높이 | `56px` |
| CTA 버튼 높이 | `52px` |
| 소형 인라인 버튼 높이 | `32px` |
| 인풋 필드 높이 | `44~48px` |

---

## 5. Common Components

### 5-1. Button

#### Primary CTA (Full-width)
```
높이:      52px
너비:      100% (좌우 16px 여백 내)
Radius:    8px
배경:      --color-brand (#1340B0)
텍스트:    16px Bold White
상태:
  - hover/active: --color-brand-hover (#0F2F8A)
  - disabled:     bg #E0E0E0 / text #9E9E9E
```

#### Primary CTA — 매수 (Buy)
```
배경:  --color-positive-strong (#C62828)
나머지 동일 (52px, radius 8px, 16px Bold White)
```

#### 2-Button Layout (좌우 분리)
```
Left  (보조): 배경 #E0E0E0, 텍스트 #424242, radius 8px
Right (주요): 배경 --color-brand 또는 --color-positive-strong
비율: 1:1 (equal width)
간격: 8px gap
```

#### Small Inline Button (신청 / 주문 / 모으기)
```
높이:   32px
패딩:   0 12px
Radius: 6px
스타일: border 1px solid #E0E0E0, 텍스트 #424242, 14px Regular
```

#### Segment Button (출금방식: 일반 / 바로 / 휴대폰번호)
```
높이:   32px
Radius: 4-6px
선택:   bg #1340B0, 텍스트 white
미선택: bg white, border #E0E0E0, 텍스트 #424242
```

---

### 5-2. Input Field

```
높이:        44~48px
Radius:      8-12px
Border:      1px solid #E0E0E0
Border(포커스): 1px solid #1340B0
배경(기본):  white
배경(read-only): #F5F5F5
Placeholder: #9E9E9E, 14px Regular
텍스트:      #212121, 14~15px Regular
우측 단위:   #9E9E9E, 14px (BTC, KRW 등)
패딩:        0 16px
```

#### 퍼센트 프리셋 버튼 (10% / 25% / 50% / 최대)
```
높이:    36px
Radius:  4px
Border:  1px solid #E0E0E0
텍스트:  13px Regular #424242
배열:    4등분 grid
```

---

### 5-3. Tab Menu

#### 상단 서브탭 (종목 상세: 주문/호가/차트/시세/정보)
```
배경:         --color-brand (#1340B0)
텍스트 기본:  white, 14px Regular, opacity 0.7
텍스트 활성:  white, 14px SemiBold, opacity 1.0
하이라이트:   하단 2px solid white
```

#### 상단 서브탭 (일반 화면: 투자내역, 알림설정)
```
배경:         white
텍스트 기본:  #9E9E9E, 15px Regular
텍스트 활성:  #1340B0, 15px SemiBold
하이라이트:   하단 2px solid #1340B0
```

#### 필터 탭 (거래소: KRW / BTC / USDT / 관심 / 섹터 / 테마)
```
형태:         Pill 형 캡슐 버튼
높이:         30px
패딩:         0 12px
Radius:       full (9999px)
선택:         bg #1340B0, 텍스트 white, 13px SemiBold
미선택:       bg transparent, 텍스트 #424242, 13px Regular
간격:         4px gap
```

#### 하단 탭바 (GNB)
```
배경:    #1340B0
높이:    ~80px (safe area 포함 ~83px)
항목:    5개 (거래소 / 코인정보 / 투자내역 / 입출금 / 더보기)
아이콘:  비활성 Outlined white / 활성 Filled white
라벨:    11px Regular white (비활성) / 11px Bold white (활성)
```

---

### 5-4. List Item (코인 목록)

```
높이:     56~64px
패딩:     0 16px
구조:
  Left:   코인 심볼 아이콘(24px) + 코인명(15px Bold) + 심볼(12px Regular gray)
  Center: 현재가(15px Medium, 상승=빨강/하락=파랑/보합=gray-900)
  Right:  전일대비%(13px, 상승=빨강/하락=파랑) + 거래대금(11px gray-500)
구분선:   1px solid #F5F5F5 (하단)
```

---

### 5-5. Modal / Bottom Sheet

```
오버레이:      rgba(0,0,0,0.5)
카드 배경:     white
카드 Radius:   16px (상단) / 0px (하단)
내부 패딩:     20~24px
타이틀:        18px Bold #212121 (중앙 정렬)
버튼 영역:     하단 고정, 풀와이드 or 2-button layout
취소 버튼:     텍스트만 (14px Regular #9E9E9E)
```

---

### 5-6. Toggle / Switch

```
스타일:  iOS 네이티브 스타일
활성:    --color-brand (#1340B0)
비활성:  #E0E0E0
```

---

### 5-7. Tag / Badge

```
높이:     20px
패딩:     0 6px
Radius:   4px
UP 뱃지:  bg #1340B0, 텍스트 white, 10px Bold
N 뱃지:   bg #D32F2F, 텍스트 white, 10px Bold (new/신규)
```

---

### 5-8. Empty State

```
아이콘:  흰 종이 문서 아이콘 (회색 24-32px)
텍스트:  15px Regular #9E9E9E, 중앙 정렬
CTA:     선택적 — "시작하기 >" 형태의 텍스트 링크
```

---

### 5-9. Tooltip / Callout

```
배경:    #1340B0
텍스트:  white, 13~14px Regular
Radius:  6px
꼬리:    삼각형 (입력 필드 우측 아이콘 방향)
패딩:    8px 12px
```

---

### 5-10. Dropdown / Select

```
높이:     44px
Border:   1px solid #E0E0E0
Radius:   8px
배경:     white (#F5F5F5 read-only)
우측:     chevron down 아이콘 (#424242)
옵션 패널:
  배경:   white
  Shadow: 0 2px 8px rgba(0,0,0,0.12)
  Radius: 8px
  항목:   48px 높이, 15px Regular #212121
  선택:   #F5F5F5 배경 하이라이트
```

---

## 6. 아이콘 스타일

| 항목 | 규칙 |
|------|------|
| 기본 스타일 | **Outlined (선형)**, stroke 1.5px |
| 활성/선택 상태 | **Filled (면형)** + Primary Blue |
| 탭바 아이콘 | 비활성: Outlined white / 활성: Filled white |
| 경고 아이콘 | 빨간 원형 bg + 흰색 `!` (Filled) |
| 크기 | 20px (인라인), 24px (리스트/탭바), 28px (헤더 액션) |

---

## 7. 로딩 패턴

| 방식 | 적용 화면 |
|------|----------|
| 스피너 (spinner) | 스플래시 초기 로딩 |
| 스켈레톤 UI | 정보 탭, 코인 상세 콘텐츠 (회색 `#F5F5F5` 블록) |
| 도트 애니메이션 (• • •) | 입금주소 발급 중 상태 |

---

## 8. shadcn/ui 연결 CSS 변수 매핑 (권장)

```css
:root {
  /* Brand */
  --primary:             hsl(221 80% 38%);   /* #1340B0 */
  --primary-foreground:  hsl(0 0% 100%);

  /* Positive / Negative */
  --upbit-positive:      hsl(0 63% 50%);     /* #D32F2F — 상승/매수 */
  --upbit-negative:      hsl(211 78% 42%);   /* #1565C0 — 하락/매도 */
  --upbit-positive-bg:   hsl(351 100% 96%);  /* #FFEBEE */
  --upbit-negative-bg:   hsl(206 100% 94%);  /* #E3F2FD */

  /* Surface */
  --background:          hsl(0 0% 100%);
  --foreground:          hsl(0 0% 13%);      /* #212121 */
  --muted:               hsl(0 0% 96%);      /* #F5F5F5 */
  --muted-foreground:    hsl(0 0% 62%);      /* #9E9E9E */
  --border:              hsl(0 0% 88%);      /* #E0E0E0 */
  --input:               hsl(0 0% 88%);

  /* Radius */
  --radius:              0.5rem;             /* 8px — 기본 버튼/박스 */
  --radius-sm:           0.375rem;           /* 6px — 소형 버튼 */
  --radius-lg:           0.75rem;            /* 12px — 카드/인풋 */
  --radius-xl:           1rem;               /* 16px — 모달 */
}
```

---

> 📅 분석일: 2026.03.16
> 📌 기반: 업비트 앱 스크린샷 60장 + Color Foundation + Typography Table + upbit-designSystem.md
> 🔄 다음 단계: 이 토큰을 기반으로 `globals.css` 및 shadcn 컴포넌트 커스터마이징
