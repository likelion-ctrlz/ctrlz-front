import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

// canvas-confetti의 "realistic" 예제 패턴 참고 — 세기가 다른 여러 샷을 겹쳐 쏴서
// 자연스러운 폭죽 느낌을 냄. 물리·중력·모양은 라이브러리가 알아서 처리함.
// 캔버스를 컨테이너(top/bottom/height로 지정한 영역)에 딱 맞게 붙여서, resize:true로
// 실제 렌더된 폭·높이 안에서만 터지고 떨어지게 함(가로는 항상 꽉 참, 세로는 지정한 범위).
function fireRealistic(myConfetti, colors) {
  const shared = { colors, origin: { x: 0.5, y: 0.5 }, shapes: ["circle"], disableForReducedMotion: true };

  const fire = (particleRatio, opts) => {
    myConfetti({
      ...shared,
      ...opts,
      particleCount: Math.floor(160 * particleRatio),
    });
  };

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}

const DEFAULT_COLORS = ["#00cb93", "#39d7ab", "#71e2c3", "#c6f3e7"];

// top/bottom/height를 주면 inset-0 대신 그 위치(예: 이미지 바로 위)에 맞춰 캔버스를 배치.
// 페이지(스텝) 진입 시 한 번만 터짐 — 다시 터뜨리려면 컴포넌트를 다시 마운트하면 됨.
function Particles({ className = "", top, bottom, height, colors = DEFAULT_COLORS }) {
  const canvasRef = useRef(null);

  const position =
    top !== undefined || bottom !== undefined || height !== undefined
      ? { top, bottom, height }
      : { top: 0, bottom: 0 };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const myConfetti = confetti.create(canvas, { resize: true, useWorker: true });
    fireRealistic(myConfetti, colors);

    return () => myConfetti.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute left-0 right-0 w-full pointer-events-none ${className}`}
      style={position}
    />
  );
}

export default Particles;
