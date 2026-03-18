"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  CheckCircle,
  FileText,
  Home,
  Languages,
} from "lucide-react";

const navItems = [
  { href: "/", label: "홈", icon: Home },
  { href: "/checker", label: "텍스트 검사", icon: CheckCircle },
  { href: "/strings", label: "문구 라이브러리", icon: FileText },
  { href: "/glossary", label: "용어집", icon: Languages },
  { href: "/guidelines", label: "라이팅 가이드", icon: BookOpen },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 border-r bg-muted/30 flex flex-col h-full">
      <div className="p-6 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold">UX</span>
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">UX Writing</p>
            <p className="text-xs text-muted-foreground">Assistant</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <p className="text-xs text-muted-foreground text-center">
          Native UX Writing System
        </p>
      </div>
    </aside>
  );
}
