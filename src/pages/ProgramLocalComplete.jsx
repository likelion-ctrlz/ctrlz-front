import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import Header from "../components/Header";
import cardBg from "../assets/card-bg.svg";
import cardTriangle from "../assets/card-triangle.svg";
import logoGray from "../assets/logo/logo_gray.png";

function ProgramLocalComplete() {
  const navigate = useNavigate();

  return (
    <div
      className="flex min-h-dvh flex-col"
      style={{
        backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 402 874' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(7.9137e-15 42.4 -42.4 7.3313e-15 201 386)'><stop stop-color='rgba(0,203,147,1)' offset='0'/><stop stop-color='rgba(12,206,152,1)' offset='0.0625'/><stop stop-color='rgba(25,208,158,1)' offset='0.125'/><stop stop-color='rgba(50,213,168,1)' offset='0.25'/><stop stop-color='rgba(74,218,179,1)' offset='0.375'/><stop stop-color='rgba(99,223,189,1)' offset='0.5'/><stop stop-color='rgba(149,233,210,1)' offset='0.75'/><stop stop-color='rgba(198,243,231,1)' offset='1'/></radialGradient></defs></svg>")`,
        backgroundSize: "cover",
      }}
    >
      <Header title="프로그램" onBack={() => navigate("/programs/local")} invert />

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 pb-[130px]">
        <p className="text-[24px] font-bold text-white m-0 mb-2 text-center">참여 신청이 완료됐어요!</p>
        <p className="text-[14px] text-primary-sub4 m-0 mb-8 text-center">지역 연계 프로그램으로 토큰이 소모되지 않아요</p>

        {/* White card with decorative background */}
        <div className="relative w-full max-w-[273px]">
          {/* Triangle decoration at top-left (page fold effect) */}
          <img src={cardTriangle} alt="" className="absolute -top-[12px] -left-[14px] w-[81px] h-[77px] z-20 rotate-[4deg]" style={{ filter: "drop-shadow(0px 5px 14.5px rgba(0, 204, 147, 0.4))" }} />
          
          {/* Card */}
          <div className="relative px-6 py-7" style={{ filter: "drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.08))" }}>
            <img src={cardBg} alt="" className="absolute inset-0 w-full h-full" />
            <div className="relative z-10">
              <p className="text-[24px] font-bold text-primary text-center m-0 mb-6">신청 내역</p>

              <div className="border-t border-gray-dot" />
              <div className="py-4 flex justify-between items-center">
                <span className="text-[11px] font-medium text-gray-muted tracking-[-0.275px]">활동명</span>
                <span className="text-[11px] font-medium text-gray-muted tracking-[-0.275px]">서예 입문 클래스</span>
              </div>

              <div className="border-t border-gray-dot" />
              <div className="py-4 flex justify-between items-center">
                <span className="text-[11px] font-medium text-gray-muted tracking-[-0.275px]">일시</span>
                <span className="text-[11px] font-medium text-gray-muted tracking-[-0.275px]">매주 토요일 10:00</span>
              </div>

              <div className="border-t border-gray-dot" />
              <div className="py-4 flex justify-between items-center">
                <span className="text-[11px] font-medium text-gray-muted tracking-[-0.275px]">장소</span>
                <span className="text-[11px] font-medium text-gray-muted tracking-[-0.275px]">강동구 문화예술회관</span>
              </div>

              <div className="border-t border-gray-dot mt-2" />
              <div className="flex justify-center mt-5">
                <img src={logoGray} alt="Morrow" className="h-[10px] w-auto" />
              </div>
            </div>
          </div>
        </div>

        <p className="text-[12px] text-white text-center mt-8 m-0 px-4">
          신청 취소나 문의는 지역 지원 센터를 통해 할 수 있어요
        </p>
      </div>

      <BottomTabBar />
    </div>
  );
}

export default ProgramLocalComplete;
