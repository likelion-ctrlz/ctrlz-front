import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QUESTIONS = [
  {
    id: 1,
    text: "최근 한 달, 특별한 용무 없이도 집 밖으로 나간 날이 얼마나 되나요?",
    options: [
      "거의 매일 (주 5일 이상)",
      "주 2~4일",
      "주 1일 이하",
      "거의 안 나간다",
    ],
  },
  {
    id: 2,
    text: "집에 있을 때, 내 방(또는 특정 공간) 밖으로 나오지 않고 지내는 편인가요? (식사, 화장실 제외)",
    options: [
      "거의 항상 거실 등 공용공간에서 지낸다",
      "가끔 방에만 있다",
      "대부분 방 안에서 지낸다",
      "거의 하루 종일 방 밖으로 안 나온다",
    ],
  },
  {
    id: 3,
    text: "지금과 같은 생활(외출을 잘 안 하는 상태)이 얼마나 지속되고 있나요?",
    options: [
      "1개월 미만",
      "1~6개월",
      "6개월~1년",
      "1~3년",
      "3년 이상",
    ],
  },
  {
    id: 4,
    text: "최근 한 달, 가족을 제외하고 직접 만나서 대화한 사람이 있나요? (전화, 영상통화 포함)",
    options: [
      "매일",
      "주 1~2회",
      "한 달에 몇 번",
      "거의 없다",
      "전혀 없다",
    ],
  },
  {
    id: 5,
    text: "사람들과의 소통이 있다면, 주로 어떤 방식인가요?",
    options: [
      "직접 만나서 소통한다",
      "온라인이 더 많지만 오프라인도 있다",
      "온라인으로만 소통한다",
      "온라인이든 오프라인이든 거의 소통이 없다",
    ],
  },
  {
    id: 6,
    text: "최근 6개월, 힘든 일이 생겼을 때 편하게 이야기하거나 도움을 요청할 사람이 있었나요?",
    options: [
      "언제든 있었다",
      "가끔 있었다",
      "거의 없었다",
      "전혀 없었다",
    ],
  },
  {
    id: 7,
    text: "현재 소속(학교, 직장, 아르바이트 등)이 있나요?",
    options: [
      "있고 정상적으로 다닌다",
      "있지만 거의 나가지 않는다",
      "없지만 구직 및 진학을 준비 중이다",
      "특별한 활동 없다",
    ],
  },
  {
    id: 8,
    text: "요즘 느끼는 감정에 가장 가까운 것은 무엇인가요?",
    options: [
      "특별히 힘들지 않다",
      "가끔 무기력하거나 불안하다",
      "자주 무기력하거나 우울하다",
      "사람 만나는 것 자체가 두렵거나 피하고 싶다",
    ],
  },
];

function SelfDiagnosis() {
  const [step, setStep] = useState("intro"); // intro | questions
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = { ...answers, [currentQ]: selected };
    setAnswers(newAnswers);
    setSelected(null);

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // 진단 완료 → 결과 페이지로 이동
      navigate("/diagnosis/result");
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      setSelected(answers[currentQ - 1] ?? null);
    } else {
      setStep("intro");
    }
  };

  // 안내 화면
  if (step === "intro") {
    return (
      <div className="flex min-h-dvh flex-col bg-white">
        <header className="flex items-center h-[53px] px-5 border-b border-gray-100">
          <button onClick={() => navigate(-1)} className="w-[34px] h-[34px] flex items-center justify-center">
            <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
              <path d="M7 1L1 7.5L7 14" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span className="flex-1 text-center text-[15px] font-medium">자가진단 전 안내사항</span>
          <div className="w-[34px]" />
        </header>

        <main className="flex-1 flex flex-col px-5 pt-8 pb-8">
          <p className="text-[15px] text-gray-500 mb-6">
            안내사항을 확인 후에 진단을 시작 할 수 있어요
          </p>

          <div className="bg-gray-50 rounded-xl p-5 mb-4">
            <p className="text-[14px] leading-relaxed text-gray-700">
              본 진단은 질문에 대한 답변을 바탕으로 진행됩니다. 각 질문에 대해 본인의 현재 상태를 가장 정확하게 알려주세요. 답변하기 어려운 경우는 마음 가는 쪽으로 선택해도 괜찮아요.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 mb-auto">
            <p className="text-[14px] leading-relaxed text-gray-700">
              본 평가의 결과는 현재의 상태를 이해하고 맞춤 활동을 추천하기 위한 참고 자료로 활용되며, 의학적 진단을 대신하지 않습니다.
            </p>
          </div>

          <p className="text-[14px] text-gray-500 text-center mb-4">
            위의 내용을 확인했다면 진단을 시작해볼까요?
          </p>

          <button
            onClick={() => setStep("questions")}
            className="w-full py-[22px] rounded-xl bg-primary text-white text-[16px] font-semibold"
          >
            자가진단 시작하기
          </button>
        </main>
      </div>
    );
  }

  // 문항 화면
  const question = QUESTIONS[currentQ];
  const progress = ((currentQ + 1) / QUESTIONS.length) * 100;

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <header className="flex items-center h-[53px] px-5">
        <button onClick={handleBack} className="w-[34px] h-[34px] flex items-center justify-center">
          <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
            <path d="M7 1L1 7.5L7 14" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="flex-1 text-center text-[14px] text-gray-500">총 8문항이에요!</span>
        <span className="text-[14px] text-gray-400 w-[34px] text-right">{currentQ + 1}/{QUESTIONS.length}</span>
      </header>

      {/* Progress bar */}
      <div className="px-5 mb-8">
        <div className="h-[3px] bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <main className="flex-1 flex flex-col px-5 pb-8">
        <p className="text-[16px] font-medium leading-[1.6] mb-10">
          {String(question.id).padStart(2, "0")}. {question.text}
        </p>

        <div className="flex flex-col gap-[16px] mb-auto">
          {question.options.map((option, idx) => {
            const isSelected = selected === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelected(idx)}
                className={`w-full py-[13px] px-5 rounded-xl border text-[14px] text-center transition-all ${
                  isSelected
                    ? "border-primary bg-primary-sub4 text-primary font-medium"
                    : "border-gray-200 bg-white text-gray-700"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNext}
          disabled={selected === null}
          className={`w-full py-[22px] rounded-xl text-[16px] font-semibold mt-8 transition-all ${
            selected !== null
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-400"
          }`}
        >
          다음
        </button>
      </main>
    </div>
  );
}

export default SelfDiagnosis;
