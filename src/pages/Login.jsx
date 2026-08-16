import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex min-h-dvh flex-col"
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 402 874' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-51.75 54.611 -54.611 -51.75 491.5 179.39)'><stop stop-color='rgba(0,203,147,1)' offset='0'/><stop stop-color='rgba(16,206,154,1)' offset='0.0625'/><stop stop-color='rgba(32,210,161,1)' offset='0.125'/><stop stop-color='rgba(64,216,174,1)' offset='0.25'/><stop stop-color='rgba(96,223,188,1)' offset='0.375'/><stop stop-color='rgba(128,229,201,1)' offset='0.5'/><stop stop-color='rgba(191,242,228,1)' offset='0.75'/><stop stop-color='rgba(255,255,255,1)' offset='1'/></radialGradient></defs></svg>")`,
        backgroundSize: "cover",
      }}
    >
      {/* Status bar spacer */}
      <div className="h-[44px]" />

      {/* Content — centered */}
      <main className="flex-1 flex flex-col items-center justify-center px-5">
        <h1
          className="text-[48px] text-white whitespace-nowrap"
          style={{ fontFamily: "'Neuropolitical', sans-serif" }}
        >
          Morrow
        </h1>
        <p className="text-[16px] text-white mt-2 tracking-[-0.4px]">
          오늘보다 조금 더 가까울 내일
        </p>
      </main>

      {/* 시작하기 버튼 */}
      <div className="px-5 pb-[66px]">
        <button
          onClick={() => navigate("/onboarding")}
          className="w-full h-[68px] rounded-[16px] bg-[#00CB93] border border-[#00CB93] text-white text-[20px] font-bold tracking-[-0.5px] flex items-center justify-center"
        >
          시작하기
        </button>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white rounded-[100px]" />
    </div>
  );
}

export default Login;
