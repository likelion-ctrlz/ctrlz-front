import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moroLv1 from "../assets/moro-lv1.png";

function DiagnosisResult() {
  const [step, setStep] = useState("result"); // result | improvement | character
  const navigate = useNavigate();

  // 진단 결과
  if (step === "result") {
    return (
      <div className="relative flex min-h-dvh flex-col bg-[#E6FFF8]">

        {/* Header */}
        <header className="relative flex items-center h-[53px] px-5">
          <button onClick={() => navigate(-1)} className="w-[34px] h-[34px] flex items-center justify-center">
            <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
              <path d="M7 1L1 7.5L7 14" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 text-[18px] font-semibold text-[#00CB93] tracking-[-0.45px] leading-[44px]">
            내 진단 확인
          </p>
        </header>

        {/* 카드 */}
        <main className="flex-1 flex flex-col px-5 pt-[49px]">
          <div className="w-full bg-white border border-[#39D7AB] rounded-[12px] px-4 pt-6 pb-6">
            {/* 게이지 영역 */}
            <div className="flex flex-col items-center mb-4">
              {/* "같이 극복해요!" */}
              <p className="text-[16px] font-semibold text-white tracking-[-0.4px] bg-[#00CB93] px-4 py-1 rounded-full mb-4">
                같이 극복해요!
              </p>

              {/* 반원 게이지 */}
              <div className="relative w-[240px] h-[120px] mb-2">
                <svg viewBox="0 0 240 120" className="w-full h-full">
                  {/* 초록 영역 (왼쪽) */}
                  <path
                    d="M 20 115 A 100 100 0 0 1 120 15"
                    fill="none"
                    stroke="#00CB93"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />
                  {/* 빨간 영역 (오른쪽) */}
                  <path
                    d="M 120 15 A 100 100 0 0 1 220 115"
                    fill="none"
                    stroke="#FF627E"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />
                </svg>
                {/* 삼각형 포인터 */}
                <div className="absolute top-[55px] left-1/2 -translate-x-1/2">
                  <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
                    <polygon points="8,0 16,14 0,14" fill="#00CB93"/>
                  </svg>
                </div>
              </div>

              {/* 점수 */}
              <p className="mb-1">
                <span className="text-[40px] font-semibold text-[#00CB93]">10</span>
                <span className="text-[16px] text-[#606060]">점</span>
              </p>

              {/* 정상 / 위험 라벨 */}
              <div className="flex justify-between w-full px-2">
                <span className="text-[12px] font-semibold text-[#AAEEDB] tracking-[-0.3px]">정상</span>
                <span className="text-[12px] font-semibold text-[#FF627E] tracking-[-0.3px]">위험</span>
              </div>
            </div>

            {/* 설명 */}
            <p className="text-[14px] font-medium text-[#74767A] tracking-[-0.35px] leading-[25px] mt-4">
              은둔형은 관계 자체보다 "물리적으로 밖에 나가지 않는 것"이 핵심 특징으로 나타나는 유형입니다. 가족 외의 사람과 연락하거나 마음을 나눌 상대는 어느 정도 남아있지만, 최근 한 달간 집 밖으로 나간 날은 손에 꼽을 만큼 줄어든 상태예요.
            </p>
            <p className="text-[14px] font-medium text-[#74767A] tracking-[-0.35px] leading-[25px] mt-2">
              지금은 Lv.1~2 단계로, 이런 생활이 시작된 지 얼마 되지 않았고 관계망도 아직 유지되고 있어 비교적 회복이 수월한 이른 시기에 해당합니다. 다만 이 상태가 길어질수록 외출 자체에 대한 심리적 장벽이 점점 높아질 수 있어, 지금처럼 이른 단계에서 <span className="text-[#00CB93]">집 앞을 나서는 작은 외출부터 다시 습관화하는 것이 중요해요.</span>
            </p>
          </div>

          <div className="flex-1" />

          {/* 다시 진단하기 */}
          <button
            onClick={() => navigate("/diagnosis")}
            className="text-[16px] font-medium text-[#949494] tracking-[-0.4px] text-center mb-[16px]"
          >
            다시 진단하기
          </button>

          {/* 다음 버튼 */}
          <button
            onClick={() => setStep("improvement")}
            className="w-full h-[68px] rounded-[16px] bg-white border border-[#00CB93] text-[#00CB93] text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center mb-[66px]"
          >
            다음
          </button>
        </main>

        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-[100px]" />
      </div>
    );
  }

  // 개선 방안
  if (step === "improvement") {
    return (
      <div className="relative flex min-h-dvh flex-col bg-[#E6FFF8]">

        <header className="relative flex items-center h-[53px] px-5">
          <button onClick={() => setStep("result")} className="w-[34px] h-[34px] flex items-center justify-center">
            <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
              <path d="M7 1L1 7.5L7 14" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 text-[18px] font-semibold text-[#00CB93] tracking-[-0.45px] leading-[44px]">
            나를 위한 개선 방안
          </p>
        </header>

        <main className="flex-1 flex flex-col px-5 pt-[49px]">
          <div className="w-full bg-white border border-[#39D7AB] rounded-[12px] px-4 pt-[30px] pb-6 relative">
            {/* 왜 개선해야 할까요? */}
            <h3 className="text-[20px] font-semibold text-[#00CB93] tracking-[-0.5px] leading-[25px] text-center">
              왜 개선해야 할까요?
            </h3>
            <p className="text-[14px] font-medium text-[#74767A] tracking-[-0.35px] leading-[25px] mt-[20px]">
              은둔 성향은 주로 외부 자극이나 사람과의 접촉을 줄이면서 심리적인 안정을 찾으려는 특성입니다. 이는 처음에는 지친 마음을 회복하기 위한 자연스러운 반응처럼 느껴지지만, 이 상태가 길어질수록 외출이나 낯선 상황 자체에 대한 심리적 장벽이 점점 높아지는 경향이 있습니다. 결국 몸을 움직이는 것 자체가 부담스러워지고, 일상적인 사회 활동이나 관계 형성에도 점차 어려움을 느끼게 되어, 스스로 다시 밖으로 나가는 것이 더욱 더 어렵게 느껴질 수 있습니다.
            </p>

            {/* 어떻게 개선해야 할까요? */}
            <h3 className="text-[20px] font-semibold text-[#00CB93] tracking-[-0.5px] leading-[25px] text-center mt-[30px]">
              어떻게 개선해야 할까요?
            </h3>

            <div className="mt-[20px] space-y-[12px]">
              {/* 1 */}
              <div className="flex items-start gap-3">
                <div className="w-[36px] h-[36px] rounded-full bg-[#00CB93] flex items-center justify-center shrink-0">
                  <span className="text-[16px] font-medium text-white">1</span>
                </div>
                <div>
                  <p className="text-[14px] font-medium text-[#00CB93] tracking-[-0.35px] leading-[25px]">하루 3분, 창문 열고 바람 쐬기</p>
                  <p className="text-[10px] font-medium text-[#74767A] tracking-[-0.25px] leading-[25px]">가장 작지만 확실한 첫 걸음</p>
                </div>
              </div>
              {/* 2 */}
              <div className="flex items-start gap-3">
                <div className="w-[36px] h-[36px] rounded-full bg-[#00CB93] flex items-center justify-center shrink-0">
                  <span className="text-[16px] font-medium text-white">2</span>
                </div>
                <div>
                  <p className="text-[14px] font-medium text-[#00CB93] tracking-[-0.35px] leading-[25px]">주 2회, 짧은 외출 미션</p>
                  <p className="text-[10px] font-medium text-[#74767A] tracking-[-0.25px] leading-[25px]">편의점, 근처 공원처럼 가까운 곳부터 천천히 반경을 넓혀가요</p>
                </div>
              </div>
              {/* 3 */}
              <div className="flex items-start gap-3">
                <div className="w-[36px] h-[36px] rounded-full bg-[#00CB93] flex items-center justify-center shrink-0">
                  <span className="text-[16px] font-medium text-white">3</span>
                </div>
                <div>
                  <p className="text-[14px] font-medium text-[#00CB93] tracking-[-0.35px] leading-[25px]">말하는 일기장으로 마음 기록하기</p>
                  <p className="text-[10px] font-medium text-[#74767A] tracking-[-0.25px] leading-[25px]">변화를 스스로 확인할수록 다음 걸음이 쉬워져요</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1" />

          {/* 하단 안내 */}
          <p className="text-[16px] font-medium text-[#949494] tracking-[-0.4px] text-center mb-[16px]">
            자세한 내용은 마이페이지에서 확인 할 수 있어요
          </p>

          <button
            onClick={() => setStep("character")}
            className="w-full h-[68px] rounded-[16px] bg-white border border-[#00CB93] text-[#00CB93] text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center mb-[66px]"
          >
            다음
          </button>
        </main>

        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-[100px]" />
      </div>
    );
  }

  // 캐릭터 소개 1 — 격려
  if (step === "character") {
    return (
      <div className="relative flex min-h-dvh flex-col bg-[#00CB93]">

        <header className="relative flex items-center h-[53px] px-5">
          <button onClick={() => setStep("improvement")} className="w-[34px] h-[34px] flex items-center justify-center">
            <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
              <path d="M7 1L1 7.5L7 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </header>

        <main className="flex-1 flex flex-col px-[37px] pt-[146px]">
          {/* 제목 */}
          <h2 className="text-[20px] font-extrabold text-white leading-normal">
            요즘 밖으로 나가는 게 조금 망설여지셨죠?
          </h2>

          {/* 부제 */}
          <div className="text-[14px] font-medium text-[#C6F3E7] text-center leading-normal mt-[26px]">
            <p>그럴 수 있어요</p>
            <p>누구에게나 잠시 멈춰있는 시기가 필요하니까요</p>
            <p>지금은 집 안에서부터 아주 작은 걸음을 시작해볼 때예요</p>
          </div>

          <div className="flex-1" />

          {/* 캐릭터 */}
          <div className="flex flex-col items-center mb-[20px]">
            <img
              src={moroLv1}
              alt="모로 알"
              className="w-[192px] h-[288px] object-contain"
            />
            <div
              className="w-[183px] h-[47px] -mt-3"
              style={{ background: "rgba(0,0,0,0.08)", borderRadius: "50%" }}
            />
          </div>
        </main>

        {/* 버튼 */}
        <div className="px-5 pb-[66px]">
          <button
            onClick={() => setStep("character2")}
            className="w-full h-[68px] rounded-[16px] bg-white border border-[#00CB93] text-[#00CB93] text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center"
          >
            시작하기
          </button>
        </div>

        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-[100px]" />
      </div>
    );
  }

  // 캐릭터 소개 2 — 미션 시작
  if (step === "character2") {
    return (
      <div className="relative flex min-h-dvh flex-col bg-[#00CB93]">

        <header className="relative flex items-center h-[53px] px-5">
          <button onClick={() => setStep("character")} className="w-[34px] h-[34px] flex items-center justify-center">
            <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
              <path d="M7 1L1 7.5L7 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </header>

        <main className="flex-1 flex flex-col items-center px-5 pt-[143px]">
          {/* 제목 */}
          <h2 className="text-[20px] font-extrabold text-white text-center leading-normal">
            모로와 함께 첫 미션부터<br/>가볍게 시작해볼까요?
          </h2>

          <div className="flex-1" />

          {/* 캐릭터 */}
          <div className="flex flex-col items-center mb-[20px]">
            <img
              src={moroLv1}
              alt="모로 알"
              className="w-[192px] h-[288px] object-contain"
            />
            <div
              className="w-[183px] h-[47px] -mt-3"
              style={{ background: "rgba(0,0,0,0.08)", borderRadius: "50%" }}
            />
          </div>
        </main>

        {/* 버튼 */}
        <div className="px-5 pb-[66px]">
          <button
            onClick={() => navigate("/home")}
            className="w-full h-[68px] rounded-[16px] bg-white border border-[#00CB93] text-[#00CB93] text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center"
          >
            시작하기
          </button>
        </div>

        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-[100px]" />
      </div>
    );
  }

  return null;
}

export default DiagnosisResult;
