import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import LoadingScreen from "../components/LoadingScreen";
import moroLv1 from "../assets/moro-lv1.png";
import moroLv2 from "../assets/moro-lv2.png";
import moroLv3 from "../assets/moro-lv3.png";
import moroLv4 from "../assets/moro-lv4.png";
import moroLv5 from "../assets/moro-lv5.png";
import mainLogo from "../assets/logo/main_logo.png";
import groundBg from "../assets/home/ground.png";
import characterShadow from "../assets/character-shadow.svg";
import { getMe } from "../api/usersApi";

// 레벨별 캐릭터 이미지 크기 + 그림자 크기/위치(캐릭터 박스 기준 상대좌표)는
// 피그마의 Home 레벨별 프레임(1~5) 실측값을 그대로 반영함
// topPadding — 배너 하단부터 캐릭터 상단까지 간격. 피그마 레벨별 프레임에서
// (캐릭터 top - 배너 bottom229)을 그대로 가져옴. 캐릭터가 커질수록 이 값이
// 줄어들어(심하면 음수) 캐릭터가 위로 붙는 방식 — ground를 낮추는 게 아니라
// 캐릭터 위 여백을 줄여서 전체 페이지 높이가 레벨과 무관하게 일정하게 유지됨
const LEVEL_CONFIG = [
  {
    img: moroLv1,
    charW: 135,
    charH: 203,
    topPadding: 131,
    shadowW: 147,
    shadowH: 67,
    shadowLeft: 37,
    shadowTop: 142,
    shadowRotate: 12.95,
  },
  {
    img: moroLv2,
    charW: 179,
    charH: 268,
    topPadding: 75,
    shadowW: 189,
    shadowH: 87,
    shadowLeft: 47,
    shadowTop: 205,
    shadowRotate: 12.95,
  },
  {
    img: moroLv3,
    charW: 170,
    charH: 255,
    topPadding: 79,
    shadowW: 189,
    shadowH: 87,
    shadowLeft: 41,
    shadowTop: 201,
    shadowRotate: 12.95,
  },
  {
    img: moroLv4,
    charW: 201,
    charH: 301,
    topPadding: 33,
    shadowW: 189,
    shadowH: 87,
    shadowLeft: 48,
    shadowTop: 246,
    shadowRotate: 12.95,
  },
  {
    img: moroLv5,
    charW: 345,
    charH: 345,
    topPadding: 2,
    shadowW: 216,
    shadowH: 65,
    shadowLeft: 108,
    shadowTop: 287,
    shadowRotate: 4.87,
  },
];

// ground.png는 위쪽 일부가 투명이라, 실제 보이는 땅의 시작점이 그림자 시작 지점과
// 항상 같아지도록 그림자 top 기준으로 역산해서 배치 (레벨 1 기준 실측 보정값)
const GROUND_HEIGHT = 760;
const GROUND_TOP_FROM_SHADOW = -360;
const GROUND_FILL_TOP_FROM_SHADOW = 400;

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then(setUser)
      .catch(() => {
        // 세션 만료 시 로그인으로
        navigate("/", { replace: true });
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading || !user) {
    return <LoadingScreen />;
  }

  const level = user.character_level || 1;
  const xpPercent = user.character_xp_next_level
    ? Math.round((user.character_xp / user.character_xp_next_level) * 100)
    : 0;
  const username = user.nickname;
  const streak = user.mission_streak_days;
  const tokenBalance = user.token_balance;
  const mission = user.today_recommended_mission;
  const config = LEVEL_CONFIG[level - 1];
  const groundTop = config.shadowTop + GROUND_TOP_FROM_SHADOW;
  const groundFillTop = config.shadowTop + GROUND_FILL_TOP_FROM_SHADOW;

  return (
    <div
      className="relative flex h-dvh flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--color-mint-light) 0%, var(--color-bg) 67.79%)",
      }}
    >
      {/* Status bar */}

      {/* Header — Morrow */}
      <header className="relative h-[53px] shrink-0 flex items-center px-6">
        <img src={mainLogo} alt="Morrow" className="h-[19px] w-auto" />
      </header>

      {/* 인사 배너 */}
      <section className="relative w-[362px] max-w-[calc(100%-40px)] mx-auto mt-[34px] shrink-0 gap-[5px] h-[98px] rounded-[16px] bg-[rgba(255,255,255,0.6)] border border-primary shadow-[0px_0px_18.6px_0px_rgba(0,203,147,0.33)] px-6 flex flex-col items-center justify-center text-center">
        <p className="text-[20px] font-semibold text-text-forest tracking-[-0.5px] leading-[25px]">
          {username}님, 극복 할 수 있어요!
        </p>
        <p className="text-[14px] font-medium text-primary tracking-[-0.35px] leading-[25px]">
          {streak > 0
            ? `모로와 함께 ${streak}일 연속 미션 실천 중`
            : "모로와 함께 미션을 시작해봐요!"}
        </p>
      </section>

      {/* 캐릭터 + 그라운드 + 레벨/미션을 하나의 상대 컨테이너로 묶어서
          화면 높이(기종)가 달라져도 서로의 상대 위치가 흐트러지지 않게 함 */}
      <div
        className="relative flex-1 flex flex-col"
        style={{ marginTop: config.topPadding }}
      >
        {/* 배경 이미지 — ground.png는 위쪽 48.76%가 투명이라, 실제 보이는
            땅의 시작점이 그림자 시작 지점(top-142)과 같아지도록 그만큼 위로 올려서 배치.
            기종이 달라져도 그림자·캐릭터와 항상 같은 위치 관계를 유지함 */}
        <img
          src={groundBg}
          alt=""
          className="absolute left-1/2 -translate-x-1/2 w-auto max-w-none object-cover pointer-events-none select-none"
          style={{ top: groundTop, height: GROUND_HEIGHT }}
        />
        {/* ground.png 하단부터는 같은 색으로 화면 끝까지 이어서 채움 (기종 달라도 끊김 없이) */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{ top: groundFillTop, backgroundColor: "#b8e1cf" }}
        />

        {/* 캐릭터 영역 — 레벨별로 이미지·그림자 크기가 다름 (피그마 실측값) */}
        <section className="relative mx-5 shrink-0 flex flex-col items-center">
          <div
            className="relative"
            style={{ width: config.charW, height: config.charH }}
          >
            <img
              src={characterShadow}
              alt=""
              className="absolute"
              style={{
                width: config.shadowW,
                height: config.shadowH,
                left: config.shadowLeft,
                top: config.shadowTop,
                transform: `rotate(${config.shadowRotate}deg)`,
              }}
            />
            <img
              src={config.img}
              alt={`모로 레벨 ${level}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </section>

        {/* 남는 공간을 아래로 밀어 레벨/미션 영역을 바텀에 고정 */}
        <div className="flex-1" />

        {/* 레벨 프로그레스 */}
        <section className="relative z-10 mx-[27px] shrink-0">
          <div className="flex justify-between items-center">
            <span className="text-[14px] leading-[25px] font-semibold text-primary-deep tracking-[-0.35px]">
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
              className="absolute left-0 h-[10px] bg-primary rounded-full transition-all"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </section>

        {/* 오늘의 미션 카드 */}
        <section
          className="relative z-10 mx-5 mt-[18px] mb-[102px] h-[160px] shrink-0 rounded-[16px] bg-white border border-primary pl-6 pr-[14px] pt-[11px] pb-[15px] cursor-pointer"
          onClick={() => mission && navigate(`/missions/${mission.mission_id}`)}
        >
          {/* 상단 */}
          <div className="flex justify-between">
            <span className="text-[16px] font-semibold text-primary tracking-[-0.4px] mt-[7px]">
              오늘의 미션
            </span>
            {/* 토큰 뱃지 */}
            <div className="flex items-center gap-1 bg-[rgba(255,255,255,0.6)] border border-primary rounded-[22px] pl-[10px] pr-1 h-[26px]">
              <span className="text-[10px] font-semibold text-primary tracking-[-0.25px]">
                보유토큰
              </span>
              <div className="relative w-[19px] h-[19px] rounded-full bg-primary flex items-center justify-center">
                <span className="text-[10px] text-white font-semibold tracking-[-0.25px]">
                  {tokenBalance}
                </span>
              </div>
            </div>
          </div>

          {mission ? (
            <>
              {/* 미션 제목 */}
              <p className="text-[20px] font-semibold text-primary-text-dark tracking-[-0.5px] leading-[25px] mt-[14px]">
                {mission.title}
              </p>

              {/* 설명 */}
              {mission.description && (
                <p className="text-[12px] text-gray-muted tracking-[-0.3px] leading-[25px]">
                  {mission.description}
                </p>
              )}

              {/* XP / 토큰 */}
              <div className="flex gap-3 mt-[13px]">
                <span className="text-[12px] font-semibold text-primary tracking-[-0.3px]">
                  + {mission.xp_reward} xp
                </span>
                <span className="text-[12px] font-semibold text-primary tracking-[-0.3px]">
                  + {mission.token_reward} 토큰
                </span>
              </div>
            </>
          ) : (
            <p className="text-[16px] font-medium text-gray-muted tracking-[-0.4px] mt-[14px]">
              오늘의 미션이 아직 없어요
            </p>
          )}
        </section>
      </div>

      {/* Bottom Tab Bar */}
      <BottomTabBar />
    </div>
  );
}

export default Home;
