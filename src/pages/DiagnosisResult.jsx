import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import { getAssessmentResult } from "../api/assessmentApi";

// 유형 × 레벨별 멘트 (기획 문서 기준)
const MESSAGES = {
  "은둔형-low": {
    title: "요즘 밖으로 나가는 게 조금 망설여지셨죠",
    body: "그럴 수 있어요. 누구에게나 잠시 멈춰있는 시기가 필요하니까요. 지금은 집 안에서부터 아주 작은 걸음을 시작해볼 때예요.",
    cta: "방 안에서도 할 수 있는 첫 미션부터 가볍게 시작해볼까요?",
  },
  "은둔형-high": {
    title: "혼자 견뎌온 시간, 짐작보다 길었을 것 같아요",
    body: "혼자 다 감당하지 않아도 돼요. 지금 상태를 억지로 바꾸려 하지 않아도, 아주 작은 시도부터 함께 만들어갈 수 있어요.",
    cta: "지금 속도에 맞는 미션과, 근처에서 도움을 줄 수 있는 프로그램을 함께 안내해드릴게요.",
  },
  "고립형-low": {
    title: "곁에 마음 나눌 사람이 조금 부족하셨을 것 같아요",
    body: "겉으론 잘 지내는 것처럼 보여도, 정작 힘들 때 기댈 곳이 없으면 지치기 마련이에요.",
    cta: "부담 없는 작은 미션으로, 새로운 연결을 하나씩 만들어볼까요?",
  },
  "고립형-high": {
    title: "혼자 감당해온 일이 많았을 것 같아요",
    body: "괜찮은 척하지 않아도 돼요. 지금부터라도 곁에 사람이 있다는 걸 조금씩 느껴볼 수 있어요.",
    cta: "지금 상태에 맞는 미션과 지역 프로그램을 함께 연결해드릴게요. 편하게 연결될 수 있는 상담 채널도 이용해보세요.",
  },
  "복합형-low": {
    title: "밖으로 나가는 것도, 마음을 나누는 것도 조금씩 힘드셨죠",
    body: "두 가지가 겹치면 더 지치기 쉬워요. 하지만 하나씩 풀어가면 충분히 나아질 수 있어요.",
    cta: "집 안에서 시작하는 작은 미션으로 첫 걸음을 떼볼까요?",
  },
  "복합형-high": {
    title: "많이 지치고 외로우셨을 것 같아요",
    body: "나가는 것도, 이야기할 사람을 찾는 것도 둘 다 버거우셨을 텐데 여기까지 와주셨네요.",
    cta: "지금 속도에 맞는 미션과, 곁에서 함께해줄 프로그램을 같이 안내해드릴게요. 언제든 준비됐을 때 시작하면 돼요.",
  },
  "관찰군-default": {
    title: "요즘 조금 지쳐있으신 것 같아요",
    body: "누구나 그럴 때가 있어요. 잠깐의 휴식도 필요한 법이니까요.",
    cta: "가벼운 미션으로 기분 전환해보는 건 어때요?",
  },
};

function getMessage(userType, level) {
  if (userType === "관찰군") return MESSAGES["관찰군-default"];
  const band = level >= 3 ? "high" : "low"; // Lv.3~4 = high, Lv.1~2 = low
  return MESSAGES[`${userType}-${band}`] || MESSAGES["관찰군-default"];
}

function DiagnosisResult() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAssessmentResult()
      .then((data) => setResult(data))
      .catch((err) => console.error("결과 조회 실패", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="px-6 pt-10 text-center text-gray-400 text-sm">
        결과를 불러오는 중이에요...
      </div>
    );
  }

  if (!result) {
    return (
      <div className="px-6 pt-10 text-center text-gray-400 text-sm">
        결과를 불러오지 못했어요.
      </div>
    );
  }

  const message = getMessage(result.user_type, result.status_level);

  return (
    <div>
      <Header title="진단 결과" showBack={false} />

      <div className="px-6 pt-1">
        <div className="h-1 bg-black rounded-full mb-8" />

        <div className="text-center mb-6">
          <span className="inline-block px-5 py-2 bg-black text-white rounded-full text-sm">
            {result.user_type} · Lv.{result.status_level}
          </span>
        </div>

        <h2 className="text-lg font-semibold mb-3">{message.title}</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          {message.body}
        </p>

        <div className="border border-gray-100 rounded-xl p-5 mb-8">
          <p className="text-sm">{message.cta}</p>
        </div>
      </div>

      <div className="px-6 pb-6">
        <PrimaryButton text="미션 시작하기" onClick={() => navigate("/home")} />
      </div>
    </div>
  );
}

export default DiagnosisResult;