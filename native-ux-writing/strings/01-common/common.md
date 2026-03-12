# Common Strings

> 출처: `claudeTest_String_Common.xlsx - Native v2.8.0.csv`
> 앱 전반에서 재사용되는 공통 UI 텍스트를 카테고리별로 정리한 문서입니다.

---

## 공통 버튼

| Key | 한국어 문구 | UI 분류 | 맥락 및 제약 조건 |
|-----|------------|---------|-----------------|
| common_yes | 예 | 버튼 | 확인/동의 다이얼로그의 긍정 응답. `common_no`와 쌍으로 사용 |
| common_no | 아니요 | 버튼 | 확인/동의 다이얼로그의 부정 응답. `common_yes`와 쌍으로 사용 |
| common_ok | 확인 | 버튼 | 단일 액션 얼럿의 닫기/승인 버튼. Primary 스타일 적용 |
| common_cancel | 취소 | 버튼 | 작업 중단 및 이전 상태로 복귀. Secondary 스타일 적용 |
| common_save | 저장 | 버튼 | 편집 완료 후 데이터 저장. 변경사항 없을 시 비활성화 |
| common_next | 다음 | 버튼 | 멀티 스텝 플로우에서 다음 단계로 진행 |
| common_later | 다음에 | 버튼 | 선택적 기능(알림 허용 등)을 나중에 처리하는 스킵 버튼 |
| common_logout | 로그아웃 | 버튼 | 계정 세션 종료. 확인 얼럿 선행 필요 |
| common_update | 업데이트 | 버튼 | 앱 강제/선택 업데이트 유도 화면에서 사용 |
| common_cs | 고객센터 | 버튼 | 고객센터 화면 이동 또는 외부 링크 연결 |
| common_verify | 본인인증 | 버튼 | 본인인증 플로우 진입 CTA |
| common_more | 더보기 | 버튼 | 목록 또는 콘텐츠의 추가 항목 로드 |
| common_showAll | 전체 보기 | 버튼 | 축약된 목록을 전체 화면으로 전환 |
| common_showDetail | 자세히 보기 | 버튼 | 상세 정보 화면으로 이동 |
| common_move | 이동 | 버튼 | 특정 화면 또는 섹션으로 이동 |
| common_use | 사용 | 버튼 | 기능 또는 아이템 사용 처리 (짧은 형태) |
| common_useNft | 사용하기 | 버튼 | NFT 티켓/쿠폰 등의 사용 처리 CTA |
| common_add | 추가 | 버튼 | 항목(토큰, 주소 등) 추가. 아이콘과 병행 사용 가능 |
| common_copy | 복사 | 버튼 | 주소·해시 등 텍스트를 클립보드에 복사 |
| common_exchange | 교환하기 | 버튼 | 토큰 스왑/교환 플로우 진입 CTA |
| common_receive | 받기 | 버튼 | 토큰/NFT 수신 플로우 진입. 홈·상세 화면 사용 |
| common_send | 보내기 | 버튼 | 토큰/NFT 전송 플로우 진입. 홈·상세 화면 사용 |
| common_tokenSend | 토큰 보내기 | 버튼 | NFT 상세 등에서 토큰 전송을 명시적으로 구분할 때 사용 |
| common_cantSend | 보내기 불가 | 버튼 | 미지원 네트워크 등 전송 불가 상태의 비활성 버튼 |
| common_sell | 판매하기 | 버튼 | NFT 마켓플레이스 연동 판매 플로우 진입 CTA |
| common_close | 닫기 | 버튼 | 바텀시트·모달 닫기. 우측 상단 또는 하단 배치 |
| common_deleteNft | 삭제하기 | 버튼 | NFT 삭제 액션. 확인 얼럿 선행 필요. Destructive 스타일 |
| common_share | 공유하기 | 버튼 | OS 공유 시트(Share Sheet) 호출 |
| common_retry | 다시 시도 | 버튼 | 오류 발생 후 동일 요청 재시도 |
| common_delete | 삭제 | 버튼 | 항목 삭제. 확인 얼럿 선행 필요. Destructive 스타일 |
| common_edit | 변경 | 버튼 | 정보 수정 모드 진입 또는 값 변경 |
| common_setting | 설정 | 버튼 | 앱 내 설정 화면 이동 |
| common_goToSetting | 설정으로 이동 | 버튼 | OS 시스템 설정 앱으로 이동 (권한 허용 유도 시 사용) |
| common_addContacts | 주소록에 추가 | 버튼 | 트랜잭션 상대방 주소를 주소록에 저장 |
| common_refresh | 새로고침 | 버튼 | 현재 화면 데이터 수동 갱신 |
| common_showHistory | 내역 보기 | 버튼 | 거래내역 화면으로 이동 |
| common_connect | 연결 | 버튼 | A2A/WalletConnect 서비스 연결 요청 승인 |
| common_sign | 서명 | 버튼 | 메시지 또는 트랜잭션 서명 승인. 보안 액션이므로 신중히 배치 |
| common_approve | 승인 | 버튼 | 컨트랙트 권한 허용(Approve) 처리 |
| common_learnMore | 더 알아보기 | 버튼 | 외부 도움말·블로그 링크 연결. 텍스트 버튼 또는 인라인 링크 |

---

## 하단 네비게이션

| Key | 한국어 문구 | UI 분류 | 맥락 및 제약 조건 |
|-----|------------|---------|-----------------|
| common_tabHome | Home | 탭 레이블 | 메인 지갑 홈 탭. 영문 고정 표기 |
| common_tabToken | Token | 탭 레이블 | 토큰 목록 탭. 영문 고정 표기 |
| common_tabNFT | NFT | 탭 레이블 | NFT 목록 탭. 영문 고정 표기 |
| common_tabMore | More | 탭 레이블 | 더보기(설정 등) 탭. 영문 고정 표기 |
| common_tabAddress | Address | 탭 레이블 | 주소록 탭. 영문 고정 표기 |
| common_qr | QR | 탭/버튼 레이블 | QR 스캔 진입. 하단 탭 또는 액션 버튼으로 사용 |
| common_nfc | NFC | 탭/버튼 레이블 | NFC 기능 진입. 하단 탭 또는 액션 버튼으로 사용 |

---

## 거래내역 — 내역 표시

| Key | 한국어 문구 | UI 분류 | 맥락 및 제약 조건 |
|-----|------------|---------|-----------------|
| common_sendTo | {{address}}에게 | 본문 | 전송 상대방 주소 표시. `{{address}}`는 축약 주소(예: 0x1234…abcd) 치환 |
| common_sendToken | {{ftName}}보냄 | 본문 | 토큰 전송 내역 행 설명. `{{ftName}}`은 토큰 심볼(예: KLAY) 치환 |
| common_receiveToken | {{ftName}}받음 | 본문 | 토큰 수신 내역 행 설명. `{{ftName}}`은 토큰 심볼 치환 |
| common_sendNFT | {{nftName}}보냄 | 본문 | NFT(SFT 단수) 전송 내역. `{{nftName}}`은 NFT 이름 치환 |
| common_receiveNFT | {{nftName}}받음 | 본문 | NFT(SFT 단수) 수신 내역. `{{nftName}}`은 NFT 이름 치환 |
| common_sendNftMT | {{nftName}} {{n}}개 보냄 | 본문 | SFT 다수 전송 내역. `{{n}}`은 수량 치환 |
| common_receiveNftMT | {{nftName}} {{n}}개 받음 | 본문 | SFT 다수 수신 내역. `{{n}}`은 수량 치환 |
| common_feeDelegated | 면제 | 본문 | 수수료 대납(Fee Delegation) 적용 시 수수료란에 표시 |
| common_history | 거래내역 | 제목 | 거래내역 화면 또는 섹션 제목 |
| history_none | 거래내역이 없어요. | 본문 | 거래내역 목록 빈 상태(Empty State) 안내 문구 |

---

## 거래내역 — 시간 표시

| Key | 한국어 문구 | UI 분류 | 맥락 및 제약 조건 |
|-----|------------|---------|-----------------|
| common_justBefore | 방금 전 | 캡션 | 전송 후 1분 미만 경과 시 표시 |
| common_minuteBefore | {{minutes}}분 전 | 캡션 | 1분 이상 1시간 미만 경과. `{{minutes}}`는 정수 치환 |
| common_hoursBefore | {{hour}}시간 전 | 캡션 | 1시간 이상 24시간 미만 경과. `{{hour}}`는 정수 치환 |
| common_daysBefore | {{day}}일 전 | 캡션 | 1일 이상 경과. `{{day}}`는 정수 치환 |

---

## 거래내역 — 상태

| Key | 한국어 문구 | UI 분류 | 맥락 및 제약 조건 |
|-----|------------|---------|-----------------|
| history_sending | 보내는 중 | 캡션 | 트랜잭션 제출 후 블록 확인 대기 중 상태 |
| history_canceling | 취소 중 | 캡션 | 전송 취소 트랜잭션 처리 중 상태 |
| history_cancelingSend | 보내기 취소 중 | 캡션 | 보내기 액션에 대한 취소 처리 진행 중 |
| history_sendDone | 보내기 완료 | 캡션 | 전송 트랜잭션 블록 확정 완료 |
| history_sendFail | 보내기 실패 | 캡션 | 전송 트랜잭션 실패 또는 리버트. 오류 색상 적용 권장 |
| history_receiveDone | 받기 완료 | 캡션 | 수신 트랜잭션 블록 확정 완료 |

---

## 거래내역 — 상세 컬럼 레이블

| Key | 한국어 문구 | UI 분류 | 맥락 및 제약 조건 |
|-----|------------|---------|-----------------|
| history_owner | 지갑 소유자 | 컬럼 레이블 | 거래내역 상세 - 지갑 소유자 항목명 |
| history_status | 상태 | 컬럼 레이블 | 거래내역 상세 - 처리 상태 항목명 |
| history_network | 네트워크 | 컬럼 레이블 | 거래내역 상세 - 사용 네트워크 항목명 |
| history_sender | 보낸 사람 | 컬럼 레이블 | 거래내역 상세 - 발신 주소 항목명 |
| history_receiver | 받는 사람 | 컬럼 레이블 | 거래내역 상세 - 수신 주소 항목명 |
| history_tokenAmount | 수량 | 컬럼 레이블 | 거래내역 상세 - 토큰 전송 수량 항목명 |
| history_txTime | 전송 시각 | 컬럼 레이블 | 거래내역 상세 - 트랜잭션 타임스탬프 항목명 |
| history_fee | 수수료 | 컬럼 레이블 | 거래내역 상세 - 트랜잭션 수수료 항목명 |
| history_tx | 트랜잭션 해시 | 컬럼 레이블 | 거래내역 상세 - Tx Hash 항목명. 복사 버튼 병행 노출 |
| history_service | 요청 서비스 | 컬럼 레이블 | A2A 거래내역 상세 - 연동 서비스명 항목명 |
| history_sendAmount | 전송 수량 | 컬럼 레이블 | 거래내역 상세 - 실제 전송된 수량 항목명 |
| history_contract | 컨트랙트 | 컬럼 레이블 | 거래내역 상세 - 스마트 컨트랙트 주소 항목명 |

---

## 거래내역 — 시스템 메시지

| Key | 한국어 문구 | UI 분류 | 맥락 및 제약 조건 |
|-----|------------|---------|-----------------|
| history_txBtn | 트랜잭션 확인 | 버튼 | 블록 익스플로러 외부 링크 이동 버튼 |
| history_pendingNoneTitle | 이전 요청이 완료되어<br/>새로운 요청을 보낼 수 있어요 | 제목 | 대기 중 요청 해소 후 표시되는 안내 제목. `<br/>` 줄바꿈 포함 |
| history_pendingNoneBody | 처음부터 다시 시도해 주세요. | 본문 | 대기 해소 후 재시도 유도 안내 본문 |

---

## 스낵바 / 인앱 알림

| Key | 한국어 문구 | UI 분류 | 맥락 및 제약 조건 |
|-----|------------|---------|-----------------|
| common_copyDone | 클립보드에 복사했어요. | 스낵바 | 복사 성공 피드백. 자동 노출 후 사라짐(일반적으로 2~3초) |
| common_deleteNftDone | NFT를 삭제했어요. | 스낵바 | NFT 삭제 완료 피드백. 실행 취소(Undo) 버튼 제공 검토 |
| common_deleteAddressDone | 주소를 삭제했어요. | 스낵바 | 주소록 항목 삭제 완료 피드백 |
| common_quitApp | 한 번 더 누르면 클립이 종료돼요. | 스낵바 | Android 뒤로가기 두 번 종료 패턴 안내. Android 전용 |
| common_sendingNoti | NFT를 보내고 있어요. | 스낵바/알림 | NFT 전송 트랜잭션 제출 직후 인앱 알림 |
| common_cancelingNoti | NFT 보내기를 취소하고 있어요. | 스낵바/알림 | NFT 전송 취소 트랜잭션 제출 직후 인앱 알림 |

---

## 네트워크

| Key | 한국어 문구 | UI 분류 | 맥락 및 제약 조건 |
|-----|------------|---------|-----------------|
| common_klaytn | 클레이튼 | 캡션 | Klaytn 네트워크 표시명 |
| common_ethereum | 이더리움 | 캡션 | Ethereum 네트워크 표시명 |
| common_polygon | 폴리곤 | 캡션 | Polygon 네트워크 표시명 |
| common_allNetwork | 전체 네트워크 | 캡션 | 네트워크 필터 '전체' 선택 옵션 |
| common_ethereumM | 이더리움 (미지원) | 캡션 | 현재 기능에서 지원하지 않는 이더리움 네트워크. 비활성 UI 적용 |
| common_polygonM | 폴리곤 (미지원) | 캡션 | 현재 기능에서 지원하지 않는 폴리곤 네트워크. 비활성 UI 적용 |
| common_unsupported | (미지원) | 캡션 | 미지원 네트워크 공통 접미 표기. 네트워크명 뒤에 병기 |
| common_bora | 보라 | 캡션 | BORA 네트워크 표시명 |
| common_supportNetwork | 지원 네트워크 | 캡션 | 지원 네트워크 섹션 또는 항목 레이블 |
| common_supportNetworks | 클레이튼, 이더리움, 폴리곤, 보라 | 캡션 | 전체 지원 네트워크 열거 문자열. 쉼표+공백 구분 |
| common_supportNetworksM | 클레이튼, 보라 | 캡션 | 특정 기능(예: NFT 전송)의 제한 지원 네트워크 열거 문자열 |

---

## 토큰 표준

| Key | 한국어 문구 | UI 분류 | 맥락 및 제약 조건 |
|-----|------------|---------|-----------------|
| common_standardKip17 | KIP-17 | 캡션 | Klaytn NFT(ERC-721 호환) 표준명. 영문 고정 표기 |
| common_standardKip37 | KIP-37 | 캡션 | Klaytn SFT(ERC-1155 호환) 표준명. 영문 고정 표기 |
| common_standardErc721 | ERC-721 | 캡션 | Ethereum NFT 표준명. 영문 고정 표기 |
| common_standardErc1155 | ERC-1155 | 캡션 | Ethereum SFT 표준명. 영문 고정 표기 |

---

## 단위 및 수량

| Key | 한국어 문구 | UI 분류 | 맥락 및 제약 조건 |
|-----|------------|---------|-----------------|
| common_daily | 일 | 단위 | 일 단위 기간 표기. 숫자 뒤에 접미 사용 (예: 7일) |
| common_weekly | 주 | 단위 | 주 단위 기간 표기 |
| common_monthly | 월 | 단위 | 월 단위 기간 표기 |
| common_won | 원 | 단위 | 원화(KRW) 단위. 숫자 뒤 접미 사용 |
| common_amount | {{n}}개 | 단위 | 수량 표기. `{{n}}`은 정수 치환. NFT/SFT 수량에 사용 |
| common_filterAmount | 총 {{n}}개 | 단위 | 필터 결과 총 수량 표기. `{{n}}`은 정수 치환 |
| common_symbolNone | --- | 단위 | 심볼 또는 값이 없을 때 표시하는 플레이스홀더 |
| common_mtQuantity | x{{n}} | 단위 | SFT 다중 수량 표기. 썸네일 또는 목록에서 수량 뱃지로 사용 |
| common_today | 오늘 | 단위 | D-Day가 당일인 경우 표시 |
| common_dDay | D-{{days}} | 단위 | 만료·이벤트까지 남은 일수 표기. `{{days}}`는 정수 치환 |
| common_tenThousand | 만 | 단위 | 큰 숫자 한국어 단위 표기 (예: 1만) |
| common_hundredMillion | 억 | 단위 | 큰 숫자 한국어 단위 표기 (예: 1억) |

---

## 기간 필터

| Key | 한국어 문구 | UI 분류 | 맥락 및 제약 조건 |
|-----|------------|---------|-----------------|
| common_week | 7일 | 필터 버튼 | 최근 7일 기간 필터 선택지 |
| common_month | 1개월 | 필터 버튼 | 최근 1개월 기간 필터 선택지 |
| common_3months | 3개월 | 필터 버튼 | 최근 3개월 기간 필터 선택지 |
| common_year | 1년 | 필터 버튼 | 최근 1년 기간 필터 선택지 |
| common_sortLatest | 최근 받은 순 | 필터 버튼 | 정렬 기준: 최신 수신 순서. 정렬 셀렉터에서 사용 |

---

## 상태 값

| Key | 한국어 문구 | UI 분류 | 맥락 및 제약 조건 |
|-----|------------|---------|-----------------|
| common_status | 상태 | 컬럼 레이블 | 상태 필터 또는 목록 컬럼 레이블 |
| common_valid | 유효함 | 본문 | 아이템(쿠폰·티켓 등)이 사용 가능한 유효 상태 |
| common_expired | 만료됨 | 본문 | 유효기간이 지난 상태. 비활성 UI 또는 오류 색상 적용 |
| common_errorStatus | 상태 알 수 없음 | 본문 | 상태 조회 실패 또는 정의되지 않은 상태 |
| common_errorLoad | 불러오기 실패 | 본문 | 데이터 로드 실패 시 목록/값 영역에 표시 |
| common_allStatus | 모든 상태 | 본문 | 상태 필터 '전체' 선택 옵션 |
| common_availableStatus | 사용가능 | 본문 | 사용 가능한 아이템 상태 필터 옵션 |
| common_notAvailableStatus | 사용불가 | 본문 | 사용 불가 아이템 상태 필터 옵션 |
| common_usedStatus | 사용완료 | 본문 | 이미 사용된 아이템 상태 필터 옵션 |
| common_expiredStatus | 기간만료 | 본문 | 유효기간 만료 아이템 상태 필터 옵션 |
| common_done | 완료 | 본문 | 일반적인 처리 완료 상태 표시 |

---

## 기타 / 공통 레이블

| Key | 한국어 문구 | UI 분류 | 맥락 및 제약 조건 |
|-----|------------|---------|-----------------|
| common_addressTooltip | 내 주소 | 본문 | 내 지갑 주소임을 나타내는 툴팁 또는 레이블 |
| common_all | 전체 | 본문 | 전체 선택/조회 옵션. 필터·탭 등 범용 사용 |
| common_loading | 불러오는 중 | 캡션 | 데이터 로딩 중 상태 표시. 스피너와 함께 사용 |
| common_loadingEng | Loading | 캡션 | 영문 로딩 표시. 특정 화면에서 영문 고정 표기 사용 시 |
| common_tokenId | No. | 캡션 | NFT 토큰 ID 앞에 붙는 접두 레이블 (예: No.1234) |
| common_bio | 생체 인증 | 제목 | 생체 인증 관련 화면 제목 또는 섹션 레이블 |
| common_viewer | {{viewers}}명이 읽었어요. | 캡션 | 콘텐츠(공지 등) 조회 수 표시. `{{viewers}}`는 정수 치환 |
| common_img | 이미지 | 제목 | 이미지 뷰어 화면 제목 또는 이미지 영역 대체 텍스트 |
| common_start | 부터 | 본문 | 기간 표시 시작점 접미사 (예: 2024.01.01부터) |
| common_end | 까지 | 본문 | 기간 표시 종료점 접미사 (예: 2024.12.31까지) |
| common_expirationDate | 유효기간 | 본문 | 쿠폰·티켓 등의 유효기간 항목 레이블 |
| common_location | 장소 | 본문 | 이벤트·쿠폰 등의 사용 가능 장소 항목 레이블 |
| common_noPriceInfo | 가격 정보 없음 | 본문 | 시세 데이터 미제공 토큰에 가격란 대신 표시 |
| common_currentPrice | 현재가 | 본문 | 토큰 또는 NFT의 현재 시세 항목 레이블 |
| common_spam | 사기주의 | 본문 | 스팸·사기 의심 토큰/NFT에 표시하는 경고 레이블. 경고 색상 적용 필수 |
