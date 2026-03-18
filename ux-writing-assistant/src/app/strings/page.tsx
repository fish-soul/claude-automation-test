"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { stringsCategories, type StringEntry } from "@/data/strings";
import { Search, Copy, Check, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

const OS_COLORS: Record<string, string> = {
  all: "bg-gray-100 text-gray-700",
  ios: "bg-blue-100 text-blue-700",
  android: "bg-green-100 text-green-700",
};

const TYPE_COLORS: Record<string, string> = {
  버튼: "border-blue-200 text-blue-700",
  제목: "border-violet-200 text-violet-700",
  본문: "border-gray-200 text-gray-600",
  캡션: "border-orange-200 text-orange-700",
  스낵바: "border-emerald-200 text-emerald-700",
  "탭 레이블": "border-pink-200 text-pink-700",
  단위: "border-yellow-200 text-yellow-700",
  "컬럼 레이블": "border-teal-200 text-teal-700",
  "필터 버튼": "border-indigo-200 text-indigo-700",
};

function StringCard({ entry }: { entry: StringEntry }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(entry.ko);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group flex items-start justify-between py-3 px-4 hover:bg-muted/40 rounded-md transition-colors border-b last:border-b-0">
      <div className="flex-1 min-w-0 mr-3">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <code className="text-xs text-muted-foreground font-mono">{entry.key}</code>
          <Badge
            variant="outline"
            className={cn("text-xs px-1.5 py-0 font-normal", TYPE_COLORS[entry.type] ?? "border-gray-200 text-gray-600")}
          >
            {entry.type}
          </Badge>
          <span className={cn("text-xs px-1.5 py-0.5 rounded-full font-medium", OS_COLORS[entry.os] ?? OS_COLORS.all)}>
            {entry.os === "all" ? "전체" : entry.os.toUpperCase()}
          </span>
        </div>
        <p className="text-sm font-medium">{entry.ko}</p>
        {entry.en && <p className="text-xs text-muted-foreground mt-0.5">{entry.en}</p>}
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{entry.context}</p>
      </div>
      <button
        onClick={handleCopy}
        className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-muted rounded-md"
        title="복사"
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-600" />
        ) : (
          <Copy className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
    </div>
  );
}

export default function StringsPage() {
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return stringsCategories;
    const q = search.toLowerCase();
    return stringsCategories.map((cat) => ({
      ...cat,
      entries: cat.entries.filter(
        (e) =>
          e.key.toLowerCase().includes(q) ||
          e.ko.includes(q) ||
          e.context.includes(q) ||
          e.type.includes(q)
      ),
    })).filter((cat) => cat.entries.length > 0);
  }, [search]);

  const totalMatches = filteredCategories.reduce((acc, cat) => acc + cat.entries.length, 0);
  const totalStrings = stringsCategories.reduce((acc, cat) => acc + cat.entries.length, 0);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">문구 라이브러리</h1>
        <p className="text-muted-foreground mt-1">
          화면별로 승인된 UI 문구를 탐색하고 복사할 수 있어요.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="키, 문구, 컨텍스트, 타입으로 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
        {search && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {totalMatches}개
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Smartphone className="w-3.5 h-3.5" />
          총 <strong className="text-foreground">{totalStrings}</strong>개 문구
        </span>
        <span>|</span>
        <span><strong className="text-foreground">{stringsCategories.length}</strong>개 화면 카테고리</span>
      </div>

      {/* Tabs */}
      {filteredCategories.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground text-sm">검색 결과가 없어요.</p>
          </CardContent>
        </Card>
      ) : search.trim() ? (
        // Flat search results
        <Card>
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <p className="text-sm font-medium">검색 결과 ({totalMatches}개)</p>
            </div>
            <ScrollArea className="max-h-[600px]">
              <div className="p-2">
                {filteredCategories.map((cat) =>
                  cat.entries.map((entry) => (
                    <StringCard key={entry.key} entry={entry} />
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue={stringsCategories[0].id}>
          <TabsList className="flex-wrap h-auto gap-1 bg-muted/50 p-1">
            {stringsCategories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id} className="text-xs">
                {cat.label}
                <span className="ml-1.5 text-[10px] text-muted-foreground">({cat.entries.length})</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {stringsCategories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id}>
              <Card>
                <CardContent className="p-0">
                  <ScrollArea className="max-h-[600px]">
                    <div className="p-2">
                      {cat.entries.map((entry) => (
                        <StringCard key={entry.key} entry={entry} />
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-2 pt-2">
        <p className="text-xs text-muted-foreground w-full">타입 범례:</p>
        {Object.entries(TYPE_COLORS).map(([type, color]) => (
          <Badge key={type} variant="outline" className={cn("text-xs", color)}>
            {type}
          </Badge>
        ))}
      </div>
    </div>
  );
}
