import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import moroLv1 from "../assets/moro-lv1.png";
import moroLv2 from "../assets/moro-lv2.png";
import moroLv3 from "../assets/moro-lv3.png";
import moroLv4 from "../assets/moro-lv4.png";
import moroLv5 from "../assets/moro-lv5.png";

const MORO_IMAGES = [moroLv1, moroLv2, moroLv3, moroLv4, moroLv5];
const LEVEL_MESSAGES = [
  "알에서 모로가 깨어났어요",
  "모로가 성장했어요",
  "모로가 성장했어요",
  "모로가 몰라보게 자라났어요",
  "모로가 몰라보게 자라났어요",
];

function Home() {
  const navigate = useNavigate();

  // TODO: 실제 유저 데이터 연동 — 아래 state는 데모용
  const [level, setLevel] = useState(1);
  const score = 10;
  const maxScore = 32;
  const xpPercent = 10;
  const username = "사용자1";
  const streak = 5;

  const moroImg = MORO_IMAGES[level - 1];

  return (
    <div className="flex min-h-dvh flex-col bg-gradient-home">
      {/* Status bar area */}
      <div className="h-[44px]" />

      {/* Header - Morrow 로고 */}
      <header className="flex items-center h-[53px] px-6">
        <h1 className="text-[22px] font-bold text-primary">Morrow</h1>
      </header>

      {/* 사용자 인사 배너 */}
      <section className="mx-5 mb-4 rounded-2xl bg-gray-50 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-[15px] font-medium mb-1">{username}님, 극복 할 수 있어요!</p>
          <p className="text-[12px] text-gray-500">모로와 함께 {streak}일 연속 미션 실천 중</p>
        </div>
        {/* 점수 원형 */}
        <div className="relative w-[72px] h-[72px]">
          <svg viewBox="0 0 72 72" className="w-full h-full -rotate-90">
            <circle cx="36" cy="36" r="30" fill="none" stroke="#E0E0E0" strokeWidth="5" />
            <circle
              cx="36" cy="36" r="30"
              fill="none"
              stroke="#00CB93"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={`${(score / maxScore) * 188.5} 188.5`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[13px] font-bold">{score}점</span>
          </div>
        </div>
      </section>

      {/* 캐릭터 영역 — 탭하면 레벨 전환 (데모용) */}
      <section
        className="relative mx-5 mb-4 flex flex-col items-center cursor-pointer"
        onClick={() => setLevel((prev) => (prev % 5) + 1)}
      >
        {/* 배경 그라데이션 원 */}
        <div className="w-full aspect-square max-w-[300px] rounded-full bg-gradient-to-b from-primary-sub4 to-white flex items-center justify-center">
          <img
            src={moroImg}
            alt={`모로 레벨 ${level}`}
            className="w-[160px] h-auto object-contain"
          />
        </div>
        {/* 그림자 타원 */}
        <div className="w-[147px] h-[36px] bg-primary-sub3 rounded-[50%] opacity-40 -mt-5" />
      </section>

      {/* 레벨 프로그레스 */}
      <section className="mx-5 mb-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[13px] font-semibold">LEVEL {level}</span>
          <span className="text-[13px] text-gray-400">{xpPercent}%</span>
        </div>
        <div className="h-[4px] bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${xpPercent}%` }} />
        </div>
      </section>

      {/* 오늘의 미션 카드 */}
      <section className="mx-5 mb-[120px] rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[13px] text-gray-500">오늘의 미션</span>
          {/* 토큰 뱃지 */}
          <div className="flex items-center gap-1 bg-primary-sub4 rounded-full px-2.5 py-1">
            <div className="w-[14px] h-[14px] rounded-full bg-primary flex items-center justify-center">
              <span className="text-[8px] text-white font-bold">P</span>
            </div>
            <span className="text-[11px] font-medium text-primary">10</span>
          </div>
        </div>

        <h3 className="text-[16px] font-medium mb-1">근처에서 즉석 복권 구매해보기</h3>
        <p className="text-[12px] text-gray-500 mb-3">혹시 알아요? 오늘 당신에게 행운이 찾아올지</p>

        <div className="flex gap-3 mb-4">
          <span className="text-[11px] text-primary font-medium">+ 30 xp</span>
          <span className="text-[11px] text-primary font-medium">+ 2 토큰</span>
        </div>

        <button
          onClick={() => navigate("/missions/1")}
          className="w-full py-[14px] rounded-xl bg-primary text-white text-[14px] font-semibold"
        >
          미션 시작하기
        </button>
      </section>

      {/* Bottom Tab Bar */}
      <BottomTabBar />
    </div>
  );
}

export default Home;
