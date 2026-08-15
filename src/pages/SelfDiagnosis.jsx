import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import { submitAssessment } from "../api/assessmentApi";

const QUESTIONS = [
  {
    title: "최근 한 달, 집 밖으로 나간 날이 얼마나 되나요?",
    options: [
      { label: "거의 매일 (주 5일 이상)", score: 0 },
      { label: "주 2~4일", score: 1 },
      { label: "주 1일 이하", score: 2 },
      { label: "한 달에 1~2번", score: 3 },
      { label: "거의 안 나간다 (0~1번)", score: 4 },
    ],
  },
  {
    title: "최근 한 달 동안, 가족을 제외한 사람과 대화(직접 만남·통화·영상통화 포함)한 적이 있나요?",
    options: [
      { label: "매일", score: 0 },
      { label: "주 1~2회", score: 1 },
      { label: "한 달에 몇 번", score: 2 },
      { label: "거의 없다", score: 3 },
      { label: "전혀 없다", score: 4 },
    ],
  },
  {
    title: "지금과 같은 생활이 얼마나 지속되고 있나요?",
    options: [
      { label: "1개월 미만", score: 0 },
      { label: "1~6개월", score: 1 },
      { label: "6개월~1년", score: 2 },
      { label: "1~3년", score: 3 },
      { label: "3년 이상", score: 4 },
    ],
  },
  {
    title: "현재 소속(학교, 직장, 아르바이트 등)이 있나요?",
    options: [
      { label: "있고 정상적으로 다니고 있다", score: 0 },
      { label: "있지만 거의 나가지 않는다", score: 2 },
      { label: "없지만 구직·진학 준비 중이다", score: 2 },
      { label: "특별한 활동 없다", score: 3 },
    ],
  },
  {
    title: "요즘 느끼는 감정은 무엇인가요?",
    options: [
      { label: "특별히 힘들지 않다", score: 0 },
      { label: "가끔 무기력하거나 불안하다", score: 1 },
      { label: "자주 무기력하거나 우울하다", score: 2 },
      { label: "대인관계 자체가 두렵거나 피하고 싶다", score: 3 },
    ],
  },
  {
    title: "지금 상태에서 벗어나고 싶은 마음이 있나요?",
    options: [
      { label: "이미 노력 중이다", score: 0 },
      { label: "벗어나고 싶지만 방법을 모르겠다", score: 1 },
      { label: "아직은 잘 모르겠다", score: 2 },
      { label: "지금 상태가 편하다(바뀌고 싶지 않다)", score: 3 },
    ],
  },
  {
    title: "최근 6개월 동안, 힘든 일이 생겼을 때 편하게 이야기하거나 도움을 요청할 사람이 있었나요?",
    options: [
      { label: "전혀 없었다", score: 3 },
      { label: "거의 없었다", score: 2 },
      { label: "가끔 있었다", score: 1 },
      { label: "언제든 이야기 할 사람이 있었다", score: 0 },
    ],
  },
  {
    title: "지금, 일상에서 아주 작은 변화를 하나 시작한다면 어느 정도까지 가능할 것 같나요?",
    options: [
      { label: "아직 아무것도 시작하고 싶지 않다", score: 4 },
      { label: "방이나 집 안에서 할 수 있는 것이라면 가능할 것 같다", score: 3 },
      { label: "집 앞에 잠깐 나가는 정도라면 가능할 것 같다", score: 2 },
      { label: "혼자 새로운 장소에 가볼 수 있을 것 같다", score: 1 },
      { label: "다른 사람과 함께하는 활동도 시도해볼 수 있을 것 같다", score: 0 },
    ],
  },
];

function SelfDiagnosis() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const current = QUESTIONS[step];
  const selected = answers[step];

  const handleSelect = (score) => {
    const next = [...answers];
    next[step] = score;
    setAnswers(next);
  };

  const handleNext = async () => {
    if (selected === null) return;

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
      return;
    }

    // 마지막 문항이면 제출
    setLoading(true);
    try {
      await submitAssessment(answers);
      navigate("/diagnosis/result");
    } catch (err) {
      alert("제출에 실패했어요. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const progress = ((step + 1) / QUESTIONS.length) * 100;

  return (
    <div>
      <Header title="자기진단" />

      <div className="px-6 pt-1">
        <div className="h-1 bg-gray-100 rounded-full mb-6">
          <div
            className="h-full bg-black rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-xs text-gray-400 mb-2">
          {step + 1} / {QUESTIONS.length}
        </p>
        <h2 className="text-lg leading-relaxed mb-8">{current.title}</h2>

        {current.options.map((option) => (
          <div
            key={option.label}
            onClick={() => handleSelect(option.score)}
            className="flex items-center gap-3 py-4 border-b border-gray-100 cursor-pointer"
          >
            <span
              className={`w-5 h-5 rounded-full flex-shrink-0 ${
                selected === option.score
                  ? "border-[6px] border-black"
                  : "border border-gray-300"
              }`}
            />
            <span className="text-sm">{option.label}</span>
          </div>
        ))}
      </div>

      <div className="px-6 py-6">
        <PrimaryButton
          text={
            loading
              ? "제출 중..."
              : step < QUESTIONS.length - 1
              ? "다음"
              : "결과 보기"
          }
          disabled={selected === null || loading}
          onClick={handleNext}
        />
      </div>
    </div>
  );
}

export default SelfDiagnosis;