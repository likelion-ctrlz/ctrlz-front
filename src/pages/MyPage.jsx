import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import moroLv2 from "../assets/moro-lv2.png";
import chevronLeft from "../assets/icon/chevron-left.png";

function MyPage() {
  const navigate = useNavigate();

  const MENU_ITEMS = [
    { label: "점수 분석", icon: "📊", path: "/mypage/score" },
    { label: "자가진단 다시하기", icon: "📋", path: "/diagnosis" },
    { label: "개선 방안", icon: "📈", path: "/diagnosis/result" },
    { label: "알림 설정", icon: "🔔", path: "/mypage/notifications" },
  ];

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">

      {/* Header */}
      <header className="relative flex items-center h-[53px] px-5">
        <button onClick={() => navigate(-1)} className="w-[34px] h-[34px] flex items-center justify-center">
          <img src={chevronLeft} alt="" className="w-[34px] h-[34px]" />
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-[#00CB93] tracking-[-0.5px] leading-[44px]">
          마이페이지
        </p>
      </header>

      <main className="flex-1 flex flex-col px-5 pb-[130px]">
        {/* 프로필 영역 */}
        <div className="flex items-center mt-[22px]">
          {/* 아바타 */}
          <div className="w-[68px] h-[68px] rounded-full bg-[#E6FFF8] border border-[#00CB93] overflow-hidden flex items-center justify-center shrink-0">
            <img src={moroLv2} alt="프로필" className="w-[60px] h-[58px] object-contain" />
          </div>

          {/* 이름 + 상태 */}
          <div className="ml-[18px]">
            <p className="text-[16px] font-semibold text-black tracking-[-0.4px] leading-[30px]">
              사용자1
            </p>
            <p className="text-[10px] font-medium text-[#949494] tracking-[-0.25px] leading-[25px]">
              상태 레벨 2 ･ 회복 중
            </p>
          </div>

          {/* 내 정보 수정 */}
          <p className="ml-auto text-[12px] font-medium text-[#949494] tracking-[-0.3px]">
            내 정보 수정
          </p>
        </div>

        {/* 스탯 카드 */}
        <div className="flex h-[111px] mt-[29px] bg-[#F6F6F6] rounded-[12px]">
          {/* 누적 경험치 */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-[20px] font-semibold text-[#00CB93] tracking-[-0.5px] leading-[25px]">550XP</p>
            <p className="text-[14px] font-semibold text-[#152923] tracking-[-0.35px] leading-[25px] mt-[6px]">누적 경험치</p>
          </div>

          {/* 구분선 */}
          <div className="w-[1px] h-[76px] bg-[#E0E0E0] self-center" />

          {/* 현재 레벨 */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-[20px] font-semibold text-[#00CB93] tracking-[-0.5px] leading-[25px]">LV 2</p>
            <p className="text-[14px] font-semibold text-[#152923] tracking-[-0.35px] leading-[25px] mt-[6px]">현재 레벨</p>
          </div>

          {/* 구분선 */}
          <div className="w-[1px] h-[76px] bg-[#E0E0E0] self-center" />

          {/* 보유 토큰 */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-[20px] font-semibold text-[#00CB93] tracking-[-0.5px] leading-[25px]">35P</p>
            <p className="text-[14px] font-semibold text-[#152923] tracking-[-0.35px] leading-[25px] mt-[6px]">보유 토큰</p>
          </div>
        </div>

        {/* 구분선 */}
        <div className="w-full h-[1px] bg-[#F0F0F0] mt-[24px]" />

        {/* 개인정보 설정 카드 */}
        <div className="h-[66px] bg-[#F6F6F6] rounded-[12px] mt-[24px] flex items-center px-[19px]">
          <p className="text-[14px] font-semibold text-[#152923] tracking-[-0.35px]">개인정보 설정</p>
        </div>

        {/* 메뉴 리스트 */}
        <div className="mt-[35px] flex flex-col gap-[26px]">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center gap-[28px]">
                <div className="w-[40px] h-[37px] flex items-center justify-center">
                  <span className="text-[24px]">{item.icon}</span>
                </div>
                <p className="text-[14px] font-semibold text-[#152923] tracking-[-0.35px] leading-[25px]">
                  {item.label}
                </p>
              </div>
              {/* 화살표 */}
              <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
                <path d="M1 1L7 7.5L1 14" stroke="#CACACA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
        </div>
      </main>

      <BottomTabBar />
      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-[100px]" />
    </div>
  );
}

export default MyPage;
