export interface GlossaryEntry {
  forbidden: string[];
  recommended: string;
  category: string;
  context: string;
}

export const glossaryData: GlossaryEntry[] = [
  // 1. 자산 및 기본 명칭
  {
    forbidden: ["암호화폐", "가상화폐", "코인"],
    recommended: "가상자산",
    category: "자산 및 기본 명칭",
    context: "법적, 공식적 안내문 및 약관에서 사용 (단, UI의 좁은 버튼/탭에서는 '코인/토큰' 허용)",
  },
  {
    forbidden: ["캐시", "현금", "원화"],
    recommended: "원화(KRW)",
    category: "자산 및 기본 명칭",
    context: "화폐 단위를 명확히 지칭할 때 사용",
  },
  {
    forbidden: ["어카운트", "계정"],
    recommended: "계정",
    category: "자산 및 기본 명칭",
    context: "로그인 및 가입 주체를 의미할 때",
  },
  {
    forbidden: ["월렛", "내 지갑"],
    recommended: "지갑",
    category: "자산 및 기본 명칭",
    context: "자산을 보관하는 공간을 통칭할 때",
  },

  // 2. 거래 및 입출금 액션
  {
    forbidden: ["충전하기", "넣기"],
    recommended: "입금",
    category: "거래 및 입출금 액션",
    context: "외부에서 내 지갑/계정으로 자산을 가져올 때",
  },
  {
    forbidden: ["빼기", "송금하기"],
    recommended: "출금",
    category: "거래 및 입출금 액션",
    context: "내 지갑/계정에서 외부로 자산을 내보낼 때",
  },
  {
    forbidden: ["보내기"],
    recommended: "전송",
    category: "거래 및 입출금 액션",
    context: "블록체인 네트워크를 통해 토큰/NFT를 이동시킬 때",
  },
  {
    forbidden: ["매입", "산다", "구매"],
    recommended: "매수",
    category: "거래 및 입출금 액션",
    context: "마켓에서 원화나 다른 코인으로 가상자산을 살 때",
  },
  {
    forbidden: ["매각", "판다", "판매"],
    recommended: "매도",
    category: "거래 및 입출금 액션",
    context: "보유한 가상자산을 팔아 원화나 다른 코인으로 바꿀 때",
  },

  // 3. 상태 및 결과
  {
    forbidden: ["대기 중", "처리 중"],
    recommended: "진행 중",
    category: "상태 및 결과",
    context: "트랜잭션이나 주문이 아직 완료되지 않은 상태",
  },
  {
    forbidden: ["성공", "끝남"],
    recommended: "완료",
    category: "상태 및 결과",
    context: "트랜잭션이나 행동이 정상적으로 끝난 상태",
  },
  {
    forbidden: ["에러", "오류", "취소됨"],
    recommended: "실패",
    category: "상태 및 결과",
    context: "트랜잭션이 거절되거나 정상 처리되지 않은 상태",
  },
  {
    forbidden: ["안 팔림", "안 사짐"],
    recommended: "미체결",
    category: "상태 및 결과",
    context: "매수/매도 주문이 아직 시장에서 거래되지 않은 상태",
  },
  {
    forbidden: ["팔림", "사짐"],
    recommended: "체결",
    category: "상태 및 결과",
    context: "매수/매도 주문이 시장에서 거래가 완료된 상태",
  },

  // 4. UI/UX 내비게이션 용어
  {
    forbidden: ["마이페이지", "내 설정"],
    recommended: "내 정보",
    category: "UI/UX 내비게이션",
    context: "유저의 프로필 및 개인 설정을 관리하는 메뉴",
  },
  {
    forbidden: ["히스토리", "기록"],
    recommended: "내역",
    category: "UI/UX 내비게이션",
    context: "입출금 내역, 거래 내역 등을 표기할 때",
  },
  {
    forbidden: ["알람"],
    recommended: "알림",
    category: "UI/UX 내비게이션",
    context: "푸시 메시지나 서비스 내 노티피케이션 창을 지칭할 때",
  },
];

export const glossaryCategories = [
  "자산 및 기본 명칭",
  "거래 및 입출금 액션",
  "상태 및 결과",
  "UI/UX 내비게이션",
];

export function getAllForbiddenWords(): string[] {
  return glossaryData.flatMap((entry) => entry.forbidden);
}
