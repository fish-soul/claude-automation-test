/**
 * Design Tokens — KRDS v1.0.0 (Korean Government Design System)
 * Source: Figma BVE5n9vgrgkYr0JiWPr7hh / 스타일가이드_색상, 타이포그래피, 형태
 * Method: REST API fill/stroke 파싱 → 경로명 기반 매핑
 * Generated: 2026-03-24
 */

export const colors = {
  primary: {
    5:  '#ecf2fe', 10: '#d8e5fd', 20: '#b1cefb', 30: '#86aff9',
    40: '#4c87f6', 50: '#256ef4', 60: '#0b50d0', 70: '#083891',
    80: '#052561', 90: '#03163a', 95: '#020f27',
  },
  secondary: {
    5:  '#eef2f7', 10: '#d6e0eb', 20: '#bacbde', 30: '#90b0d5',
    40: '#6b96c7', 50: '#346fb2', 60: '#1c589c', 70: '#063a74',
    80: '#052b57', 90: '#031f3f', 95: '#02162c',
  },
  accent: {
    5:  '#fbeff0', 10: '#f5d6d9', 20: '#ebadb2', 30: '#e0858c',
    40: '#d65c66', 50: '#d63d4a', 60: '#ab2b36', 70: '#7a1f26',
    80: '#521419', 90: '#310c0f', 95: '#21080a',
  },
  success: {
    5:  '#eaf6ec', 10: '#d8eedd', 20: '#a9dab4', 30: '#7ec88e',
    40: '#3fa654', 50: '#228738', 60: '#267337', 70: '#285d33',
    80: '#1f4727', 90: '#122b18', 95: '#0e2012',
  },
  warning: {
    5:  '#fff3db', 10: '#ffe0a3', 20: '#ffc95c', 30: '#ffb114',
    40: '#c78500', 50: '#9e6a00', 60: '#8a5c00', 70: '#614100',
    80: '#422c00', 90: '#2e1f00', 95: '#241800',
  },
  danger: {
    5:  '#fdefec', 10: '#fcdfd9', 20: '#f7afa1', 30: '#f48771',
    40: '#f05f42', 50: '#de3412', 60: '#bd2c0f', 70: '#8a240f',
    80: '#5c180a', 90: '#390d05', 95: '#260903',
  },
  info: {
    5:  '#e7f4fe', 10: '#d3ebfd', 20: '#9ed2fa', 30: '#5fb5f7',
    40: '#2098f3', 50: '#0b78cb', 60: '#096ab3', 70: '#085691',
    80: '#053961', 90: '#03253f', 95: '#021a2c',
  },
  highContrast: {
    5:  '#edf6f8', 10: '#d5ebf1', 20: '#abd8e3', 30: '#75c0d1',
    40: '#3d9fb8', 50: '#268097', 60: '#1f687a', 70: '#17505e',
    80: '#113b45', 90: '#0e3139', 95: '#091f25',
  },
  gray: {
    1:  '#1e2124', 2:  '#33363d', 3:  '#464c53', 4:  '#58616a',
    5:  '#6d7882', 6:  '#8a949e', 7:  '#b1b8be', 8:  '#cdd1d5',
    9:  '#e6e8ea', 10: '#f4f5f6', 13: '#ffffff',
  },
} as const;

export const semantic = {
  background:    '#ffffff',
  surface:       colors.gray[10],
  onSurface:     colors.gray[1],
  textPrimary:   colors.gray[1],
  textSecondary: colors.gray[4],
  textDisabled:  colors.gray[7],
  border:        colors.gray[9],
  borderStrong:  colors.gray[7],
} as const;

export const typography = {
  fontFamily: "'Pretendard GOV', -apple-system, sans-serif",
  fontWeight: { regular: 400, bold: 700 },
  display: {
    large:  { fontSize: 60, lineHeight: 90 },
    medium: { fontSize: 44, lineHeight: 66 },
    small:  { fontSize: 36, lineHeight: 54 },
  },
  heading: {
    xlarge:  { fontSize: 40, lineHeight: 60,   fontWeight: 700 },
    large:   { fontSize: 32, lineHeight: 48,   fontWeight: 700 },
    medium:  { fontSize: 24, lineHeight: 36,   fontWeight: 700 },
    small:   { fontSize: 19, lineHeight: 28.5, fontWeight: 700 },
    xsmall:  { fontSize: 17, lineHeight: 25.5, fontWeight: 700 },
    xxsmall: { fontSize: 15, lineHeight: 22.5, fontWeight: 700 },
  },
  body: {
    large:  { fontSize: 19, lineHeight: 28.5, fontWeight: 400 },
    medium: { fontSize: 17, lineHeight: 25.5, fontWeight: 400 },
    small:  { fontSize: 15, lineHeight: 22.5, fontWeight: 400 },
    xsmall: { fontSize: 13, lineHeight: 19.5, fontWeight: 400 },
  },
} as const;

export const shape = {
  radius: { base: 12 },
} as const;

export type ColorScale = keyof typeof colors;
