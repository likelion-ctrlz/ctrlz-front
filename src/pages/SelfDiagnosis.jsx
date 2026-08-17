import { useState } from "react";
import { useNavigate } from "react-router-dom";
import chevronLeft from "../assets/icon/chevron-left.png";
import QUESTIONS from "../data/selfDiagnosisQuestions";

function SelfDiagnosis() {
  const [step, setStep] = useState("intro"); // intro | guide | questions
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
      setStep("guide");
    }
  };

  // 인트로 화면
  if (step === "intro") {
    return (
      <div className="relative flex min-h-dvh flex-col bg-white">
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
            onClick={() => setStep("guide")}
            className="w-full h-[68px] rounded-[16px] bg-white border border-[#00CB93] text-[#00CB93] text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center mb-[66px]"
          >
            자가진단 시작하기
          </button>
        </main>
      </div>
    );
  }

  // 안내사항 화면
  if (step === "guide") {
    return (
      <div className="relative flex min-h-dvh flex-col bg-white">
        {/* Header */}
        <header className="relative flex items-center h-[53px] px-5">
          <button
            onClick={() => setStep("intro")}
            className="w-[34px] h-[34px] flex items-center justify-center"
          >
            <img src={chevronLeft} alt="" className="w-[34px] h-[34px]" />
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 text-[14px] font-bold text-[#00CB93] tracking-[-0.35px] leading-[44px]">
            자가진단 전 안내사항
          </p>
        </header>

        {/* Content */}
        <main className="flex-1 flex flex-col px-5">
          {/* 부제 */}
          <p className="text-[16px] font-semibold text-black tracking-[-0.4px] leading-[25px] text-center mt-[97px]">
            안내사항을 확인 후에 진단을 시작 할 수 있어요
          </p>

          {/* 안내 카드 1 */}
          <div className="rounded-[12px] bg-[#EFFFFB] border border-[#39D7AB] py-[32px] mt-[29px]">
            <p className="text-[14px] font-medium text-[#74767A] tracking-[-0.35px] leading-[25px] text-center">
              본 진단은 질문에 대한 답변을 바탕으로 진행됩니다.
              <br />
              각 질문에 대해 본인의 현재 상태를 가장 정확하게 알려주세요.
              <br />
              <span className="font-semibold text-[#00CB93] leading-[35px]">
                답변하기 어려운 경우는 마음 가는 쪽으로 선택해도 괜찮아요.
              </span>
            </p>
          </div>

          {/* 안내 카드 2 */}
          <div className="rounded-[12px] bg-[#EFFFFB] border border-[#39D7AB] py-[32px] mt-[29px]">
            <p className="text-[14px] font-medium text-[#74767A] tracking-[-0.35px] leading-[25px] text-center">
              본 평가의 결과는 현재의 상태를 이해하고
              <br />
              맞춤 활동을 추천하기 위한 참고 자료로 활용되며,
              <br />
              <span className="font-semibold text-[#00CB93]">
                의학적 진단을 대신하지 않습니다.
              </span>
            </p>
          </div>

          <div className="flex-1" />

          {/* 하단 안내 */}
          <p className="text-[16px] font-medium text-[#949494] tracking-[-0.4px] leading-[25px] text-center mb-[16px]">
            위의 내용을 확인했다면 진단을 시작해볼까요?
          </p>

          {/* 시작 버튼 */}
          <button
            onClick={() => setStep("questions")}
            className="w-full h-[68px] rounded-[16px] bg-white border border-[#00CB93] text-[#00CB93] text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center mb-[66px]"
          >
            자가진단 시작하기
          </button>
        </main>
      </div>
    );
  }

  // 문항 화면
  const question = QUESTIONS[currentQ];

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">
      {/* Header */}
      <header className="relative flex items-center h-[53px] px-5">
        <button
          onClick={handleBack}
          className="w-[34px] h-[34px] flex items-center justify-center"
        >
          <img src={chevronLeft} alt="" className="w-[34px] h-[34px]" />
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[14px] font-medium text-[#00CB93] tracking-[-0.35px] leading-[44px]">
          총 8문항이에요!
        </p>
        <p className="absolute left-[calc(50%+156px)] -translate-x-1/2 text-[14px] font-medium text-[#00CB93] tracking-[-0.35px] leading-[44px]">
          {currentQ + 1}/{QUESTIONS.length}
        </p>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col px-5">
        {/* 질문 */}
        <p className="text-[16px] font-medium text-black tracking-[-0.4px] leading-[25px] mt-[74px] ml-[15px] whitespace-pre-line">
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
    </div>
  );
}

export default SelfDiagnosis;
