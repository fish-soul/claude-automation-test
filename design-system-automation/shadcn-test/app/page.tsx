"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { WithdrawalWarningDialog } from "@/components/withdrawal-warning-dialog"

export default function Home() {
  const [open, setOpen] = useState(false)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 bg-background">
      <h1 className="text-[22px] font-bold text-foreground tracking-[-0.04em]">
        컴포넌트 플레이그라운드
      </h1>

      <Button asChild size="lg" className="rounded-[var(--radius)]">
        <Link href="/send">토큰 전송</Link>
      </Button>

      <button
        onClick={() => setOpen(true)}
        className={[
          "h-[52px] px-6 rounded-[12px]",
          "bg-destructive text-white",
          "text-[14px] font-semibold tracking-[-0.02em]",
          "transition-transform active:scale-95 duration-100",
        ].join(" ")}
      >
        회원탈퇴 팝업 열기
      </button>

      <Button asChild variant="secondary" size="lg" className="rounded-[var(--radius)]">
        <Link href="/nonexistent">404 페이지 보기</Link>
      </Button>

      <WithdrawalWarningDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => alert("탈퇴 처리 완료")}
      />
    </main>
  )
}
