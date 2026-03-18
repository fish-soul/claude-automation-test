"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { glossaryData, glossaryCategories } from "@/data/glossary";
import { Search, ArrowRight, AlertCircle } from "lucide-react";

export default function GlossaryPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return glossaryData.filter((entry) => {
      const matchesSearch =
        !search.trim() ||
        entry.forbidden.some((f) => f.includes(search)) ||
        entry.recommended.includes(search) ||
        entry.context.includes(search);
      const matchesCategory = !activeCategory || entry.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const totalForbiddenWords = glossaryData.reduce((acc, e) => acc + e.forbidden.length, 0);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">용어집</h1>
        <p className="text-muted-foreground mt-1">
          금지어(AS-IS)와 권장어(TO-BE) 매핑을 확인하고 일관된 용어를 사용하세요.
        </p>
      </div>

      {/* Stats */}
      <div className="flex gap-6">
        <div className="text-center">
          <p className="text-2xl font-bold text-destructive">{totalForbiddenWords}</p>
          <p className="text-xs text-muted-foreground">금지어</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-emerald-600">{glossaryData.length}</p>
          <p className="text-xs text-muted-foreground">권장어</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{glossaryCategories.length}</p>
          <p className="text-xs text-muted-foreground">카테고리</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="금지어, 권장어, 설명으로 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Category filters */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            activeCategory === null
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80 text-muted-foreground"
          }`}
        >
          전체 ({glossaryData.length})
        </button>
        {glossaryCategories.map((cat) => {
          const count = glossaryData.filter((e) => e.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Glossary notice */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-4 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-800">
            본 용어집은 프로덕트 내 텍스트의 파편화를 막기 위한 절대 기준입니다.
            금지어가 포함된 경우 반드시 권장어로 변환해야 합니다.
          </p>
        </CardContent>
      </Card>

      {/* Glossary table by category */}
      {filtered.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground text-sm">검색 결과가 없어요.</p>
          </CardContent>
        </Card>
      ) : (
        glossaryCategories.map((category) => {
          const entries = filtered.filter((e) => e.category === category);
          if (entries.length === 0) return null;

          return (
            <Card key={category}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {entries.map((entry, i) => (
                    <div key={i} className="px-6 py-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-start gap-4">
                        {/* Forbidden */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground mb-1.5">금지어 (AS-IS)</p>
                          <div className="flex flex-wrap gap-1.5">
                            {entry.forbidden.map((word) => (
                              <Badge
                                key={word}
                                variant="outline"
                                className="border-destructive/40 text-destructive bg-destructive/5 font-normal"
                              >
                                {word}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="flex items-center pt-6">
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </div>

                        {/* Recommended */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground mb-1.5">권장어 (TO-BE)</p>
                          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 font-medium border-0">
                            {entry.recommended}
                          </Badge>
                        </div>
                      </div>

                      {/* Context */}
                      <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                        💬 {entry.context}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}
