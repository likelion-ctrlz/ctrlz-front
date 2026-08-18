import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import Particles from "../components/Particles";
import moroHatch from "../assets/mission/mission-hatch.png";
import bgTokenScene from "../assets/home/ground.png";
import tokenImg from "../assets/mission/token.png";
import chevronLeft from "../assets/icon/chevron-left.png";

function MissionResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSuccess = location.state?.success !== false;
  const [step, setStep] = useState(isSuccess ? "complete" : "fail");

  // 미션 완료
  if (step === "complete") {
    return (
      <div className="relative flex min-h-dvh flex-col bg-mint-fade">
        {/* Header */}
        <header className="relative flex items-center h-[53px] px-5">
          <button
            onClick={() => navigate("/missions")}
            className="w-[34px] h-[34px] flex items-center justify-center"
          >
            <img src={chevronLeft} alt="" className="w-[34px] h-[34px]" />
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-primary tracking-[-0.5px] leading-[44px]">
            미션
          </p>
        </header>

        <main className="flex-1 flex flex-col pb-[130px]">
          {/* 제목 — 파티클 장식 범위 */}
          <div className="relative">
            <Particles height={80} />
            <h2 className="px-5 text-[24px] font-semibold text-black tracking-[-0.6px] leading-[30px] text-center mt-[21px]">
              미션 완료!
            </h2>
            <p className="px-5 text-[16px] font-medium text-gray-muted tracking-[-0.4px] leading-[30px] text-center">
              오늘도 한 걸음 나아갔어요
            </p>
          </div>

          {/* 인증 사진 영역 — 화면 폭 전체 */}
          <div className="w-full h-[202px] mt-[25px] rounded-none bg-[rgba(0,0,0,0.5)] border-t border-b border-primary flex items-center justify-center">
            <p className="text-[24px] font-semibold text-primary">인증 사진</p>
          </div>

          {/* 보상 카드 */}
          <div
            className="mx-5 h-[122px] rounded-[16px] border border-primary mt-[24px] px-4 pt-[17px]"
            style={{ backgroundColor: "rgba(255,255,255,0.76)" }}
          >
            <p className="text-[16px] font-semibold text-primary-text tracking-[-0.4px] leading-[25px]">
              오늘의 보상
            </p>
            <div className="flex justify-between items-center mt-[14px]">
              <span className="text-[12px] font-medium text-primary tracking-[-0.3px]">
                경험치
              </span>
              <span className="text-[12px] font-medium text-primary tracking-[-0.3px]">
                + 20P
              </span>
            </div>
            <div className="flex justify-between items-center mt-[4px]">
              <span className="text-[12px] font-medium text-primary tracking-[-0.3px]">
                토큰
              </span>
              <span className="text-[12px] font-medium text-primary tracking-[-0.3px]">
                + 30 XP
              </span>
            </div>
          </div>

          {/* 액션 버튼 2개 */}
          <div className="mx-5 flex gap-3 mt-[15px]">
            <button
              onClick={() => setStep("levelup")}
              className="flex-1 h-[65px] rounded-[14px] border border-primary text-[16px] font-semibold text-primary-text tracking-[-0.4px]"
              style={{ backgroundColor: "rgba(255,255,255,0.76)" }}
            >
              캐릭터 성장 확인하기
            </button>
            <button
              onClick={() => setStep("bonus")}
              className="flex-1 h-[65px] rounded-[14px] border border-primary text-[16px] font-semibold text-primary-text tracking-[-0.4px]"
              style={{ backgroundColor: "rgba(255,255,255,0.76)" }}
            >
              보너스 보상 받기
            </button>
          </div>
        </main>

        <BottomTabBar />
      </div>
    );
  }

  // 레벨업
  if (step === "levelup") {
    return (
      <div className="relative flex min-h-dvh flex-col overflow-hidden bg-mint-fade">
        <header className="relative flex items-center h-[53px] px-5 z-10">
          <button
            onClick={() => setStep("complete")}
            className="w-[34px] h-[34px] flex items-center justify-center"
          >
            <img src={chevronLeft} alt="" className="w-[34px] h-[34px]" />
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-primary tracking-[-0.5px] leading-[44px]">
            미션
          </p>
        </header>

        {/* 배경 이미지 — 헤더 아래 남은 화면을 꽉 채움 */}
        <img
          src={bgTokenScene}
          alt=""
          className="absolute inset-x-0 top-[53px] bottom-0 w-full h-full object-cover pointer-events-none"
        />

        <main className="relative flex-1 flex flex-col items-center px-5 pb-[80px] z-10">
          <h2 className="text-[24px] font-semibold text-black tracking-[-0.6px] leading-[30px] mt-[21px]">
            LEVEL UP!
          </h2>
          <p className="text-[16px] font-medium text-gray-muted tracking-[-0.4px] leading-[30px]">
            모로가 알에서 깨어났어요!
          </p>

          {/* 캐릭터 — ground와 겹치도록 살짝 내려앉게 배치 */}
          <div className="relative flex-1 flex items-end justify-center pb-[80px] w-full">
            {/* 파티클은 폭 전체, 세로는 이미지 바로 위쪽에서 시작 (이미지 bottom과 맞춤) */}
            <Particles bottom={80} height={310} />
            <img
              src={moroHatch}
              alt="모로"
              className="relative w-[177px] h-auto object-contain"
            />
          </div>

          {/* 보상 정보 */}
          <div className="w-full h-[122px] rounded-[16px] bg-white border border-primary px-4 pt-[17px] mb-[100px]">
            <p className="text-[16px] font-semibold text-primary-text tracking-[-0.4px] leading-[25px]">
              LV 5 달성
            </p>
            <div className="flex justify-between items-center mt-[14px]">
              <span className="text-[12px] font-medium text-primary tracking-[-0.3px]">
                획득 경험치
              </span>
              <span className="text-[12px] font-medium text-primary tracking-[-0.3px]">
                + 30 XP
              </span>
            </div>
            <div className="flex justify-between items-center mt-[4px]">
              <span className="text-[12px] font-medium text-primary tracking-[-0.3px]">
                앞으로 남은 경험치
              </span>
              <span className="text-[12px] font-medium text-primary tracking-[-0.3px]">
                300 XP
              </span>
            </div>
          </div>
        </main>

        <BottomTabBar />
      </div>
    );
  }

  // 보너스 토큰
  if (step === "bonus") {
    return (
      <div className="relative flex min-h-dvh flex-col overflow-hidden bg-mint-fade">
        <header className="relative flex items-center h-[53px] px-5 z-10">
          <button
            onClick={() => setStep("complete")}
            className="w-[34px] h-[34px] flex items-center justify-center"
          >
            <img src={chevronLeft} alt="" className="w-[34px] h-[34px]" />
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-primary tracking-[-0.5px] leading-[44px]">
            미션
          </p>
        </header>

        {/* 배경 이미지 — 헤더 아래 남은 화면을 꽉 채움 */}
        <img
          src={bgTokenScene}
          alt=""
          className="absolute inset-x-0 top-[53px] bottom-0 w-full h-full object-cover pointer-events-none"
        />

        <main className="relative flex-1 flex flex-col items-center px-5 pb-[80px] z-10">
          {/* 제목 */}
          <h2 className="text-[24px] font-semibold text-black tracking-[-0.6px] leading-[30px] mt-[21px]">
            토큰 획득!
          </h2>
          <p className="text-[16px] font-medium text-gray-muted tracking-[-0.4px] leading-[30px]">
            미션을 완료해 토큰을 받았어요
          </p>

          {/* 토큰 이미지 — ground와 겹치도록 살짝 내려앉게 배치 */}
          <div className="relative flex-1 flex items-end justify-center pb-[35px] w-full">
            {/* 파티클은 폭 전체, 세로는 이미지 바로 위쪽에서 시작 (이미지 bottom과 맞춤) */}
            <Particles bottom={35} height={310} />
            <img
              src={tokenImg}
              alt="보너스 토큰"
              className="relative w-[240px] h-auto object-contain"
            />
          </div>

          {/* 정보 카드 */}
          <div className="w-full h-[122px] rounded-[16px] bg-white border border-primary px-4 pt-[17px] mb-[100px]">
            <p className="text-[16px] font-semibold text-primary-text tracking-[-0.4px] leading-[25px]">
              현재 보유 토큰
            </p>
            <div className="flex justify-between items-center mt-[14px]">
              <span className="text-[12px] font-medium text-primary tracking-[-0.3px]">
                획득 토큰
              </span>
              <span className="text-[12px] font-medium text-primary tracking-[-0.3px]">
                + 5P
              </span>
            </div>
            <div className="flex justify-between items-center mt-[4px]">
              <span className="text-[12px] font-medium text-primary tracking-[-0.3px]">
                현재 보유 토큰
              </span>
              <span className="text-[12px] font-medium text-primary tracking-[-0.3px]">
                35P
              </span>
            </div>
          </div>
        </main>

        <BottomTabBar />
      </div>
    );
  }

  // 인증 실패
  if (step === "fail") {
    return (
      <div className="relative flex min-h-dvh flex-col bg-white">
        <header className="relative flex items-center h-[53px] px-5">
          <button
            onClick={() => navigate("/missions")}
            className="w-[34px] h-[34px] flex items-center justify-center"
          >
            <img src={chevronLeft} alt="" className="w-[34px] h-[34px]" />
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-primary tracking-[-0.5px] leading-[44px]">
            미션
          </p>
        </header>

        <main className="flex-1 flex flex-col px-5 pb-[110px]">
          {/* 제목 */}
          <h2 className="text-[24px] font-semibold text-black tracking-[-0.6px] leading-[30px] text-center mt-[21px]">
            이번엔 조건이 살짝 맞지 않았어요
          </h2>
          <p className="text-[16px] font-medium text-gray-icon tracking-[-0.4px] leading-[30px] text-center">
            괜찮아요. 누구나 처음엔 조금 어려울 수 있어요
          </p>

          {/* 실패 사유 박스 */}
          <div className="w-full rounded-[16px] bg-gray-50 px-5 py-[18px] mt-[61px]">
            <p className="text-[16px] font-semibold text-black tracking-[-0.4px] mb-[26px]">
              인증이 완료되지 않은 이유
            </p>
            <p className="text-[12px] line-height-[25px] font-medium text-gray-muted tracking-[-0.3px] leading-[22px] mb-[3px]">
              사진에서 미션 조건을 확인하지 못했어요
            </p>
            <p className="text-[12px] line-height-[25px] font-medium text-gray-muted tracking-[-0.3px] leading-[22px] mb-[3px]">
              조명이 어둡거나 피사체가 잘 보이지 않으면 AI가 판단하기 어려워요
            </p>
            <p className="text-[12px] line-height-[25px] font-medium text-gray-muted tracking-[-0.3px] leading-[22px]">
              미션에서 요구하는 장면이 사진 전면에 잘 나와 있는지 확인해 보세요
            </p>
          </div>

          {/* 재시도 팁 박스 */}
          <div className="w-full bg-gray-50 px-5 py-[18px] mt-[61px]">
            <p className="text-[16px] font-semibold text-black tracking-[-0.4px] mb-[26px]">
              다시 시도할 때 이렇게 해보세요!
            </p>
            <p className="text-[12px] line-height-[25px] font-medium text-gray-muted tracking-[-0.3px] leading-[22px] mb-[3px]">
              밝은 곳에서 촬영해주세요
            </p>
            <p className="text-[12px] line-height-[25px] font-medium text-gray-muted tracking-[-0.3px] leading-[22px] mb-[3px]">
              미션 조건의 핵심 장면이 사진 중앙에 오도록 찍어주세요
            </p>
            <p className="text-[12px] line-height-[25px] font-medium text-gray-muted tracking-[-0.3px] leading-[22px]">
              흔들림 없이 가까이에서 찍으면 더 잘 인식 돼요
            </p>
          </div>

          <div className="flex-1" />

          {/* 하단 */}
          <p className="text-[12px] font-medium text-gray-muted tracking-[-0.3px] text-center mb-[16px]">
            오늘 미션은 아직 열려 있어요 언제든 다시 도전해봐요
          </p>

          <button
            onClick={() => navigate(-1)}
            className="w-full h-[68px] rounded-[16px] bg-white border border-primary text-primary text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center"
          >
            다시 인증하기
          </button>
        </main>

        <BottomTabBar />
      </div>
    );
  }

  return null;
}

export default MissionResult;
