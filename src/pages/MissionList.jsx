import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";

const MISSIONS = [
  {
    id: 1,
    title: "근처에서 즉석 복권 구매해보기",
    description: "혹시 알아요? 오늘 당신에게 행운이 찾아올지",
    xp: 30,
    token: 20,
    emoji: "🎟️",
  },
  {
    id: 2,
    title: "베스킨라빈스 이달의 맛 도전",
    description: "이번 달은 무슨 맛인지 저에게 알려주세요!",
    xp: 10,
    token: 20,
    emoji: "🍦",
  },
  {
    id: 3,
    title: "오늘의 편의점 신상 리뷰어",
    description: "집 앞 편의점에서 나온 이번 달 신상을 리뷰해봐요",
    xp: 20,
    token: 30,
    emoji: "🏪",
  },
  {
    id: 4,
    title: "무인 아이스크림 정복",
    description: "근처 무인 아이스크림 가게를 정복해봐요",
    xp: 10,
    token: 20,
    emoji: "🧊",
  },
];

function MissionList() {
  const navigate = useNavigate();

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

      {/* Mission Cards */}
      <main className="flex-1 px-5 pt-4 pb-[120px]">
        <div className="flex flex-col gap-4">
          {MISSIONS.map((mission) => (
            <button
              key={mission.id}
              onClick={() => navigate(`/missions/${mission.id}`)}
              className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 text-left"
            >
              {/* 이모지 아이콘 */}
              <div className="w-[75px] h-[75px] bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                <span className="text-[32px]">{mission.emoji}</span>
              </div>

              {/* 내용 */}
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-medium mb-1 truncate">{mission.title}</h3>
                <p className="text-[12px] text-gray-500 mb-2 line-clamp-2">{mission.description}</p>
                <div className="flex gap-3">
                  <span className="text-[11px] text-primary font-medium">+ {mission.token}P</span>
                  <span className="text-[11px] text-gray-400">+ {mission.xp} XP</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>

      <BottomTabBar />
    </div>
  );
}

export default MissionList;
