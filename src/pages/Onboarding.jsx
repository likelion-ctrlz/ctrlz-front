import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo/onboarding_logo.png";

const SLIDES = [
  "내일은 작은 시작에서부터",
  "지금의 나를 알아보는 것부터",
  "오늘은, 딱 한 걸음만",
  "작은 오늘을 모아, 나의 내일로",
];

// 온보딩 슬라이드 배경 (Figma radial gradient)
const SLIDE_BG = `url("data:image/svg+xml;utf8,<svg viewBox='0 0 402 874' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(0.0000013024 87.4 -87.4 0.0000013024 201 -0.0000029951)'><stop stop-color='rgba(0,203,147,1)' offset='0'/><stop stop-color='rgba(12,206,152,1)' offset='0.0625'/><stop stop-color='rgba(25,208,158,1)' offset='0.125'/><stop stop-color='rgba(50,213,168,1)' offset='0.25'/><stop stop-color='rgba(74,218,179,1)' offset='0.375'/><stop stop-color='rgba(99,223,189,1)' offset='0.5'/><stop stop-color='rgba(149,233,210,1)' offset='0.75'/><stop stop-color='rgba(198,243,231,1)' offset='1'/></radialGradient></defs></svg>")`;

// 프로그레스 바: 전체 82px, 5단계이므로 각 단계당 약 16px씩 진행
const TOTAL_STEPS = SLIDES.length + 1; // 4 slides + 마지막 Morrow

function Onboarding() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (current < SLIDES.length) {
      setCurrent(current + 1);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  // 터치 스와이프
  const [touchStart, setTouchStart] = useState(null);
  const onTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
    setTouchStart(null);
  };

  // 프로그레스 바 너비 계산
  const progressWidth = ((current + 1) / TOTAL_STEPS) * 82;

  // 마지막 화면 — Morrow 단색 배경 + 흰색 버튼
  if (current >= SLIDES.length) {
    return (
      <div className="relative flex min-h-dvh flex-col bg-[#00CB93]">
        <div className="h-[44px]" />

        {/* 프로그레스 바 */}
        <div className="flex justify-center pt-[18px] pb-[18px]">
          <div className="relative w-[82px] h-[10px] bg-white rounded-[40px]">
            <div
              className="absolute top-0 left-0 h-[10px] bg-[#AAEEDB] rounded-[40px] transition-all duration-300"
              style={{ width: `${progressWidth}px` }}
            />
          </div>
        </div>

        {/* Morrow 로고 */}
        <main className="flex-1 flex flex-col items-center justify-center px-5">
          <img src={logo} alt="Morrow" className="h-[36px] w-auto" />
        </main>

        {/* 시작하기 버튼 — 흰색 배경 */}
        <div className="px-5 pb-[66px]">
          <button
            onClick={() => navigate("/profile-setup")}
            className="w-full h-[68px] rounded-[16px] bg-white border border-[#00CB93] text-[#00CB93] text-[20px] font-bold tracking-[-0.5px] flex items-center justify-center"
          >
            시작하기
          </button>
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white rounded-[100px]" />
      </div>
    );
  }

  // 슬라이드 화면
  return (
    <div
      className="relative flex min-h-dvh flex-col"
      style={{ backgroundImage: SLIDE_BG, backgroundSize: "cover" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={handleNext}
    >
      <div className="h-[44px]" />

      {/* 프로그레스 바 */}
      <div className="flex justify-center pt-[18px] pb-[18px]">
        <div className="relative w-[82px] h-[10px] bg-white rounded-[40px]">
          <div
            className="absolute top-0 left-0 h-[10px] bg-[#AAEEDB] rounded-[40px] transition-all duration-300"
            style={{ width: `${progressWidth}px` }}
          />
        </div>
      </div>

      {/* 텍스트 */}
      <div className="pt-[88px] px-5">
        <p className="text-[24px] font-bold text-white tracking-[-0.6px]">
          {SLIDES[current]}
        </p>
      </div>

      {/* 빈 공간 (탭하면 넘어감) */}
      <main className="flex-1" />

      {/* Home indicator */}
      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white rounded-[100px]" />
    </div>
  );
}

export default Onboarding;
