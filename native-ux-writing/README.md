# Native UX Writing

Native 앱(iOS/Android)의 UX 라이팅을 체계적으로 관리하고 자동화하기 위한 텍스트 관리 시스템입니다.

## 폴더 구조

```
native-ux-writing/
├── .claude/
│   └── CLAUDE.md          # AI 참고용 톤앤매너 및 시스템 규칙
├── docs/
│   ├── 01-os-guidelines.md  # iOS vs Android 용어 차이 가이드
│   └── 02-glossary.md       # 공통 용어집
├── strings/               # 화면 대분류별 텍스트 JSON
│   ├── 01-common/         # 공통 버튼, 얼럿, 토스트
│   ├── 02-auth/           # PIN 인증, 생체 인증, 로그인
│   ├── 03-onboarding/     # 초기 진입, 지갑 생성/복구
│   ├── 04-home/           # 메인 지갑 화면
│   ├── 05-token/          # 토큰 목록 및 상세
│   ├── 06-nft/            # NFT 목록 및 상세
│   ├── 07-more/           # 더보기 (설정, 내 정보 등)
│   ├── 08-send/           # 전송 프로세스
│   └── 09-a2a/            # App-to-App 연동
└── scripts/
    └── split-csv-to-json.js  # CSV → JSON 자동 분리 스크립트
```

## 텍스트 JSON 스키마

각 `texts.json`은 아래 구조의 배열입니다:

```json
{
  "key": "고유 식별자 (snake_case)",
  "ko": "한국어 텍스트",
  "en": "English text",
  "context": "이 텍스트가 사용되는 화면/상황 설명",
  "os": "all | ios | android",
  "type": "label | button | title | description | error | placeholder | toast"
}
```

## CSV로 일괄 업데이트하기

Figma나 스프레드시트에서 텍스트를 CSV로 내보낸 후 아래 명령어로 JSON에 자동 반영할 수 있습니다.

### CSV 컬럼 형식

```
section, key, ko, en, context, os, type
```

`section` 유효값: `common` / `auth` / `onboarding` / `home` / `token` / `nft` / `more` / `send` / `a2a`

### 명령어

```bash
# 실제 반영
node scripts/split-csv-to-json.js <파일명>.csv

# 또는 npm scripts 사용
npm run split <파일명>.csv

# 결과 미리 보기 (파일 저장 안 함)
npm run split:dry <파일명>.csv
```

## 가이드라인

- **용어 일관성**: 반드시 `docs/02-glossary.md`의 표준 용어를 사용하세요.
- **OS 분기**: iOS/Android 용어가 다를 경우 `os` 필드로 분기하고 `docs/01-os-guidelines.md`를 참고하세요.
- **톤 앤 매너**: `.claude/CLAUDE.md`를 참고하여 문체와 원칙을 준수하세요.
