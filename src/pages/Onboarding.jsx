import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo/onboarding_logo.png";
import onboarding1 from "../assets/onboarding/onboading1.png";
import onboarding2 from "../assets/onboarding/onboading2.png";
import onboarding3 from "../assets/onboarding/onboarding3.png";
import onboarding4 from "../assets/onboarding/onboarding4.png";

// Figma 라디얼 그라디언트를 네이티브 CSS radial-gradient로 근사 변환
// (기존 inline SVG data-URI는 브라우저가 이미지로 디코딩/래스터화해야 해서, 슬라이드 4개가
//  동시에 마운트되는 트랙 구조에서 그 비용이 한번에 몰려 버벅임을 유발함 — 디코딩이 필요 없는
//  네이티브 그라디언트로 교체해 완전히 제거)
const RADIAL_STOPS =
  "rgba(0,203,147,1) 0%, rgba(12,206,152,1) 6.25%, rgba(25,208,158,1) 12.5%, rgba(50,213,168,1) 25%, rgba(74,218,179,1) 37.5%, rgba(99,223,189,1) 50%, rgba(149,233,210,1) 75%, rgba(198,243,231,1) 100%";
const radial = (rx, ry, cx, cy) =>
  `radial-gradient(ellipse ${rx}% ${ry}% at ${cx}% ${cy}%, ${RADIAL_STOPS})`;

// 온보딩 폰 목업 슬라이드 (Figma "On bording" 프레임 64:115/167/184/201 기준)
const SLIDES = [
  {
    image: onboarding1,
    bg: radial(217, 100, 50, 0),
    lines: ["지금, 나는 세상과 얼마나 가까이 있을까요?"],
    fontSize: 20,
    top: 182,
  },
  {
    image: onboarding2,
    bg: radial(184, 85, 50, 38),
    lines: ["레벨 맞춤 미션으로 ", "모로를 성장시켜보세요"],
    fontSize: 24,
    top: 166,
  },
  {
    image: onboarding3,
    bg: radial(319, 112, 50, 59),
    lines: ["매일 나의 마음을 말하고,", "나의 감정을 돌아보세요"],
    fontSize: 24,
    top: 166,
  },
  {
    image: onboarding4,
    bg: radial(436, 153, 50, 100),
    lines: ["모은 토큰으로 지역 프로그램과", "다양한 취미를 만나보세요"],
    fontSize: 24,
    top: 166,
  },
];

const TOTAL_STEPS = SLIDES.length + 1; // 4 slides + 마지막 Morrow

// 프로그레스 바 — Figma 실측: 82px 트랙 위를 19px 세그먼트가 21px 간격으로 이동 (채워지는 바가 아님)
const INDICATOR_STEP = 21;
const INDICATOR_WIDTH = 19;

function Onboarding() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrent((c) => Math.min(c + 1, SLIDES.length));
  };

  const handlePrev = () => {
    setCurrent((c) => Math.max(c - 1, 0));
  };

  // 터치 스와이프 (짧은 탭은 onClick에서 좌/우 영역으로 처리)
  const [touchStart, setTouchStart] = useState(null);
  const onTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
    setTouchStart(null);
  };

  // 화면 탭 — 왼쪽 절반은 이전, 오른쪽 절반은 다음
  const handleTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.clientX - rect.left < rect.width / 2) handlePrev();
    else handleNext();
  };

  // Figma 원본 기준: 마지막(Morrow) 화면은 첫 슬라이드와 동일한 위치(0)로 표시
  const indicatorLeft = (current === SLIDES.length ? 0 : current) * INDICATOR_STEP;

  return (
    <div
      className="relative h-dvh overflow-hidden isolate bg-white"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={handleTap}
    >
      {/* 슬라이드 트랙 — translateX로 좌우 슬라이드 전환 */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{
          width: `${TOTAL_STEPS * 100}%`,
          transform: `translateX(-${(current * 100) / TOTAL_STEPS}%)`,
        }}
      >
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className="relative h-full shrink-0"
            style={{ width: `${100 / TOTAL_STEPS}%`, background: slide.bg }}
          >
            {/* 캡션 */}
            <div className="absolute left-0 w-full px-5 text-center" style={{ top: `${slide.top}px` }}>
              <p
                className="font-bold text-white tracking-[-0.6px] m-0"
                style={{ fontSize: `${slide.fontSize}px`, lineHeight: "normal" }}
              >
                {slide.lines.map((line, j) => (
                  <span key={j} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>

            {/* 폰 목업 스크린샷 — Figma 스펙: 283x587, top 266px(상태바 44px 제외), 가로 중앙 정렬 */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[266px] w-[283px] h-[587px]">
              <img src={slide.image} alt={`온보딩 화면 ${i + 1}`} className="w-full h-full object-contain" />
            </div>

            {/* 하단 그라디언트 페이드 — 화면 높이에 상관없이 항상 바닥까지 닿도록 top을 비율로 지정 */}
            <div
              className="absolute left-0 right-0 bottom-0 pointer-events-none"
              style={{
                top: "65%",
                background: "linear-gradient(to bottom, rgba(170,238,219,0) 31.25%, rgba(170,238,219,0.84) 81.908%)",
              }}
            />
          </div>
        ))}

        {/* 마지막 화면 — Morrow 단색 배경 + 흰색 버튼 */}
        <div
          className="relative h-full shrink-0 flex flex-col bg-[#00CB93]"
          style={{ width: `${100 / TOTAL_STEPS}%` }}
        >
          {/* Morrow 로고 */}
          <main className="flex-1 flex flex-col items-center justify-center px-5">
            <img src={logo} alt="Morrow" className="h-[36px] w-auto" />
          </main>

          {/* 시작하기 버튼 — 흰색 배경 */}
          <div className="px-5 pb-[66px]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/profile-setup");
              }}
              className="w-full h-[68px] rounded-[16px] bg-white border border-[#00CB93] text-[#00CB93] text-[20px] font-bold tracking-[-0.5px] flex items-center justify-center"
            >
              시작하기
            </button>
          </div>
        </div>
      </div>

      {/* 프로그레스 바 — 트랙 위에 고정 (Figma 스펙 top-104px에서 상태바 44px 제외) */}
      <div className="absolute top-[60px] left-0 w-full flex justify-center pt-[18px] pb-[18px] pointer-events-none">
        <div className="relative w-[82px] h-[10px] bg-white rounded-[40px] overflow-hidden">
          <div
            className="absolute top-0 h-[10px] bg-[#AAEEDB] rounded-[40px] transition-all duration-300"
            style={{ left: `${indicatorLeft}px`, width: `${INDICATOR_WIDTH}px` }}
          />
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
