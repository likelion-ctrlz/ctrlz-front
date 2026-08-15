import { useNavigate, useParams } from "react-router-dom";

const MISSIONS_DATA = {
  1: {
    title: "근처에서 즉석 복권 구매해보기",
    description: "집 앞이나 편의점에서 즉석복권 한 장을 사보세요. 큰돈 들이지 않고도 오늘 하루에 작은 설렘을 더할 수 있어요. 당첨이 안 돼도 괜찮아요, 문 밖을 나선 것 자체가 오늘의 미션이에요.",
    difficulty: "중",
    token: 20,
    xp: 30,
    conditions: [
      "야외에서 촬영한 사진이어야 해요",
      "발 또는 주변 환경이 보여야 해요",
      "오늘 날짜의 실시간 사진만 인정 돼요",
    ],
  },
  2: {
    title: "베스킨라빈스 이달의 맛 도전",
    description: "이번 달 새로 나온 맛을 직접 먹어보고, 모로에게 리뷰를 남겨주세요. 달콤한 한 입으로 기분전환 해봐요.",
    difficulty: "하",
    token: 20,
    xp: 10,
    conditions: [
      "아이스크림이 담긴 사진이어야 해요",
      "매장 또는 포장 상태가 보여야 해요",
      "오늘 날짜의 실시간 사진만 인정 돼요",
    ],
  },
  3: {
    title: "오늘의 편의점 신상 리뷰어",
    description: "집 앞 편의점에서 이번 달 신상을 하나 골라보세요. 직접 먹어보고 별점을 매겨봐요.",
    difficulty: "하",
    token: 30,
    xp: 20,
    conditions: [
      "구매한 신상품이 사진에 보여야 해요",
      "편의점 내부 또는 앞에서 촬영해야 해요",
      "오늘 날짜의 실시간 사진만 인정 돼요",
    ],
  },
  4: {
    title: "무인 아이스크림 정복",
    description: "근처 무인 아이스크림 가게를 찾아가 보세요. 사람 없는 곳에서 편하게 고르는 즐거움을 느껴봐요.",
    difficulty: "하",
    token: 20,
    xp: 10,
    conditions: [
      "무인 가게 내부 또는 외부가 보여야 해요",
      "구매한 아이스크림이 사진에 보여야 해요",
      "오늘 날짜의 실시간 사진만 인정 돼요",
    ],
  },
};

function MissionDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const mission = MISSIONS_DATA[id] || MISSIONS_DATA[1];

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <div className="h-[44px]" />

      {/* Header */}
      <header className="flex items-center h-[53px] px-5">
        <button onClick={() => navigate(-1)} className="w-[34px] h-[34px] flex items-center justify-center">
          <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
            <path d="M7 1L1 7.5L7 14" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="flex-1 text-center text-[15px] font-medium">미션</span>
        <div className="w-[34px]" />
      </header>

      <main className="flex-1 flex flex-col px-5 pt-4 pb-8">
        {/* 미션 이미지 placeholder */}
        <div className="w-full aspect-[362/122] bg-gray-50 rounded-2xl mb-5 flex items-center justify-center">
          <span className="text-[40px]">🎯</span>
        </div>

        {/* 미션 안내 */}
        <h3 className="text-[13px] text-gray-400 mb-2">미션 안내</h3>
        <p className="text-[14px] leading-[1.7] text-gray-700 mb-5">
          {mission.description}
        </p>

        {/* 난이도 / 토큰 / XP */}
        <div className="flex gap-2 mb-5">
          <span className="text-[12px] text-gray-500">난이도 {mission.difficulty}</span>
          <span className="px-3 py-1 rounded-full bg-primary-sub4 text-[12px] text-primary font-medium">
            토큰 {mission.token}+
          </span>
          <span className="px-3 py-1 rounded-full bg-gray-100 text-[12px] text-gray-600">
            + {mission.xp} XP
          </span>
        </div>

        {/* 인증 조건 */}
        <div className="bg-gray-50 rounded-xl p-5 mb-auto">
          <h4 className="text-[13px] font-medium mb-3">인증 조건 확인</h4>
          <ul className="space-y-2">
            {mission.conditions.map((cond, i) => (
              <li key={i} className="text-[13px] text-gray-600 flex gap-2">
                <span className="text-primary">✓</span>
                {cond}
              </li>
            ))}
          </ul>
        </div>

        {/* 사진 촬영 버튼 */}
        <button
          onClick={() => navigate(`/missions/${id}/verify`)}
          className="w-full py-[22px] rounded-xl bg-primary text-white text-[16px] font-semibold mt-6"
        >
          사진 촬영하기
        </button>
      </main>
    </div>
  );
}

export default MissionDetail;
