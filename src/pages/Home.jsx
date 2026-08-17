import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import moroLv1 from "../assets/moro-lv1.png";
import moroLv2 from "../assets/moro-lv2.png";
import moroLv3 from "../assets/moro-lv3.png";
import moroLv4 from "../assets/moro-lv4.png";
import moroLv5 from "../assets/moro-lv5.png";
import mainLogo from "../assets/logo/main_logo.png";
import groundBg from "../assets/home/ground.png";
import characterShadow from "../assets/character-shadow.svg";

const MORO_IMAGES = [moroLv1, moroLv2, moroLv3, moroLv4, moroLv5];

function Home() {
  const navigate = useNavigate();
  const [level, setLevel] = useState(1);

  const xpPercent = 10;
  const username = "사용자1";
  const streak = 5;
  const moroImg = MORO_IMAGES[level - 1];

  return (
    <div
      className="relative flex min-h-dvh flex-col overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #E6FFF8 0%, #FFFFFF 67.79%)",
      }}
    >
      {/* Status bar */}

      {/* Header — Morrow */}
      <header className="relative h-[53px] flex items-center px-6">
        <img src={mainLogo} alt="Morrow" className="h-[19px] w-auto" />
      </header>

      {/* 인사 배너 */}
      <section className="relative mx-5 mt-[34px] gap-[5px] h-[98px] rounded-[16px] bg-[rgba(255,255,255,0.6)] border border-[#00CB93] shadow-[0px_0px_18.6px_0px_rgba(0,203,147,0.33)] px-6 flex flex-col items-center justify-center text-center">
        <p className="text-[20px] font-semibold text-[#1E322C] tracking-[-0.5px] leading-[25px]">
          {username}님, 극복 할 수 있어요!
        </p>
        <p className="text-[14px] font-medium text-[#00CB93] tracking-[-0.35px] leading-[25px]">
          모로와 함께 {streak}일 연속 미션 실천 중
        </p>
      </section>

      {/* 캐릭터 + 그라운드 + 레벨/미션을 하나의 상대 컨테이너로 묶어서
          화면 높이(기종)가 달라져도 서로의 상대 위치가 흐트러지지 않게 함 */}
      <div className="relative flex-1 flex flex-col mt-[91px]">
        {/* 배경 이미지 — ground.png는 위쪽 48.76%가 투명이라, 실제 보이는
            땅의 시작점이 그림자 시작 지점(top-142)과 같아지도록 그만큼 위로 올려서 배치.
            기종이 달라져도 그림자·캐릭터와 항상 같은 위치 관계를 유지함 */}
        <img
          src={groundBg}
          alt=""
          className="absolute top-[-214px] left-1/2 -translate-x-1/2 h-[760px] w-auto max-w-none object-cover pointer-events-none select-none"
        />
        {/* ground.png 하단부터는 같은 색으로 화면 끝까지 이어서 채움 (기종 달라도 끊김 없이) */}
        <div
          className="absolute inset-x-0 top-[546px] bottom-0 pointer-events-none"
          style={{ backgroundColor: "#b8e1cf" }}
        />

        {/* 캐릭터 영역 */}
        <section
          className="relative mx-5 flex flex-col items-center cursor-pointer"
          onClick={() => setLevel((prev) => (prev % 5) + 1)}
        >
          <div className="relative w-[135px] h-[203px]">
            <img
              src={characterShadow}
              alt=""
              className="absolute w-[146px] h-[67px] left-[37px] top-[142px]"
              style={{ transform: "rotate(12.95deg)" }}
            />
            <img
              src={moroImg}
              alt={`모로 레벨 ${level}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </section>

        {/* 남는 공간을 아래로 밀어 레벨/미션 영역을 바텀에 고정 */}
        <div className="flex-1" />

        {/* 레벨 프로그레스 */}
        <section className="relative z-10 mx-[27px]">
          <div className="flex justify-between items-center">
            <span className="text-[14px] leading-[25px] font-semibold text-[#007C57] tracking-[-0.35px]">
              LEVEL {level}
            </span>
            <span
              className="text-[14px] leading-[25px] font-semibold text-white tracking-[-0.35px]"
              style={{ textShadow: "0px 1px 3px rgba(0,77,54,0.45)" }}
            >
              {xpPercent}%
            </span>
          </div>
          <div className="relative h-[10px] mt-[2px] flex items-center">
            {/* 배경 바 */}
            <div className="absolute inset-x-0 h-[9px] bg-white rounded-full" />
            {/* 진행 바 */}
            <div
              className="absolute left-0 h-[10px] bg-[#00CB93] rounded-full transition-all"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </section>

        {/* 오늘의 미션 카드 */}
        <section
          className="relative z-10 mx-5 mt-[18px] mb-[102px] h-[160px] rounded-[16px] bg-white border border-[#00CB93] px-6 py-[17px] cursor-pointer"
          onClick={() => navigate("/missions")}
        >
          {/* 상단 */}
          <div className="flex items-center justify-between">
            <span className="text-[16px] font-semibold text-[#00CB93] tracking-[-0.4px]">
              오늘의 미션
            </span>
            {/* 토큰 뱃지 */}
            <div className="flex items-center gap-1 bg-[rgba(255,255,255,0.6)] border border-[#00CB93] rounded-[22px] pl-[10px] pr-1 h-[26px]">
              <span className="text-[10px] font-semibold text-[#00CB93] tracking-[-0.25px]">
                보유토큰
              </span>
              <div className="relative w-[19px] h-[19px] rounded-full bg-[#00CB93] flex items-center justify-center">
                <span className="text-[10px] text-white font-semibold tracking-[-0.25px]">
                  10
                </span>
              </div>
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
            <span className="text-[12px] font-semibold text-[#00CB93] tracking-[-0.3px]">
              + 30 xp
            </span>
            <span className="text-[12px] font-semibold text-[#00CB93] tracking-[-0.3px]">
              + 2 토큰
            </span>
          </div>
        </section>
      </div>

      {/* Bottom Tab Bar */}
      <BottomTabBar />
    </div>
  );
}

export default Home;
