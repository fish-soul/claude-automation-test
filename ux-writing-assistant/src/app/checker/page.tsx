"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { checkText, type CheckResult, type IssueSeverity } from "@/lib/checker";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const EXAMPLES = [
  { label: "좋은 예시", text: "잔액이 부족해요. 잔액을 채운 후 다시 시도해 주세요." },
  { label: "금지어 포함", text: "암호화폐를 충전하기 위해 마이페이지로 이동해 주세요." },
  { label: "수동태 포함", text: "인증이 완료되었습니다. 처리가 완료되었습니다." },
  { label: "부정 표현", text: "10,000원 미만은 출금할 수 없어요. 지갑 주소를 잘못 입력하셨습니다." },
];

const severityConfig: Record<IssueSeverity, { icon: typeof AlertCircle; color: string; bg: string; label: string }> = {
  error: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10 border-destructive/20", label: "오류" },
  warning: { icon: AlertTriangle, color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-200", label: "경고" },
  info: { icon: Info, color: "text-blue-600", bg: "bg-blue-50 border-blue-200", label: "정보" },
};

const typeLabels: Record<string, string> = {
  forbidden_word: "금지어",
  passive_voice: "수동태",
  tilde: "물결표",
  multi_exclamation: "느낌표",
  unnecessary_adverb: "불필요 부사",
  negative_framing: "부정 표현",
  object_honorific: "사물 존칭",
};

function ScoreCircle({ score }: { score: number }) {
  const color = score >= 80 ? "text-emerald-600" : score >= 50 ? "text-yellow-600" : "text-destructive";
  const label = score >= 80 ? "통과" : score >= 50 ? "주의" : "수정 필요";

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={cn("text-4xl font-bold", color)}>{score}</div>
      <div className="text-xs text-muted-foreground">/ 100점</div>
      <Badge
        variant="outline"
        className={cn(
          "text-xs mt-1",
          score >= 80 ? "border-emerald-300 text-emerald-700" :
          score >= 50 ? "border-yellow-300 text-yellow-700" :
          "border-red-300 text-red-700"
        )}
      >
        {label}
      </Badge>
    </div>
  );
}

export default function CheckerPage() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);

  const handleCheck = () => {
    if (!inputText.trim()) return;
    setResult(checkText(inputText));
  };

  const handleReset = () => {
    setInputText("");
    setResult(null);
  };

  const errorCount = result?.issues.filter((i) => i.severity === "error").length ?? 0;
  const warningCount = result?.issues.filter((i) => i.severity === "warning").length ?? 0;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">텍스트 검사</h1>
        <p className="text-muted-foreground mt-1">
          작성한 UI 문구를 입력하면 가이드라인 위반 사항을 자동으로 감지해요.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input section */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">문구 입력</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                placeholder="검사할 UI 문구를 입력하세요.&#10;예: 암호화폐를 충전하기 위해 마이페이지로 이동해 주세요."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[160px] resize-none text-sm"
              />
              <div className="flex gap-2">
                <Button onClick={handleCheck} disabled={!inputText.trim()} className="flex-1">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  검사하기
                </Button>
                <Button variant="outline" onClick={handleReset} size="icon">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Examples */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">예시 문구</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {EXAMPLES.map(({ label, text }) => (
                <button
                  key={label}
                  onClick={() => { setInputText(text); setResult(null); }}
                  className="w-full text-left p-3 rounded-md border hover:bg-muted transition-colors"
                >
                  <p className="text-xs text-muted-foreground mb-1">{label}</p>
                  <p className="text-xs line-clamp-2">{text}</p>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Results section */}
        <div className="space-y-4">
          {result ? (
            <>
              {/* Score */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium mb-3">검사 결과</p>
                      <div className="flex gap-4">
                        <div className="text-center">
                          <p className="text-xl font-bold text-destructive">{errorCount}</p>
                          <p className="text-xs text-muted-foreground">오류</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-bold text-yellow-600">{warningCount}</p>
                          <p className="text-xs text-muted-foreground">경고</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-bold text-emerald-600">{result.issues.length === 0 ? "✓" : result.issues.length}</p>
                          <p className="text-xs text-muted-foreground">{result.issues.length === 0 ? "통과" : "총 이슈"}</p>
                        </div>
                      </div>
                    </div>
                    <ScoreCircle score={result.score} />
                  </div>
                </CardContent>
              </Card>

              {/* Issues */}
              {result.issues.length === 0 ? (
                <Card className="border-emerald-200 bg-emerald-50">
                  <CardContent className="p-6 flex items-center gap-3">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                    <div>
                      <p className="font-semibold text-emerald-800">모든 검사 통과!</p>
                      <p className="text-sm text-emerald-700 mt-0.5">가이드라인을 잘 준수한 문구예요.</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">발견된 문제 ({result.issues.length}건)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 max-h-[400px] overflow-y-auto">
                    {result.issues.map((issue, i) => {
                      const config = severityConfig[issue.severity];
                      const Icon = config.icon;
                      return (
                        <div key={i} className={cn("p-3 rounded-md border text-sm", config.bg)}>
                          <div className="flex items-start gap-2">
                            <Icon className={cn("w-4 h-4 mt-0.5 shrink-0", config.color)} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge variant="outline" className="text-xs px-1.5 py-0">
                                  {typeLabels[issue.type] ?? issue.type}
                                </Badge>
                                {issue.matched && (
                                  <code className="text-xs bg-background/60 px-1.5 py-0.5 rounded">
                                    "{issue.matched}"
                                  </code>
                                )}
                              </div>
                              <p className={cn("font-medium mt-1", config.color)}>{issue.message}</p>
                              {issue.suggestion && (
                                <>
                                  <Separator className="my-2 opacity-30" />
                                  <p className="text-xs text-muted-foreground leading-relaxed">
                                    💡 {issue.suggestion}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card className="border-dashed">
              <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                <CheckCircle2 className="w-12 h-12 text-muted-foreground/40 mb-4" />
                <p className="text-muted-foreground text-sm">
                  텍스트를 입력하고 검사하기를 누르면<br />결과가 여기에 표시돼요.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Check items explanation */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">검사 항목</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { type: "error", label: "금지어 감지", desc: "용어집 기반 17개 카테고리" },
              { type: "error", label: "수동태 감지", desc: "~되었습니다, ~되어지다 등" },
              { type: "error", label: "물결표 감지", desc: "~ 사용 전면 금지" },
              { type: "warning", label: "불필요 부사", desc: "매우, 정말, 미리 등" },
              { type: "warning", label: "부정 표현", desc: "~할 수 없어요 등" },
              { type: "warning", label: "느낌표 중복", desc: "!! 이상 사용 금지" },
              { type: "warning", label: "사물 존칭", desc: "토큰이 전송되셨어요 등" },
            ].map(({ type, label, desc }) => (
              <div key={label} className="flex items-start gap-2 p-2 rounded-md bg-muted/50">
                <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", type === "error" ? "bg-destructive" : "bg-yellow-500")} />
                <div>
                  <p className="text-xs font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
