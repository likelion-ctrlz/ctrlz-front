import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import chevronLeft from "../assets/icon/chevron-left.png";

// 녹음 상태: idle | recording | analyzing | done
function DiaryRecord() {
  const [status, setStatus] = useState("idle");
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();

  // 녹음 타이머
  useEffect(() => {
    if (status !== "recording") return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [status]);

  const handleStart = () => setStatus("recording");
  const handleStop = () => {
    setStatus("analyzing");
    // 분석 시뮬레이션 3초
    setTimeout(() => setStatus("done"), 3000);
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  // 분석 완료 — AI 응답
  if (status === "done") {
    return (
      <div
        className="relative flex min-h-dvh flex-col"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 402 874' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(3.0069e-14 35 -35 6.0518e-15 201 386)'><stop stop-color='rgba(0,203,147,1)' offset='0'/><stop stop-color='rgba(12,206,152,1)' offset='0.0625'/><stop stop-color='rgba(25,208,158,1)' offset='0.125'/><stop stop-color='rgba(50,213,168,1)' offset='0.25'/><stop stop-color='rgba(74,218,179,1)' offset='0.375'/><stop stop-color='rgba(99,223,189,1)' offset='0.5'/><stop stop-color='rgba(149,233,210,1)' offset='0.75'/><stop stop-color='rgba(198,243,231,1)' offset='1'/></radialGradient></defs></svg>")`,
          backgroundSize: "cover",
        }}
      >

        <header className="relative flex items-center h-[53px] px-5 z-10">
          <button onClick={() => navigate("/diary")} className="w-[34px] h-[34px] flex items-center justify-center">
            <img src={chevronLeft} alt="" className="w-[34px] h-[34px] brightness-0 invert" />
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-white tracking-[-0.5px] leading-[44px]">
            일기
          </p>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-5 z-10">
          {/* AI 응답 텍스트 */}
          <h2 className="text-[24px] font-bold text-white text-center leading-normal mb-[12px]">
            오늘 많이 힘들었겠어요
          </h2>
          <p className="text-[14px] font-medium text-[#C6F3E7] text-center leading-normal mb-[60px]">
            그 감정을 솔직하게 말해준 것만으로도<br/>충분히 잘 하셨어요
          </p>

          {/* 펄스 원들 + 마이크 */}
          <div className="relative w-[335px] h-[335px] flex items-center justify-center">
            {/* 바깥 원 — 펄스 */}
            <div className="absolute inset-0 rounded-full border-2 border-white/10 animate-pulse-ring" />
            <div className="absolute inset-[42px] rounded-full border-2 border-white/15 animate-pulse-ring-delay" />
            <div className="absolute inset-[62px] rounded-full border-2 border-white/20" />
            <div className="absolute inset-[87px] rounded-full bg-white/10" />
            {/* 중앙 원 */}
            <div className="w-[161px] h-[161px] rounded-full bg-[#00CB93] flex items-center justify-center shadow-lg">
              {/* 마이크 아이콘 */}
              <svg width="40" height="56" viewBox="0 0 40 56" fill="none">
                <rect x="12" y="0" width="16" height="36" rx="8" fill="white"/>
                <path d="M6 28C6 35.73 12.27 42 20 42C27.73 42 34 35.73 34 28" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M20 42V52" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M12 52H28" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </main>

        <BottomTabBar />
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-[100px]" />
      </div>
    );
  }

  // 녹음 중 / 분석 중 / 대기
  return (
    <div
      className="relative flex min-h-dvh flex-col"
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 402 874' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(3.0069e-14 35 -35 6.0518e-15 201 386)'><stop stop-color='rgba(0,203,147,1)' offset='0'/><stop stop-color='rgba(12,206,152,1)' offset='0.0625'/><stop stop-color='rgba(25,208,158,1)' offset='0.125'/><stop stop-color='rgba(50,213,168,1)' offset='0.25'/><stop stop-color='rgba(74,218,179,1)' offset='0.375'/><stop stop-color='rgba(99,223,189,1)' offset='0.5'/><stop stop-color='rgba(149,233,210,1)' offset='0.75'/><stop stop-color='rgba(198,243,231,1)' offset='1'/></radialGradient></defs></svg>")`,
        backgroundSize: "cover",
      }}
    >

      <header className="relative flex items-center h-[53px] px-5 z-10">
        <button onClick={() => navigate("/diary")} className="w-[34px] h-[34px] flex items-center justify-center">
          <img src={chevronLeft} alt="" className="w-[34px] h-[34px] brightness-0 invert" />
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-white tracking-[-0.5px] leading-[44px]">
          일기
        </p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-5 z-10">
        {/* 상태 텍스트 */}
        {status === "idle" && (
          <p className="text-[18px] font-medium text-white text-center mb-[60px]">
            오늘의 하루는 어땠나요?<br/>편하게 말해보세요
          </p>
        )}
        {status === "recording" && (
          <p className="text-[18px] font-medium text-white text-center mb-[60px]">
            듣고 있어요...<br/>
            <span className="text-[14px] text-[#C6F3E7]">{formatTime(seconds)}</span>
          </p>
        )}
        {status === "analyzing" && (
          <p className="text-[18px] font-medium text-white text-center mb-[60px]">
            이야기를 정리하고 있어요...
          </p>
        )}

        {/* 펄스 원들 + 마이크 버튼 */}
        <div className="relative w-[335px] h-[335px] flex items-center justify-center">
          {/* 펄스 링들 — 녹음 중일 때만 애니메이션 */}
          <div className={`absolute inset-0 rounded-full border-2 border-white/10 ${status === "recording" ? "animate-pulse-ring" : ""}`} />
          <div className={`absolute inset-[42px] rounded-full border-2 border-white/15 ${status === "recording" ? "animate-pulse-ring-delay" : ""}`} />
          <div className="absolute inset-[62px] rounded-full border-2 border-white/20" />
          <div className="absolute inset-[87px] rounded-full bg-white/10" />

          {/* 중앙 버튼 */}
          <button
            onClick={status === "idle" ? handleStart : status === "recording" ? handleStop : undefined}
            className={`w-[161px] h-[161px] rounded-full flex items-center justify-center shadow-lg transition-all ${
              status === "recording"
                ? "bg-white"
                : status === "analyzing"
                ? "bg-[#00CB93] opacity-50"
                : "bg-[#00CB93]"
            }`}
          >
            {status === "recording" ? (
              /* 정지 아이콘 */
              <div className="w-[36px] h-[36px] bg-[#00CB93] rounded-[6px]" />
            ) : (
              /* 마이크 아이콘 */
              <svg width="40" height="56" viewBox="0 0 40 56" fill="none">
                <rect x="12" y="0" width="16" height="36" rx="8" fill="white"/>
                <path d="M6 28C6 35.73 12.27 42 20 42C27.73 42 34 35.73 34 28" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M20 42V52" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                <path d="M12 52H28" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </main>

      <BottomTabBar />
      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-[100px]" />
    </div>
  );
}

export default DiaryRecord;
