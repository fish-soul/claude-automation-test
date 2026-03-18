import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle } from "lucide-react";

interface Example {
  bad: string;
  good: string;
  note?: string;
}

interface Principle {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  bg: string;
  badge: string;
  examples: Example[];
}

const principles: Principle[] = [
  {
    number: "01",
    title: "능동태와 동사형",
    subtitle: "Active & Verb-Oriented",
    description:
      "피동/수동태(~되어지다, ~당하다)와 명사형 종결을 금지합니다. 행동의 주체(사용자 또는 시스템)가 명확히 드러나는 능동태 동사로 작성합니다.",
    color: "text-emerald-700",
    bg: "bg-emerald-50 border-emerald-200",
    badge: "⭐️ 가장 중요",
    examples: [
      { bad: "인증이 완료되었습니다.", good: "인증을 완료했어요." },
      { bad: "오류가 발생되었습니다.", good: "오류가 발생했어요." },
      { bad: "주소 복사 완료", good: "주소를 복사했어요." },
    ],
  },
  {
    number: "02",
    title: "두괄식과 간결성",
    subtitle: "Front-loading & Concise",
    description:
      "모바일 환경에서는 앞의 2~3단어만 읽힙니다. 가장 중요한 핵심 정보(결과, 목적)를 문장 맨 앞에 배치합니다. 불필요한 부사(매우, 정말, 미리, 가장)와 수식어는 100% 삭제합니다.",
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-200",
    badge: "간결하게",
    examples: [
      {
        bad: "안전한 서비스를 위해 미리 비밀번호를 설정해 주세요.",
        good: "비밀번호를 설정해 주세요.",
        note: "불필요한 수식어 '안전한 서비스를 위해', '미리' 제거",
      },
    ],
  },
  {
    number: "03",
    title: "해결책 중심",
    subtitle: "Solution-Oriented",
    description:
      "에러 상황에서 원인만 덩그러니 통보하여 사용자를 막다른 길(Dead-end)에 가두지 마세요. [문제 원인] + [해결을 위한 다음 행동] 구조를 반드시 지킵니다.",
    color: "text-violet-700",
    bg: "bg-violet-50 border-violet-200",
    badge: "에러 필수",
    examples: [
      {
        bad: "네트워크가 불안정합니다.",
        good: "네트워크가 불안정해요. 와이파이 연결 상태를 확인하고 다시 시도해 주세요.",
        note: "원인만 전달 → 원인 + 해결 행동",
      },
      {
        bad: "잔액이 부족합니다.",
        good: "전송에 필요한 잔액이 부족해요. 잔액을 채운 후 다시 시도해 주세요.",
      },
    ],
  },
  {
    number: "04",
    title: "긍정적 프레이밍",
    subtitle: "Positive Framing",
    description:
      "시스템의 한계나 사용자의 실수를 탓하는 부정어(~할 수 없다, 잘못되었다) 대신, 어떻게 하면 원하는 것을 얻을 수 있는지 긍정문으로 전환합니다.",
    color: "text-orange-700",
    bg: "bg-orange-50 border-orange-200",
    badge: "긍정적으로",
    examples: [
      {
        bad: "10,000원 미만은 출금할 수 없어요.",
        good: "10,000원부터 출금할 수 있어요.",
      },
      {
        bad: "지갑 주소를 잘못 입력하셨습니다.",
        good: "받는 사람의 지갑 주소를 다시 확인해 주세요.",
      },
    ],
  },
];

interface ToneRule {
  type: "해요체" | "합쇼체";
  when: string;
  screens: string[];
  formula: string;
  color: string;
  bg: string;
  examples: string[];
}

const toneRules: ToneRule[] = [
  {
    type: "해요체",
    when: "일반 상황",
    screens: ["온보딩", "일반 안내", "완료 메시지", "툴팁", "빈 화면", "마케팅 배너"],
    formula: "대화하듯 부드럽게 끝맺되, 불필요한 존대(사물 존칭 등)는 피합니다.",
    color: "text-emerald-700",
    bg: "bg-emerald-50 border-emerald-200",
    examples: ["토큰을 전송했어요.", "안전한 거래를 위해 지갑을 먼저 연결해 주세요."],
  },
  {
    type: "합쇼체",
    when: "엄격한 상황",
    screens: ["서비스 이용 약관", "투자 유의사항", "면책 팝업", "치명적 시스템 에러", "자산 손실 경고"],
    formula: "감정을 완전히 배제하고, 사실관계와 책임 소재를 명확히 합니다.",
    color: "text-red-700",
    bg: "bg-red-50 border-red-200",
    examples: [
      "네트워크 오류로 서비스를 이용할 수 없습니다.",
      "본 투자의 최종 책임은 투자자 본인에게 있습니다.",
    ],
  },
];

interface Pattern {
  component: string;
  formula: string;
  constraint: string;
  examples: string[];
}

const uiPatterns: Pattern[] = [
  {
    component: "버튼",
    formula: "[목적어(옵션)] + [동사 명사형/기형]",
    constraint: "최대 10자. 누르면 어떤 일이 일어나는지 명확하게.",
    examples: ["주소 복사", "내역 보기", "다시 시도", "전송하기"],
  },
  {
    component: "얼럿 제목",
    formula: "일어난 상황의 '결과' 또는 '핵심 행동' 요약",
    constraint: "마침표 생략. 1줄 이내.",
    examples: ["잔액이 부족해요", "지문 인식에 실패했어요"],
  },
  {
    component: "얼럿 본문",
    formula: "상황 발생 '이유' + '해결책'",
    constraint: "2줄 이내. 마침표 필수.",
    examples: ["가스비로 사용할 KLAY가 부족해요. 지갑에 KLAY를 채운 후 다시 시도해 주세요."],
  },
  {
    component: "토스트/스낵바",
    formula: "[대상] + [완료된 행동(과거형)]",
    constraint: "최대 20자. 1줄. 마침표 생략. 실패 상황에는 미사용.",
    examples: ["지갑 주소를 복사했어요", "관심 목록에 추가했어요"],
  },
  {
    component: "빈 화면",
    formula: "Title: 무엇이 비어있는지 + Body: 어떻게 채우는지",
    constraint: "액션 버튼 필수 제공.",
    examples: ["아직 전송 내역이 없어요 → 토큰을 전송하면 이곳에 내역이 기록돼요."],
  },
  {
    component: "플레이스홀더",
    formula: "직접적인 입력 예시",
    constraint: "'입력해 주세요' 형식 금지.",
    examples: ["0x로 시작하는 지갑 주소 입력"],
  },
];

export default function GuidelinesPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">라이팅 가이드</h1>
        <p className="text-muted-foreground mt-1">
          Native 앱 UX Writing의 4대 원칙, 톤앤매너, UI 패턴별 작성 공식을 확인하세요.
        </p>
      </div>

      {/* 4 Principles */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">4대 글쓰기 원칙</h2>
          <Separator className="flex-1" />
        </div>

        <div className="space-y-4">
          {principles.map((p) => (
            <Card key={p.number} className={`border ${p.bg}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-mono font-bold ${p.color}`}>{p.number}</span>
                      <Badge variant="outline" className={`text-xs ${p.color} border-current/30`}>
                        {p.badge}
                      </Badge>
                    </div>
                    <CardTitle className={`text-base ${p.color}`}>{p.title}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-0.5">{p.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2">{p.description}</p>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {p.examples.map((ex, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                      <p className="text-sm line-through text-muted-foreground">{ex.bad}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <p className="text-sm font-medium">{ex.good}</p>
                    </div>
                    {ex.note && (
                      <p className="text-xs text-muted-foreground pl-6">→ {ex.note}</p>
                    )}
                    {i < p.examples.length - 1 && <Separator className="opacity-30" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tone & Manner */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">톤앤매너 (해요체 vs 합쇼체)</h2>
          <Separator className="flex-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {toneRules.map((rule) => (
            <Card key={rule.type} className={`border ${rule.bg}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{rule.type === "해요체" ? "🟢" : "🔴"}</span>
                  <div>
                    <CardTitle className={`text-base ${rule.color}`}>{rule.type}</CardTitle>
                    <p className="text-xs text-muted-foreground">{rule.when}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">적용 화면</p>
                  <div className="flex flex-wrap gap-1">
                    {rule.screens.map((s) => (
                      <Badge key={s} variant="secondary" className="text-xs font-normal">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator className="opacity-30" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">예시</p>
                  {rule.examples.map((ex, i) => (
                    <div key={i} className="flex items-start gap-1.5 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <p className="text-xs">{ex}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Punctuation rules */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">문장부호 규칙</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { mark: "마침표 (.)", rule: "문장형 안내문, 바디 텍스트에 필수. 단, 타이틀·버튼에는 생략.", color: "text-emerald-600" },
                { mark: "느낌표 (!)", rule: "축하 등 극히 제한적인 긍정 상황에만 최대 1개. 에러/경고에서는 절대 사용 금지.", color: "text-yellow-600" },
                { mark: "물결표 (~)", rule: "어떠한 상황에서도 사용 전면 금지. 전문성을 해칩니다.", color: "text-destructive" },
              ].map(({ mark, rule, color }) => (
                <div key={mark} className="flex items-start gap-3 py-2 border-b last:border-b-0">
                  <code className={`text-sm font-bold w-28 shrink-0 ${color}`}>{mark}</code>
                  <p className="text-sm text-muted-foreground">{rule}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* UI Patterns */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">UI 패턴별 작성 공식</h2>
          <Separator className="flex-1" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {uiPatterns.map((pattern) => (
            <Card key={pattern.component}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{pattern.component}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-2 bg-muted/50 rounded-md">
                  <p className="text-xs font-mono text-muted-foreground">{pattern.formula}</p>
                </div>
                <p className="text-xs text-muted-foreground">{pattern.constraint}</p>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">예시</p>
                  {pattern.examples.map((ex, i) => (
                    <div key={i} className="flex items-start gap-1.5 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <p className="text-xs">{ex}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
