import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SLIDES = [
  { text: "내일은 작은 시작에서부터" },
  { text: "지금의 나를 알아보는 것부터" },
  { text: "오늘은, 딱 한 걸음만" },
  { text: "작은 오늘을 모아, 나의 내일로" },
];

function Onboarding() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (current < SLIDES.length - 1) {
      setCurrent(current + 1);
    } else {
      setCurrent(SLIDES.length);
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

  // 마지막 화면 — Morrow 로고 + 시작하기
  if (current >= SLIDES.length) {
    return (
      <div className="flex min-h-dvh flex-col bg-gradient-main">
        <div className="h-[44px]" />

        {/* 진행 바 */}
        <div className="px-5 pt-4">
          <div className="flex gap-1">
            {[...Array(SLIDES.length + 1)].map((_, i) => (
              <div
                key={i}
                className={`h-[3px] flex-1 rounded-full ${
                  i <= current ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        <main className="flex-1 flex flex-col items-center justify-center px-5">
          <h1 className="text-[42px] font-bold text-white mb-4">Morrow</h1>
        </main>

        <div className="px-5 pb-10">
          <button
            onClick={() => navigate("/profile-setup")}
            className="w-full py-[22px] rounded-xl bg-white text-primary text-[16px] font-semibold shadow-sm"
          >
            시작하기
          </button>
        </div>
      </div>
    );
  }

  // 슬라이드 화면
  return (
    <div
      className="flex min-h-dvh flex-col bg-gradient-onboarding"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="h-[44px]" />

      {/* 진행 바 */}
      <div className="px-5 pt-4">
        <div className="flex gap-1">
          {[...Array(SLIDES.length + 1)].map((_, i) => (
            <div
              key={i}
              className={`h-[3px] flex-1 rounded-full transition-all duration-300 ${
                i <= current ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      <main
        className="flex-1 flex flex-col items-center justify-center px-5 cursor-pointer"
        onClick={handleNext}
      >
        {/* 온보딩 일러스트 placeholder */}
        <div className="w-[200px] h-[200px] bg-white/15 rounded-full flex items-center justify-center mb-12 backdrop-blur-sm">
          <span className="text-white text-[48px] font-bold">{current + 1}</span>
        </div>

        <p className="text-[20px] font-semibold text-white text-center">
          {SLIDES[current].text}
        </p>
      </main>

      {/* 하단 인디케이터 */}
      <div className="px-5 pb-10 flex justify-center">
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${
                i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
