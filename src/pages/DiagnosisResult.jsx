import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moroLv1 from "../assets/moro-lv1.png";
import moroLv2 from "../assets/moro-lv2.png";

/**
 * 진단 결과 페이지
 * 3단계 플로우: result → improvement → character(시작하기)
 * SelfDiagnosis에서 진단 완료 후 이동하거나, 마이페이지에서 재확인 가능
 */
function DiagnosisResult() {
  const [step, setStep] = useState("result"); // result | improvement | character
  const navigate = useNavigate();

  // 진단 결과
  if (step === "result") {
    return (
      <div className="flex min-h-dvh flex-col bg-white">
        <header className="flex items-center h-[53px] px-5">
          <button onClick={() => navigate(-1)} className="w-[34px] h-[34px] flex items-center justify-center">
            <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
              <path d="M7 1L1 7.5L7 14" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className="flex-1 text-center text-[15px] font-medium">내 진단 확인</span>
          <div className="w-[34px]" />
        </header>

        <main className="flex-1 flex flex-col px-5 pt-4 pb-8">
          {/* 점수 게이지 */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-[200px] h-[100px] mb-2">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                  <path
                    d="M 20 95 A 80 80 0 0 1 180 95"
                    fill="none"
                    stroke="#E0E0E0"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 20 95 A 80 80 0 0 1 70 25"
                    fill="none"
                    stroke="#00CB93"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-end justify-center pb-1">
                  <span className="text-[28px] font-bold">10점</span>
                </div>
              </div>
              <div className="flex justify-between w-full px-2">
                <span className="text-[12px] text-gray-400">정상</span>
                <span className="text-[12px] text-gray-400">위험</span>
              </div>
            </div>

            {/* 삼각형 표시 */}
            <div className="flex justify-center mb-2">
              <span className="text-primary text-[12px]">▼</span>
            </div>

            <p className="text-center text-[14px] text-primary font-medium mb-4">
              같이 극복해요!
            </p>

            <p className="text-[13px] leading-[1.8] text-gray-600">
              은둔형은 관계 자체보다 "물리적으로 밖에 나가지 않는 것"이 핵심 특징으로 나타나는 유형입니다. 
              가족 외의 사람과 연락하거나 마음을 나눌 상대는 어느 정도 남아있지만, 최근 한 달간 집 밖으로 나간 날은 
              손에 꼽을 만큼 줄어든 상태예요. 지금은 Lv.1~2 단계로, 이런 생활이 시작된 지 얼마 되지 않았고 관계망도 
              아직 유지되고 있어 비교적 회복이 수월한 이른 시기에 해당합니다. 다만 이 상태가 길어질수록 외출 자체에 대한 
              심리적 장벽이 점점 높아질 수 있어, 지금처럼 이른 단계에서 집 앞을 나서는 작은 외출부터 다시 습관화하는 것이 중요해요.
            </p>
          </div>

          <button
            onClick={() => navigate("/diagnosis")}
            className="text-[14px] text-gray-500 text-center mb-4"
          >
            다시 진단하기
          </button>

          <button
            onClick={() => setStep("improvement")}
            className="w-full py-[22px] rounded-xl bg-primary text-white text-[16px] font-semibold"
          >
            다음
          </button>
        </main>
      </div>
    );
  }

  // 개선 방안
  if (step === "improvement") {
    return (
      <div className="flex min-h-dvh flex-col bg-white">
        <header className="flex items-center h-[53px] px-5">
          <button onClick={() => setStep("result")} className="w-[34px] h-[34px] flex items-center justify-center">
            <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
              <path d="M7 1L1 7.5L7 14" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className="flex-1 text-center text-[15px] font-medium">나를 위한 개선 방안</span>
          <div className="w-[34px]" />
        </header>

        <main className="flex-1 flex flex-col px-5 pt-4 pb-8">
          <div className="bg-gray-50 rounded-2xl p-6 mb-6 flex-1">
            <h3 className="text-[15px] font-semibold mb-4">왜 개선해야 할까요?</h3>
            <p className="text-[13px] leading-[1.8] text-gray-600 mb-8">
              은둔 성향은 주로 외부 자극이나 사람과의 접촉을 줄이면서 심리적인 안정을 찾으려는 특성입니다. 
              이는 처음에는 지친 마음을 회복하기 위한 자연스러운 반응처럼 느껴지지만, 이 상태가 길어질수록 
              외출이나 낯선 상황 자체에 대한 심리적 장벽이 점점 높아지는 경향이 있습니다.
            </p>

            <h3 className="text-[15px] font-semibold mb-5">어떻게 개선해야 할까요?</h3>
            <div className="space-y-5">
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-sub3 flex items-center justify-center text-[13px] font-bold text-primary shrink-0">1</div>
                <div>
                  <p className="text-[14px] font-medium">하루 3분, 창문 열고 바람 쐬기</p>
                  <p className="text-[12px] text-gray-500 mt-0.5">가장 작지만 확실한 첫 걸음</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-sub3 flex items-center justify-center text-[13px] font-bold text-primary shrink-0">2</div>
                <div>
                  <p className="text-[14px] font-medium">주 2회, 짧은 외출 미션</p>
                  <p className="text-[12px] text-gray-500 mt-0.5">편의점, 근처 공원처럼 가까운 곳부터 천천히 반경을 넓혀가요</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-primary-sub3 flex items-center justify-center text-[13px] font-bold text-primary shrink-0">3</div>
                <div>
                  <p className="text-[14px] font-medium">말하는 일기장으로 마음 기록하기</p>
                  <p className="text-[12px] text-gray-500 mt-0.5">변화를 스스로 확인할수록 다음 걸음이 쉬워져요</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[13px] text-gray-400 text-center mb-4">
            자세한 내용은 마이페이지에서 확인 할 수 있어요
          </p>

          <button
            onClick={() => setStep("character")}
            className="w-full py-[22px] rounded-xl bg-primary text-white text-[16px] font-semibold"
          >
            다음
          </button>
        </main>
      </div>
    );
  }

  // 캐릭터 소개 + 시작하기
  if (step === "character") {
    return (
      <div className="flex min-h-dvh flex-col bg-white">
        <header className="flex items-center h-[53px] px-5">
          <button onClick={() => setStep("improvement")} className="w-[34px] h-[34px] flex items-center justify-center">
            <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
              <path d="M7 1L1 7.5L7 14" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex-1" />
          <div className="w-[34px]" />
        </header>

        <main className="flex-1 flex flex-col items-center px-5 pt-8 pb-8">
          <h2 className="text-[17px] text-center leading-[1.6] font-medium mb-2">
            모로와 함께 첫 미션부터<br />가볍게 시작해볼까요?
          </h2>

          <div className="flex-1 flex flex-col items-center justify-center">
            <img
              src={moroLv2}
              alt="모로"
              className="w-[192px] h-auto object-contain"
            />
            {/* 그림자 */}
            <div className="w-[140px] h-[32px] bg-primary-sub3 rounded-[50%] opacity-40 -mt-3" />
          </div>

          <button
            onClick={() => navigate("/home")}
            className="w-full py-[22px] rounded-xl bg-primary text-white text-[16px] font-semibold"
          >
            시작하기
          </button>
        </main>
      </div>
    );
  }

  return null;
}

export default DiagnosisResult;
