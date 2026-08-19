import { useNavigate, useLocation } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import Header from "../components/Header";
import ground from "../assets/home/ground.png";
import morrowbehind from "../assets/program/morrowbehind.png";

function TokenInsufficient() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const tokenBalance = state?.tokenBalance ?? 0;
  const requiredTokens = state?.requiredTokens ?? 0;

  return (
    <div className="relative flex min-h-dvh flex-col bg-[#E8FBF4] overflow-hidden">
      <Header title="프로그램" onBack={() => navigate(-1)} />

      <main className="flex-1 flex flex-col items-center px-5 pb-[100px] z-10">
        {/* 타이틀 */}
        <p className="mt-[40px] text-[24px] font-bold text-primary tracking-[-0.6px] leading-[32px] text-center">
          아직 토큰이 조금 부족해요
        </p>

        {/* 캐릭터 이미지 */}
        <div className="mt-[30px]">
          <img src={morrowbehind} alt="모로 캐릭터" className="w-[180px] h-auto" />
        </div>

        {/* 토큰 정보 카드 */}
        <div className="mt-[16px] w-full max-w-[362px] bg-white border border-[#00CB93] rounded-[16px] px-[24px] py-[20px]">
          <p className="text-[16px] font-semibold text-primary tracking-[-0.4px] leading-[25px] m-0">
            현재 보유 토큰
          </p>

          <div className="mt-[14px] flex justify-between items-center">
            <span className="text-[14px] font-medium text-primary tracking-[-0.35px]">현재 보유 토큰</span>
            <span className="text-[14px] font-semibold text-primary tracking-[-0.35px]">{tokenBalance}P</span>
          </div>

          <div className="mt-[10px] flex justify-between items-center">
            <span className="text-[14px] font-medium text-primary tracking-[-0.35px]">필요 토큰</span>
            <span className="text-[14px] font-semibold text-primary tracking-[-0.35px]">{requiredTokens}P</span>
          </div>

          <p className="mt-[14px] text-[12px] font-medium text-primary tracking-[-0.3px] leading-[20px] m-0">
            오늘의 미션을 완료하면 토큰을 받을 수 있어요 매일 작은 행동 하나씩 조금씩 채워가요
          </p>
        </div>

        {/* 미션 하러가기 버튼 */}
        <button
          onClick={() => navigate("/missions")}
          className="mt-[16px] w-full max-w-[362px] h-[68px] bg-white border border-[#00CB93] rounded-[16px] text-primary text-[20px] font-semibold tracking-[-0.5px]"
        >
          미션 하러가기
        </button>
      </main>

      {/* 하단 배경 ground.png */}
      <div className="absolute bottom-[80px] left-0 w-full pointer-events-none">
        <img src={ground} alt="" className="w-full h-auto" />
      </div>

      <BottomTabBar />
      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-[100px] z-10" />
    </div>
  );
}

export default TokenInsufficient;
