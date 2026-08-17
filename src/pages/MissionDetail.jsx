import { useNavigate, useParams } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";

const MISSIONS_DATA = {
  1: {
    title: "근처에서 복권 구매해보기",
    desc: "혹시 알아요? 오늘 당신에게 행운이 찾아올지",
    guide: "집 앞이나 편의점에서 즉석복권 한 장을 사보세요.\n큰돈 들이지 않고도 오늘 하루에 작은 설렘을 더할 수 있어요.\n당첨이 안 돼도 괜찮아요, 문 밖을 나선 것 자체가 오늘의 미션이에요.",
    difficulty: "중",
    token: 20,
    xp: 30,
    conditions: ["야외에서 촬영한 사진이어야 해요", "발 또는 주변 환경이 보여야 해요", "오늘 날짜의 실시간 사진만 인정 돼요"],
    emoji: "🎟️",
  },
  2: {
    title: "베스킨라빈스 이달의 맛 도전",
    desc: "이번 달은 무슨 맛인지 저에게 알려주세요!",
    guide: "이번 달 새로 나온 맛을 직접 먹어보고, 모로에게 리뷰를 남겨주세요.\n달콤한 한 입으로 기분전환 해봐요.",
    difficulty: "하",
    token: 20,
    xp: 10,
    conditions: ["아이스크림이 담긴 사진이어야 해요", "매장 또는 포장 상태가 보여야 해요", "오늘 날짜의 실시간 사진만 인정 돼요"],
    emoji: "🍦",
  },
  3: {
    title: "오늘의 편의점 신상 리뷰어",
    desc: "집 앞 편의점에서 나온 이번 달 신상을 리뷰해봐요",
    guide: "집 앞 편의점에서 이번 달 신상을 하나 골라보세요.\n직접 먹어보고 별점을 매겨봐요.",
    difficulty: "하",
    token: 30,
    xp: 20,
    conditions: ["구매한 신상품이 사진에 보여야 해요", "편의점 내부 또는 앞에서 촬영해야 해요", "오늘 날짜의 실시간 사진만 인정 돼요"],
    emoji: "🏪",
  },
  4: {
    title: "무인 아이스크림 정복",
    desc: "근처 무인 아이스크림 가게를 정복해봐요",
    guide: "근처 무인 아이스크림 가게를 찾아가 보세요.\n사람 없는 곳에서 편하게 고르는 즐거움을 느껴봐요.",
    difficulty: "하",
    token: 20,
    xp: 10,
    conditions: ["무인 가게 내부 또는 외부가 보여야 해요", "구매한 아이스크림이 사진에 보여야 해요", "오늘 날짜의 실시간 사진만 인정 돼요"],
    emoji: "🧊",
  },
};

function MissionDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const mission = MISSIONS_DATA[id] || MISSIONS_DATA[1];

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">

      {/* Header */}
      <header className="relative flex items-center h-[53px] px-5">
        <button onClick={() => navigate(-1)} className="w-[34px] h-[34px] flex items-center justify-center">
          <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
            <path d="M7 1L1 7.5L7 14" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-[#00CB93] tracking-[-0.5px] leading-[44px]">
          미션
        </p>
      </header>

      <main className="flex-1 flex flex-col px-5 pt-[35px] pb-[130px]">
        {/* 미션 카드 */}
        <div
          className="w-full h-[122px] rounded-[16px] border border-[#00CB93] relative flex items-center px-4"
          style={{ backgroundColor: "rgba(255,255,255,0.76)" }}
        >
          <div className="w-[75px] h-[75px] flex items-center justify-center">
            <span className="text-[36px]">{mission.emoji}</span>
          </div>
          <div className="ml-4">
            <p className="text-[16px] font-semibold text-[#00946B] tracking-[-0.4px] leading-[25px]">{mission.title}</p>
            <p className="text-[10px] font-medium text-[#CACACA] tracking-[-0.25px] leading-[25px]">{mission.desc}</p>
          </div>
        </div>

        {/* 미션 안내 */}
        <p className="text-[12px] font-medium text-[#CACACA] tracking-[-0.3px] leading-[25px] mt-[25px]">
          미션 안내
        </p>
        <p className="text-[14px] text-[#003D2B] tracking-[-0.35px] leading-[25px] mt-[6px] whitespace-pre-line">
          {mission.guide}
        </p>

        {/* 뱃지 */}
        <div className="flex gap-[15px] mt-[20px]">
          <span className="px-4 h-[30px] rounded-[15px] border border-[#00CB93] bg-[rgba(255,255,255,0.1)] text-[12px] font-medium text-[#00CB93] tracking-[-0.3px] flex items-center">
            난이도 {mission.difficulty}
          </span>
          <span className="px-4 h-[30px] rounded-[15px] border border-[#00CB93] bg-[rgba(255,255,255,0.1)] text-[12px] font-medium text-[#00CB93] tracking-[-0.3px] flex items-center">
            토큰 {mission.token}+
          </span>
          <span className="px-4 h-[30px] rounded-[15px] border border-[#00CB93] bg-[rgba(255,255,255,0.1)] text-[12px] font-medium text-[#00CB93] tracking-[-0.3px] flex items-center">
            + {mission.xp} XP
          </span>
        </div>

        {/* 인증 조건 */}
        <div
          className="w-full rounded-[16px] mt-[20px] px-5 py-[13px]"
          style={{ backgroundColor: "rgba(184,184,184,0.08)" }}
        >
          <p className="text-[12px] font-medium text-[#CACACA] tracking-[-0.3px] mb-2">
            인증 조건 확인
          </p>
          {mission.conditions.map((cond, i) => (
            <p key={i} className="text-[14px] font-medium text-[#00CB93] tracking-[-0.35px] leading-[25px]">
              ✓ {cond}
            </p>
          ))}
        </div>

        <div className="flex-1" />

        {/* 사진 촬영 버튼 */}
        <button
          onClick={() => navigate(`/missions/${id}/verify`)}
          className="w-full h-[68px] rounded-[16px] bg-white border border-[#00CB93] text-[#00CB93] text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center mt-[20px]"
        >
          사진 촬영하기
        </button>
      </main>

      <BottomTabBar />
      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-[100px]" />
    </div>
  );
}

export default MissionDetail;
