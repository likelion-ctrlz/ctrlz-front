import { useNavigate, useLocation } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import Header from "../components/Header";
import ground from "../assets/home/ground.png";
import morrowbehind from "../assets/program/morrowbehind.png";
import characterShadow from "../assets/character-shadow.svg";

// 캐릭터(피그마 실측값 그대로: 257x385) + 그림자
const CHAR_W = 257;
const CHAR_H = 385;
const SHADOW_W = 188.593;
const SHADOW_H = 86.838;
const SHADOW_LEFT = 75;
const SHADOW_TOP = 279;
const SHADOW_ROTATE = 12.95;

// ground.png는 위쪽 약 48.76%가 투명 — Home 화면과 동일한 자산·동일한 계산식을 사용해서
// 그림자(캐릭터 발밑) 기준으로 능선을 배치하고, 그 아래부터는 같은 색으로 화면 끝까지 이어서 채움
const GROUND_HEIGHT = 760;
const GROUND_TOP_FROM_SHADOW = -360;
const GROUND_FILL_TOP_FROM_SHADOW = 400;

// 캐릭터를 제외한 나머지 고정 영역 높이 (헤더 53 + 타이틀 mt40+h32 + 카드 145
// + 버튼 mt16+h68 + 버튼 mb16 + 탭바 여백 100) — 화면이 낮아졌을 때 topSpacer를
// 몇 px까지 줄여야 다 들어가는지 계산하는 데 씀
const FIXED_CHROME_HEIGHT = 470;
const TOP_PADDING = 30;

function TokenInsufficient() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const tokenBalance = state?.tokenBalance ?? 0;
  const requiredTokens = state?.requiredTokens ?? 0;

  // 화면이 낮으면 캐릭터 위 여백(topSpacer)부터 0까지 줄어듦.
  // ground도 이 값을 그대로 더해서 계산하므로 캐릭터를 그대로 "따라가며" 항상 같이 움직임
  const topSpacer = `clamp(0px, calc(100dvh - ${FIXED_CHROME_HEIGHT + CHAR_H}px), ${TOP_PADDING}px)`;
  const groundTop = `calc(${topSpacer} + ${SHADOW_TOP + GROUND_TOP_FROM_SHADOW}px)`;
  const groundFillTop = `calc(${topSpacer} + ${SHADOW_TOP + GROUND_FILL_TOP_FROM_SHADOW}px)`;

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-mint-fade">
      <Header title="프로그램" onBack={() => navigate(-1)} />

      {/* 타이틀 */}
      <p className="mt-[40px] px-5 shrink-0 text-[24px] font-bold text-primary tracking-[-0.6px] leading-[32px] text-center">
        아직 토큰이 조금 부족해요
      </p>

      {/* 캐릭터 + 그라운드 + 카드/버튼을 하나의 컨테이너로 묶어서
          화면 높이가 달라져도 캐릭터와 그라운드가 항상 같이 움직이고,
          카드/버튼은 하단(탭바 바로 위)에 고정되도록 함 */}
      <div className="relative flex-1 flex flex-col items-center px-5">
        {/* 캐릭터 위 여백 — 화면이 낮으면 0까지 압축됨 */}
        <div className="shrink-0" style={{ height: topSpacer }} />

        {/* ground.png — 그림자(캐릭터 발밑) 기준으로 위치를 잡아서 캐릭터와 항상 같이 움직임 */}
        <img
          src={ground}
          alt=""
          className="absolute left-1/2 -translate-x-1/2 w-auto max-w-none object-cover pointer-events-none select-none"
          style={{ top: groundTop, height: GROUND_HEIGHT }}
        />
        {/* ground.png 하단부터는 같은 색으로 화면 끝까지 이어서 채움 (화면이 길어져도 끊김 없음) */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{ top: groundFillTop, backgroundColor: "#b8e1cf" }}
        />

        {/* 캐릭터 + 그림자 */}
        <div className="relative shrink-0" style={{ width: CHAR_W, height: CHAR_H }}>
          <img
            src={characterShadow}
            alt=""
            className="absolute"
            style={{
              width: SHADOW_W,
              height: SHADOW_H,
              left: SHADOW_LEFT,
              top: SHADOW_TOP,
              transform: `rotate(${SHADOW_ROTATE}deg)`,
            }}
          />
          <img src={morrowbehind} alt="모로 캐릭터" className="absolute inset-0 w-full h-full object-cover" />
        </div>

        {/* 남는 공간을 아래로 밀어 카드/버튼을 바텀(탭바 바로 위)에 고정 */}
        <div className="flex-1" />

        {/* 토큰 정보 카드 */}
        <div className="relative z-10 w-full max-w-[362px] shrink-0 bg-white border border-primary rounded-[16px] px-4 pt-[17px] pb-[15px]">
          <p className="m-0 text-[16px] font-semibold leading-[25px] tracking-[-0.4px] text-primary-text">
            현재 보유 토큰
          </p>

          <div className="mt-[9px] flex items-center justify-between text-[12px] font-medium leading-[25px] tracking-[-0.3px] text-primary">
            <span>현재 보유 토큰</span>
            <span>{tokenBalance}P</span>
          </div>

          <div className="flex items-center justify-between text-[12px] font-medium leading-[25px] tracking-[-0.3px] text-primary">
            <span>필요 토큰</span>
            <span>{requiredTokens}P</span>
          </div>

          <p className="mt-[9px] text-[10px] font-medium leading-[25px] tracking-[-0.25px] text-primary">
            오늘의 미션을 완료하면 토큰을 받을 수 있어요 매일 작은 행동 하나씩 조금씩 채워가요
          </p>
        </div>

        {/* 미션 하러가기 버튼 */}
        <button
          onClick={() => navigate("/missions")}
          className="relative z-10 mt-[16px] mb-[95px] w-full max-w-[362px] h-[68px] shrink-0 bg-white border border-primary rounded-[16px] text-primary text-[20px] font-semibold tracking-[-0.5px]"
        >
          미션 하러가기
        </button>
      </div>

      <BottomTabBar />
    </div>
  );
}

export default TokenInsufficient;
