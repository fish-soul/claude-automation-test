# Shadcn/UI 구현 지침

클로드, 너는 이 폴더에서 작업을 할 때 아래 규칙을 지켜야 해.

## 🛠 기술 스택
- Tailwind CSS, Lucide React 아이콘 사용.
- 컴포넌트는 `@/components/ui` 경로의 기존 파일을 최대한 재사용할 것.

## 🎨 스타일 규칙
- 모든 색상은 `globals.css`에 정의된 CSS 변수(primary, secondary 등)를 사용해. 임의의 HEX 코드는 금지야.
- 둥글기(border-radius)는 `var(--radius)`를 기준으로 작업해.

## 📦 컴포넌트 생성 방식
- 새로운 컴포넌트가 필요하면 먼저 기존 shadcn 컴포넌트를 조합해서 만들 수 있는지 검토해줘.