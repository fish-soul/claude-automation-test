import { glossaryData } from "@/data/glossary";

export type IssueSeverity = "error" | "warning" | "info";

export interface CheckIssue {
  type: string;
  severity: IssueSeverity;
  message: string;
  suggestion?: string;
  matched?: string;
}

export interface CheckResult {
  issues: CheckIssue[];
  score: number; // 0-100
  passed: boolean;
}

// Passive voice patterns (피동/수동태)
const PASSIVE_PATTERNS = [
  { pattern: /되어지다|되어졌|되어집니다/, label: "이중 피동 (~되어지다)" },
  { pattern: /당하였|당했습니다/, label: "피동 (~당하다)" },
  { pattern: /완료되었습니다|처리되었습니다|등록되었습니다|설정되었습니다|삭제되었습니다|변경되었습니다|저장되었습니다/, label: "명사형 수동 종결" },
  { pattern: /오류가 발생되었습니다|오류가 발생되었어요/, label: "수동태 오류 표현" },
];

// Negative framing patterns (부정적 프레이밍)
const NEGATIVE_PATTERNS = [
  { pattern: /할 수 없어요|할 수 없습니다|하실 수 없어요|하실 수 없습니다/, label: "부정 표현 (~할 수 없다)" },
  { pattern: /불가능해요|불가능합니다/, label: "부정 표현 (불가능)" },
  { pattern: /잘못 입력|잘못되었|잘못됐/, label: "사용자 탓 표현" },
];

// Forbidden punctuation
const TILDE_PATTERN = /~/;
const MULTI_EXCLAMATION = /!{2,}/;

// Unnecessary adverbs (불필요 부사)
const UNNECESSARY_ADVERBS = ["매우", "정말", "미리", "가장", "아주", "굉장히"];

// Object honorifics (사물 존칭)
const OBJECT_HONORIFIC_PATTERNS = [
  { pattern: /토큰이 전송되셨어요|자산이 이동되셨어요|거래가 완료되셨어요/, label: "사물 존칭" },
];

export function checkText(text: string): CheckResult {
  if (!text.trim()) {
    return { issues: [], score: 100, passed: true };
  }

  const issues: CheckIssue[] = [];

  // 1. Check forbidden words (금지어)
  for (const entry of glossaryData) {
    for (const forbidden of entry.forbidden) {
      if (text.includes(forbidden)) {
        issues.push({
          type: "forbidden_word",
          severity: "error",
          message: `금지어 발견: "${forbidden}"`,
          suggestion: `"${forbidden}" → "${entry.recommended}" (${entry.context})`,
          matched: forbidden,
        });
      }
    }
  }

  // 2. Check passive voice (수동태)
  for (const { pattern, label } of PASSIVE_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      issues.push({
        type: "passive_voice",
        severity: "error",
        message: `수동태 표현 감지: ${label}`,
        suggestion: '능동태로 변환하세요. 예: "인증이 완료되었습니다" → "인증을 완료했어요"',
        matched: match[0],
      });
    }
  }

  // 3. Check tilde (~)
  if (TILDE_PATTERN.test(text)) {
    issues.push({
      type: "tilde",
      severity: "error",
      message: '물결표(~) 사용 금지',
      suggestion: '물결표(~)는 어떠한 상황에서도 사용을 금지합니다. 전문성을 해칩니다.',
      matched: "~",
    });
  }

  // 4. Check multiple exclamation marks
  const exclMatch = text.match(MULTI_EXCLAMATION);
  if (exclMatch) {
    issues.push({
      type: "multi_exclamation",
      severity: "warning",
      message: '느낌표 중복 사용',
      suggestion: '느낌표는 극히 제한적인 긍정 상황에서만 최대 1개 사용하세요.',
      matched: exclMatch[0],
    });
  }

  // 5. Check unnecessary adverbs
  for (const adverb of UNNECESSARY_ADVERBS) {
    if (text.includes(adverb)) {
      issues.push({
        type: "unnecessary_adverb",
        severity: "warning",
        message: `불필요한 부사 감지: "${adverb}"`,
        suggestion: `"${adverb}"는 제거하세요. 모바일 환경에서는 핵심 정보만 전달해야 합니다.`,
        matched: adverb,
      });
    }
  }

  // 6. Check negative framing
  for (const { pattern, label } of NEGATIVE_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      issues.push({
        type: "negative_framing",
        severity: "warning",
        message: `부정적 표현 감지: ${label}`,
        suggestion: '긍정적 표현으로 변환하세요. 예: "~할 수 없어요" → "~할 수 있어요"',
        matched: match[0],
      });
    }
  }

  // 7. Check object honorifics
  for (const { pattern, label } of OBJECT_HONORIFIC_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      issues.push({
        type: "object_honorific",
        severity: "warning",
        message: `사물 존칭 감지: ${label}`,
        suggestion: '사물에는 존칭을 사용하지 않습니다. 예: "토큰이 전송되셨어요" → "토큰을 전송했어요"',
        matched: match[0],
      });
    }
  }

  // Calculate score
  const errorCount = issues.filter((i) => i.severity === "error").length;
  const warningCount = issues.filter((i) => i.severity === "warning").length;
  const totalChecks = 7;
  const deduction = errorCount * 15 + warningCount * 8;
  const score = Math.max(0, 100 - deduction);

  return {
    issues,
    score,
    passed: issues.length === 0,
  };
}
