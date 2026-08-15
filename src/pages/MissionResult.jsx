import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import moroLv2 from "../assets/moro-lv2.png";

/**
 * 미션 결과 페이지
 * 3가지 상태: success(완료) → levelup(레벨업) | bonus(보너스) | 홈
 * 또는 fail(인증 실패)
 */
function MissionResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSuccess = location.state?.success !== false;

  const [step, setStep] = useState(isSuccess ? "complete" : "fail");
  // complete → levelup → bonus → 홈
  // fail → 다시 인증

  // 미션 완료
  if (step === "complete") {
    return (
      <div className="flex min-h-dvh flex-col bg-white">
        <div className="h-[44px]" />

        <header className="flex items-center h-[53px] px-5">
          <button onClick={() => navigate("/missions")} className="w-[34px] h-[34px] flex items-center justify-center">
            <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
              <path d="M7 1L1 7.5L7 14" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className="flex-1 text-center text-[15px] font-medium">미션</span>
          <div className="w-[34px]" />
        </header>

        <main className="flex-1 flex flex-col items-center px-5 pt-8 pb-8">
          {/* 축하 메시지 */}
          <h2 className="text-[22px] font-bold mb-2">미션 완료!</h2>
          <p className="text-[15px] text-gray-500 mb-8">오늘도 한 걸음 나아갔어요</p>

          {/* 캐릭터 */}
          <div className="flex-1 flex items-center justify-center">
            <img src={moroLv2} alt="모로" className="w-[160px] h-auto" />
          </div>

          {/* 보상 정보 */}
          <div className="w-full bg-gray-50 rounded-2xl p-5 mb-6">
            <h4 className="text-[14px] font-medium mb-4">오늘의 보상</h4>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[13px] text-gray-600">경험치</span>
              <span className="text-[13px] font-medium text-primary">+ 30 XP</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-gray-600">토큰</span>
              <span className="text-[13px] font-medium text-primary">+ 20P</span>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="w-full flex gap-3">
            <button
              onClick={() => setStep("levelup")}
              className="flex-1 py-[18px] rounded-xl border border-gray-200 text-[14px] font-medium"
            >
              캐릭터 성장 확인하기
            </button>
            <button
              onClick={() => setStep("bonus")}
              className="flex-1 py-[18px] rounded-xl bg-primary text-white text-[14px] font-semibold"
            >
              보너스 보상 받기
            </button>
          </div>
        </main>
      </div>
    );
  }

  // 레벨업
  if (step === "levelup") {
    return (
      <div className="flex min-h-dvh flex-col bg-white">
        <div className="h-[44px]" />

        <header className="flex items-center h-[53px] px-5">
          <button onClick={() => setStep("complete")} className="w-[34px] h-[34px] flex items-center justify-center">
            <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
              <path d="M7 1L1 7.5L7 14" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className="flex-1 text-center text-[15px] font-medium">미션</span>
          <div className="w-[34px]" />
        </header>

        <main className="flex-1 flex flex-col items-center px-5 pt-8 pb-8">
          <h2 className="text-[22px] font-bold mb-2">LEVEL UP!</h2>
          <p className="text-[15px] text-gray-500 mb-8">모로가 알에서 깨어났어요!</p>

          {/* 캐릭터 */}
          <div className="flex-1 flex items-center justify-center">
            <img src={moroLv2} alt="모로 레벨업" className="w-[177px] h-auto" />
          </div>

          {/* 레벨 정보 */}
          <div className="w-full bg-gray-50 rounded-2xl p-5 mb-6">
            <h4 className="text-[14px] font-medium mb-4">LV 2 달성</h4>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[13px] text-gray-600">획득 경험치</span>
              <span className="text-[13px] font-medium text-primary">+ 30 XP</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-gray-600">앞으로 남은 경험치</span>
              <span className="text-[13px] font-medium">300 XP</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/home")}
            className="w-full py-[22px] rounded-xl bg-primary text-white text-[16px] font-semibold"
          >
            홈으로 돌아가기
          </button>
        </main>
      </div>
    );
  }

  // 보너스 토큰
  if (step === "bonus") {
    return (
      <div className="flex min-h-dvh flex-col bg-white">
        <div className="h-[44px]" />

        <header className="flex items-center h-[53px] px-5">
          <button onClick={() => setStep("complete")} className="w-[34px] h-[34px] flex items-center justify-center">
            <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
              <path d="M7 1L1 7.5L7 14" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className="flex-1 text-center text-[15px] font-medium">미션</span>
          <div className="w-[34px]" />
        </header>

        <main className="flex-1 flex flex-col items-center px-5 pt-8 pb-8">
          <h2 className="text-[22px] font-bold mb-2">보너스 토큰 획득!</h2>
          <p className="text-[15px] text-gray-500 mb-8">오늘 미션을 완료해 특별 보너스를 받았어요</p>

          {/* 토큰 이미지 placeholder */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-[200px] h-[200px] bg-primary-sub4 rounded-full flex items-center justify-center">
              <span className="text-[48px]">🪙</span>
            </div>
          </div>

          {/* 토큰 정보 */}
          <div className="w-full bg-gray-50 rounded-2xl p-5 mb-6">
            <h4 className="text-[14px] font-medium mb-4">현재 보유 토큰</h4>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[13px] text-gray-600">획득 보너스 토큰</span>
              <span className="text-[13px] font-medium text-primary">+ 5P</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-gray-600">현재 보유 토큰</span>
              <span className="text-[13px] font-medium">35P</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/home")}
            className="w-full py-[22px] rounded-xl bg-primary text-white text-[16px] font-semibold"
          >
            홈으로 돌아가기
          </button>
        </main>
      </div>
    );
  }

  // 인증 실패
  if (step === "fail") {
    return (
      <div className="flex min-h-dvh flex-col bg-white">
        <div className="h-[44px]" />

        <header className="flex items-center h-[53px] px-5">
          <button onClick={() => navigate("/missions")} className="w-[34px] h-[34px] flex items-center justify-center">
            <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
              <path d="M7 1L1 7.5L7 14" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className="flex-1 text-center text-[15px] font-medium">미션</span>
          <div className="w-[34px]" />
        </header>

        <main className="flex-1 flex flex-col px-5 pt-8 pb-8">
          <h2 className="text-[18px] font-bold text-center mb-2">
            이번엔 조건이 살짝 맞지 않았어요
          </h2>
          <p className="text-[14px] text-gray-500 text-center mb-8">
            괜찮아요. 누구나 처음엔 조금 어려울 수 있어요
          </p>

          {/* 실패 사유 */}
          <div className="bg-gray-50 rounded-xl p-5 mb-4">
            <h4 className="text-[14px] font-medium mb-4">인증이 완료되지 않은 이유</h4>
            <p className="text-[13px] text-gray-600 mb-2">
              사진에서 미션 조건을 확인하지 못했어요
            </p>
            <p className="text-[12px] text-gray-500 mb-2">
              조명이 어둡거나 피사체가 잘 보이지 않으면 AI가 판단하기 어려워요
            </p>
            <p className="text-[12px] text-gray-500">
              미션에서 요구하는 장면이 사진 전면에 잘 나와 있는지 확인해 보세요
            </p>
          </div>

          {/* 재시도 팁 */}
          <div className="bg-gray-50 rounded-xl p-5 mb-auto">
            <h4 className="text-[14px] font-medium mb-4">다시 시도할 때 이렇게 해보세요!</h4>
            <ul className="space-y-2">
              <li className="text-[13px] text-gray-600">밝은 곳에서 촬영해주세요</li>
              <li className="text-[13px] text-gray-600">미션 조건의 핵심 장면이 사진 중앙에 오도록 찍어주세요</li>
              <li className="text-[13px] text-gray-600">흔들림 없이 가까이에서 찍으면 더 잘 인식 돼요</li>
            </ul>
          </div>

          <p className="text-[12px] text-gray-400 text-center mb-4">
            오늘 미션은 아직 열려 있어요. 언제든 다시 도전해봐요
          </p>

          <button
            onClick={() => navigate(-1)}
            className="w-full py-[22px] rounded-xl bg-primary text-white text-[16px] font-semibold"
          >
            다시 인증하기
          </button>
        </main>
      </div>
    );
  }

  return null;
}

export default MissionResult;
