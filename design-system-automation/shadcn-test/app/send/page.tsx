"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, QrCode, Copy, Check, CircleCheck } from "lucide-react"

import Image from "next/image"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────
type Token = {
  symbol: string
  name: string
  balance: number
  valueKRW: number
  iconPath: string
}

type Step = "select" | "amount" | "address" | "confirm" | "complete"

type RecentAddress = {
  id: number
  name: string
  address: string
}

// ─── Constants ────────────────────────────────────────────
const STEP_ORDER: Step[] = ["select", "amount", "address", "confirm", "complete"]

const TOKENS: Token[] = [
  { symbol: "ETH",  name: "이더리움", balance: 0.52,  valueKRW: 1_248_000, iconPath: "/tokens/eth.svg"  },
  { symbol: "USDT", name: "테더",     balance: 250,   valueKRW:   332_500, iconPath: "/tokens/usdt.svg" },
  { symbol: "BTC",  name: "비트코인", balance: 0.008, valueKRW:   602_400, iconPath: "/tokens/btc.svg"  },
]

const RECENT_ADDRESSES: RecentAddress[] = [
  { id: 1, name: "내 코인베이스 지갑", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F" },
  { id: 2, name: "Binance 입금 주소",  address: "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE" },
  { id: 3, name: "이더리움 재단",      address: "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe" },
]

const NETWORK_FEE = 0.0002
const MOCK_TX_HASH = "0x3f9e4a2b1c8d7f6e5a4b3c2d1e0f9a8b7c6d5e4f"

// ─── Helpers ──────────────────────────────────────────────
function formatKRW(n: number) {
  return n.toLocaleString("ko-KR") + "원"
}
function shortAddr(addr: string) {
  if (addr.length <= 14) return addr
  return addr.slice(0, 6) + "..." + addr.slice(-6)
}

// ─── Shared Header ────────────────────────────────────────
function PageHeader({
  backHref,
  onBack,
}: {
  backHref?: string
  onBack?: () => void
}) {
  return (
    <header className="h-12 flex items-center px-4 shrink-0">
      {/* 뒤로 가기 */}
      {backHref ? (
        <Link
          href={backHref}
          className="flex items-center justify-center size-9 -ml-2 text-foreground"
          aria-label="뒤로 가기"
        >
          <ArrowLeft className="size-5" />
        </Link>
      ) : (
        <button
          onClick={onBack}
          className="flex items-center justify-center size-9 -ml-2 text-foreground"
          aria-label="뒤로 가기"
        >
          <ArrowLeft className="size-5" />
        </button>
      )}

      {/* 타이틀 (중앙) */}
      <h1 className="flex-1 text-center klip-16sb text-foreground">보내기</h1>

      {/* 취소 */}
      <Link href="/" className="klip-15m text-muted-foreground">
        취소
      </Link>
    </header>
  )
}

// ─── Step 1: 토큰 선택 ────────────────────────────────────
function TokenSelectStep({ onSelect }: { onSelect: (token: Token) => void }) {
  return (
    <div className="flex flex-col flex-1 px-4 pt-6 pb-6">
      <div className="mb-6">
        <h2 className="klip-20b text-foreground">어떤 토큰을 전송할까요?</h2>
        <p className="klip-14m text-muted-foreground mt-1">보유 중인 토큰을 선택해 주세요.</p>
      </div>

      <ul className="flex flex-col gap-3">
        {TOKENS.map((token) => (
          <li key={token.symbol}>
            <button
              onClick={() => onSelect(token)}
              className="w-full flex items-center justify-between px-4 h-[72px] rounded-[12px] bg-muted transition-colors duration-150"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={token.iconPath}
                  alt={token.symbol}
                  width={40}
                  height={40}
                  className="rounded-full shrink-0"
                />
                <div className="text-left">
                  <p className="klip-15sb text-foreground">{token.name}</p>
                  <p className="klip-12m text-muted-foreground">{token.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="klip-15sb text-foreground">
                  {token.balance} {token.symbol}
                </p>
                <p className="klip-12m text-muted-foreground">{formatKRW(token.valueKRW)}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Step 2: 수량 입력 ────────────────────────────────────
function AmountStep({
  token,
  amount,
  onChange,
  onNext,
}: {
  token: Token
  amount: string
  onChange: (v: string) => void
  onNext: () => void
}) {
  const amountNum = parseFloat(amount) || 0
  const estimatedKRW = Math.floor((amountNum / token.balance) * token.valueKRW)
  const isExceeded = amountNum > token.balance
  const isValid = amountNum > 0 && !isExceeded

  return (
    <div className="flex flex-col flex-1 px-4 pt-6 pb-6">
      <div className="mb-6">
        <h2 className="klip-20b text-foreground">전송할 수량을 입력해 주세요</h2>
        <p className="klip-14m text-muted-foreground mt-1">보유 수량을 초과할 수 없어요.</p>
      </div>

      {/* 수량 입력창 */}
      <div
        className={cn(
          "rounded-[12px] border-2 px-4 py-4 transition-colors",
          isExceeded
            ? "border-destructive"
            : "border-border focus-within:border-primary"
        )}
      >
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => onChange(e.target.value)}
            placeholder="0"
            className="flex-1 klip-22b text-foreground bg-transparent outline-none placeholder:text-muted-foreground/30"
          />
          <span className="klip-16sb text-muted-foreground">{token.symbol}</span>
          <button
            onClick={() => onChange(String(token.balance))}
            className="ml-1 px-2.5 py-1 rounded-md bg-secondary klip-12b text-primary shrink-0"
          >
            전액
          </button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="klip-12m text-muted-foreground">
            ≈ {amountNum > 0 ? formatKRW(estimatedKRW) : "0원"}
          </p>
          <p className={cn("klip-12m", isExceeded ? "text-destructive" : "text-muted-foreground")}>
            보유 {token.balance} {token.symbol}
          </p>
        </div>
      </div>

      {isExceeded && (
        <p className="klip-12m text-destructive mt-2">보유 수량을 초과했어요.</p>
      )}

      {/* 예상 수수료 */}
      <div className="rounded-[12px] bg-muted px-4 py-3 flex items-center justify-between mt-4">
        <span className="klip-14m text-muted-foreground">예상 네트워크 수수료</span>
        <span className="klip-14sb text-foreground">{NETWORK_FEE} ETH</span>
      </div>

      <div className="mt-auto pt-6">
        <button
          className={cn(
            "w-full h-[52px] rounded-[12px] klip-16sb transition-opacity duration-150",
            isValid
              ? "bg-primary text-white"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          )}
          disabled={!isValid}
          onClick={onNext}
        >
          다음
        </button>
      </div>
    </div>
  )
}

// ─── Step 3: 주소 입력 (Send_Address_Main 기준) ───────────
function AddressStep({
  address,
  onChange,
  onNext,
}: {
  address: string
  onChange: (v: string) => void
  onNext: () => void
}) {
  const [activeTab, setActiveTab] = useState<"recent" | "book">("recent")

  const hasAddress = address.trim().length >= 10

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* 페이지 타이틀 */}
      <div className="px-4 pt-6 pb-4 shrink-0">
        <h2 className="klip-20b text-foreground">어디로 보낼까요?</h2>
      </div>

      {/* 주소 입력창 (2px border + QR 아이콘) */}
      <div className="px-4 pb-4 shrink-0">
        <div
          className={cn(
            "flex items-center gap-3 border-2 rounded-[12px] px-4 h-[52px] transition-colors",
            hasAddress ? "border-primary" : "border-border focus-within:border-primary"
          )}
        >
          <input
            type="text"
            value={address}
            onChange={(e) => onChange(e.target.value)}
            placeholder="지갑 주소 또는 도메인을 입력하세요"
            className="flex-1 klip-15m text-foreground bg-transparent outline-none placeholder:text-muted-foreground"
          />
          <button className="shrink-0 text-muted-foreground" aria-label="QR 스캔">
            <QrCode className="size-5" />
          </button>
        </div>
      </div>

      {/* 탭 바 (최근 = 다크 필, 주소록 = 아웃라인) */}
      <div className="px-4 pb-3 flex gap-2 shrink-0">
        {(["recent", "book"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "h-8 px-4 rounded-full klip-14sb transition-colors duration-150",
              activeTab === tab
                ? "bg-foreground text-white"
                : "border border-border text-muted-foreground"
            )}
          >
            {tab === "recent" ? "최근" : "주소록"}
          </button>
        ))}
      </div>

      {/* 주소 목록 */}
      <ul className="flex-1 overflow-auto divide-y divide-border">
        {activeTab === "recent" ? (
          RECENT_ADDRESSES.map((addr) => (
            <li
              key={addr.id}
              className="h-[72px] px-4 flex items-center justify-between"
            >
              <div>
                <p className="klip-15sb text-foreground">{addr.name}</p>
                <p className="klip-12m text-muted-foreground mt-0.5">
                  {shortAddr(addr.address)}
                </p>
              </div>
              <button
                onClick={() => onChange(addr.address)}
                className="klip-14sb text-primary shrink-0"
              >
                보내기
              </button>
            </li>
          ))
        ) : (
          <li className="h-[72px] px-4 flex items-center justify-center">
            <p className="klip-14m text-muted-foreground">저장된 주소가 없어요.</p>
          </li>
        )}
      </ul>

      {/* 스낵바 — 주소 입력/선택 시 표시 */}
      {hasAddress && (
        <div className="px-4 pb-4 shrink-0">
          <div className="flex items-center justify-between px-4 py-3 rounded-[12px] bg-foreground">
            <span className="klip-14m text-white truncate flex-1 mr-4">
              {shortAddr(address)}
            </span>
            <button
              onClick={onNext}
              className="klip-14sb text-secondary shrink-0"
            >
              보내기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Step 4: 전송 확인 (WC_Sign_TX 기준) ─────────────────
function ConfirmStep({
  token,
  amount,
  address,
  onConfirm,
  onCancel,
}: {
  token: Token
  amount: string
  address: string
  onConfirm: () => void
  onCancel: () => void
}) {
  const amountNum = parseFloat(amount)
  const estimatedKRW = Math.floor((amountNum / token.balance) * token.valueKRW)

  const rows = [
    { label: "토큰",         value: `${token.name} (${token.symbol})`,    sub: undefined },
    { label: "전송 수량",    value: `${amount} ${token.symbol}`,           sub: `≈ ${formatKRW(estimatedKRW)}` },
    { label: "받는 주소",    value: shortAddr(address),                    sub: undefined },
    { label: "네트워크 수수료", value: `${NETWORK_FEE} ETH`,              sub: undefined },
  ]

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* 토큰 아이콘 + 타이틀 */}
      <div className="flex flex-col items-center pt-8 pb-6 px-4 shrink-0">
        <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mb-4">
          <span className="klip-14sb text-primary">{token.symbol}</span>
        </div>
        <h2 className="klip-20b text-foreground text-center">
          전송을 실행하려면<br />승인이 필요해요
        </h2>
      </div>

      {/* 구분선 */}
      <div className="h-px bg-border mx-4 shrink-0" />

      {/* 정보 행 */}
      <div className="flex-1 overflow-auto px-4 py-5">
        <div className="flex flex-col gap-5">
          {rows.map(({ label, value, sub }) => (
            <div key={label} className="flex items-start justify-between gap-4">
              <span className="klip-14sb text-muted-foreground shrink-0">{label}</span>
              <div className="text-right">
                <p className="klip-14sb text-foreground break-all">{value}</p>
                {sub && <p className="klip-12m text-muted-foreground mt-0.5">{sub}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* 구분선 */}
        <div className="h-px bg-border mt-6" />

        {/* 면책 고지 — 합쇼체 (자산 손실 위험) */}
        <p className="klip-12m text-muted-foreground mt-5 leading-relaxed">
          전송 후 취소할 수 없습니다. 잘못된 주소로 전송 시 자산을 복구할 수 없습니다.
          전송 전 정보를 반드시 확인하시기 바랍니다.
        </p>
      </div>

      {/* 하단 버튼 쌍 */}
      <div className="px-4 pb-6 pt-3 flex gap-3 shrink-0">
        <button
          onClick={onCancel}
          className="flex-1 h-[52px] rounded-[12px] klip-16sb bg-secondary text-primary transition-opacity active:opacity-70"
        >
          취소
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 h-[52px] rounded-[12px] klip-16sb bg-primary text-white transition-opacity active:opacity-70"
        >
          전송
        </button>
      </div>
    </div>
  )
}

// ─── Step 5: 전송 완료 ────────────────────────────────────
function CompleteStep({
  token,
  amount,
  address,
  copied,
  onCopy,
}: {
  token: Token
  amount: string
  address: string
  copied: boolean
  onCopy: () => void
}) {
  const amountNum = parseFloat(amount)
  const estimatedKRW = Math.floor((amountNum / token.balance) * token.valueKRW)

  return (
    <div className="flex flex-col flex-1 px-4 pt-16 pb-6">
      {/* 완료 아이콘 */}
      <div className="flex flex-col items-center gap-4 text-center mb-10">
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
          <CircleCheck className="text-primary size-8" />
        </div>
        <div>
          <h2 className="klip-22b text-foreground">전송 완료!</h2>
          <p className="klip-15m text-muted-foreground mt-1.5">
            {amount} {token.symbol}을 전송했어요.
          </p>
        </div>
      </div>

      {/* 전송 요약 */}
      <div className="h-px bg-border" />
      <div className="flex flex-col gap-5 py-5">
        <div className="flex items-start justify-between gap-4">
          <span className="klip-14sb text-muted-foreground shrink-0">전송 수량</span>
          <div className="text-right">
            <p className="klip-14sb text-foreground">
              {amount} {token.symbol}
            </p>
            <p className="klip-12m text-muted-foreground mt-0.5">≈ {formatKRW(estimatedKRW)}</p>
          </div>
        </div>
        <div className="flex items-start justify-between gap-4">
          <span className="klip-14sb text-muted-foreground shrink-0">받는 주소</span>
          <span className="klip-14sb text-foreground text-right">
            {shortAddr(address)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="klip-14sb text-muted-foreground shrink-0">트랜잭션 해시</span>
          <button
            onClick={onCopy}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="klip-14sb">
              {MOCK_TX_HASH.slice(0, 8)}...{MOCK_TX_HASH.slice(-6)}
            </span>
            {copied ? (
              <Check className="size-3.5 text-primary" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </button>
        </div>
      </div>
      <div className="h-px bg-border" />

      <div className="mt-auto pt-6">
        <Link
          href="/"
          className="flex items-center justify-center w-full h-[52px] rounded-[12px] bg-primary text-white klip-16sb"
        >
          확인
        </Link>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────
export default function SendPage() {
  const [step, setStep] = useState<Step>("select")
  const [token, setToken] = useState<Token | null>(null)
  const [amount, setAmount] = useState("")
  const [address, setAddress] = useState("")
  const [copied, setCopied] = useState(false)

  const stepIdx = STEP_ORDER.indexOf(step)

  function goBack() {
    if (stepIdx > 0 && step !== "complete") {
      setStep(STEP_ORDER[stepIdx - 1])
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(MOCK_TX_HASH).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* 헤더 — 완료 화면에서는 숨김 */}
      {step !== "complete" && (
        <PageHeader
          backHref={step === "select" ? "/" : undefined}
          onBack={step !== "select" ? goBack : undefined}
        />
      )}

      {/* 콘텐츠 */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {step === "select" && (
          <TokenSelectStep
            onSelect={(t) => {
              setToken(t)
              setStep("amount")
            }}
          />
        )}

        {step === "amount" && token && (
          <AmountStep
            token={token}
            amount={amount}
            onChange={setAmount}
            onNext={() => setStep("address")}
          />
        )}

        {step === "address" && (
          <AddressStep
            address={address}
            onChange={setAddress}
            onNext={() => setStep("confirm")}
          />
        )}

        {step === "confirm" && token && (
          <ConfirmStep
            token={token}
            amount={amount}
            address={address}
            onConfirm={() => setStep("complete")}
            onCancel={goBack}
          />
        )}

        {step === "complete" && token && (
          <CompleteStep
            token={token}
            amount={amount}
            address={address}
            copied={copied}
            onCopy={handleCopy}
          />
        )}
      </main>
    </div>
  )
}
