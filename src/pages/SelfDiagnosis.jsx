import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QUESTIONS = [
  {
    id: 1,
    text: "최근 한 달, 특별한 용무 없이도\n집 밖으로 나간 날이 얼마나 되나요?",
    options: ["거의 매일 (주 5일 이상)", "주 2~4일", "주 1일 이하", "거의 안 나간다"],
  },
  {
    id: 2,
    text: "집에 있을 때, 내 방(또는 특정 공간) 밖으로 나오지 않고 지내는 편인가요?\n(식사, 화장실 제외)",
    options: ["거의 항상 거실 등 공용공간에서 지낸다", "가끔 방에만 있다", "대부분 방 안에서 지낸다", "거의 하루 종일 방 밖으로 안 나온다"],
  },
  {
    id: 3,
    text: "지금과 같은 생활(외출을 잘 안 하는 상태)이 얼마나 지속되고 있나요?",
    options: ["1개월 미만", "1~6개월", "6개월~1년", "1~3년", "3년 이상"],
  },
  {
    id: 4,
    text: "최근 한 달, 가족을 제외하고 직접 만나서 대화한 사람이 있나요?\n(전화, 영상통화 포함)",
    options: ["매일", "주 1~2회", "한 달에 몇 번", "거의 없다", "전혀 없다"],
  },
  {
    id: 5,
    text: "사람들과의 소통이 있다면, 주로 어떤 방식인가요?",
    options: ["직접 만나서 소통한다", "온라인이 더 많지만 오프라인도 있다", "온라인으로만 소통한다", "온라인이든 오프라인이든 거의 소통이 없다"],
  },
  {
    id: 6,
    text: "최근 6개월, 힘든 일이 생겼을 때 편하게 이야기하거나 도움을 요청할 사람이 있었나요?",
    options: ["언제든 있었다", "가끔 있었다", "거의 없었다", "전혀 없었다"],
  },
  {
    id: 7,
    text: "현재 소속(학교, 직장, 아르바이트 등)이 있나요?",
    options: ["있고 정상적으로 다닌다", "있지만 거의 나가지 않는다", "없지만 구직 및 진학을 준비 중이다", "특별한 활동 없다"],
  },
  {
    id: 8,
    text: "요즘 느끼는 감정에 가장 가까운 것은 무엇인가요?",
    options: ["특별히 힘들지 않다", "가끔 무기력하거나 불안하다", "자주 무기력하거나 우울하다", "사람 만나는 것 자체가 두렵거나 피하고 싶다"],
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

  // 인트로 화면
  if (step === "intro") {
    return (
      <div className="relative flex min-h-dvh flex-col bg-white">
        <div className="h-[44px]" />

        {/* Content */}
        <main className="flex-1 flex flex-col px-[34px]">
          {/* 제목 */}
          <h2 className="text-[20px] font-semibold text-[#00CB93] tracking-[-0.5px] leading-[25px] mt-[125px] whitespace-pre-line">
            {"오늘보다 조금 더 가까운 내일을 위해,\n지금의 나부터 만나볼까요?"}
          </h2>

          {/* 부제 */}
          <p className="text-[16px] font-medium text-[#949494] tracking-[-0.4px] leading-[25px] mt-[22px]">
            최근의 일상을 떠올리며 나와 가까운 답을 골라주세요
          </p>

          <div className="flex-1" />

          {/* 건너뛰기 */}
          <button
            onClick={() => navigate("/home")}
            className="text-[16px] font-medium text-[#949494] tracking-[-0.4px] text-center mb-[16px]"
          >
            건너뛰기
          </button>

          {/* 시작 버튼 */}
          <button
            onClick={() => setStep("questions")}
            className="w-full h-[68px] rounded-[16px] bg-white border border-[#00CB93] text-[#00CB93] text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center mb-[66px]"
          >
            자가진단 시작하기
          </button>
        </main>

        {/* Home indicator */}
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-[100px]" />
      </div>
    );
  }

  // 문항 화면
  const question = QUESTIONS[currentQ];

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">
      <div className="h-[44px]" />

      {/* Header */}
      <header className="relative flex items-center h-[53px] px-5">
        <button onClick={handleBack} className="w-[34px] h-[34px] flex items-center justify-center">
          <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
            <path d="M7 1L1 7.5L7 14" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[14px] font-medium text-[#00CB93] tracking-[-0.35px] leading-[44px]">
          총 8문항이에요!
        </p>
        <p className="absolute right-5 text-[14px] font-medium text-[#00CB93] tracking-[-0.35px] leading-[44px]">
          {currentQ + 1}/{QUESTIONS.length}
        </p>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col px-5">
        {/* 질문 */}
        <p className="text-[16px] font-medium text-black tracking-[-0.4px] leading-[25px] mt-[74px] whitespace-pre-line">
          {String(question.id).padStart(2, "0")}. {question.text}
        </p>

        {/* 선택지 */}
        <div className="flex flex-col gap-[16px] mt-[74px]">
          {question.options.map((option, idx) => {
            const isSelected = selected === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelected(idx)}
                className={`w-full h-[46px] rounded-[10px] border text-[16px] tracking-[-0.4px] flex items-center justify-center transition-all ${
                  isSelected
                    ? "bg-[#00CB93] border-[#00CB93] text-white font-semibold"
                    : "bg-white border-[#00CB93] text-[#00CB93] font-medium"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div className="flex-1" />

        {/* 다음 버튼 */}
        <button
          onClick={handleNext}
          disabled={selected === null}
          className={`w-full h-[68px] rounded-[16px] border text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center mb-[66px] transition-all ${
            selected !== null
              ? "bg-white border-[#00CB93] text-[#00CB93]"
              : "bg-white border-[#E0E0E0] text-[#BDBDBD]"
          }`}
        >
          다음
        </button>
      </main>

      {/* Home indicator */}
      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-[100px]" />
    </div>
  );
}

export default SelfDiagnosis;
