import { useNavigate } from "react-router-dom";

function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col px-6 pt-10 pb-6">
      <div className="flex-1 bg-gray-100 rounded-xl mb-6" />

      <h1 className="text-2xl text-center mb-2">CtrlZ</h1>
      <p className="text-center text-gray-500 mb-10">
        지금 이 순간, 작은 발걸음부터
      </p>

      <button
        onClick={() => navigate("/login")}
        className="w-full py-4 bg-black text-white rounded-lg text-base mb-3"
      >
        시작하기
      </button>

      <p className="text-center text-gray-400 text-xs">
        이미 계정이 있어요
      </p>
    </div>
  );
}

export default Onboarding;