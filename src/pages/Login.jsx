import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo/onboarding_logo.png";

// 그라디언트 모션 / 버튼 색상 전환 애니메이션 시간 — 감성적으로 천천히 번지듯
const TRANSITION_MS = 2200;
const TRANSITION_EASE = "cubic-bezier(0.45, 0, 0.15, 1)";

// Figma 두 Log in 프레임의 배경 그라디언트 (중심/방향이 서로 다름)
const bgSvg = (gradientTransform) =>
  `url("data:image/svg+xml;utf8,<svg viewBox='0 0 402 874' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='${gradientTransform}'><stop stop-color='rgba(0,203,147,1)' offset='0'/><stop stop-color='rgba(16,206,154,1)' offset='0.0625'/><stop stop-color='rgba(32,210,161,1)' offset='0.125'/><stop stop-color='rgba(64,216,174,1)' offset='0.25'/><stop stop-color='rgba(96,223,188,1)' offset='0.375'/><stop stop-color='rgba(128,229,201,1)' offset='0.5'/><stop stop-color='rgba(191,242,228,1)' offset='0.75'/><stop stop-color='rgba(255,255,255,1)' offset='1'/></radialGradient></defs></svg>")`;

const BG_BEFORE = bgSvg("matrix(-55.1 55.1 -55.1 -55.1 286.84 587)");
const BG_AFTER = bgSvg("matrix(-51.75 54.611 -54.611 -51.75 491.5 179.39)");

function Login() {
  const navigate = useNavigate();
  const [pressed, setPressed] = useState(false);

  const handleStart = () => {
    if (pressed) return;
    setPressed(true);
    setTimeout(() => navigate("/onboarding"), TRANSITION_MS);
  };

  return (
    <div className="relative isolate flex min-h-dvh flex-col overflow-hidden">
      {/* 그라디언트 모션 배경 — 두 상태를 겹쳐 opacity 크로스페이드 */}
      <div
        className="absolute inset-0 -z-10 transition-opacity"
        style={{
          backgroundImage: BG_BEFORE,
          backgroundSize: "cover",
          opacity: pressed ? 0 : 1,
          transitionDuration: `${TRANSITION_MS}ms`,
          transitionTimingFunction: TRANSITION_EASE,
        }}
      />
      <div
        className="absolute inset-0 -z-10 transition-opacity"
        style={{
          backgroundImage: BG_AFTER,
          backgroundSize: "cover",
          opacity: pressed ? 1 : 0,
          transitionDuration: `${TRANSITION_MS}ms`,
          transitionTimingFunction: TRANSITION_EASE,
        }}
      />

      {/* Status bar spacer */}

      {/* Content — centered */}
      <main className="flex-1 flex flex-col items-center justify-center px-5">
        <img src={logo} alt="Morrow" className="h-[36px] w-auto" />
        <p className="text-[16px] text-white mt-2 tracking-[-0.4px]">
          오늘보다 조금 더 가까울 내일
        </p>
      </main>

      {/* 시작하기 버튼 — 흰색(기본) → 초록 그라디언트(누른 후) 컬러 전환 */}
      <div className="px-5 pb-[66px]">
        <button
          onClick={handleStart}
          disabled={pressed}
          className={`w-full h-[68px] rounded-[16px] border text-[20px] font-bold tracking-[-0.5px] flex items-center justify-center transition-colors ${
            pressed
              ? "bg-primary border-primary text-white"
              : "bg-white border-primary text-primary"
          }`}
          style={{
            transitionDuration: `${TRANSITION_MS}ms`,
            transitionTimingFunction: TRANSITION_EASE,
          }}
        >
          시작하기
        </button>
      </div>
    </div>
  );
}

export default Login;
