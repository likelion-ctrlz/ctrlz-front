import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import moroLv1 from "../assets/moro-lv1.png";
import moroLv2 from "../assets/moro-lv2.png";
import moroLv3 from "../assets/moro-lv3.png";
import moroLv4 from "../assets/moro-lv4.png";
import moroLv5 from "../assets/moro-lv5.png";

const MORO_IMAGES = [moroLv1, moroLv2, moroLv3, moroLv4, moroLv5];

function Home() {
  const navigate = useNavigate();
  const [level, setLevel] = useState(1);

  const score = 10;
  const maxScore = 32;
  const xpPercent = 10;
  const username = "사용자1";
  const streak = 5;
  const moroImg = MORO_IMAGES[level - 1];

  return (
    <div
      className="relative flex min-h-dvh flex-col"
      style={{ background: "linear-gradient(180deg, #E6FFF8 0%, #FFFFFF 67.79%)" }}
    >
      {/* Status bar */}
      <div className="h-[44px]" />

      {/* Header — Morrow */}
      <header className="h-[53px] flex items-center px-6">
        <h1
          className="text-[24px] text-[#00CB93]"
          style={{ fontFamily: "'Neuropolitical', sans-serif" }}
        >
          Morrow
        </h1>
      </header>

      {/* 인사 배너 */}
      <section className="mx-5 h-[98px] rounded-[16px] bg-[rgba(255,255,255,0.6)] border border-[#00CB93] relative px-6 flex items-center">
        <div>
          <p className="text-[16px] font-semibold text-[#00946B] tracking-[-0.4px] leading-[25px]">
            {username}님, 극복 할 수 있어요!
          </p>
          <p className="text-[14px] font-semibold text-[#00946B] tracking-[-0.35px] leading-[25px]">
            모로와 함께 {streak}일 연속 미션 실천 중
          </p>
        </div>
        {/* 점수 원형 */}
        <div className="absolute right-6 top-3 w-[72px] h-[72px]">
          <svg viewBox="0 0 72 72" className="w-full h-full -rotate-90">
            <circle cx="36" cy="36" r="30" fill="none" stroke="#E6FFF8" strokeWidth="5" />
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
            <span className="text-[14px] font-semibold text-[#00CB93] tracking-[-0.35px]">{score}점</span>
          </div>
        </div>
      </section>

      {/* 캐릭터 영역 */}
      <section
        className="relative mx-5 mt-4 flex flex-col items-center cursor-pointer"
        onClick={() => setLevel((prev) => (prev % 5) + 1)}
      >
        <img
          src={moroImg}
          alt={`모로 레벨 ${level}`}
          className="w-[135px] h-[203px] object-contain"
        />
        {/* 그림자 타원 */}
        <div
          className="w-[146px] h-[36px] -mt-2"
          style={{
            background: "rgba(0,203,147,0.2)",
            borderRadius: "50%",
            transform: "rotate(12.95deg)",
          }}
        />
      </section>

      {/* 레벨 프로그레스 */}
      <section className="mx-[27px] mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[14px] font-semibold text-[#007C57] tracking-[-0.35px]">LEVEL {level}</span>
          <span className="text-[14px] font-semibold text-white tracking-[-0.35px]">{xpPercent}%</span>
        </div>
        <div className="relative h-[4px]">
          {/* 배경 바 */}
          <div className="absolute inset-0 bg-[#AAEEDB] rounded-full" />
          {/* 진행 바 */}
          <div
            className="absolute top-0 left-0 h-full bg-[#00CB93] rounded-full transition-all"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
      </section>

      {/* 오늘의 미션 카드 */}
      <section className="mx-5 mt-6 mb-[120px] h-[160px] rounded-[16px] bg-white border border-[#00CB93] relative px-6 py-[17px]">
        {/* 상단 */}
        <div className="flex items-center justify-between">
          <span className="text-[16px] font-semibold text-[#00CB93] tracking-[-0.4px]">오늘의 미션</span>
          {/* 토큰 뱃지 */}
          <div className="flex items-center gap-1 bg-[rgba(255,255,255,0.6)] border border-[#00CB93] rounded-[22px] px-2 h-[26px]">
            <div className="w-[18px] h-[18px] rounded-full bg-[#00CB93] flex items-center justify-center">
              <span className="text-[10px] text-white font-semibold">P</span>
            </div>
            <span className="text-[12px] font-semibold text-[#00CB93] tracking-[-0.3px]">10</span>
          </div>
        </div>

        {/* 미션 제목 */}
        <p className="text-[20px] font-semibold text-[#003D2B] tracking-[-0.5px] leading-[25px] mt-[14px]">
          근처에서 즉석 복권 구매해보기
        </p>

        {/* 설명 */}
        <p className="text-[12px] text-[#949494] tracking-[-0.3px] leading-[25px] mt-[2px]">
          혹시 알아요? 오늘 당신에게 행운이 찾아올지
        </p>

        {/* XP / 토큰 */}
        <div className="flex gap-3 mt-[12px]">
          <span className="text-[12px] font-semibold text-[#00CB93] tracking-[-0.3px]">+ 30 xp</span>
          <span className="text-[12px] font-semibold text-[#00CB93] tracking-[-0.3px]">+ 2 토큰</span>
        </div>
      </section>

      {/* Bottom Tab Bar */}
      <BottomTabBar />

      {/* Home indicator */}
      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-[100px]" />
    </div>
  );
}

export default Home;
