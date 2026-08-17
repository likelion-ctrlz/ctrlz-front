// 축하 화면(미션 완료/레벨업/보너스)에 쓰는 동그란 색종이(컨페티).
// 페이지 로딩 시 한 번만 살랑살랑 흔들리며 떨어지고 멈춤(반복 안 함).
// top은 감싸는 컨테이너 높이 기준 % — 위쪽에서 시작해서 fallDistance 만큼 떨어짐
const DEFAULT_PARTICLES = [
  { left: "4%", top: "0%", w: 8, h: 8, color: "var(--color-primary)", delay: 0, dx: 16 },
  { left: "14%", top: "6%", w: 6, h: 6, color: "var(--color-primary-sub2)", delay: 0.35, dx: -14 },
  { left: "24%", top: "0%", w: 7, h: 7, color: "var(--color-primary-sub1)", delay: 0.15, dx: 12 },
  { left: "34%", top: "10%", w: 6, h: 6, color: "var(--color-primary-sub3)", delay: 0.55, dx: -16 },
  { left: "45%", top: "0%", w: 8, h: 8, color: "var(--color-primary)", delay: 0.05, dx: 14 },
  { left: "56%", top: "8%", w: 6, h: 6, color: "var(--color-primary-sub2)", delay: 0.45, dx: -12 },
  { left: "66%", top: "0%", w: 7, h: 7, color: "var(--color-primary-sub1)", delay: 0.25, dx: 16 },
  { left: "76%", top: "6%", w: 6, h: 6, color: "var(--color-primary-sub3)", delay: 0.6, dx: -14 },
  { left: "86%", top: "0%", w: 8, h: 8, color: "var(--color-primary)", delay: 0.1, dx: 12 },
  { left: "94%", top: "10%", w: 6, h: 6, color: "var(--color-primary-sub2)", delay: 0.5, dx: -16 },
  { left: "9%", top: "16%", w: 7, h: 7, color: "var(--color-primary-sub1)", delay: 0.3, dx: 14 },
  { left: "60%", top: "14%", w: 7, h: 7, color: "var(--color-primary-sub3)", delay: 0.4, dx: -12 },
];

// fallDistance — 색종이가 떨어지는 거리(px).
// top/bottom/height를 주면 inset-0 대신 그 위치(예: 이미지 바로 위)에 맞춰 배치하되,
// 가로는 항상 부모 폭 전체(left-0 right-0)를 씀
function Particles({ className = "", fallDistance = 140, top, bottom, height }) {
  const position =
    top !== undefined || bottom !== undefined || height !== undefined
      ? { top, bottom, height }
      : { top: 0, bottom: 0 };

  return (
    <div
      className={`absolute left-0 right-0 pointer-events-none ${className}`}
      style={{ ...position, "--particle-fall": `${fallDistance}px` }}
    >
      {DEFAULT_PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.w,
            height: p.h,
            backgroundColor: p.color,
            "--particle-delay": `${p.delay}s`,
            "--particle-dx": `${p.dx}px`,
          }}
        />
      ))}
    </div>
  );
}

export default Particles;
