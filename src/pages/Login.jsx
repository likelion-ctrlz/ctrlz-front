import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-dvh flex-col bg-gradient-main">
      <div className="h-[44px]" />

      <main className="flex-1 flex flex-col items-center justify-center px-5">
        <h1 className="text-[42px] font-bold text-white mb-3">Morrow</h1>
        <p className="text-[15px] text-white/80">오늘보다 조금 더 가까울 내일</p>
      </main>

      <div className="px-5 pb-10">
        <button
          onClick={() => navigate("/onboarding")}
          className="w-full py-[22px] rounded-xl bg-white text-primary text-[16px] font-semibold shadow-sm"
        >
          시작하기
        </button>
      </div>
    </div>
  );
}

export default Login;
