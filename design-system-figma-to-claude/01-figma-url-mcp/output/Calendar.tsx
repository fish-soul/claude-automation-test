'use client';

import { useState } from 'react';

// ── KRDS 디자인 토큰 (plugin-export-variables.json 기반) ──
const tokens = {
  color: {
    primary: '#256ef4',
    primaryDark: '#063a74',
    surfaceSecondarySubtler: '#eef2f7',
    borderSecondaryLight: '#d6e0eb',
    borderGrayLight: '#cdd1d5',
    textBasic: '#1e2124',
    textSubtle: '#464c53',
    textDisabled: '#8a949e',
    textInverse: '#ffffff',
    elementPoint: '#d63d4a',
    buttonTertiaryBorder: '#58616a',
    white: '#ffffff',
  },
} as const;

// ── Types ──
type CalendarType = 'day' | 'period';

type DayState = 'default' | 'today' | 'selected' | 'disabled' | 'rangeStart' | 'rangeEnd' | 'inRange';

interface CalendarProps {
  type?: CalendarType;
  defaultValue?: Date | null;
  defaultStartDate?: Date | null;
  defaultEndDate?: Date | null;
  onSelect?: (date: Date) => void;
  onRangeSelect?: (start: Date, end: Date) => void;
  onCancel?: () => void;
  showFooter?: boolean;
}

// ── Helpers ──
const DAYS_KO = ['일', '월', '화', '수', '목', '금', '토'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function isBetween(date: Date, start: Date, end: Date) {
  const d = date.getTime();
  return d > start.getTime() && d < end.getTime();
}

function formatYearMonth(year: number, month: number) {
  return `${year}년 ${month + 1}월`;
}

// ── DayCell ──
function DayCell({
  date,
  state,
  hasEvent,
  onClick,
}: {
  date: number;
  state: DayState;
  hasEvent?: boolean;
  onClick?: () => void;
}) {
  const isDisabled = state === 'disabled';
  const isSelected = state === 'selected' || state === 'rangeStart' || state === 'rangeEnd';
  const isInRange = state === 'inRange';
  const isToday = state === 'today';

  const cellStyle: React.CSSProperties = {
    width: 44,
    height: 44,
    borderRadius: isInRange ? 0 : 1000,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: isDisabled ? 'default' : 'pointer',
    flexShrink: 0,
    position: 'relative',
    backgroundColor: isSelected
      ? tokens.color.primaryDark
      : isToday
      ? tokens.color.white
      : isInRange
      ? tokens.color.white
      : 'transparent',
    ...(state === 'rangeStart' && { borderRadius: '1000px 0 0 1000px' }),
    ...(state === 'rangeEnd' && { borderRadius: '0 1000px 1000px 0' }),
  };

  const textStyle: React.CSSProperties = {
    fontFamily: "'Pretendard GOV', -apple-system, sans-serif",
    fontSize: 17,
    fontWeight: 400,
    lineHeight: 1.5,
    color: isSelected
      ? tokens.color.textInverse
      : isDisabled
      ? tokens.color.textDisabled
      : tokens.color.textBasic,
    opacity: isDisabled ? 1 : isSelected ? 1 : 0.8,
    textAlign: 'center',
  };

  return (
    <div style={cellStyle} onClick={isDisabled ? undefined : onClick}>
      <span style={textStyle}>{date}</span>
      {hasEvent && !isSelected && (
        <div
          style={{
            width: 4,
            height: 4,
            borderRadius: 1000,
            backgroundColor: tokens.color.elementPoint,
            marginTop: 2,
          }}
        />
      )}
    </div>
  );
}

// ── ArrowButton ──
function ArrowButton({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 32,
        height: 32,
        borderRadius: 800,
        border: `0.8px solid ${tokens.color.borderGrayLight}`,
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        {direction === 'left' ? (
          <path d="M8 1L3 6L8 11" stroke={tokens.color.textBasic} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M4 1L9 6L4 11" stroke={tokens.color.textBasic} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

// ── HeaderSelect ──
function HeaderSelect({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        height: 40,
        padding: '0 8px',
        borderRadius: 6,
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
      }}
    >
      <span
        style={{
          fontFamily: "'Pretendard GOV', -apple-system, sans-serif",
          fontSize: 19,
          fontWeight: 700,
          lineHeight: 1.5,
          color: tokens.color.textBasic,
        }}
      >
        {label}
      </span>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 6L8 10L12 6" stroke={tokens.color.textBasic} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

// ── Main Calendar ──
export default function Calendar({
  type = 'day',
  defaultValue = null,
  defaultStartDate = null,
  defaultEndDate = null,
  onSelect,
  onRangeSelect,
  onCancel,
  showFooter = true,
}: CalendarProps) {
  const today = new Date();

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  // day mode
  const [selectedDate, setSelectedDate] = useState<Date | null>(defaultValue);

  // period mode
  const [rangeStart, setRangeStart] = useState<Date | null>(defaultStartDate);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(defaultEndDate);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const isPeriod = type === 'period';

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const goToday = () => {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    if (!isPeriod) setSelectedDate(today);
  };

  const handleDayClick = (date: Date) => {
    if (!isPeriod) {
      setSelectedDate(date);
    } else {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        setRangeStart(date);
        setRangeEnd(null);
      } else {
        if (date < rangeStart) {
          setRangeEnd(rangeStart);
          setRangeStart(date);
        } else {
          setRangeEnd(date);
        }
      }
    }
  };

  const handleConfirm = () => {
    if (!isPeriod && selectedDate) onSelect?.(selectedDate);
    if (isPeriod && rangeStart && rangeEnd) onRangeSelect?.(rangeStart, rangeEnd);
  };

  // 날짜 상태 계산
  const getDayState = (date: Date): DayState => {
    if (!isPeriod) {
      if (selectedDate && isSameDay(date, selectedDate)) return 'selected';
      if (isSameDay(date, today)) return 'today';
      return 'default';
    } else {
      const effectiveEnd = rangeEnd ?? hoverDate;
      if (rangeStart && isSameDay(date, rangeStart)) return 'rangeStart';
      if (effectiveEnd && rangeStart && isSameDay(date, effectiveEnd) && !isSameDay(date, rangeStart)) return 'rangeEnd';
      if (rangeStart && effectiveEnd && isBetween(date, rangeStart, effectiveEnd)) return 'inRange';
      if (isSameDay(date, today)) return 'today';
      return 'default';
    }
  };

  // 주(week) 배열 생성
  const buildWeeks = () => {
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const prevMonthDays = getDaysInMonth(viewYear, viewMonth - 1 < 0 ? 11 : viewMonth - 1);

    const cells: Array<{ date: Date; outOfMonth: boolean }> = [];

    // 이전 달
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = prevMonthDays - i;
      const m = viewMonth === 0 ? 11 : viewMonth - 1;
      const y = viewMonth === 0 ? viewYear - 1 : viewYear;
      cells.push({ date: new Date(y, m, d), outOfMonth: true });
    }

    // 이번 달
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ date: new Date(viewYear, viewMonth, d), outOfMonth: false });
    }

    // 다음 달 (6주 고정)
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      const m = viewMonth === 11 ? 0 : viewMonth + 1;
      const y = viewMonth === 11 ? viewYear + 1 : viewYear;
      cells.push({ date: new Date(y, m, d), outOfMonth: true });
    }

    // 6주로 분할
    const weeks: typeof cells[] = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
    return weeks;
  };

  const weeks = buildWeeks();

  // range 배경 렌더링용 (inRange 행의 좌우 연결 배경)
  const effectiveEnd = rangeEnd ?? (isPeriod && rangeStart ? hoverDate : null);

  return (
    <div
      style={{
        width: 384,
        background: tokens.color.surfaceSecondarySubtler,
        border: `1px solid ${tokens.color.borderSecondaryLight}`,
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        fontFamily: "'Pretendard GOV', -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          padding: '8px 24px',
          borderBottom: `1px solid ${tokens.color.borderGrayLight}`,
        }}
      >
        <ArrowButton direction="left" onClick={prevMonth} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <HeaderSelect label={`${viewYear}년`} />
          <HeaderSelect label={`${viewMonth + 1}월`} />
        </div>
        <ArrowButton direction="right" onClick={nextMonth} />
      </div>

      {/* Days of week */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '16px 16px 0',
        }}
      >
        {DAYS_KO.map(day => (
          <div
            key={day}
            style={{
              width: 44,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
              fontWeight: 400,
              color: tokens.color.textBasic,
              lineHeight: 1.5,
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Month label */}
      <div
        style={{
          width: '100%',
          padding: '8px 16px 0',
        }}
      >
        <span
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: tokens.color.textSubtle,
            lineHeight: 1.5,
          }}
        >
          {formatYearMonth(viewYear, viewMonth)}
        </span>
      </div>

      {/* Weeks */}
      <div
        style={{
          width: '100%',
          padding: '8px 16px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {weeks.map((week, wi) => (
          <div
            key={wi}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onMouseLeave={() => setHoverDate(null)}
          >
            {/* Range 연결 배경 */}
            {isPeriod && rangeStart && effectiveEnd && (() => {
              const weekDates = week.map(c => c.date.getTime());
              const startT = rangeStart.getTime();
              const endT = effectiveEnd.getTime();
              const hasRange = weekDates.some(t => t > startT && t < endT);
              if (!hasRange) return null;

              const firstInRange = week.findIndex(c => c.date.getTime() >= startT);
              const lastInRange = week.slice().reverse().findIndex(c => c.date.getTime() <= endT);
              const lastIdx = week.length - 1 - lastInRange;

              const leftPct = (firstInRange / 7) * 100;
              const rightPct = ((6 - lastIdx) / 7) * 100;

              return (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: `${leftPct}%`,
                    right: `${rightPct}%`,
                    height: 44,
                    background: tokens.color.white,
                    pointerEvents: 'none',
                  }}
                />
              );
            })()}

            {week.map((cell, di) => {
              const state = cell.outOfMonth ? 'disabled' : getDayState(cell.date);
              return (
                <div
                  key={di}
                  style={{ position: 'relative', zIndex: 1 }}
                  onMouseEnter={() => isPeriod && rangeStart && !rangeEnd ? setHoverDate(cell.date) : undefined}
                >
                  <DayCell
                    date={cell.date.getDate()}
                    state={state}
                    hasEvent={!cell.outOfMonth && isSameDay(cell.date, new Date(viewYear, viewMonth, 4))} // 예시 이벤트
                    onClick={() => !cell.outOfMonth && handleDayClick(cell.date)}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Period Input */}
      {isPeriod && (
        <div
          style={{
            width: '100%',
            padding: 16,
            borderTop: `1px solid ${tokens.color.borderGrayLight}`,
            background: tokens.color.white,
            display: 'flex',
            gap: 4,
            alignItems: 'flex-end',
          }}
        >
          {[
            { label: '시작일', date: rangeStart },
            { label: '종료일', date: rangeEnd },
          ].map((field, i) => (
            <>
              {i === 1 && (
                <div style={{ width: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: 20 }}>
                  <div style={{ height: 1, width: '100%', background: tokens.color.textSubtle }} />
                </div>
              )}
              <div key={field.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 15, color: tokens.color.textSubtle, lineHeight: 1.5 }}>{field.label}</span>
                <div
                  style={{
                    height: 40,
                    border: `1px solid ${tokens.color.buttonTertiaryBorder}`,
                    borderRadius: 6,
                    background: tokens.color.white,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    fontSize: 15,
                    color: field.date ? tokens.color.textBasic : tokens.color.textDisabled,
                    lineHeight: 1.5,
                  }}
                >
                  {field.date
                    ? `${field.date.getFullYear()}.${String(field.date.getMonth() + 1).padStart(2, '0')}.${String(field.date.getDate()).padStart(2, '0')}`
                    : 'YYYY.MM.DD'}
                </div>
              </div>
            </>
          ))}
        </div>
      )}

      {/* Footer */}
      {showFooter && (
        <div
          style={{
            width: '100%',
            padding: '16px 24px',
            borderTop: `1px solid ${tokens.color.borderGrayLight}`,
            background: tokens.color.white,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {/* 오늘 버튼 */}
          <button
            onClick={goToday}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: 15,
              fontWeight: 400,
              color: tokens.color.textBasic,
              cursor: 'pointer',
              padding: '2px 2px',
              fontFamily: "'Pretendard GOV', -apple-system, sans-serif",
            }}
          >
            오늘
          </button>

          {/* 취소/선택 */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button
              onClick={onCancel}
              style={{
                width: 64,
                height: 40,
                borderRadius: 6,
                border: `1px solid ${tokens.color.buttonTertiaryBorder}`,
                background: 'transparent',
                fontSize: 15,
                color: tokens.color.textBasic,
                cursor: 'pointer',
                fontFamily: "'Pretendard GOV', -apple-system, sans-serif",
              }}
            >
              취소
            </button>
            <button
              onClick={handleConfirm}
              style={{
                width: 64,
                height: 40,
                borderRadius: 6,
                border: 'none',
                background: tokens.color.primary,
                fontSize: 15,
                color: tokens.color.textInverse,
                cursor: 'pointer',
                fontFamily: "'Pretendard GOV', -apple-system, sans-serif",
              }}
            >
              선택
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
