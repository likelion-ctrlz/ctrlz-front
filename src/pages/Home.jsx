import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import PrimaryButton from "../components/PrimaryButton";

const STATS = [
  { label: "보유 토큰", value: "120" },
  { label: "보유 토큰", value: "LV.2" },
  { label: "보유 토큰", value: "4일" },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="pb-20 px-6 pt-6">
      <h2 className="text-lg mb-5">안녕하세요, 남곽춘님</h2>

      <div className="flex gap-2 mb-6">
        {STATS.map((s, i) => (
          <div key={i} className="flex-1 border border-gray-100 rounded-xl py-4 text-center">
            <p className="text-base font-bold">{s.value}</p>
            <p className="text-[11px] text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="border border-gray-100 rounded-xl p-4 mb-4">
        <p className="text-xs text-gray-400 mb-2">오늘의 미션</p>
        <div className="h-24 bg-gray-100 rounded-lg mb-3" />
        <h3 className="text-base mb-2">편의점 다녀오기</h3>
        <div className="flex gap-2 mb-4">
          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">난이도 하</span>
          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">토큰 +10</span>
        </div>
        <PrimaryButton text="미션 시작하기" onClick={() => navigate("/missions/1")} />
      </div>

      <div className="border border-gray-100 rounded-xl p-4">
        <p className="text-xs text-gray-400 mb-3">오늘의 AI 레포트</p>
        {[70, 90, 50].map((w, i) => (
          <div key={i} className="h-2 bg-gray-100 rounded mb-2" style={{ width: `${w}%` }} />
        ))}
      </div>

      <BottomTabBar />
    </div>
  );
}

export default Home;