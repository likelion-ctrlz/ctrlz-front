import { useNavigate, useParams } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import chevronLeft from "../assets/icon/chevron-left.png";
import MISSIONS from "../data/missions";

function MissionDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const mission = MISSIONS.find((m) => String(m.id) === id) || MISSIONS[0];

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">

      {/* Header */}
      <header className="relative flex items-center h-[53px] px-5">
        <button onClick={() => navigate(-1)} className="w-[34px] h-[34px] flex items-center justify-center">
          <img src={chevronLeft} alt="" className="w-[34px] h-[34px]" />
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
