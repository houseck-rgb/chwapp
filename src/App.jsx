import { useState } from "react";

// ─── 모든 버튼별 고유 체크리스트 데이터 (17개) ───────────────────────────────

const ALL_CHECKLISTS = {

  "gogi-recipe": {
    title: "고기다이 · 레시피", emoji: "🔥", accent: "#e8842a", bg: "#1a0e04",
    items: ["소고기 부위별 굽기 시간 확인","돼지고기 양념 비율 점검","삼겹살 두께 2cm 균일성 확인","목살 숙성 상태 확인","갈비 소스 당도 체크","소금구이용 참기름 비율 확인","불고기 육수 농도 체크","대패삼겹 해동 상태 확인","양념갈비 재임 시간 준수","마늘 편 두께 균일성","깻잎 신선도 및 보관 상태","쌈채소 세척 기준 확인","된장찌개 레시피 비율","냉면 육수 농도 확인","반찬 레시피 최신본 비치","계절 메뉴 변경사항 숙지","소스류 유통기한 확인","고기 원산지 표시 확인","알레르기 유발 재료 표시","레시피 책자 최신 버전 확인"]
  },

  "gogi-operation": {
    title: "고기다이 · 영업", emoji: "🔥", accent: "#e8842a", bg: "#1a0e04",
    items: ["오픈 전 석쇠 예열 완료","환기 팬 작동 확인","테이블 숯불/가스 점화 테스트","홀 테이블 세팅 완료","주문 패드 배터리 확인","영업 중 고기 소진량 체크","피크타임 추가 고기 준비","불 조절 고객 안내 방법 숙지","테이블별 굽기 진행 모니터링","반찬 리필 타이밍 체크","계산 시스템 작동 확인","마감 시 불 완전 소화 확인","잔여 고기 냉장 보관 처리","석쇠 마감 세척 완료","테이블 탄화물 제거 완료","환기 마감 후 팬 정지","바닥 기름때 청소 완료","쓰레기 분리수거 처리","가스 밸브 잠금 확인","마감 보고서 작성 완료"]
  },

  "gogi-purchase": {
    title: "고기다이 · 사입", emoji: "🔥", accent: "#e8842a", bg: "#1a0e04",
    items: ["소고기 등급별 발주량 계산","돼지고기 일일 소비량 파악","냉동 재고 현황 확인","신선육 납품업체 연락 완료","납품 예정 시간 확인","수령 시 등급 표시 확인","무게 검수 (저울 측정)","색택·냄새 품질 검수","냉장 보관 온도 확인 (0~2℃)","선입선출 배치 완료","납품서 원본 보관","반품 기준 초과 시 반품 처리","대체 공급처 연락처 보유","주간 사용량 데이터 기록","원가율 계산 및 비교","월간 발주 계획 업데이트","잉여 재고 처리 방안 확인","긴급 발주 절차 숙지","발주 승인권자 확인","냉동창고 용량 확인"]
  },

  "sikomi1-recipe": {
    title: "시코미다이1 · 레시피", emoji: "🥩", accent: "#c4903a", bg: "#1e1006",
    items: ["된장찌개 육수 베이스 비율","김치찌개 돼지고기 전처리법","두부 크기 균일 절단 기준","파 채 굵기 기준 확인","마늘 다짐 입자 크기 기준","생강 슬라이스 두께 기준","고추장 소스 배합 비율","간장 드레싱 레시피 확인","참기름 사용량 기준 (5ml)","깨소금 투입량 기준","냉채 소스 당산비 확인","야채볶음 순서 레시피","버섯볶음 시간·온도 기준","계란말이 두께 기준","잡채 당면 삶기 시간 기준","각 반찬 1회 배치량 기준","소스류 재사용 금지 기준","알레르기 재료 분리 레시피","채식 메뉴 별도 레시피 확인","레시피 개정 이력 확인"]
  },

  "sikomi1-operation": {
    title: "시코미다이1 · 영업", emoji: "🥩", accent: "#c4903a", bg: "#1e1006",
    items: ["오다 2시간 전 재료 준비 시작","냉장 반출 재료 온도 확인","전처리 완료 재료 랩핑·라벨링","영업 전 반찬 배치 완료","소스류 영업용 용기 이동","영업 중 반찬 소진 모니터링","부족 반찬 긴급 시코미 처리","재료 온도 이탈 즉시 보고","홀 요청 추가 반찬 신속 제공","오염 재료 즉시 폐기 처리","마감 시 잔여 재료 수량 기록","재사용 가능 재료 냉장 보관","당일 폐기 재료 처리 완료","내일 오다 재료 사전 해동","마감 냉장고 온도 최종 확인","시코미대 세척·소독 완료","도마·칼 소독 보관 완료","행주 삶아 건조 처리","마감 시코미 일지 작성","팀장 마감 보고 완료"]
  },

  "sikomi1-purchase": {
    title: "시코미다이1 · 사입", emoji: "🥩", accent: "#c4903a", bg: "#1e1006",
    items: ["채소류 일일 사용량 집계","두부·계란 재고 현황 확인","소스류 잔량 확인 (기준 이하 시 발주)","냉동 채소 재고 확인","건식 재료 (건미역·건표고) 확인","발주 목록 우선순위 작성","납품업체별 발주서 작성","발주 마감 시간 준수 (전일 오후 5시)","납품 수령 시 무게 검수","신선도 이상 발견 시 반품 처리","냉장 적재 온도 확인","FIFO 적재 완료","발주 비용 합산 기록","월 예산 대비 지출 확인","절임 채소 자체 제조량 확인","계절 재료 대체품 검토","친환경 인증 재료 우선 구매","발주 기록 스프레드시트 업데이트","책임자 최종 발주 승인","창고 정리 정돈 완료"]
  },

  "seolgeo-recipe": {
    title: "설거지 · 세척 기준", emoji: "💧", accent: "#3a9aaa", bg: "#041418",
    items: ["식기 세척 3단계 기준 숙지 (세척→헹굼→소독)","세제 희석 비율 확인 (200배)","소독액 농도 확인 (염소 100ppm)","물 온도 기준 확인 (헹굼 70℃ 이상)","유리컵 세척 별도 라인 확인","칼·가위 세척 전용 도구 사용","도마 양면 세척 기준 확인","석쇠 탄화물 제거 방법 확인","냄비·팬 기름때 제거 방법","식기 건조 방법 (자연건조 원칙)","파손 식기 발견 시 처리 절차","이물질 잔존 시 재세척 기준","세척 완료 보관 위치 기준","행주 교체 주기 확인 (2시간)","고무장갑 착용 의무 확인","앞치마 착용 기준 확인","세척 순서 (큰 것 → 작은 것)","알레르기 접촉 식기 별도 세척","식기 광택 기준 확인","세척 완료 최종 점검"]
  },

  "seolgeo-operation": {
    title: "설거지 · 영업", emoji: "💧", accent: "#3a9aaa", bg: "#041418",
    items: ["오픈 전 세척 구역 청결 확인","세제·소독액 충분량 준비","고무장갑·앞치마 착용 완료","세척기 작동 여부 확인","영업 시작 후 즉시 세척 사이클 시작","피크타임 식기 순환 속도 유지","석쇠 교체 주기에 맞춰 세척","유리컵 파손 여부 확인 후 투입","홀에서 수거한 식기 즉시 침지","세척 완료 식기 제자리 보관","세제 소진 시 즉시 보충","세척 중 파손 발견 시 즉시 보고","식기 부족 시 홀팀에 알림","마감 대청소 시작 (세척기 포함)","배수구 이물질 제거 완료","세척대 주변 바닥 청소 완료","세제·소독액 잔량 기록","내일 소모품 발주 필요 여부 확인","마감 세척 완료 사인 기재","담당자 인수인계 완료"]
  },

  "seolgeo-purchase": {
    title: "설거지 · 사입", emoji: "💧", accent: "#3a9aaa", bg: "#041418",
    items: ["주방 세제 잔량 확인 (2L 이하 발주)","식기 소독제 잔량 확인","고무장갑 재고 확인 (S·M·L)","행주 수량 확인 (1인당 6장 기준)","수세미 교체 주기 확인 (주 2회)","세척기 전용 세제 잔량 확인","배수 거름망 재고 확인","청소 솔 상태 점검","앞치마 수량 및 상태 확인","발주 목록 작성 완료","업체 발주서 전송 완료","납품 수령 및 수량 확인","보관 위치 정리 완료","월간 소모품 비용 기록","낭비율 분석 (전월 대비)","친환경 세제 전환 검토","벌크 구매 가격 비교","긴급 소진 시 대체 구매처 확인","소모품 사용 일지 작성","책임자 발주 승인 완료"]
  },

  "sikomi2-recipe": {
    title: "시코미다이2 · 레시피", emoji: "🍖", accent: "#cc5040", bg: "#1a0606",
    items: ["육류 부위별 전처리 레시피 확인","양념육 배합 비율 (간장·설탕·마늘·배)","냉동육 해동 레시피 (냉장 해동 원칙)","소고기 채끝·안심 손질법 확인","돼지 앞다리 발골 순서 확인","갈비 사이 지방 제거 기준","불고기감 슬라이스 두께 (3mm)","장조림용 육류 크기 기준","육수용 뼈 전처리 방법","볶음용 채소 크기 통일 기준","파채 길이 기준 (5cm)","양파 링 두께 기준 (1cm)","버섯 손질 크기 기준","감자·당근 절단 크기 기준","전처리 완료 재료 보관 온도","랩핑 방법 및 라벨 기준","냉동 보관 기간 기준","재료별 해동 소요 시간표","전처리 일지 작성 방법","레시피 북 최신본 위치 확인"]
  },

  "sikomi2-operation": {
    title: "시코미다이2 · 영업", emoji: "🍖", accent: "#cc5040", bg: "#1a0606",
    items: ["오전 재료 수령 후 즉시 전처리 시작","냉장고 내 재료 위치 맵 확인","오다 전 배치 완료 시간 준수 (오전 10시)","영업 중 고기 소진 예측 모니터링","부족 재료 시코미1에 즉시 요청","냉장 온도 이상 시 즉시 보고","재료 이동 시 덮개 필수 착용","홀 요청 추가 재료 신속 처리","중간 점검 (오후 2시) 잔량 확인","피크타임 전 예비 재료 준비","마감 시 당일 소비량 기록","잔여 재료 냉장 보관 처리","내일 해동 필요 재료 냉장 이동","마감 냉동고 정리 정돈 완료","전처리 도구 소독 보관 완료","작업대 소독 완료","쓰레기 봉투 교체 완료","바닥 청소 완료","마감 재료 현황 팀장 보고","인수인계 사항 기록 완료"]
  },

  "sikomi2-purchase": {
    title: "시코미다이2 · 사입", emoji: "🍖", accent: "#cc5040", bg: "#1a0606",
    items: ["냉동육 재고 현황 전수 조사","부위별 잔여 수량 기록","이번 주 예상 사용량 계산","발주 우선순위 결정 (소진 임박 순)","육류 공급업체 A 발주 연락","육류 공급업체 B 가격 비교","납품 희망일 협의 완료","납품 시간 오전 8~10시 조율","수령 시 등급·원산지 확인","부위별 무게 검수 완료","색택·냄새·탄력 품질 확인","이상 발견 시 반품 처리","냉동 보관 적재 완료 (-18℃ 이하)","납품서 원본 파일링","발주 비용 엑셀 기록","월 원가율 목표 대비 현황 확인","긴급 발주 대비 예비 업체 확인","폐기율 분석 및 원인 파악","발주 최적화 방안 팀장 보고","다음 주 발주 계획 사전 작성"]
  },

  "safety": {
    title: "안전 수칙", emoji: "🛡️", accent: "#d4c040", bg: "#141400",
    items: ["LPG·LNG 가스 밸브 위치 전 직원 숙지","소화기 위치 및 사용법 숙지 (2개 이상)","비상구 2개소 경로 파악 및 장애물 제거","주방 바닥 미끄럼 방지 매트 상태 확인","화구 주변 가연성 물질 제거 확인","튀김유 과열 시 뚜껑 덮기 훈련","날카로운 도구 보관함 잠금 확인","전기 코드 피복 손상 여부 점검","냉동고 문 닫힘 상태 확인 (질식 위험)","응급처치 키트 위치 및 내용물 확인","화재 발생 시 대피 경로 훈련 완료","가스 누출 감지기 작동 확인","직원 안전 교육 월 1회 이수 확인","보험 증서 사무실 보관 확인","응급 연락처 (119·112) 게시 확인","야간 마감 시 2인 이상 근무 원칙","칼 운반 시 칼집 착용 의무","뜨거운 용기 이동 시 장갑 착용","넘어짐 사고 발생 시 보고 절차 확인","안전 점검 일지 금일 작성 완료"]
  },

  "packaging": {
    title: "포장 체크", emoji: "📦", accent: "#30c0c0", bg: "#001414",
    items: ["포장 용기 식품용 인증 확인","용기 세척 및 청결 상태 확인","온도 유지 보냉백 준비 완료","포장 규격별 용기 재고 확인","라벨 프린터 잉크 및 용지 확인","고객명·주소 오탈자 확인","메뉴명·수량 정확성 확인","알레르기 경고 스티커 부착","유통기한 라벨 부착 완료","브랜드 로고 스티커 부착 완료","밀봉 테이프 접착력 확인","국물류 전용 밀폐 용기 사용","뜨거운 음식 증기 구멍 확인","배달 중 쏟림 방지 완충재 투입","무거운 음식 하단 배치 원칙","포장 완료 후 외관 최종 확인","포장 시간 기록 (주문→완료 15분 내)","배달 기사 인계 전 최종 확인","고객 특이 요청 사항 반영 확인","포장 완료 건수 일지 기록"]
  },

  "situation": {
    title: "상황 대응", emoji: "⚠️", accent: "#e06030", bg: "#180800",
    items: ["고객 불만 접수 → 즉시 경청·사과 후 팀장 보고","음식 이물질 → 교환·환불 후 원인 파악 보고","직원 부상 → 응급처치 후 119 연락 및 보고","주방 기기 고장 → 수리 업체 즉시 연락","가스 누출 의심 → 환기·점화 금지·가스 밸브 잠금","정전 발생 → 냉장고 문 닫기·손전등 위치 확인","식중독 의심 → 즉시 격리·보건소 신고 절차","화재 발생 → 소화기·대피 유도·119 신고","폭우·폭설 → 배달 중단 기준 및 고객 안내","배달 사고 → 고객 안전 확인·보험 처리 절차","재료 부족 → 대체 메뉴 안내 절차","직원 결근 → 비상 연락망 가동 절차","SNS 부정 리뷰 → 24시간 내 공식 답변","위생 점검 방문 → 대응 매뉴얼 및 서류 위치","법적 분쟁 → 변호사·본사 즉시 보고","직원 건강 이상 → 즉시 귀가·대체 인력 투입","시설 파손 → 사진 촬영·시설 담당자 연락","도난 사건 → CCTV 확인·112 신고 절차","고객 민원 → 72시간 내 처리 완료 원칙","위기 종료 후 → 원인 분석 보고서 작성"]
  },

  "notice": {
    title: "공지 확인", emoji: "📣", accent: "#7070ee", bg: "#060614",
    items: ["금일 특이 사항 공지 확인 완료","메뉴 변경·추가 사항 숙지","재료 수급 불가 메뉴 홀팀 공유","오늘 예약 및 단체 방문 확인","직원 스케줄 변경 사항 확인","이번 주 청결 강화 항목 확인","위생 점검 예정일 확인","교육 일정 및 참석 대상 확인","POS·주문 시스템 업데이트 내용","가격 변경 사항 메뉴판 반영 여부","고객 피드백 주요 내용 공유","이번 달 매출 목표 및 현황 확인","이달의 우수 직원 선정 내용","개선 지시 사항 이행 여부 확인","협력업체 변경 사항 확인","시설 정기 점검 일정 확인","긴급 공지 (당일 발행) 확인","식품위생법 최신 개정 사항","본사 운영 지침 최신본 숙지","주간 미팅 일정 및 안건 확인"]
  },

  "education": {
    title: "교육 자료", emoji: "🎓", accent: "#40bb70", bg: "#001408",
    items: ["신입 직원 오리엔테이션 자료 위치 확인","개인 위생 6단계 손 씻기 영상 시청","식품위생법 기초 교육 자료 숙지","고객 응대 5단계 매뉴얼 숙지","불만 고객 대응 롤플레이 교육 이수","포지션별 조리 기술 교육 영상 시청","브랜드 아이덴티티 가이드라인 숙지","홀·주방 서비스 표준 매뉴얼 숙지","메뉴 설명 및 추천 멘트 교육 완료","포장·배달 교육 자료 숙지","긴급 상황 대응 시뮬레이션 교육","팀워크·협업 교육 자료 열람","리더급 직원 리더십 교육 이수","다문화 직원 한국어 기초 자료 제공","외국어 메뉴판 및 안내문 위치 확인","교육 영상 QR코드 게시 위치 확인","실습 체크리스트 항목별 이수 확인","월간 위생 시험 응시 완료","합격 기준 (80점 이상) 확인","교육 이수 서명부 작성 완료"]
  },
};

// ─── 체크리스트 화면 ─────────────────────────────────────────────────────────

function CheckScreen({ id, onBack }) {
  const data = ALL_CHECKLISTS[id];
  const [checked, setChecked] = useState(Array(20).fill(false));
  const [saved, setSaved] = useState(false);
  const done = checked.filter(Boolean).length;
  const total = data.items.length;
  const pct = Math.round((done / total) * 100);
  const isAll = done === total;

  const toggle = (i) => {
    if (saved) return;
    setChecked(p => { const n = [...p]; n[i] = !n[i]; return n; });
  };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(180deg, ${data.bg} 0%, #060606 60%)`, display: "flex", flexDirection: "column" }}>

      {/* 헤더 */}
      <div style={{
        padding: "20px 16px 14px",
        background: `${data.bg}ee`,
        borderBottom: `1px solid ${data.accent}25`,
        position: "sticky", top: 0, zIndex: 10,
        backdropFilter: "blur(16px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
          <button onClick={onBack} style={{
            width: "38px", height: "38px", borderRadius: "50%",
            background: "rgba(255,255,255,0.08)", border: "none",
            color: "#bbb", fontSize: "18px", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>←</button>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "10px", color: data.accent, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "3px" }}>
              {data.emoji} CHECKLIST
            </div>
            <div style={{ fontSize: "17px", fontWeight: "900", color: "#fff" }}>{data.title}</div>
          </div>
          <div style={{
            fontSize: "24px", fontWeight: "900",
            color: isAll ? data.accent : "#444",
            transition: "color 0.4s",
            minWidth: "52px", textAlign: "right",
            textShadow: isAll ? `0 0 16px ${data.accent}` : "none",
          }}>{pct}%</div>
        </div>

        {/* 진행바 */}
        <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: "99px", height: "7px", overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${pct}%`,
            background: isAll
              ? `linear-gradient(90deg, ${data.accent}, #ffffa0)`
              : `linear-gradient(90deg, ${data.accent}88, ${data.accent})`,
            borderRadius: "99px",
            transition: "width 0.35s ease",
            boxShadow: isAll ? `0 0 14px ${data.accent}` : "none",
          }} />
        </div>
        <div style={{ marginTop: "7px", fontSize: "11px", color: "#555", textAlign: "right" }}>
          {done} / {total} 완료
        </div>
      </div>

      {/* 완료 배너 */}
      {isAll && (
        <div style={{
          margin: "14px 16px 0",
          padding: "16px",
          borderRadius: "14px",
          background: `linear-gradient(135deg, ${data.accent}20, ${data.accent}08)`,
          border: `1px solid ${data.accent}55`,
          textAlign: "center",
        }}>
          <div style={{ fontSize: "30px", marginBottom: "6px" }}>🎉</div>
          <div style={{ fontSize: "15px", fontWeight: "900", color: data.accent }}>20 / 20 전체 완료!</div>
          <div style={{ fontSize: "12px", color: "#777", marginTop: "4px" }}>하단 저장 버튼을 눌러주세요</div>
        </div>
      )}

      {/* 항목 목록 */}
      <div style={{ flex: 1, padding: "12px 16px", overflowY: "auto" }}>
        {data.items.map((item, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            style={{
              width: "100%",
              display: "flex", alignItems: "center", gap: "12px",
              padding: "13px 14px",
              marginBottom: "7px",
              borderRadius: "12px",
              border: `1px solid ${checked[i] ? data.accent + "45" : "rgba(255,255,255,0.055)"}`,
              background: checked[i]
                ? `linear-gradient(135deg, ${data.accent}14, transparent)`
                : "rgba(255,255,255,0.022)",
              cursor: saved ? "default" : "pointer",
              textAlign: "left",
              transition: "all 0.18s ease",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {/* 체크 원 */}
            <div style={{
              width: "26px", height: "26px", borderRadius: "8px", flexShrink: 0,
              border: `2px solid ${checked[i] ? data.accent : "rgba(255,255,255,0.18)"}`,
              background: checked[i] ? data.accent : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.18s",
              boxShadow: checked[i] ? `0 0 10px ${data.accent}55` : "none",
            }}>
              {checked[i] && (
                <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                  <path d="M1 5L4.5 8.5L12 1" stroke="#000" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>

            {/* 번호 */}
            <span style={{
              fontSize: "11px", fontWeight: "800",
              color: checked[i] ? data.accent : "#383838",
              minWidth: "22px",
              transition: "color 0.18s",
            }}>{String(i + 1).padStart(2, "0")}</span>

            {/* 텍스트 */}
            <span style={{
              fontSize: "14px", fontWeight: checked[i] ? "400" : "500",
              color: checked[i] ? "#666" : "#ddd",
              textDecoration: checked[i] ? "line-through" : "none",
              transition: "all 0.18s",
              lineHeight: 1.45,
            }}>{item}</span>
          </button>
        ))}
      </div>

      {/* 저장 버튼 */}
      <div style={{ padding: "14px 16px 36px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        {saved ? (
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{
              flex: 1, padding: "17px",
              borderRadius: "14px",
              background: `linear-gradient(135deg, ${data.accent}, ${data.accent}bb)`,
              color: "#000", fontWeight: "900", fontSize: "15px",
              textAlign: "center", letterSpacing: "1px",
            }}>✅ 저장 완료</div>
            <button onClick={() => { setChecked(Array(20).fill(false)); setSaved(false); }} style={{
              padding: "17px 18px", borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.05)",
              color: "#777", fontSize: "13px", cursor: "pointer",
            }}>초기화</button>
          </div>
        ) : (
          <button
            onClick={() => { if (isAll) setSaved(true); }}
            style={{
              width: "100%", padding: "18px",
              borderRadius: "14px", border: "none",
              background: isAll
                ? `linear-gradient(135deg, ${data.accent}, ${data.accent}cc)`
                : "rgba(255,255,255,0.04)",
              color: isAll ? "#000" : "#3a3a3a",
              fontWeight: "900", fontSize: "16px",
              cursor: isAll ? "pointer" : "not-allowed",
              transition: "all 0.3s",
              letterSpacing: "1px",
              boxShadow: isAll ? `0 6px 24px ${data.accent}45` : "none",
            }}
          >
            {isAll ? "완료 저장 →" : `남은 항목 ${total - done}개`}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── 홈 화면 ─────────────────────────────────────────────────────────────────

const STATIONS = [
  { id: "gogi",    label: "고기다이",   sub: "최우영고기야", emoji: "🔥", accent: "#e8842a", border: "#6a3a14" },
  { id: "sikomi1", label: "시코미다이1", sub: "주방 준비",    emoji: "🥩", accent: "#c4903a", border: "#5a3a1a" },
  { id: "seolgeo", label: "설거지",     sub: "위생 관리",    emoji: "💧", accent: "#3a9aaa", border: "#1a4a5a" },
  { id: "sikomi2", label: "시코미다이2", sub: "재료 준비",    emoji: "🍖", accent: "#cc5040", border: "#5a1a1a" },
];

const TASK_LABELS = [
  { id: "recipe",    label: "레시피", icon: "📋" },
  { id: "operation", label: "영업",   icon: "⚡" },
  { id: "purchase",  label: "사입",   icon: "🛒" },
];

const MENUS = [
  { id: "safety",    label: "안전",    icon: "🛡️", accent: "#d4c040" },
  { id: "packaging", label: "포장 체크", icon: "📦", accent: "#30c0c0" },
  { id: "situation", label: "상황 대응", icon: "⚠️", accent: "#e06030" },
  { id: "notice",    label: "공지 확인", icon: "📣", accent: "#7070ee" },
  { id: "education", label: "교육 자료", icon: "🎓", accent: "#40bb70" },
];

export default function App() {
  const [screen, setScreen] = useState(null);

  if (screen) return <CheckScreen id={screen} onBack={() => setScreen(null)} />;

  return (
    <div style={{ background: "#070707", minHeight: "100vh", maxWidth: "480px", margin: "0 auto", paddingBottom: "56px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500;700;900&family=Cinzel:wght@600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;font-family:'Noto Serif KR',serif;}
        @keyframes floatP{0%,100%{transform:translateY(0) translateX(0);opacity:.25}50%{transform:translateY(-20px) translateX(8px);opacity:.6}}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:#d4af3728;border-radius:2px}
        .taskbtn:active{transform:scale(0.95)!important}
        .menubtn:active{transform:scale(0.94)!important}
      `}</style>

      {/* 파티클 */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        {[...Array(14)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: `${1 + (i % 3)}px`, height: `${1 + (i % 3)}px`,
            borderRadius: "50%",
            background: `rgba(212,175,55,${0.08 + (i % 5) * 0.06})`,
            left: `${(i * 27 + 5) % 100}%`,
            top: `${(i * 37 + 9) % 100}%`,
            animation: `floatP ${8 + (i % 6)}s ease-in-out infinite`,
            animationDelay: `${i * 0.7}s`,
          }} />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* 히어로 */}
        <div style={{
          background: "linear-gradient(180deg,#0b0b08 0%,#101008 100%)",
          padding: "52px 24px 30px",
          borderBottom: "1px solid #d4af3715",
          textAlign: "center",
        }}>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(180deg,transparent,#d4af37aa)", margin: "0 auto 18px" }} />
          <div style={{ fontSize: "10px", letterSpacing: "5px", color: "#d4af3788", fontFamily: "'Cinzel',serif", marginBottom: "10px" }}>CHOI WOO YOUNG</div>
          <div style={{ fontSize: "27px", fontWeight: "900", color: "#fff", letterSpacing: "2px", marginBottom: "4px" }}>최우영고기야</div>
          <div style={{ fontSize: "11px", color: "#d4af3755", letterSpacing: "4px", fontFamily: "'Cinzel',serif", marginBottom: "22px" }}>주방 운영 시스템</div>
          <div style={{ fontSize: "14px", color: "#ccc8ba", lineHeight: 1.85, marginBottom: "18px" }}>기본이 매장을 만들고,<br/>기준이 브랜드를 만든다</div>
          <div style={{ display: "flex", gap: "6px", justifyContent: "center", flexWrap: "wrap" }}>
            {["맛","서비스","정리","속도","위생"].map(t => (
              <span key={t} style={{
                padding: "4px 12px", borderRadius: "99px",
                border: "1px solid #d4af3728", fontSize: "11px",
                color: "#d4af3799", background: "#d4af370c", letterSpacing: "1px",
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* 포지션 × 업무 */}
        <div style={{ padding: "28px 14px 0" }}>
          <div style={{ marginBottom: "18px", paddingLeft: "4px" }}>
            <div style={{ fontSize: "9px", color: "#d4af37", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "5px" }}>POSITION × TASK</div>
            <div style={{ fontSize: "16px", fontWeight: "900", color: "#fff" }}>포지션별 업무 체크리스트</div>
            <div style={{ fontSize: "12px", color: "#444", marginTop: "4px" }}>버튼을 누르면 바로 시작</div>
          </div>

          {STATIONS.map(s => (
            <div key={s.id} style={{ marginBottom: "12px" }}>
              {/* 포지션 헤더 */}
              <div style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "13px 16px",
                background: `linear-gradient(135deg, ${ALL_CHECKLISTS[`${s.id}-recipe`].bg}dd, #0e0e0e)`,
                border: `1px solid ${s.border}55`,
                borderBottom: "none",
                borderRadius: "14px 14px 0 0",
              }}>
                <span style={{ fontSize: "22px" }}>{s.emoji}</span>
                <div>
                  <div style={{ fontSize: "15px", fontWeight: "900", color: "#fff" }}>{s.label}</div>
                  <div style={{ fontSize: "11px", color: s.accent, opacity: 0.75 }}>{s.sub}</div>
                </div>
              </div>

              {/* 업무 버튼 3개 */}
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                border: `1px solid ${s.border}55`,
                borderTop: "none",
                borderRadius: "0 0 14px 14px",
                overflow: "hidden",
              }}>
                {TASK_LABELS.map((t, ti) => (
                  <button
                    key={t.id}
                    className="taskbtn"
                    onClick={() => setScreen(`${s.id}-${t.id}`)}
                    style={{
                      padding: "16px 6px",
                      background: "#0c0c0c",
                      border: "none",
                      borderLeft: ti > 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = `${ALL_CHECKLISTS[`${s.id}-${t.id}`].bg}cc`}
                    onMouseLeave={e => e.currentTarget.style.background = "#0c0c0c"}
                  >
                    <div style={{ fontSize: "20px", marginBottom: "6px" }}>{t.icon}</div>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: "#d0d0d0", marginBottom: "5px" }}>{t.label}</div>
                    <div style={{
                      fontSize: "10px", padding: "2px 8px", borderRadius: "99px",
                      background: s.accent + "1a", color: s.accent,
                      display: "inline-block",
                    }}>20항목</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 기능 메뉴 */}
        <div style={{ padding: "28px 14px 0" }}>
          <div style={{ marginBottom: "18px", paddingLeft: "4px" }}>
            <div style={{ fontSize: "9px", color: "#d4af37", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "5px" }}>FUNCTIONS</div>
            <div style={{ fontSize: "16px", fontWeight: "900", color: "#fff" }}>기능 메뉴</div>
            <div style={{ fontSize: "12px", color: "#444", marginTop: "4px" }}>각 항목별 독립 20개 체크리스트</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {MENUS.map(m => (
              <button
                key={m.id}
                className="menubtn"
                onClick={() => setScreen(m.id)}
                style={{
                  padding: "20px 14px",
                  borderRadius: "14px",
                  border: `1px solid ${m.accent}22`,
                  background: "linear-gradient(135deg,#0e0e0e,#131313)",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.18s",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `linear-gradient(135deg,${m.accent}10,#0e0e0e)`; e.currentTarget.style.borderColor = `${m.accent}44`; }}
                onMouseLeave={e => { e.currentTarget.style.background = "linear-gradient(135deg,#0e0e0e,#131313)"; e.currentTarget.style.borderColor = `${m.accent}22`; }}
              >
                <span style={{ fontSize: "26px" }}>{m.icon}</span>
                <div style={{ fontSize: "13px", fontWeight: "700", color: "#d8d8d8" }}>{m.label}</div>
                <div style={{
                  fontSize: "10px", padding: "3px 10px", borderRadius: "99px",
                  background: m.accent + "18", color: m.accent,
                }}>20항목</div>
              </button>
            ))}

            {/* 철학 카드 */}
            <div style={{
              padding: "20px 14px",
              borderRadius: "14px",
              border: "1px solid #d4af3712",
              background: "linear-gradient(135deg,#0d0d0a,#111108)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: "10px",
              textAlign: "center",
            }}>
              <div style={{ width: "18px", height: "1px", background: "#d4af3740" }} />
              <div style={{ fontSize: "11px", color: "#d4af3770", lineHeight: 1.8, fontStyle: "italic" }}>
                작은 차이가<br/>전문가를 만든다
              </div>
              <div style={{ fontSize: "10px", color: "#444", lineHeight: 1.7 }}>
                기본을 지키는<br/>사람이 진짜 전문가
              </div>
              <div style={{ width: "18px", height: "1px", background: "#d4af3740" }} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
