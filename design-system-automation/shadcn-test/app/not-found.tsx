import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center gap-8 max-w-xs w-full">

        {/* 텍스트 */}
        <div className="flex flex-col gap-3">
          <h1 className="klip-22b text-foreground">
            페이지를 찾을 수 없어요
          </h1>
          <p className="klip-15m text-muted-foreground">
            요청하신 페이지가 존재하지 않거나
            <br />
            주소가 변경되었을 수 있어요.
          </p>
        </div>

        {/* 일러스트 */}
        <Image
          src="/gr_userBlock.svg"
          alt="페이지를 찾을 수 없음"
          width={200}
          height={200}
          priority
        />

        {/* 버튼 */}
        <Button asChild size="lg" className="w-full rounded-[var(--radius)]">
          <Link href="/">메인으로 돌아가기</Link>
        </Button>

      </div>
    </div>
  )
}
