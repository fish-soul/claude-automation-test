"use client";
import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Star, Bell, Share2,
  ChevronDown, Check, Minus, Plus, RefreshCw, Settings, Square,
} from "lucide-react";

/* ═══ COLOR CONSTANTS ════════════════════════════ */
const C = {
  brand:          "var(--upbit-brand)",
  negative:       "var(--upbit-negative)",
  negativeSub:    "var(--upbit-negative-subtle)",
  positive:       "var(--upbit-positive)",
  positiveStrong: "var(--upbit-positive-strong)",
  positiveSub:    "var(--upbit-positive-subtle)",
  gray900:        "var(--upbit-gray-900)",
  gray700:        "var(--upbit-gray-700)",
  gray500:        "var(--upbit-gray-500)",
  gray400:        "var(--upbit-gray-400)",
  gray300:        "var(--upbit-gray-300)",
  gray100:        "var(--upbit-gray-100)",
};

/* ═══ DATA ═══════════════════════════════════════ */
const ASKS = [
  { price: "102,056,000", pct: "-0.66%", vol: "6,293,670" },
  { price: "102,054,000", pct: "-0.66%", vol: "504,497" },
  { price: "102,050,000", pct: "-0.66%", vol: "5,157,455" },
  { price: "102,047,000", pct: "-0.67%", vol: "5,049,929" },
  { price: "102,021,000", pct: "-0.69%", vol: "48,822,906" },
  { price: "102,018,000", pct: "-0.69%", vol: "638,023" },
  { price: "102,006,000", pct: "-0.71%", vol: "53,765,124" },
  { price: "102,005,000", pct: "-0.71%", vol: "7,208,054" },
];
const BIDS = [
  { price: "101,972,000", pct: "-0.74%", vol: "30,083,873" },
  { price: "101,963,000", pct: "-0.75%", vol: "10,000" },
  { price: "101,943,000", pct: "-0.77%", vol: "1,051,265" },
  { price: "101,942,000", pct: "-0.77%", vol: "167,086" },
  { price: "101,912,000", pct: "-0.80%", vol: "5,707,072" },
  { price: "101,906,000", pct: "-0.80%", vol: "5,606,868" },
  { price: "101,903,000", pct: "-0.81%", vol: "12,297,654" },
  { price: "101,902,000", pct: "-0.81%", vol: "12,111,654" },
];
const TRADES = [
  { time: "14:04:50", price: "101,878,000", vol: "0.00031295", isBuy: false },
  { time: "14:04:50", price: "101,878,000", vol: "0.00271825", isBuy: false },
  { time: "14:04:50", price: "101,881,000", vol: "0.00196209", isBuy: false },
  { time: "14:04:50", price: "101,882,000", vol: "0.00030677", isBuy: false },
  { time: "14:04:46", price: "101,900,000", vol: "0.00012266", isBuy: true },
  { time: "14:04:44", price: "101,894,000", vol: "0.00196076", isBuy: false },
  { time: "14:04:43", price: "101,900,000", vol: "0.00961821", isBuy: true },
  { time: "14:04:41", price: "101,878,000", vol: "0.00566005", isBuy: false },
  { time: "14:04:41", price: "101,881,000", vol: "0.00100000", isBuy: false },
  { time: "14:04:41", price: "101,892,000", vol: "0.00029430", isBuy: false },
  { time: "14:04:40", price: "101,900,000", vol: "0.00144301", isBuy: false },
  { time: "14:04:37", price: "101,900,000", vol: "0.00100000", isBuy: true },
  { time: "14:04:34", price: "101,900,000", vol: "0.15728903", isBuy: true },
  { time: "14:04:30", price: "101,895,000", vol: "0.00200000", isBuy: false },
];

/* ═══ TYPES ══════════════════════════════════════ */
type SubTab    = "주문" | "호가" | "차트" | "시세" | "정보";
type OrderTab  = "매수" | "매도" | "거래내역";
type OrderCond = "보통" | "IOC" | "FOK";
type SiseTab   = "체결" | "일별";
type InfoTab   = "주요 정보" | "마켓 인사이트";

/* ═══ SHARED: ORDER BOOK ROW ═════════════════════ */
function OBRow({
  price, pct, vol, isCurrent, priceColor,
}: {
  price: string; pct: string; vol: string;
  isCurrent?: boolean; priceColor?: string;
}) {
  const c = priceColor ?? C.negative;
  if (isCurrent) {
    return (
      <div
        className="flex items-center justify-between px-2"
        style={{ paddingTop: 5, paddingBottom: 5, border: `1.5px solid ${C.gray900}`, margin: "2px 1px", backgroundColor: "white" }}
      >
        <div className="flex flex-col">
          <span style={{ fontSize: 12, fontWeight: 700, color: c }}>{price}</span>
          <span style={{ fontSize: 11, color: c }}>{pct}</span>
        </div>
        <span style={{ fontSize: 10, color: C.gray500 }}>{vol}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between px-2 border-b" style={{ paddingTop: 5, paddingBottom: 5, borderColor: C.gray100 }}>
      <div className="flex flex-col">
        <span style={{ fontSize: 12, fontWeight: 700, color: c }}>{price}</span>
        <span style={{ fontSize: 11, color: c }}>{pct}</span>
      </div>
      <span style={{ fontSize: 10, color: C.gray500, textAlign: "right" }}>{vol}</span>
    </div>
  );
}

/* ═══ SHARED: INPUT ROW ══════════════════════════ */
function InputRow({ label, value, right }: { label: string; value: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-stretch rounded-lg overflow-hidden mb-[7px]" style={{ border: `1px solid ${C.gray300}`, height: 44 }}>
      <span className="flex items-center px-3 shrink-0" style={{ fontSize: 13, color: C.gray500, backgroundColor: C.gray100, borderRight: `1px solid ${C.gray300}`, minWidth: 50 }}>
        {label}
      </span>
      <div className="flex-1 flex items-center justify-end px-2 min-w-0" style={{ fontSize: 13, color: C.gray900, overflow: "hidden" }}>
        <span style={{ display: "block", overflow: "hidden", whiteSpace: "nowrap", width: "100%", textAlign: "right" }}>
          {value}
        </span>
      </div>
      {right && <div style={{ borderLeft: `1px solid ${C.gray300}` }} className="flex shrink-0">{right}</div>}
    </div>
  );
}

/* ═══ TAB: 주문 ══════════════════════════════════ */
function OrderPanel({ orderTab, setOrderTab, orderCond, setOrderCond, isPositive }: {
  orderTab: OrderTab; setOrderTab: (t: OrderTab) => void;
  orderCond: OrderCond; setOrderCond: (c: OrderCond) => void;
  isPositive: boolean;
}) {
  const priceColor = isPositive ? C.positive : C.negative;
  const isSell = orderTab === "매도";
  const btnBg  = isSell ? C.negative : C.positiveStrong;

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* 호가창 미리보기 (좌) */}
      <div className="overflow-y-auto" style={{ width: "38%", borderRight: `1px solid ${C.gray300}` }}>
        {ASKS.map((r, i) => <OBRow key={i} {...r} priceColor={priceColor} />)}
        <OBRow price="102,002,000" pct="-0.71%" vol="60,556" isCurrent priceColor={priceColor} />
        {BIDS.map((r, i) => <OBRow key={i} {...r} priceColor={priceColor} />)}
      </div>

      {/* 주문폼 (우) */}
      <div className="flex-1 overflow-y-auto px-3 pt-2 pb-4">
        {/* 매수/매도/거래내역 탭 */}
        <div className="flex mb-3" style={{ borderBottom: `1px solid ${C.gray300}` }}>
          {(["매수", "매도", "거래내역"] as OrderTab[]).map((tab) => {
            const active = orderTab === tab;
            const ac = tab === "매수" ? C.positive : tab === "매도" ? C.negative : C.brand;
            return (
              <button key={tab} onClick={() => setOrderTab(tab)} className="flex-1 pb-2 text-center"
                style={{ fontSize: 14, fontWeight: active ? 700 : 400, color: active ? ac : C.gray500, borderBottom: active ? `2px solid ${ac}` : "2px solid transparent", marginBottom: -1 }}>
                {tab}
              </button>
            );
          })}
        </div>

        {/* 주문 유형 */}
        <div className="flex gap-2 mb-3">
          <button className="flex-1 flex items-center justify-between px-3 rounded-lg"
            style={{ height: 40, border: `1px solid ${C.gray300}`, fontSize: 14, color: C.gray900 }}>
            <span>지정가</span><ChevronDown size={15} style={{ color: C.gray700 }} />
          </button>
          <button className="flex-1 flex items-center justify-center gap-1 rounded-lg"
            style={{ height: 40, border: `1px solid ${C.gray300}`, fontSize: 14, color: C.gray700 }}>
            <Check size={14} style={{ color: C.brand }} /><span>시장가</span>
          </button>
        </div>

        {/* 주문조건 */}
        <div className="mb-3">
          <div className="flex items-center gap-1.5 mb-2">
            <span style={{ fontSize: 13, fontWeight: 700, color: C.gray900 }}>주문조건</span>
            <div className="flex items-center justify-center rounded-full" style={{ width: 16, height: 16, border: `1px solid ${C.gray500}` }}>
              <span style={{ fontSize: 9, color: C.gray500 }}>?</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {(["보통","IOC","FOK"] as OrderCond[]).map((cond) => (
              <button key={cond} onClick={() => setOrderCond(cond)} className="flex items-center gap-1.5">
                <div className="rounded-full flex items-center justify-center"
                  style={{ width: 17, height: 17, border: `2px solid ${orderCond === cond ? C.brand : C.gray400}`, backgroundColor: orderCond === cond ? C.brand : "white" }}>
                  {orderCond === cond && <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "white" }} />}
                </div>
                <span style={{ fontSize: 13, color: C.gray900 }}>{cond}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 주문가능 */}
        <div className="flex justify-between items-center mb-3 py-1">
          <span style={{ fontSize: 13, color: C.gray700 }}>주문가능</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.gray900 }}>0 KRW</span>
        </div>

        {/* 수량 */}
        <InputRow label="수량" value={<span style={{ color: C.gray500 }}>0 BTC</span>}
          right={<button className="flex items-center gap-1 px-2" style={{ fontSize: 13, color: C.gray700 }}>가능 <ChevronDown size={12} /></button>} />

        {/* 가격 */}
        <div className="flex items-stretch rounded-lg overflow-hidden mb-[7px]" style={{ border: `1px solid ${C.gray300}`, height: 44 }}>
          <span className="flex items-center px-3 shrink-0" style={{ fontSize: 13, color: C.gray500, backgroundColor: C.gray100, borderRight: `1px solid ${C.gray300}`, minWidth: 50 }}>가격</span>
          <div className="flex-1 flex items-center justify-end px-2 min-w-0">
            <span style={{ fontSize: 13, fontWeight: 700, color: C.gray900, whiteSpace: "nowrap" }}>102,002,000</span>
          </div>
          <span className="flex items-center pr-2 shrink-0" style={{ fontSize: 12, color: C.gray500 }}>KRW</span>
          <div style={{ borderLeft: `1px solid ${C.gray300}` }} className="flex shrink-0">
            <button className="flex items-center px-2" style={{ borderRight: `1px solid ${C.gray300}`, color: C.gray700 }}><Minus size={14} /></button>
            <button className="flex items-center px-2" style={{ color: C.gray700 }}><Plus size={14} /></button>
          </div>
        </div>

        {/* 현재가 대비 % */}
        <button className="w-full flex items-center justify-between px-3 rounded-lg mb-[7px]"
          style={{ height: 44, border: `1px solid ${C.gray300}`, fontSize: 13, color: C.gray500 }}>
          <span>현재가 대비 %</span><ChevronDown size={15} style={{ color: C.gray700 }} />
        </button>

        {/* 총액 */}
        <InputRow label="총액" value={<span style={{ color: C.gray500 }}>0 KRW</span>} />

        {/* % 프리셋 버튼 */}
        <div className="flex gap-1.5 mb-4">
          {["10%", "25%", "50%", "100%"].map((p) => (
            <button key={p} className="flex-1 rounded"
              style={{ height: 32, border: `1px solid ${C.gray300}`, fontSize: 12, color: C.gray700, backgroundColor: "white" }}>
              {p}
            </button>
          ))}
          <button className="flex-1 rounded"
            style={{ height: 32, border: `1px solid ${C.gray300}`, fontSize: 12, color: C.gray700, backgroundColor: C.gray100 }}>
            초기화
          </button>
        </div>

        {/* CTA 버튼 */}
        <div className="flex gap-2 mb-4">
          <button className="flex-1 rounded-lg flex items-center justify-center"
            style={{ height: 52, backgroundColor: C.gray700, color: "white", fontSize: 16, fontWeight: 700 }}>초기화</button>
          <button className="flex-1 rounded-lg flex items-center justify-center"
            style={{ height: 52, backgroundColor: btnBg, color: "white", fontSize: 16, fontWeight: 700 }}>
            {isSell ? "매도" : "매수"}
          </button>
        </div>

        {/* 보유자산 */}
        <div className="mb-3">
          <p style={{ fontSize: 13, fontWeight: 700, color: C.gray900, marginBottom: 8 }}>보유자산 (KRW)</p>
          {[
            { label: "매수평균가", value: "134,410,158", bold: true,  color: C.gray900 },
            { label: "평가금액",   value: "22,747",      bold: false, color: C.gray900 },
            { label: "평가손익",   value: "-7,227",      bold: false, color: C.negative },
            { label: "수익률",     value: "-24.11%",     bold: false, color: C.negative },
          ].map(({ label, value, bold, color }) => (
            <div key={label} className="flex justify-between" style={{ marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: C.gray700 }}>{label}</span>
              <span style={{ fontSize: 14, fontWeight: bold ? 700 : 400, color }}>{value}</span>
            </div>
          ))}
        </div>

        {/* 최소주문금액/수수료 */}
        <div className="pt-2 mb-3" style={{ borderTop: `1px solid ${C.gray300}` }}>
          <div className="flex justify-between mb-1">
            <span style={{ fontSize: 11, color: C.gray500 }}>최소주문금액</span>
            <span style={{ fontSize: 11, color: C.gray700 }}>5,000 KRW</span>
          </div>
          <div className="flex justify-between items-center">
            <span style={{ fontSize: 11, color: C.gray500 }}>수수료 (부가세 포함)</span>
            <div className="flex items-center gap-1">
              <span className="px-1 rounded" style={{ fontSize: 10, fontWeight: 700, backgroundColor: C.brand, color: "white", paddingTop: 1, paddingBottom: 1 }}>무</span>
              <span style={{ fontSize: 11, color: C.gray700 }}>0%</span>
            </div>
          </div>
        </div>

        {/* 호가주문 */}
        <button className="w-full rounded-lg flex items-center justify-center"
          style={{ height: 48, border: `1px solid ${C.gray300}`, fontSize: 14, color: C.gray700 }}>호가주문</button>
        <div className="h-4" />
      </div>
    </div>
  );
}

/* ═══ TAB: 호가 ══════════════════════════════════ */
function HogaPanel({ priceColor }: { priceColor: string }) {
  const maxVol = 60000000;
  return (
    <div className="flex flex-1 overflow-hidden">
      {/* 전체 호가창 (60%) */}
      <div className="flex flex-col overflow-y-auto" style={{ width: "60%", borderRight: `1px solid ${C.gray300}` }}>
        {/* 매도 호가 (asks) — 깊이 바 오른쪽 정렬 */}
        {ASKS.map((r, i) => {
          const ratio = Math.min(parseInt(r.vol.replace(/,/g, "")) / maxVol, 1);
          return (
            <div key={i} className="relative flex items-center justify-between px-2 border-b" style={{ height: 40, borderColor: C.gray100 }}>
              <div style={{ position: "absolute", right: 0, top: 0, height: "100%", width: `${ratio * 100}%`, backgroundColor: C.negativeSub }} />
              <span className="relative z-10" style={{ fontSize: 11, color: C.gray500 }}>{r.vol}</span>
              <div className="relative z-10 flex flex-col items-end">
                <span style={{ fontSize: 12, fontWeight: 700, color: priceColor }}>{r.price}</span>
                <span style={{ fontSize: 11, color: priceColor }}>{r.pct}</span>
              </div>
            </div>
          );
        })}

        {/* 현재가 */}
        <div className="flex items-center justify-between px-2" style={{ height: 44, border: `2px solid ${C.gray900}`, margin: "2px 0", backgroundColor: "white" }}>
          <span style={{ fontSize: 11, color: C.gray500 }}>60,556</span>
          <div className="flex flex-col items-end">
            <span style={{ fontSize: 13, fontWeight: 700, color: priceColor }}>102,002,000</span>
            <span style={{ fontSize: 11, color: priceColor }}>-0.71%</span>
          </div>
        </div>

        {/* 매수 호가 (bids) — 깊이 바 왼쪽 정렬 */}
        {BIDS.map((r, i) => {
          const vol = parseInt(r.vol.replace(/,/g, "")) || 0;
          const ratio = Math.min(vol / maxVol, 1);
          return (
            <div key={i} className="relative flex items-center justify-between px-2 border-b" style={{ height: 40, borderColor: C.gray100 }}>
              <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${ratio * 100}%`, backgroundColor: C.positiveSub }} />
              <span className="relative z-10" style={{ fontSize: 11, color: C.gray500 }}>{r.vol}</span>
              <div className="relative z-10 flex flex-col items-end">
                <span style={{ fontSize: 12, fontWeight: 700, color: priceColor }}>{r.price}</span>
                <span style={{ fontSize: 11, color: priceColor }}>{r.pct}</span>
              </div>
            </div>
          );
        })}

        {/* 체결강도 */}
        <div className="px-3 py-3 mt-auto" style={{ borderTop: `1px solid ${C.gray300}` }}>
          <div className="flex justify-between items-center mb-1">
            <span style={{ fontSize: 11, color: C.gray700 }}>체결강도</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.negative }}>59.34%</span>
          </div>
          <div className="w-full rounded-full overflow-hidden" style={{ height: 5, backgroundColor: C.gray300 }}>
            <div style={{ width: "59.34%", height: "100%", backgroundColor: C.negative }} />
          </div>
          <p style={{ fontSize: 10, color: C.gray500, marginTop: 4 }}>419,247,645</p>
        </div>
      </div>

      {/* 개략정보 (40%) */}
      <div className="overflow-y-auto px-3 py-3" style={{ width: "40%" }}>
        <div className="mb-3 pb-3" style={{ borderBottom: `1px solid ${C.gray300}` }}>
          <p style={{ fontSize: 11, color: C.gray500, marginBottom: 4 }}>거래량</p>
          <p style={{ fontSize: 13, fontWeight: 700, color: C.gray900 }}>1,449.323</p>
          <p style={{ fontSize: 11, color: C.gray500 }}>BTC</p>
          <p style={{ fontSize: 12, color: C.gray700 }}>148,722백만원</p>
          <p style={{ fontSize: 10, color: C.gray500 }}>(최근 24시간)</p>
        </div>
        <div className="mb-3 pb-3" style={{ borderBottom: `1px solid ${C.gray300}` }}>
          <p style={{ fontSize: 11, color: C.gray500, marginBottom: 2 }}>52주최고</p>
          <p style={{ fontSize: 12, fontWeight: 700, color: C.positive }}>179,869,000</p>
          <p style={{ fontSize: 10, color: C.gray500 }}>2025.10.09</p>
        </div>
        <div className="mb-3 pb-3" style={{ borderBottom: `1px solid ${C.gray300}` }}>
          <p style={{ fontSize: 11, color: C.gray500, marginBottom: 2 }}>52주최저</p>
          <p style={{ fontSize: 12, fontWeight: 700, color: C.negative }}>89,000,000</p>
          <p style={{ fontSize: 10, color: C.gray500 }}>2026.01.13</p>
        </div>
        <div>
          <p style={{ fontSize: 11, color: C.gray500, marginBottom: 4 }}>전일종가</p>
          <p style={{ fontSize: 12, fontWeight: 700, color: C.gray900 }}>102,731,000</p>
          <p style={{ fontSize: 11, color: C.gray500, marginTop: 6 }}>전일대비</p>
          <p style={{ fontSize: 12, color: C.negative }}>-729,000</p>
          <p style={{ fontSize: 11, color: C.negative }}>-0.71%</p>
        </div>
      </div>
    </div>
  );
}

/* ═══ TAB: 차트 ══════════════════════════════════ */
const CANDLES = [
  { o:55, h:68, l:48, c:38 }, { o:38, h:55, l:32, c:50 }, { o:50, h:62, l:44, c:35 },
  { o:35, h:52, l:28, c:48 }, { o:48, h:65, l:40, c:42 }, { o:42, h:58, l:35, c:60 },
  { o:60, h:72, l:52, c:45 }, { o:45, h:62, l:38, c:55 }, { o:55, h:70, l:48, c:40 },
  { o:40, h:58, l:32, c:52 }, { o:52, h:66, l:45, c:38 }, { o:38, h:54, l:30, c:50 },
  { o:50, h:63, l:44, c:42 }, { o:42, h:60, l:35, c:55 }, { o:55, h:68, l:50, c:48 },
  { o:48, h:62, l:40, c:35 }, { o:35, h:52, l:28, c:45 }, { o:45, h:60, l:38, c:58 },
  { o:58, h:72, l:50, c:42 }, { o:42, h:57, l:35, c:50 },
];

function ChartPanel() {
  const [tf, setTf] = useState("일");
  const TFS = ["60틱", "초", "1분", "1시간", "일", "주"];
  const W = 16, GAP = 3, H = 200;

  /* 실제 데이터 범위로 자동 스케일 */
  const allVals = CANDLES.flatMap(c => [c.h, c.l]);
  const minV = Math.min(...allVals);
  const maxV = Math.max(...allVals);
  const pad  = (maxV - minV) * 0.15;
  const lo   = minV - pad;
  const hi   = maxV + pad;
  const scale = (v: number) => H - ((v - lo) / (hi - lo)) * H;

  const totalW = CANDLES.length * (W + GAP) + 40;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* 툴바 */}
      <div className="flex items-center justify-between px-3 py-2" style={{ borderBottom: `1px solid ${C.gray300}` }}>
        <div className="flex items-center gap-0.5">
          {TFS.map((t) => (
            <button key={t} onClick={() => setTf(t)} className="px-2 py-1 rounded"
              style={{ fontSize: 12, fontWeight: tf === t ? 700 : 400, color: tf === t ? C.brand : C.gray700, backgroundColor: tf === t ? C.gray100 : "transparent" }}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Square size={16} style={{ color: C.gray500 }} />
          <Settings size={16} style={{ color: C.gray500 }} />
        </div>
      </div>

      {/* 주문가 라벨 */}
      <div className="flex items-center px-3 py-1" style={{ backgroundColor: C.gray100, borderBottom: `1px solid ${C.gray300}` }}>
        <span style={{ fontSize: 12, color: C.gray700 }}>주문가: 102,002,000</span>
      </div>

      {/* 캔들 차트 — 가로 스크롤 */}
      <div className="flex-1 relative" style={{ overflow: "hidden", minHeight: 0, backgroundColor: "white" }}>
        <div style={{ position: "absolute", inset: 0, overflowX: "auto", overflowY: "hidden" }}>
        <div style={{ width: totalW, height: "100%", position: "relative" }}>
        <svg width={totalW} height="100%" viewBox={`0 0 ${totalW} ${H}`} preserveAspectRatio="none" style={{ display: "block" }}>
          {/* 가로 그리드 */}
          {[0, 0.25, 0.5, 0.75, 1].map((r) => (
            <line key={r} x1="0" y1={r * H} x2={totalW} y2={r * H} stroke="#F0F0F0" strokeWidth="1" />
          ))}
          {/* 캔들 */}
          {CANDLES.map((c, i) => {
            const x = i * (W + GAP) + 5;
            const up = c.c >= c.o;
            const color = up ? "hsl(0 63% 50%)" : "hsl(211 78% 42%)";
            const bodyTop = scale(Math.max(c.o, c.c));
            const bodyH = Math.max(Math.abs(scale(c.c) - scale(c.o)), 1.5);
            return (
              <g key={i}>
                <line x1={x + W/2} y1={scale(c.h)} x2={x + W/2} y2={scale(c.l)} stroke={color} strokeWidth="1.5" />
                <rect x={x} y={bodyTop} width={W} height={bodyH} fill={color} />
              </g>
            );
          })}
          {/* 5MA */}
          <polyline
            points={CANDLES.slice(4).map((_, i) => {
              const slice = CANDLES.slice(i, i + 5);
              const avg = slice.reduce((s, d) => s + (d.o + d.c) / 2, 0) / slice.length;
              return `${(i + 4) * (W + GAP) + 5 + W / 2},${scale(avg)}`;
            }).join(" ")}
            fill="none" stroke="hsl(211 78% 42%)" strokeWidth="1.2" opacity="0.7"
          />
          {/* 10MA */}
          <polyline
            points={CANDLES.slice(9).map((_, i) => {
              const slice = CANDLES.slice(i, i + 10);
              const avg = slice.reduce((s, d) => s + (d.o + d.c) / 2, 0) / slice.length;
              return `${(i + 9) * (W + GAP) + 5 + W / 2},${scale(avg)}`;
            }).join(" ")}
            fill="none" stroke="hsl(0 63% 50%)" strokeWidth="1.2" opacity="0.7"
          />
          {/* 매수평균가 점선 */}
          <line x1="0" y1={scale(42)} x2={totalW} y2={scale(42)} stroke="hsl(0 63% 50%)" strokeWidth="1" strokeDasharray="4,2" />
        </svg>
        {/* 가격 라벨 오버레이 */}
        <div style={{ position: "absolute", right: 4, top: 4, fontSize: 10, color: C.positive }}>179,869,000</div>
        <div style={{ position: "absolute", right: 4, top: "50%", fontSize: 10, color: C.negative }}>101,977,000</div>
        </div>
        </div>
      </div>

      {/* 날짜 축 */}
      <div className="flex justify-between px-3 py-1" style={{ borderTop: `1px solid ${C.gray300}` }}>
        <span style={{ fontSize: 10, color: C.gray500 }}>2025-10</span>
        <span style={{ fontSize: 10, color: C.gray500 }}>2026-01</span>
        <span style={{ fontSize: 10, color: C.gray500 }}>2026-03</span>
      </div>
    </div>
  );
}

/* ═══ TAB: 시세 ══════════════════════════════════ */
function SisePanel() {
  const [siseTab, setSiseTab] = useState<SiseTab>("체결");
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex px-4 pt-2" style={{ borderBottom: `1px solid ${C.gray300}` }}>
        {(["체결", "일별"] as SiseTab[]).map((t) => (
          <button key={t} onClick={() => setSiseTab(t)} className="mr-6 pb-2"
            style={{ fontSize: 15, fontWeight: siseTab === t ? 700 : 400, color: siseTab === t ? C.brand : C.gray500, borderBottom: siseTab === t ? `2px solid ${C.brand}` : "2px solid transparent" }}>
            {t}
          </button>
        ))}
      </div>
      <div className="flex px-4 py-2" style={{ backgroundColor: C.gray100, borderBottom: `1px solid ${C.gray300}` }}>
        <span style={{ flex: "0 0 80px", fontSize: 12, color: C.gray500 }}>체결시간</span>
        <span className="flex-1 text-right" style={{ fontSize: 12, color: C.gray500 }}>체결가격(KRW)</span>
        <span style={{ flex: "0 0 90px", textAlign: "right", fontSize: 12, color: C.gray500 }}>체결량(BTC)≑</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {TRADES.map((t, i) => (
          <div key={i} className="flex items-center px-4 border-b" style={{ paddingTop: 10, paddingBottom: 10, borderColor: C.gray100 }}>
            <span style={{ flex: "0 0 80px", fontSize: 13, color: C.gray700 }}>{t.time}</span>
            <span className="flex-1 text-right" style={{ fontSize: 13, color: t.isBuy ? C.positive : C.negative }}>{t.price}</span>
            <span style={{ flex: "0 0 90px", textAlign: "right", fontSize: 13, color: t.isBuy ? C.positive : C.negative }}>{t.vol}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ TAB: 정보 ══════════════════════════════════ */
function InfoPanel() {
  const [infoTab, setInfoTab] = useState<InfoTab>("주요 정보");
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex px-4 pt-2" style={{ borderBottom: `1px solid ${C.gray300}` }}>
        {(["주요 정보", "마켓 인사이트"] as InfoTab[]).map((t) => (
          <button key={t} onClick={() => setInfoTab(t)} className="mr-6 pb-2"
            style={{ fontSize: 15, fontWeight: infoTab === t ? 700 : 400, color: infoTab === t ? C.gray900 : C.gray500, borderBottom: infoTab === t ? `2px solid ${C.gray900}` : "2px solid transparent" }}>
            {t}
          </button>
        ))}
      </div>

      {infoTab === "주요 정보" ? (
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#F7931A" }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: "white" }}>₿</span>
            </div>
            <div>
              <p style={{ fontSize: 17, fontWeight: 700, color: C.gray900 }}>비트코인 (Bitcoin)</p>
              <p style={{ fontSize: 13, color: C.gray500 }}>심볼 : BTC</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg mb-4" style={{ backgroundColor: C.gray100 }}>
            <span style={{ fontSize: 13, color: C.gray700 }}>지금 이 코인, 공포/탐욕 지수는?</span>
            <ChevronRight size={16} style={{ color: C.gray500 }} />
          </div>
          <div className="flex justify-between items-center py-3" style={{ borderBottom: `1px solid ${C.gray300}` }}>
            <span style={{ fontSize: 13, color: C.gray700 }}>바로가기</span>
            <div className="flex gap-3">
              {["웹사이트", "블록조회", "국문백서", "원문백서"].map((l) => (
                <button key={l} style={{ fontSize: 12, color: C.brand }}>{l}</button>
              ))}
            </div>
          </div>
          {[{ label: "최초발행", value: "2009.01." }, { label: "총 발행한도", value: "21,000,000 (코인마켓캡 제공)" }].map(({ label, value }) => (
            <div key={label} className="flex justify-between py-3" style={{ borderBottom: `1px solid ${C.gray300}` }}>
              <span style={{ fontSize: 13, color: C.gray700 }}>{label}</span>
              <span style={{ fontSize: 13, color: C.gray900 }}>{value}</span>
            </div>
          ))}
          <div className="py-3" style={{ borderBottom: `1px solid ${C.gray300}` }}>
            <p style={{ fontSize: 13, color: C.gray700, marginBottom: 8 }}>시가총액</p>
            {[
              { label: "프로젝트팀 제공",  value: "미제공" },
              { label: "코인마켓캡 제공",  value: "2064.0조원 (26.03.12. 기준)" },
              { label: "코인게코 제공",    value: "2064.4조원 (26.03.12. 기준)" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between mb-2">
                <span style={{ fontSize: 13, color: C.gray500 }}>{label}</span>
                <span style={{ fontSize: 13, color: C.gray900 }}>{value}</span>
              </div>
            ))}
          </div>
          <div className="py-3">
            <p style={{ fontSize: 13, color: C.gray700 }}>현재 유통량</p>
            <p style={{ fontSize: 13, color: C.gray900, marginTop: 4 }}>19,839,225 BTC</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: C.gray700 }} />
              <span style={{ fontSize: 13, color: C.gray700 }}>자세한 차트</span>
            </div>
            <div className="flex items-center gap-1">
              <span style={{ fontSize: 12, color: C.gray500 }}>오늘 13:00 기준</span>
              <RefreshCw size={13} style={{ color: C.gray500 }} />
            </div>
          </div>

          {/* 업비트 보유량 */}
          <div className="mb-6">
            <div className="flex items-center gap-1 mb-3">
              <p style={{ fontSize: 15, fontWeight: 700, color: C.gray900 }}>업비트 보유량</p>
              <div className="w-4 h-4 rounded-full border flex items-center justify-center" style={{ borderColor: C.gray500 }}>
                <span style={{ fontSize: 9, color: C.gray500 }}>?</span>
              </div>
            </div>
            <div className="p-4 rounded-lg" style={{ border: `1px solid ${C.gray300}` }}>
              <div className="flex items-end justify-center gap-8 mb-3" style={{ height: 80 }}>
                <div className="flex flex-col items-center gap-1">
                  <span style={{ fontSize: 11, color: C.positive, fontWeight: 700 }}>▲ 0.1%</span>
                  <div style={{ width: 44, height: 52, backgroundColor: C.gray400, borderRadius: "3px 3px 0 0" }} />
                  <span style={{ fontSize: 11, color: C.gray500 }}>어제 14시</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div style={{ height: 20 }} />
                  <div style={{ width: 44, height: 57, backgroundColor: C.gray700, borderRadius: "3px 3px 0 0" }} />
                  <span style={{ fontSize: 11, color: C.gray500 }}>오늘 13시</span>
                </div>
              </div>
              <p style={{ fontSize: 13, color: C.gray700, textAlign: "center" }}>24시간 전과 거의 같습니다.</p>
            </div>
          </div>

          {/* Taker 순매수 */}
          <div>
            <div className="flex items-center gap-1 mb-3">
              <p style={{ fontSize: 15, fontWeight: 700, color: C.gray900 }}>Taker 순매수</p>
              <div className="w-4 h-4 rounded-full border flex items-center justify-center" style={{ borderColor: C.gray500 }}>
                <span style={{ fontSize: 9, color: C.gray500 }}>?</span>
              </div>
            </div>
            <div className="p-4 rounded-lg" style={{ border: `1px solid ${C.gray300}` }}>
              <div className="flex justify-between mb-2">
                <span style={{ fontSize: 14, fontWeight: 700, color: C.positive }}>매수 48%</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.negative }}>매도 52%</span>
              </div>
              <div className="w-full flex rounded-full overflow-hidden" style={{ height: 10 }}>
                <div style={{ width: "48%", backgroundColor: C.positiveStrong }} />
                <div style={{ width: "52%", backgroundColor: C.negative }} />
              </div>
              <div className="flex justify-between mt-2">
                <span style={{ fontSize: 12, color: C.gray500 }}>711.1억</span>
                <span style={{ fontSize: 12, color: C.gray500 }}>783.6억</span>
              </div>
              <p style={{ fontSize: 12, color: C.gray500, marginTop: 8, textAlign: "center" }}>최근 24시간 동안 매도세가 더 강합니다</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══ MAIN PAGE ══════════════════════════════════ */
export default function Home() {
  const [subTab,    setSubTab]    = useState<SubTab>("주문");
  const [orderTab,  setOrderTab]  = useState<OrderTab>("매수");
  const [orderCond, setOrderCond] = useState<OrderCond>("보통");
  const [isPositive, setIsPositive] = useState(false);

  const priceColor   = isPositive ? C.positive : C.negative;
  const displayPrice = isPositive ? "108,396,000" : "102,002,000";
  const displayPct   = isPositive ? "+1.36%" : "-0.71%";
  const displayDiff  = isPositive ? "+1,456,000" : "-729,000";

  return (
    <div className="min-h-screen flex justify-center" style={{ backgroundColor: C.gray100 }}>
      <div className="w-full max-w-[390px] bg-white flex flex-col" style={{ minHeight: "100dvh" }}>

        {/* ── 1. 네비게이션 바 */}
        <div className="flex items-center justify-between px-4 shrink-0" style={{ height: 44 }}>
          <button className="p-1"><ChevronLeft size={22} strokeWidth={2} style={{ color: C.gray900 }} /></button>
          <button className="flex items-center gap-1">
            <span style={{ fontSize: 17, fontWeight: 700, color: C.gray900 }}>비트코인 (BTC/KRW)</span>
            <ChevronDown size={15} style={{ color: C.gray900 }} />
          </button>
          <div className="flex items-center gap-[18px]">
            <Star size={20} style={{ color: C.gray700 }} />
            <Bell size={20} style={{ color: C.gray700 }} />
            <Share2 size={20} style={{ color: C.gray700 }} />
          </div>
        </div>

        {/* ── 2. 현재가 헤더 */}
        <div className="flex items-start justify-between px-4 pt-1 pb-3 shrink-0">
          <div>
            <div className="flex items-center gap-1">
              <ChevronLeft size={15} style={{ color: C.gray400 }} />
              {/* 클릭 시 양수/음수 토글 (데모) */}
              <button onClick={() => setIsPositive(!isPositive)}>
                <span style={{ fontSize: 28, fontWeight: 700, color: priceColor, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
                  {displayPrice}
                </span>
              </button>
              <ChevronRight size={15} style={{ color: C.gray400 }} />
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span style={{ fontSize: 14, fontWeight: 700, color: priceColor }}>
                {isPositive ? "▲" : "▼"} {displayPct}
              </span>
              <span style={{ fontSize: 14, color: priceColor }}>{displayDiff}</span>
            </div>
          </div>
          {/* 미니 스파크라인 */}
          <div className="overflow-hidden rounded" style={{ width: 100, height: 48, border: `1px solid ${C.gray300}` }}>
            <svg viewBox="0 0 100 40" width="100%" height="100%" preserveAspectRatio="none">
              <polyline
                points="0,30 12,28 22,24 35,26 50,14 62,18 78,11 100,16"
                fill="none" stroke={priceColor} strokeWidth="1.5" strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* ── 3. 레퍼런스 가격 밴드 */}
        <div className="flex items-center px-3 py-[6px] overflow-x-auto whitespace-nowrap shrink-0" style={{ backgroundColor: "#1C1C1E", minHeight: 30 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: "#AAAAAA" }}>COINBASE</span>
          <span style={{ fontSize: 10, color: "#CCCCCC", marginLeft: 6 }}>102,662,590 ($ 69,375.99)</span>
          <span style={{ fontSize: 10, color: "#555555", margin: "0 10px" }}>|</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: "#AAAAAA" }}>BITFINEX</span>
          <span style={{ fontSize: 10, color: "#CCCCCC", marginLeft: 6 }}>102,684,802 ($ 69,391.00)</span>
        </div>

        {/* ── 4. 서브 탭 바 */}
        <div className="flex shrink-0" style={{ backgroundColor: C.brand }}>
          {(["주문", "호가", "차트", "시세", "정보"] as SubTab[]).map((tab) => {
            const active = subTab === tab;
            return (
              <button key={tab} onClick={() => setSubTab(tab)}
                className="flex-1 flex flex-col items-center justify-center relative"
                style={{ height: 44 }}>
                <span style={{ fontSize: 14, fontWeight: active ? 700 : 400, color: "white", opacity: active ? 1 : 0.65 }}>
                  {tab}
                </span>
                {active && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, backgroundColor: "white" }} />}
              </button>
            );
          })}
        </div>

        {/* ── 5. 탭 콘텐츠 */}
        {subTab === "주문" && (
          <OrderPanel
            orderTab={orderTab} setOrderTab={setOrderTab}
            orderCond={orderCond} setOrderCond={setOrderCond}
            isPositive={isPositive}
          />
        )}
        {subTab === "호가" && <HogaPanel priceColor={priceColor} />}
        {subTab === "차트" && <ChartPanel />}
        {subTab === "시세" && <SisePanel />}
        {subTab === "정보" && <InfoPanel />}

        {/* ── 6. 하단 바 (주문 탭 전용) */}
        {subTab === "주문" && (
          <div className="flex shrink-0" style={{ height: 48, borderTop: `1px solid ${C.gray300}`, backgroundColor: "white" }}>
            <button className="flex-1 flex items-center justify-center"
              style={{ fontSize: 13, color: C.gray700, borderRight: `1px solid ${C.gray300}` }}>모아보기</button>
            <button className="flex-1 flex items-center justify-center"
              style={{ fontSize: 13, color: C.gray700 }}>총액</button>
          </div>
        )}
      </div>
    </div>
  );
}
