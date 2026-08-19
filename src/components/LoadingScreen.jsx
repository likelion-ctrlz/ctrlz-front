import { useEffect, useState } from "react";
import moroLv1 from "../assets/moro-lv1.png";
import moroLv2 from "../assets/moro-lv2.png";
import moroLv3 from "../assets/moro-lv3.png";
import moroLv4 from "../assets/moro-lv4.png";

// 모로가 알→성체까지 자라는 4단계 이미지를 순환시켜 "성장" 컨셉을 로딩 화면에도 그대로 가져옴
const LOADING_IMAGES = [moroLv1, moroLv2, moroLv3, moroLv4];
const INTERVAL_MS = 650;

function LoadingScreen({ message = "불러오는 중이에요...", fullScreen = true }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % LOADING_IMAGES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${fullScreen ? "min-h-dvh" : "py-16"}`}
    >
      <div className="relative w-[110px] h-[110px] flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-primary-sub3 border-t-primary animate-spin" />
        <img src={LOADING_IMAGES[index]} alt="" className="w-[58px] h-[58px] object-contain" />
      </div>
      <p className="text-[14px] text-primary font-medium">{message}</p>
    </div>
  );
}

export default LoadingScreen;
