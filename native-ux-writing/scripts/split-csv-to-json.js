#!/usr/bin/env node
/**
 * split-csv-to-json.js
 *
 * CSV 파일을 읽어 strings/ 하위 9개 폴더의 texts.json으로 자동 분리하는 스크립트.
 *
 * [CSV 컬럼 형식]
 * section, key, ko, en, context, os, type
 *
 * [section 값 → 폴더 매핑]
 * common       → 01-common
 * auth         → 02-auth
 * onboarding   → 03-onboarding
 * home         → 04-home
 * token        → 05-token
 * nft          → 06-nft
 * more         → 07-more
 * send         → 08-send
 * a2a          → 09-a2a
 *
 * [사용법]
 * node scripts/split-csv-to-json.js <input.csv>
 * node scripts/split-csv-to-json.js strings.csv
 * node scripts/split-csv-to-json.js strings.csv --dry-run   # 파일 저장 없이 결과만 출력
 */

const fs = require('fs');
const path = require('path');

// ─── 설정 ───────────────────────────────────────────────────────────────────

const SECTION_MAP = {
  common: '01-common',
  auth: '02-auth',
  onboarding: '03-onboarding',
  home: '04-home',
  token: '05-token',
  nft: '06-nft',
  more: '07-more',
  send: '08-send',
  a2a: '09-a2a',
};

const VALID_OS_VALUES = ['all', 'ios', 'android'];
const VALID_TYPE_VALUES = ['label', 'button', 'title', 'description', 'error', 'placeholder', 'toast'];
const STRINGS_DIR = path.resolve(__dirname, '..', 'strings');

// ─── 유틸리티 ────────────────────────────────────────────────────────────────

function parseCSV(content) {
  const lines = content.trim().split('\n');
  if (lines.length < 2) throw new Error('CSV 파일에 헤더와 데이터가 필요합니다.');

  const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // 쌍따옴표로 감싸진 필드(쉼표 포함 가능) 처리
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let c = 0; c < line.length; c++) {
      const char = line[c];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const row = {};
    headers.forEach((header, idx) => {
      row[header] = values[idx] !== undefined ? values[idx] : '';
    });
    rows.push(row);
  }

  return rows;
}

function validateRow(row, lineNum) {
  const errors = [];

  if (!row.section || !SECTION_MAP[row.section]) {
    errors.push(`section 값이 올바르지 않습니다: "${row.section}" (유효값: ${Object.keys(SECTION_MAP).join(', ')})`);
  }
  if (!row.key) errors.push('key가 비어 있습니다');
  if (!row.ko) errors.push('ko(한국어) 텍스트가 비어 있습니다');
  if (!row.en) errors.push('en(영어) 텍스트가 비어 있습니다');
  if (row.os && !VALID_OS_VALUES.includes(row.os)) {
    errors.push(`os 값이 올바르지 않습니다: "${row.os}" (유효값: ${VALID_OS_VALUES.join(', ')})`);
  }
  if (row.type && !VALID_TYPE_VALUES.includes(row.type)) {
    errors.push(`type 값이 올바르지 않습니다: "${row.type}" (유효값: ${VALID_TYPE_VALUES.join(', ')})`);
  }

  if (errors.length > 0) {
    console.warn(`⚠️  [행 ${lineNum}] key="${row.key}"`);
    errors.forEach((e) => console.warn(`   - ${e}`));
  }

  return errors.length === 0;
}

// ─── 메인 ────────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const csvPath = args.find((a) => !a.startsWith('--'));

  if (!csvPath) {
    console.error('사용법: node scripts/split-csv-to-json.js <input.csv> [--dry-run]');
    process.exit(1);
  }

  if (!fs.existsSync(csvPath)) {
    console.error(`파일을 찾을 수 없습니다: ${csvPath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(csvPath, 'utf-8');
  let rows;
  try {
    rows = parseCSV(content);
  } catch (e) {
    console.error(`CSV 파싱 오류: ${e.message}`);
    process.exit(1);
  }

  console.log(`\n총 ${rows.length}개 행 처리 시작...\n`);

  // 섹션별로 그룹화
  const grouped = {};
  let validCount = 0;
  let errorCount = 0;

  rows.forEach((row, idx) => {
    const isValid = validateRow(row, idx + 2); // +2: 헤더 행 + 1-indexed
    if (!isValid) { errorCount++; return; }

    const folder = SECTION_MAP[row.section];
    if (!grouped[folder]) grouped[folder] = [];

    grouped[folder].push({
      key: row.key,
      ko: row.ko,
      en: row.en,
      context: row.context || '',
      os: row.os || 'all',
      type: row.type || 'label',
    });

    validCount++;
  });

  // 결과 출력 및 저장
  console.log('─'.repeat(50));
  Object.entries(grouped).forEach(([folder, entries]) => {
    const outputPath = path.join(STRINGS_DIR, folder, 'texts.json');
    const json = JSON.stringify(entries, null, 2);

    if (dryRun) {
      console.log(`\n[DRY RUN] ${outputPath} (${entries.length}개 항목)`);
    } else {
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
      fs.writeFileSync(outputPath, json, 'utf-8');
      console.log(`✅  ${folder}/texts.json — ${entries.length}개 항목 저장 완료`);
    }
  });

  console.log('─'.repeat(50));
  console.log(`\n완료: 유효 ${validCount}개 / 오류 ${errorCount}개`);

  if (errorCount > 0) {
    console.warn('\n위의 경고 항목을 수정 후 다시 실행해 주세요.');
    process.exit(1);
  }
}

main();
