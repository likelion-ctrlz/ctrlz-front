import { useNavigate, useLocation } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import Header from "../components/Header";
import ground from "../assets/home/ground.png";
import morrowbehind from "../assets/program/morrowbehind.png";
import characterShadow from "../assets/character-shadow.svg";

function TokenInsufficient() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const tokenBalance = state?.tokenBalance ?? 0;
  const requiredTokens = state?.requiredTokens ?? 0;

  return (
    <div className="relative min-h-dvh overflow-hidden bg-mint-fade">
      <Header title="프로그램" onBack={() => navigate(-1)} />

      {/* 하단 배경 ground.png — 헤더 아래부터 화면 끝까지(탭바 뒤까지) object-cover로 항상 빈틈없이 채움.
          Home 화면과 같은 자산을 재사용, 화면 높이가 달라져도 크롭만 될 뿐 끊기지 않음 */}
      <div className="absolute inset-x-0 top-[89px] bottom-0 overflow-hidden pointer-events-none">
        <img src={ground} alt="" className="absolute inset-0 w-full h-full object-cover object-top" />
      </div>

      {/* 타이틀 */}
      <p className="absolute left-1/2 top-[146px] w-[280px] -translate-x-1/2 text-center text-[24px] font-bold leading-[29px] tracking-[-0.6px] text-primary">
        아직 토큰이 조금 부족해요
      </p>

      {/* 캐릭터 그림자 */}
      <img
        src={characterShadow}
        alt=""
        className="absolute pointer-events-none"
        style={{ left: 147, top: 425, width: 188.593, height: 86.838, transform: "rotate(12.95deg)" }}
      />

      {/* 캐릭터 이미지 */}
      <img
        src={morrowbehind}
        alt="모로 캐릭터"
        className="absolute left-[72px] top-[146px] w-[257px] h-[385px] object-cover"
      />

      {/* 토큰 정보 카드 */}
      <div className="absolute left-1/2 top-[468px] h-[145px] w-[362px] -translate-x-1/2 rounded-[16px] border border-primary bg-white px-4 pt-[17px]">
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
        className="absolute left-1/2 top-[633px] h-[68px] w-[362px] -translate-x-1/2 rounded-[16px] border border-primary bg-white text-[20px] font-semibold tracking-[-0.5px] text-primary"
      >
        미션 하러가기
      </button>

      <BottomTabBar />
    </div>
  );
}

export default TokenInsufficient;
