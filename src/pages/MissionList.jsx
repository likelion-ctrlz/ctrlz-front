import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";

const MISSIONS = [
  { id: 1, title: "근처에서 즉석 복권 구매해보기", desc: "혹시 알아요? 오늘 당신에게 행운이 찾아올지", token: 20, xp: 30, emoji: "🎟️" },
  { id: 2, title: "베스킨라빈스 이달의 맛 도전", desc: "이번 달은 무슨 맛인지 저에게 알려주세요!", token: 20, xp: 10, emoji: "🍦" },
  { id: 3, title: "오늘의 편의점 신상 리뷰어", desc: "집 앞 편의점에서 나온 이번 달 신상을 리뷰해봐요", token: 30, xp: 20, emoji: "🏪" },
  { id: 4, title: "무인 아이스크림 정복", desc: "근처 무인 아이스크림 가게를 정복해봐요", token: 20, xp: 10, emoji: "🧊" },
];

function MissionList() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">
      <div className="h-[44px]" />

      {/* Header */}
      <header className="relative flex items-center h-[53px] px-5">
        <button onClick={() => navigate("/home")} className="w-[34px] h-[34px] flex items-center justify-center">
          <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
            <path d="M7 1L1 7.5L7 14" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-[#00CB93] tracking-[-0.5px] leading-[44px]">
          미션
        </p>
      </header>

      {/* 부제 */}
      <p className="px-5 text-[16px] font-semibold text-black tracking-[-0.4px] leading-[30px] mt-[35px]">
        나에게 맞는 미션을 골라보세요
      </p>

      {/* Mission Cards */}
      <main className="flex-1 px-5 pt-4 pb-[130px]">
        <div className="flex flex-col gap-[19px]">
          {MISSIONS.map((mission) => (
            <button
              key={mission.id}
              onClick={() => navigate(`/missions/${mission.id}`)}
              className="relative w-full h-[122px] rounded-[16px] border border-[#00CB93] text-left px-4"
              style={{ backgroundColor: "rgba(255,255,255,0.76)" }}
            >
              {/* 이모지 아이콘 영역 */}
              <div className="absolute left-[27px] top-[24px] w-[75px] h-[75px] flex items-center justify-center">
                <span className="text-[32px]">{mission.emoji}</span>
              </div>

              {/* 내용 */}
              <div className="ml-[110px] pt-[20px]">
                <p className="text-[16px] font-semibold text-[#00946B] tracking-[-0.4px] leading-[25px]">
                  {mission.title}
                </p>
                <p className="text-[10px] font-medium text-[#CACACA] tracking-[-0.25px] leading-[25px]">
                  {mission.desc}
                </p>
              </div>

              {/* 포인트/XP */}
              <div className="absolute right-4 bottom-[16px] flex gap-3">
                <span className="text-[16px] font-semibold text-[#00CB93] tracking-[-0.4px]">+ {mission.token}P</span>
                <span className="text-[16px] font-semibold text-[#00CB93] tracking-[-0.4px]">+ {mission.xp} XP</span>
              </div>
            </button>
          ))}
        </div>
      </main>

      <BottomTabBar />
      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-[100px]" />
    </div>
  );
}

export default MissionList;
