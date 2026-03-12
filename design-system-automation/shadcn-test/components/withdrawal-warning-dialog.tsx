"use client"

/**
 * WithdrawalWarningDialog — 회원탈퇴 시 유의사항 팝업
 *
 * ─── UX Writing 적용 근거 ───────────────────────────────────────────────
 * [참조: native-ux-writing/docs/02-voice-and-tone.md]
 *   - 해요체: 일반 안내 (재가입 가능, 알림 해제) — "일반 상황: 부드럽고 친절한 해요체"
 *   - 합쇼체: 자산 손실 경고, 데이터 영구 삭제, 법적 동의 — "엄격한 상황: 단호하고 건조한 합쇼체"
 * [참조: native-ux-writing/docs/04-ux-pattern-guidelines.md]
 *   - 얼럿 팝업 공식: Title(결과 요약, 마침표 없음) / Body(이유+해결책, 마침표 있음)
 *   - 버튼: [목적어] + [동사 기형], 최대 10자
 * [참조: native-ux-writing/docs/06-glossary.md]
 *   - "가상자산" (O) / "출금" (O)
 *
 * ─── 스타일 적용 근거 ───────────────────────────────────────────────────
 * [참조: design-system-automation/shadcn-test/CLAUDE.md]
 *   - CSS 변수(--primary, --destructive 등)만 사용 / 임의 hex 코드 금지
 *   - Lucide React 아이콘 / shadcn @/components/ui 재사용
 *   - border-radius: var(--radius) 기준
 *
 * ─── Typography 적용 근거 ─────────────────────────────────────────────
 * [참조: Figma MJlBebUsyfsz9FSfXdyvMc, node 14661-49036 — Typography Style Table v.2.6.0]
 * [참조: app/globals.css — @layer components .klip-* 유틸리티]
 *
 *   요소                     | 이전              | 적용 토큰  | 이유
 *   ─────────────────────────────────────────────────────────────────────
 *   Dialog Title             | text-[18px] bold  | klip-18b  | K_18B: Modal 헤더 타이틀
 *   Lead 문장                | text-[14px] medium| klip-14m  | K_14M: 본문 수식
 *   섹션 레이블 (경고)        | text-[13px] bold  | klip-14sb | K_14SB: 13px 없음 → 14px 스냅
 *   섹션 레이블 (안내)        | text-[13px] semi  | klip-14sb | 동일
 *   리스트 body 텍스트        | text-[13px] medium| klip-14m  | K_14M: 13px 없음 → 14px 스냅
 *   체크박스 레이블           | text-[13px] medium| klip-14m  | K_14M: 본문 수식
 *   버튼 텍스트              | text-[14px] semi  | klip-14sb | K_14SB: 본문 수식 SemiBold
 */

import { useState } from "react"
import { AlertTriangle, Info } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

// ─────────────────────────────────────────────
// 문구 데이터 (UX Writing 어미 분리 적용)
// ─────────────────────────────────────────────

/**
 * [합쇼체] 자산 손실·면책·유의사항
 * 근거: 02-voice-and-tone.md — "자산 손실 경고, 면책 팝업, 서비스 이용 약관"
 */
const LEGAL_NOTICES = [
  "보유 중인 가상자산은 반드시 출금 후 탈퇴하십시오. 탈퇴 후에는 자산에 접근할 수 없습니다.",
  "진행 중인 거래가 있는 경우, 완료 후 탈퇴하십시오.",
  "탈퇴 즉시 모든 개인정보 및 이용 내역이 영구 삭제되며, 복구할 수 없습니다.",
] as const

/**
 * [해요체] 일반 안내 정보
 * 근거: 02-voice-and-tone.md — "온보딩, 일반 안내, 완료 메시지"
 */
const GENERAL_NOTICES = [
  "탈퇴 후에도 같은 이메일로 재가입할 수 있어요.",
  "알림 및 마케팅 정보 수신은 탈퇴와 함께 자동으로 해제돼요.",
] as const

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────

interface WithdrawalWarningDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export function WithdrawalWarningDialog({
  open,
  onOpenChange,
  onConfirm,
}: WithdrawalWarningDialogProps) {
  const [agreed, setAgreed] = useState(false)

  const handleOpenChange = (next: boolean) => {
    if (!next) setAgreed(false)
    onOpenChange(next)
  }

  const handleConfirm = () => {
    if (!agreed) return
    handleOpenChange(false)
    onConfirm()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/*
       * DialogContent 커스텀:
       * - 모바일 기준 바텀 시트 스타일 (Figma: rounded-tl-[24px] rounded-tr-[24px])
       * - 데스크톱은 중앙 모달
       * - CSS 변수 only (CLAUDE.md 준수)
       */}
      <DialogContent
        showCloseButton={false}
        className={[
          /* 모바일: 바텀 시트 포지셔닝 */
          "top-auto! bottom-0! left-0! right-0! translate-x-0! translate-y-0!",
          "w-full max-w-full rounded-t-[24px] rounded-b-none",
          /* 데스크톱(sm+): 중앙 모달로 복귀 */
          "sm:top-[50%]! sm:bottom-auto! sm:left-[50%]! sm:right-auto!",
          "sm:translate-x-[-50%]! sm:translate-y-[-50%]!",
          "sm:rounded-[16px] sm:max-w-[400px] sm:w-[400px]",
          /* 모바일 애니메이션: 아래↑ 슬라이드 in / 아래↓ 슬라이드 out */
          "data-[state=open]:slide-in-from-bottom-full",
          "data-[state=open]:zoom-in-[100%]",       /* 기본 zoom-in-95 무력화 */
          "data-[state=closed]:slide-out-to-bottom-full",
          "data-[state=closed]:zoom-out-[100%]",    /* 기본 zoom-out-95 무력화 */
          /* 데스크톱 애니메이션: 슬라이드 취소, 줌 복원 */
          "sm:data-[state=open]:slide-in-from-bottom-[0px]",
          "sm:data-[state=open]:zoom-in-95",
          "sm:data-[state=closed]:slide-out-to-bottom-[0px]",
          "sm:data-[state=closed]:zoom-out-95",
          /* 공통 */
          "duration-300 ease-out",
          "bg-background p-0 gap-0 max-h-[90dvh] overflow-y-auto",
          "focus:outline-none",
        ].join(" ")}
      >
        {/* 핸들 바 (모바일용, Figma: w-12 h-1 bg-border rounded-full) */}
        <div className="flex justify-center pt-3 pb-0 sm:hidden">
          <div className="w-12 h-1 rounded-full bg-border" />
        </div>

        {/* ── Header ── */}
        <DialogHeader className="px-6 pt-5 pb-4 text-left">
          <DialogTitle
            className={[
              /*
               * K_18B — Modal 헤더 타이틀
               * [참조: Figma K_18B: 18px / Bold 700 / lh 150% / ls -0.04em]
               * [참조: 04-ux-pattern-guidelines: Title = 결과/핵심행동, 마침표 없음]
               * [참조: 02-voice-and-tone: 해요체 (일반 안내성 행동 유도)]
               */
              "klip-18b text-foreground text-left",
            ].join(" ")}
          >
            탈퇴 전, 꼭 확인해 주세요
          </DialogTitle>

          {/*
           * K_14M — 본문 수식 (Lead 문장)
           * [참조: Figma K_14M: 14px / Medium 500 / lh 150% / ls -0.02em]
           * [참조: 05-content-writing.md — "역피라미드: 결론부터"]
           * [참조: 02-voice-and-tone.md — 일반 안내 → 해요체]
           */}
          <p className="mt-1 klip-14m text-muted-foreground">
            탈퇴하면 계정 정보와 서비스 이용 내역이 모두 삭제돼요.
          </p>
        </DialogHeader>

        <div className="px-6 pb-6 flex flex-col gap-4">

          {/* ── 법적 고지 섹션 (합쇼체) ── */}
          <section
            aria-label="유의사항"
            className={[
              "rounded-[12px] p-4",
              /* destructive/5 = FFEAEF 계열 틴트 (CSS 변수 활용) */
              "bg-destructive/[0.06]",
            ].join(" ")}
          >
            {/* 섹션 헤더 */}
            <div className="flex items-center gap-1.5 mb-3">
              <AlertTriangle
                className="text-destructive shrink-0"
                size={15}
                strokeWidth={2.5}
                aria-hidden="true"
              />
              {/*
               * K_14SB — 섹션 레이블 (합쇼체)
               * [참조: Figma K_14SB: 14px / SemiBold 600 / lh 150% / ls -0.02em]
               * 이전: text-[13px] font-bold — 13px 토큰 없음, 14px로 스냅
               * [참조: 02-voice-and-tone.md — "자산 손실 경고, 면책 팝업"]
               */}
              <span className="klip-14sb text-destructive">
                반드시 확인하십시오
              </span>
            </div>

            {/* 합쇼체 항목 목록 */}
            <ul className="flex flex-col gap-2.5" role="list">
              {LEGAL_NOTICES.map((notice, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2"
                >
                  {/* 불릿 */}
                  <span
                    className="mt-[5px] shrink-0 w-[4px] h-[4px] rounded-full bg-destructive"
                    aria-hidden="true"
                  />
                  {/*
                   * K_14M — 리스트 본문 (합쇼체)
                   * [참조: Figma K_14M: 14px / Medium 500 / lh 150% / ls -0.02em]
                   * 이전: text-[13px] font-medium leading-[1.55] — 13px 토큰 없음
                   * [합쇼체] ~하십시오 / ~없습니다 (마침표 있음)
                   */}
                  <p className="klip-14m text-foreground">
                    {notice}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* ── 일반 안내 섹션 (해요체) ── */}
          <section
            aria-label="일반 안내"
            className="rounded-[12px] p-4 bg-muted"
          >
            {/* 섹션 헤더 */}
            <div className="flex items-center gap-1.5 mb-3">
              <Info
                className="text-muted-foreground shrink-0"
                size={15}
                strokeWidth={2.5}
                aria-hidden="true"
              />
              {/*
               * K_14SB — 섹션 레이블 (해요체)
               * [참조: Figma K_14SB: 14px / SemiBold 600 / lh 150% / ls -0.02em]
               * 이전: text-[13px] font-semibold — 13px 토큰 없음, 14px로 스냅
               * [참조: 02-voice-and-tone.md — "일반 안내"]
               */}
              <span className="klip-14sb text-muted-foreground">
                참고해 주세요
              </span>
            </div>

            {/* 해요체 항목 목록 */}
            <ul className="flex flex-col gap-2" role="list">
              {GENERAL_NOTICES.map((notice, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2"
                >
                  <span
                    className="mt-[5px] shrink-0 w-[4px] h-[4px] rounded-full bg-muted-foreground/50"
                    aria-hidden="true"
                  />
                  {/*
                   * K_14M — 리스트 본문 (해요체)
                   * [참조: Figma K_14M: 14px / Medium 500 / lh 150% / ls -0.02em]
                   * [해요체] ~있어요 / ~해제돼요 (마침표 있음)
                   */}
                  <p className="klip-14m text-muted-foreground">
                    {notice}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <Separator className="bg-border" />

          {/* ── 동의 체크박스 ── */}
          <label
            htmlFor="withdrawal-agree"
            className="flex items-start gap-3 cursor-pointer group"
          >
            <Checkbox
              id="withdrawal-agree"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked === true)}
              className={[
                "mt-0.5 shrink-0 rounded-[6px]",
                "border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary",
              ].join(" ")}
              aria-required="true"
            />
            {/*
             * K_14M — 법적 동의 문구 (합쇼체)
             * [참조: Figma K_14M: 14px / Medium 500 / lh 150% / ls -0.02em]
             * [참조: 02-voice-and-tone.md — "서비스 이용 약관"에 해당]
             * 마침표 있음 (body 문장형 규칙)
             */}
            <span className="klip-14m text-foreground">
              위 유의사항을 모두 확인하였으며, 이에 동의합니다.
            </span>
          </label>

          {/* ── 버튼 그룹 ── */}
          {/*
           * K_14SB — 버튼 텍스트
           * [참조: Figma K_14SB: 14px / SemiBold 600 / lh 150% / ls -0.02em]
           * [참조: 04-ux-pattern-guidelines: 버튼 = [목적어] + [동사 기형], 최대 10자]
           * "탈퇴하기" — 메인 CTA, ~하기 동사형
           * "다음에"   — 서브 버튼, 메인이 동사형이므로 쌍도 동사형 (07-learning-log 2026-03-13)
           * [참조: 03-writing-principle: 마침표 없음 (버튼 규칙)]
           */}
          <div className="flex flex-col gap-2.5 pt-1">
            {/* Primary Destructive CTA */}
            <Button
              variant="destructive"
              disabled={!agreed}
              onClick={handleConfirm}
              className={[
                "w-full h-[52px] rounded-[12px]",
                "klip-14sb",
                /* 비활성: disabled 상태 — CSS 변수 적용 */
                "disabled:bg-border disabled:text-background disabled:cursor-not-allowed",
                /* 활성: Press 인터랙션 (Figma 스펙: scale 95%) */
                "transition-transform active:scale-95 duration-100",
              ].join(" ")}
            >
              탈퇴하기
            </Button>

            {/* Secondary Cancel */}
            <Button
              variant="ghost"
              onClick={() => handleOpenChange(false)}
              className={[
                "w-full h-[52px] rounded-[12px]",
                "klip-14sb",
                "text-muted-foreground hover:bg-muted hover:text-foreground",
                "transition-transform active:scale-95 duration-100",
              ].join(" ")}
            >
              다음에
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )
}

// ─────────────────────────────────────────────
// 사용 예시
// ─────────────────────────────────────────────

/*
import { useState } from "react"
import { WithdrawalWarningDialog } from "@/components/withdrawal-warning-dialog"

export default function SettingsPage() {
  const [open, setOpen] = useState(false)

  const handleWithdraw = () => {
    // 탈퇴 API 호출
    console.log("탈퇴 처리")
  }

  return (
    <>
      <button onClick={() => setOpen(true)}>회원탈퇴</button>
      <WithdrawalWarningDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleWithdraw}
      />
    </>
  )
}
*/
