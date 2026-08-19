import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import QUESTIONS from "../data/selfDiagnosisQuestions";
import { submitAssessment } from "../api/diagnosisApi";

function SelfDiagnosis() {
  const [searchParams] = useSearchParams();
  const skipIntro = searchParams.get("skip") === "intro";
  const [step, setStep] = useState(skipIntro ? "guide" : "intro"); // intro | guide | questions
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleNext = async () => {
    if (selected === null) return;
    const newAnswers = { ...answers, [currentQ]: selected };
    setAnswers(newAnswers);
    setSelected(null);

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // 마지막 문항 — API로 답변 제출
      setSubmitting(true);
      try {
        const answerArray = QUESTIONS.map((_, i) => newAnswers[i]);
        await submitAssessment(answerArray);
        navigate("/diagnosis/result");
      } catch (err) {
        alert(err.message || "제출에 실패했어요. 다시 시도해주세요.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleGuideBack = () => {
    if (skipIntro) {
      navigate(-1);
    } else {
      setStep("intro");
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
          <h2 className="text-[20px] font-semibold text-primary tracking-[-0.5px] leading-[25px] mt-[125px] whitespace-pre-line">
            {"오늘보다 조금 더 가까운 내일을 위해,\n지금의 나부터 만나볼까요?"}
          </h2>

          {/* 부제 */}
          <p className="text-[16px] font-medium text-gray-muted tracking-[-0.4px] leading-[25px] mt-[22px]">
            최근의 일상을 떠올리며 나와 가까운 답을 골라주세요
          </p>

          <div className="flex-1" />

          {/* 건너뛰기 */}
          <button
            onClick={() => navigate("/home")}
            className="text-[16px] font-medium text-gray-muted tracking-[-0.4px] text-center mb-[16px]"
          >
            건너뛰기
          </button>

          {/* 시작 버튼 */}
          <button
            onClick={() => setStep("guide")}
            className="w-full h-[68px] rounded-[16px] bg-white border border-primary text-primary text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center mb-[32px]"
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
        <Header
          title="자가진단 전 안내사항"
          onBack={handleGuideBack}
          titleClassName="absolute left-1/2 -translate-x-1/2 text-[14px] font-bold text-primary tracking-[-0.35px] leading-[44px] whitespace-nowrap"
        />

        {/* Content */}
        <main className="flex-1 flex flex-col px-5">
          {/* 부제 */}
          <p className="text-[16px] font-semibold text-black tracking-[-0.4px] leading-[25px] text-center mt-[97px]">
            안내사항을 확인 후에 진단을 시작 할 수 있어요
          </p>

          {/* 안내 카드 1 */}
          <div className="rounded-[12px] bg-mint-pale2 border border-primary-sub1 py-[32px] mt-[29px]">
            <p className="text-[14px] font-medium text-gray-detail tracking-[-0.35px] leading-[25px] text-center">
              본 진단은 질문에 대한 답변을 바탕으로 진행됩니다.
              <br />
              각 질문에 대해 본인의 현재 상태를 가장 정확하게 알려주세요.
              <br />
              <span className="font-semibold text-primary leading-[35px]">
                답변하기 어려운 경우는 마음 가는 쪽으로 선택해도 괜찮아요.
              </span>
            </p>
          </div>

          {/* 안내 카드 2 */}
          <div className="rounded-[12px] bg-mint-pale2 border border-primary-sub1 py-[32px] mt-[29px]">
            <p className="text-[14px] font-medium text-gray-detail tracking-[-0.35px] leading-[25px] text-center">
              본 평가의 결과는 현재의 상태를 이해하고
              <br />
              맞춤 활동을 추천하기 위한 참고 자료로 활용되며,
              <br />
              <span className="font-semibold text-primary">
                의학적 진단을 대신하지 않습니다.
              </span>
            </p>
          </div>

          <div className="flex-1" />

          {/* 하단 안내 */}
          <p className="text-[16px] font-medium text-gray-muted tracking-[-0.4px] leading-[25px] text-center mb-[16px]">
            위의 내용을 확인했다면 진단을 시작해볼까요?
          </p>

          {/* 시작 버튼 */}
          <button
            onClick={() => setStep("questions")}
            className="w-full h-[68px] rounded-[16px] bg-white border border-primary text-primary text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center mb-[32px]"
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
      <Header
        title="총 8문항이에요!"
        onBack={handleBack}
        titleClassName="absolute left-1/2 -translate-x-1/2 text-[14px] font-medium text-primary tracking-[-0.35px] leading-[44px] whitespace-nowrap"
        right={
          <p className="absolute left-[calc(50%+156px)] -translate-x-1/2 text-[14px] font-medium text-primary tracking-[-0.35px] leading-[44px]">
            {currentQ + 1}/{QUESTIONS.length}
          </p>
        }
      />

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
                    ? "bg-primary border-primary text-white font-semibold"
                    : "bg-white border-primary text-primary font-medium"
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
          disabled={selected === null || submitting}
          className={`w-full h-[68px] rounded-[16px] border text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center mb-[32px] transition-all ${
            selected !== null && !submitting
              ? "bg-white border-primary text-primary"
              : "bg-white border-gray-300 text-gray-400"
          }`}
        >
          {submitting ? "제출 중..." : "다음"}
        </button>
      </main>
    </div>
  );
}

export default SelfDiagnosis;
