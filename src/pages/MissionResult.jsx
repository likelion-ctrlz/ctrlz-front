import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import moroLv2 from "../assets/moro-lv2.png";
import bgTokenScene from "../assets/bg-token-scene.png";
import tokenCoinLarge from "../assets/token-coin-large.png";

function MissionResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSuccess = location.state?.success !== false;
  const [step, setStep] = useState(isSuccess ? "complete" : "fail");

  // 미션 완료
  if (step === "complete") {
    return (
      <div
        className="relative flex min-h-dvh flex-col"
        style={{ background: "linear-gradient(180deg, #E6FFF8 0%, #FFFFFF 100%)" }}
      >

        {/* Header */}
        <header className="relative flex items-center h-[53px] px-5">
          <button onClick={() => navigate("/missions")} className="w-[34px] h-[34px] flex items-center justify-center">
            <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
              <path d="M7 1L1 7.5L7 14" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-[#00CB93] tracking-[-0.5px] leading-[44px]">
            미션
          </p>
        </header>

        <main className="flex-1 flex flex-col px-5 pb-[130px]">
          {/* 제목 */}
          <h2 className="text-[24px] font-semibold text-black tracking-[-0.6px] leading-[30px] mt-[21px]">
            미션 완료!
          </h2>
          <p className="text-[16px] font-medium text-[#949494] tracking-[-0.4px] leading-[30px]">
            오늘도 한 걸음 나아갔어요
          </p>

          {/* 인증 사진 영역 */}
          <div className="w-full h-[202px] mt-[25px] rounded-none bg-[rgba(0,0,0,0.5)] border-t border-b border-[#00CB93] flex items-center justify-center">
            <p className="text-[24px] font-semibold text-[#00CB93]">인증 사진</p>
          </div>

          {/* 보상 카드 */}
          <div
            className="w-full h-[122px] rounded-[16px] border border-[#00CB93] mt-[24px] px-4 pt-[17px]"
            style={{ backgroundColor: "rgba(255,255,255,0.76)" }}
          >
            <p className="text-[16px] font-semibold text-[#00946B] tracking-[-0.4px] leading-[25px]">오늘의 보상</p>
            <div className="flex justify-between items-center mt-[14px]">
              <span className="text-[12px] font-medium text-[#00CB93] tracking-[-0.3px]">경험치</span>
              <span className="text-[12px] font-medium text-[#00CB93] tracking-[-0.3px]">+ 20P</span>
            </div>
            <div className="flex justify-between items-center mt-[4px]">
              <span className="text-[12px] font-medium text-[#00CB93] tracking-[-0.3px]">토큰</span>
              <span className="text-[12px] font-medium text-[#00CB93] tracking-[-0.3px]">+ 30 XP</span>
            </div>
          </div>

          {/* 액션 버튼 2개 */}
          <div className="flex gap-3 mt-[15px]">
            <button
              onClick={() => setStep("levelup")}
              className="flex-1 h-[65px] rounded-[14px] border border-[#00CB93] text-[16px] font-semibold text-[#00946B] tracking-[-0.4px]"
              style={{ backgroundColor: "rgba(255,255,255,0.76)" }}
            >
              캐릭터 성장 확인하기
            </button>
            <button
              onClick={() => setStep("bonus")}
              className="flex-1 h-[65px] rounded-[14px] border border-[#00CB93] text-[16px] font-semibold text-[#00946B] tracking-[-0.4px]"
              style={{ backgroundColor: "rgba(255,255,255,0.76)" }}
            >
              보너스 보상 받기
            </button>
          </div>
        </main>

        <BottomTabBar />
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-[100px]" />
      </div>
    );
  }

  // 레벨업
  if (step === "levelup") {
    return (
      <div
        className="relative flex min-h-dvh flex-col"
        style={{ background: "linear-gradient(180deg, #E6FFF8 0%, #FFFFFF 100%)" }}
      >

        <header className="relative flex items-center h-[53px] px-5">
          <button onClick={() => setStep("complete")} className="w-[34px] h-[34px] flex items-center justify-center">
            <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
              <path d="M7 1L1 7.5L7 14" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-[#00CB93] tracking-[-0.5px] leading-[44px]">
            미션
          </p>
        </header>

        <main className="flex-1 flex flex-col items-center px-5 pb-[130px]">
          <h2 className="text-[24px] font-extrabold text-black tracking-[-0.6px] leading-[30px] mt-[21px]">
            LEVEL UP!
          </h2>
          <p className="text-[16px] font-medium text-[#949494] tracking-[-0.4px] leading-[30px]">
            모로가 알에서 깨어났어요!
          </p>

          {/* 캐릭터 */}
          <div className="flex-1 flex items-center justify-center">
            <img src={moroLv2} alt="모로" className="w-[200px] h-auto object-contain" />
          </div>

          {/* 보상 정보 */}
          <div
            className="w-full h-[122px] rounded-[16px] border border-[#00CB93] px-4 pt-[17px]"
            style={{ backgroundColor: "rgba(255,255,255,0.76)" }}
          >
            <p className="text-[16px] font-semibold text-[#00946B] tracking-[-0.4px] leading-[25px]">LV 5 달성</p>
            <div className="flex justify-between items-center mt-[14px]">
              <span className="text-[12px] font-medium text-[#00CB93] tracking-[-0.3px]">획득 경험치</span>
              <span className="text-[12px] font-medium text-[#00CB93] tracking-[-0.3px]">+ 30 XP</span>
            </div>
            <div className="flex justify-between items-center mt-[4px]">
              <span className="text-[12px] font-medium text-[#00CB93] tracking-[-0.3px]">앞으로 남은 경험치</span>
              <span className="text-[12px] font-medium text-[#00CB93] tracking-[-0.3px]">300 XP</span>
            </div>
          </div>
        </main>

        <BottomTabBar />
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-[100px]" />
      </div>
    );
  }

  // 보너스 토큰
  if (step === "bonus") {
    return (
      <div
        className="relative flex min-h-dvh flex-col overflow-hidden"
        style={{ background: "linear-gradient(180deg, #E6FFF8 0%, #FFFFFF 100%)" }}
      >
        {/* 배경 이미지 — 전체 씬 */}
        <img
          src={bgTokenScene}
          alt=""
          className="absolute top-[133px] left-[-1px] w-[403px] h-[627px] object-cover pointer-events-none"
          style={{ objectPosition: "center" }}
        />


        <header className="relative flex items-center h-[53px] px-5 z-10">
          <button onClick={() => setStep("complete")} className="w-[34px] h-[34px] flex items-center justify-center">
            <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
              <path d="M7 1L1 7.5L7 14" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-[#00CB93] tracking-[-0.5px] leading-[44px]">
            미션
          </p>
        </header>

        <main className="flex-1 flex flex-col items-center px-5 pb-[130px] z-10">
          {/* 제목 */}
          <h2 className="text-[24px] font-semibold text-black tracking-[-0.6px] leading-[30px] mt-[21px]">
            보너스 토큰 획득!
          </h2>
          <p className="text-[16px] font-medium text-[#949494] tracking-[-0.4px] leading-[30px]">
            오늘 미션을 완료해 특별 보너스를 받았어요
          </p>

          {/* 코인 이미지들 */}
          <div className="relative flex-1 flex items-center justify-center w-full">
            {/* 큰 코인 — 약간 왼쪽, -15도 회전 */}
            <img
              src={tokenCoinLarge}
              alt="보너스 토큰"
              className="w-[222px] h-[222px] object-contain"
              style={{ transform: "rotate(-15deg)" }}
            />
            {/* 작은 코인 — 우상단, 165도 회전, 65% 투명도 */}
            <img
              src={tokenCoinLarge}
              alt=""
              className="absolute top-[10px] right-[20px] w-[134px] h-[134px] object-contain opacity-65"
              style={{ transform: "rotate(165deg) scaleY(-1)" }}
            />
          </div>

          {/* 정보 카드 */}
          <div className="w-full h-[122px] rounded-[16px] bg-white border border-[#00CB93] px-4 pt-[17px]">
            <p className="text-[16px] font-semibold text-[#00946B] tracking-[-0.4px] leading-[25px]">현재 보유 토큰</p>
            <div className="flex justify-between items-center mt-[14px]">
              <span className="text-[12px] font-medium text-[#00CB93] tracking-[-0.3px]">획득 보너스 토큰</span>
              <span className="text-[12px] font-medium text-[#00CB93] tracking-[-0.3px]">+ 5P</span>
            </div>
            <div className="flex justify-between items-center mt-[4px]">
              <span className="text-[12px] font-medium text-[#00CB93] tracking-[-0.3px]">현재 보유 토큰</span>
              <span className="text-[12px] font-medium text-[#00CB93] tracking-[-0.3px]">35P</span>
            </div>
          </div>
        </main>

        <BottomTabBar />
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-[100px] z-10" />
      </div>
    );
  }

  // 인증 실패
  if (step === "fail") {
    return (
      <div className="relative flex min-h-dvh flex-col bg-white">

        <header className="relative flex items-center h-[53px] px-5">
          <button onClick={() => navigate("/missions")} className="w-[34px] h-[34px] flex items-center justify-center">
            <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
              <path d="M7 1L1 7.5L7 14" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-[#00CB93] tracking-[-0.5px] leading-[44px]">
            미션
          </p>
        </header>

        <main className="flex-1 flex flex-col px-5 pb-[130px]">
          {/* 제목 */}
          <h2 className="text-[20px] font-extrabold text-black tracking-[-0.5px] text-center mt-[21px]">
            이번엔 조건이 살짝 맞지 않았어요
          </h2>
          <p className="text-[14px] font-medium text-[#949494] tracking-[-0.35px] text-center mt-[8px]">
            괜찮아요. 누구나 처음엔 조금 어려울 수 있어요
          </p>

          {/* 실패 사유 박스 */}
          <div className="w-full rounded-[16px] bg-[#E6FFF8] border border-[#39D7AB] px-5 py-[18px] mt-[30px]">
            <p className="text-[14px] font-semibold text-[#00CB93] tracking-[-0.35px] mb-[14px]">
              인증이 완료되지 않은 이유
            </p>
            <p className="text-[12px] font-medium text-[#74767A] tracking-[-0.3px] leading-[22px]">
              사진에서 미션 조건을 확인하지 못했어요
            </p>
            <p className="text-[12px] font-medium text-[#74767A] tracking-[-0.3px] leading-[22px]">
              조명이 어둡거나 피사체가 잘 보이지 않으면 AI가 판단하기 어려워요
            </p>
            <p className="text-[12px] font-medium text-[#74767A] tracking-[-0.3px] leading-[22px]">
              미션에서 요구하는 장면이 사진 전면에 잘 나와 있는지 확인해 보세요
            </p>
          </div>

          {/* 재시도 팁 박스 */}
          <div className="w-full rounded-[16px] bg-[#E6FFF8] border border-[#39D7AB] px-5 py-[18px] mt-[16px]">
            <p className="text-[14px] font-semibold text-[#00CB93] tracking-[-0.35px] mb-[14px]">
              다시 시도할 때 이렇게 해보세요!
            </p>
            <p className="text-[12px] font-medium text-[#74767A] tracking-[-0.3px] leading-[22px]">
              밝은 곳에서 촬영해주세요
            </p>
            <p className="text-[12px] font-medium text-[#74767A] tracking-[-0.3px] leading-[22px]">
              미션 조건의 핵심 장면이 사진 중앙에 오도록 찍어주세요
            </p>
            <p className="text-[12px] font-medium text-[#74767A] tracking-[-0.3px] leading-[22px]">
              흔들림 없이 가까이에서 찍으면 더 잘 인식 돼요
            </p>
          </div>

          <div className="flex-1" />

          {/* 하단 */}
          <p className="text-[12px] font-medium text-[#949494] tracking-[-0.3px] text-center mb-[16px]">
            오늘 미션은 아직 열려 있어요 언제든 다시 도전해봐요
          </p>

          <button
            onClick={() => navigate(-1)}
            className="w-full h-[68px] rounded-[16px] bg-white border border-[#00CB93] text-[#00CB93] text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center"
          >
            다시 인증하기
          </button>
        </main>

        <BottomTabBar />
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-[100px]" />
      </div>
    );
  }

  return null;
}

export default MissionResult;
