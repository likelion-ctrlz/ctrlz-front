import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import chevronLeft from "../assets/icon/chevron-left.png";
import MISSIONS, { getMissionImage } from "../data/missions";

// 피그마 미션 카드별 아이콘 실측 크기(1,2번 카드=75px, 3,4번 카드=82px)
const ICON_SIZES = [75, 75, 82, 82];
// 아이콘 뒤 은은한 그라데이션 글로우 — 아이콘 중심에 맞춰 배치
const GLOW_SIZE = 120;

function MissionList() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">

      {/* Header */}
      <header className="relative flex items-center h-[53px] px-5">
        <button onClick={() => navigate("/home")} className="w-[34px] h-[34px] flex items-center justify-center">
          <img src={chevronLeft} alt="" className="w-[34px] h-[34px]" />
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-primary tracking-[-0.5px] leading-[44px]">
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
          {MISSIONS.map((mission, i) => (
            <button
              key={mission.id}
              onClick={() => navigate(`/missions/${mission.id}`)}
              className="relative w-full h-[122px] rounded-[16px] border border-primary text-left px-4"
              style={{ backgroundColor: "rgba(255,255,255,0.76)" }}
            >
              {/* 아이콘 뒤 글로우 */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: 27 + ICON_SIZES[i % ICON_SIZES.length] / 2 - GLOW_SIZE / 2,
                  top: 20 + ICON_SIZES[i % ICON_SIZES.length] / 2 - GLOW_SIZE / 2,
                  width: GLOW_SIZE,
                  height: GLOW_SIZE,
                  background:
                    "radial-gradient(circle, rgba(0,203,147,0.45) 0%, rgba(0,203,147,0.15) 45%, rgba(0,203,147,0) 75%)",
                }}
              />

              {/* 미션 아이콘 */}
              <div
                className="absolute left-[27px] top-[20px] flex items-center justify-center"
                style={{ width: ICON_SIZES[i % ICON_SIZES.length], height: ICON_SIZES[i % ICON_SIZES.length] }}
              >
                <img src={getMissionImage(mission)} alt="" className="max-w-full max-h-full object-contain" />
              </div>

              {/* 내용 */}
              <p className="absolute left-[148px] top-[20px] whitespace-nowrap text-[16px] font-semibold text-black tracking-[-0.4px] leading-[25px]">
                {mission.title}
              </p>
              <p className="absolute left-[148px] top-[45px] whitespace-nowrap text-[10px] font-medium text-gray-icon tracking-[-0.25px] leading-[25px]">
                {mission.desc}
              </p>

              {/* 포인트/XP */}
              <div className="absolute right-4 bottom-[16px] flex gap-3">
                <span className="text-[16px] font-semibold text-primary tracking-[-0.4px]">+ {mission.token}P</span>
                <span className="text-[16px] font-semibold text-primary tracking-[-0.4px]">+ {mission.xp} XP</span>
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
