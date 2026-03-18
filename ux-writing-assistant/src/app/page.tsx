import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle, FileText, Languages, ArrowRight } from "lucide-react";
import { glossaryData } from "@/data/glossary";
import { stringsCategories } from "@/data/strings";

export default function HomePage() {
  const totalStrings = stringsCategories.reduce((acc, cat) => acc + cat.entries.length, 0);
  const totalForbiddenTerms = glossaryData.reduce((acc, e) => acc + e.forbidden.length, 0);

  const features = [
    {
      href: "/checker",
      icon: CheckCircle,
      title: "텍스트 검사",
      description: "작성한 문구가 UX Writing 가이드라인을 준수하는지 즉시 검사해요.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      badge: "핵심 기능",
    },
    {
      href: "/strings",
      icon: FileText,
      title: "문구 라이브러리",
      description: `${totalStrings}개의 승인된 UI 문구를 화면별로 탐색하고 복사할 수 있어요.`,
      color: "text-blue-600",
      bg: "bg-blue-50",
      badge: `${totalStrings}개 문구`,
    },
    {
      href: "/glossary",
      icon: Languages,
      title: "용어집",
      description: `${totalForbiddenTerms}개의 금지어와 권장어 매핑을 확인하고 일관된 용어를 사용하세요.`,
      color: "text-violet-600",
      bg: "bg-violet-50",
      badge: `${totalForbiddenTerms}개 금지어`,
    },
    {
      href: "/guidelines",
      icon: BookOpen,
      title: "라이팅 가이드",
      description: "4대 글쓰기 원칙, 톤앤매너, UI 패턴별 작성 공식을 확인하세요.",
      color: "text-orange-600",
      bg: "bg-orange-50",
      badge: "4대 원칙",
    },
  ];

  const rules = [
    { title: "능동태 사용", desc: '"인증이 완료되었습니다" → "인증을 완료했어요"', color: "border-l-emerald-500" },
    { title: "두괄식 작성", desc: "핵심 정보를 문장 맨 앞에 배치하세요.", color: "border-l-blue-500" },
    { title: "해결책 중심", desc: "에러 메시지는 원인 + 해결 행동을 함께 제시하세요.", color: "border-l-violet-500" },
    { title: "긍정적 프레이밍", desc: '"~할 수 없어요" → "~할 수 있어요"', color: "border-l-orange-500" },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary">Native UX Writing System</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">UX Writing Assistant</h1>
        <p className="text-muted-foreground text-lg">
          가상자산 지갑 앱의 UX 라이팅 가이드라인을 기반으로 한 문구 검사 및 관리 도구예요.
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map(({ href, icon: Icon, title, description, color, bg, badge }) => (
          <Link key={href} href={href} className="group">
            <Card className="h-full transition-all hover:shadow-md hover:-translate-y-0.5">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <Badge variant="outline" className="text-xs">{badge}</Badge>
                </div>
                <CardTitle className="text-base mt-3">{title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className={`flex items-center text-sm ${color} font-medium group-hover:gap-2 gap-1 transition-all`}>
                  바로가기 <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick rules */}
      <div>
        <h2 className="text-lg font-semibold mb-4">4대 글쓰기 원칙</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {rules.map(({ title, desc, color }) => (
            <div key={title} className={`border-l-4 ${color} pl-4 py-2`}>
              <p className="text-sm font-semibold">{title}</p>
              <p className="text-xs text-muted-foreground mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Card className="bg-primary text-primary-foreground border-0">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="font-semibold text-lg">지금 바로 텍스트를 검사해 보세요</p>
            <p className="text-primary-foreground/80 text-sm mt-1">
              금지어, 수동태, 부정 표현 등 9가지 항목을 자동으로 검사해요.
            </p>
          </div>
          <Button variant="secondary" asChild>
            <Link href="/checker" className="flex items-center gap-2">
              검사 시작 <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
