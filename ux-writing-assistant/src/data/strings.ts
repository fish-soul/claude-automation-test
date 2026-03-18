export interface StringEntry {
  key: string;
  ko: string;
  en: string;
  context: string;
  os: "all" | "ios" | "android";
  type: string;
}

export interface StringCategory {
  id: string;
  label: string;
  entries: StringEntry[];
}

// Helper to convert JSON object to array
function toArray(obj: Record<string, Omit<StringEntry, "key"> & { key: string }>): StringEntry[] {
  return Object.values(obj);
}

const commonStrings: Record<string, StringEntry> = {
  common_yes: { key: "common_yes", ko: "예", en: "", context: "확인/동의 다이얼로그의 긍정 응답. common_no와 쌍으로 사용", os: "all", type: "버튼" },
  common_no: { key: "common_no", ko: "아니요", en: "", context: "확인/동의 다이얼로그의 부정 응답. common_yes와 쌍으로 사용", os: "all", type: "버튼" },
  common_ok: { key: "common_ok", ko: "확인", en: "", context: "단일 액션 얼럿의 닫기/승인 버튼. Primary 스타일 적용", os: "all", type: "버튼" },
  common_cancel: { key: "common_cancel", ko: "취소", en: "", context: "작업 중단 및 이전 상태로 복귀. Secondary 스타일 적용", os: "all", type: "버튼" },
  common_save: { key: "common_save", ko: "저장", en: "", context: "편집 완료 후 데이터 저장. 변경사항 없을 시 비활성화", os: "all", type: "버튼" },
  common_next: { key: "common_next", ko: "다음", en: "", context: "멀티 스텝 플로우에서 다음 단계로 진행", os: "all", type: "버튼" },
  common_later: { key: "common_later", ko: "다음에", en: "", context: "선택적 기능(알림 허용 등)을 나중에 처리하는 스킵 버튼", os: "all", type: "버튼" },
  common_logout: { key: "common_logout", ko: "로그아웃", en: "", context: "계정 세션 종료. 확인 얼럿 선행 필요", os: "all", type: "버튼" },
  common_cs: { key: "common_cs", ko: "고객센터", en: "", context: "고객센터 화면 이동 또는 외부 링크 연결", os: "all", type: "버튼" },
  common_more: { key: "common_more", ko: "더보기", en: "", context: "목록 또는 콘텐츠의 추가 항목 로드", os: "all", type: "버튼" },
  common_copy: { key: "common_copy", ko: "복사", en: "", context: "주소·해시 등 텍스트를 클립보드에 복사", os: "all", type: "버튼" },
  common_receive: { key: "common_receive", ko: "받기", en: "", context: "토큰/NFT 수신 플로우 진입. 홈·상세 화면 사용", os: "all", type: "버튼" },
  common_send: { key: "common_send", ko: "보내기", en: "", context: "토큰/NFT 전송 플로우 진입. 홈·상세 화면 사용", os: "all", type: "버튼" },
  common_close: { key: "common_close", ko: "닫기", en: "", context: "바텀시트·모달 닫기. 우측 상단 또는 하단 배치", os: "all", type: "버튼" },
  common_retry: { key: "common_retry", ko: "다시 시도", en: "", context: "오류 발생 후 동일 요청 재시도", os: "all", type: "버튼" },
  common_delete: { key: "common_delete", ko: "삭제", en: "", context: "항목 삭제. 확인 얼럿 선행 필요. Destructive 스타일", os: "all", type: "버튼" },
  common_refresh: { key: "common_refresh", ko: "새로고침", en: "", context: "현재 화면 데이터 수동 갱신", os: "all", type: "버튼" },
  common_share: { key: "common_share", ko: "공유하기", en: "", context: "OS 공유 시트(Share Sheet) 호출", os: "all", type: "버튼" },
  common_connect: { key: "common_connect", ko: "연결", en: "", context: "A2A/WalletConnect 서비스 연결 요청 승인", os: "all", type: "버튼" },
  common_history: { key: "common_history", ko: "거래내역", en: "", context: "거래내역 화면 또는 섹션 제목", os: "all", type: "제목" },
  history_none: { key: "history_none", ko: "거래내역이 없어요.", en: "", context: "거래내역 목록 빈 상태(Empty State) 안내 문구", os: "all", type: "본문" },
  history_sending: { key: "history_sending", ko: "보내는 중", en: "", context: "트랜잭션 제출 후 블록 확인 대기 중 상태", os: "all", type: "캡션" },
  history_sendDone: { key: "history_sendDone", ko: "보내기 완료", en: "", context: "전송 트랜잭션 블록 확정 완료", os: "all", type: "캡션" },
  history_sendFail: { key: "history_sendFail", ko: "보내기 실패", en: "", context: "전송 트랜잭션 실패 또는 리버트. 오류 색상 적용 권장", os: "all", type: "캡션" },
  history_receiveDone: { key: "history_receiveDone", ko: "받기 완료", en: "", context: "수신 트랜잭션 블록 확정 완료", os: "all", type: "캡션" },
  common_copyDone: { key: "common_copyDone", ko: "클립보드에 복사했어요.", en: "", context: "복사 성공 피드백. 자동 노출 후 사라짐(일반적으로 2~3초)", os: "all", type: "스낵바" },
  common_bio: { key: "common_bio", ko: "생체 인증", en: "", context: "생체 인증 관련 화면 제목 또는 섹션 레이블", os: "all", type: "제목" },
  common_loading: { key: "common_loading", ko: "불러오는 중", en: "", context: "데이터 로딩 중 상태 표시. 스피너와 함께 사용", os: "all", type: "캡션" },
  common_done: { key: "common_done", ko: "완료", en: "", context: "일반적인 처리 완료 상태 표시", os: "all", type: "본문" },
  common_spam: { key: "common_spam", ko: "사기주의", en: "", context: "스팸·사기 의심 토큰/NFT에 표시하는 경고 레이블. 경고 색상 적용 필수", os: "all", type: "본문" },
};

const authStrings: Record<string, StringEntry> = {
  error_fingerprint_fail_title: { key: "error_fingerprint_fail_title", ko: "지문 인식에 실패했어요", en: "", context: "지문 인식 실패 시 표시하는 얼럿 팝업 제목. 마침표 없음.", os: "android", type: "제목" },
  error_fingerprint_fail_body: { key: "error_fingerprint_fail_body", ko: "등록한 손가락을 센서에 다시 올려 주세요. 최대 5회까지 시도할 수 있어요.", en: "", context: "지문 인식 실패 얼럿 본문. 재시도 안내 + 긍정 프레이밍으로 최대 횟수 안내.", os: "android", type: "본문" },
  error_fingerprint_fail_btn_primary: { key: "error_fingerprint_fail_btn_primary", ko: "다시 시도", en: "", context: "지문 인식 실패 얼럿 Primary 버튼. 지문 재시도 유도. 10자 이내.", os: "android", type: "버튼" },
  error_fingerprint_fail_btn_secondary: { key: "error_fingerprint_fail_btn_secondary", ko: "비밀번호로 인증", en: "", context: "지문 인식 실패 얼럿 Secondary 버튼. 비밀번호(PIN) 인증 화면으로 대안 이동.", os: "android", type: "버튼" },
};

const sendStrings: Record<string, StringEntry> = {
  error_insufficient_balance_title: { key: "error_insufficient_balance_title", ko: "잔액이 부족해요", en: "", context: "잔액 부족으로 전송 또는 서비스 이용 요청이 중단됐을 때 표시하는 얼럿 팝업 제목.", os: "all", type: "제목" },
  error_insufficient_balance_body: { key: "error_insufficient_balance_body", ko: "전송에 필요한 잔액이 부족해요. 잔액을 채운 후 다시 시도해 주세요.", en: "", context: "잔액 부족 얼럿의 본문. 원인(잔액 부족) + 해결책(충전 후 재시도) 제시.", os: "all", type: "본문" },
  error_insufficient_balance_btn_primary: { key: "error_insufficient_balance_btn_primary", ko: "충전하기", en: "", context: "잔액 부족 얼럿의 Primary 버튼. 충전 화면으로 이동 유도. 10자 이내.", os: "all", type: "버튼" },
  error_insufficient_balance_btn_secondary: { key: "error_insufficient_balance_btn_secondary", ko: "닫기", en: "", context: "잔액 부족 얼럿의 Secondary 버튼. 팝업 종료.", os: "all", type: "버튼" },
};

export const stringsCategories: StringCategory[] = [
  {
    id: "common",
    label: "공통 (Common)",
    entries: Object.values(commonStrings),
  },
  {
    id: "auth",
    label: "인증 (Auth)",
    entries: Object.values(authStrings),
  },
  {
    id: "send",
    label: "전송 (Send)",
    entries: Object.values(sendStrings),
  },
];

export const STRING_TYPES = ["버튼", "제목", "본문", "캡션", "스낵바", "탭 레이블", "단위", "컬럼 레이블", "본문", "필터 버튼"];
export const OS_OPTIONS = ["all", "ios", "android"] as const;
