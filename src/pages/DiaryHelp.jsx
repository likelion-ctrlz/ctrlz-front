import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import chevronLeft from "../assets/icon/chevron-left.png";
import { CRISIS_LINES, ONLINE_COUNSELING } from "../data/crisisSupport";

function DiaryHelp() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">
      {/* Status bar spacer */}

      {/* Header */}
      <header className="relative flex items-center h-[53px] px-5">
        <button onClick={() => navigate("/diary/report")} className="w-[34px] h-[34px] flex items-center justify-center">
          <img src={chevronLeft} alt="" className="w-[34px] h-[34px]" />
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-primary tracking-[-0.5px] leading-[44px]">
          전문 도움 요청하기
        </p>
      </header>

      {/* Main content */}
      <main className="flex-1 px-5 pb-[130px]">
        {/* Intro section */}
        <section className="mb-6">
          <h2 className="text-[16px] font-semibold text-[#111] mb-2">도움을 요청하는 건 용기 있는 일이에요</h2>
          <p className="text-[14px] text-gray-muted mb-1">지금 힘드신가요? 아래 전문기관에서 판단 없이 들어드려요</p>
          <p className="text-[14px] text-gray-muted">언제든 연락해도 괜찮아요</p>
        </section>

        {/* 위기 상담 전화 */}
        <section className="mb-6">
          <h3 className="text-[15px] font-semibold text-[#111] mb-3">위기 상담 전화</h3>
          <div className="space-y-3">
            {CRISIS_LINES.map((item) => (
              <div
                key={item.title}
                className="border border-primary-sub3 bg-white rounded-[16px] p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-[16px] font-semibold text-[#111]">{item.title}</p>
                  <p className="text-[12px] text-gray-icon mt-1">{item.desc}</p>
                </div>
                <button className="bg-primary text-white text-[13px] font-medium px-4 py-2 rounded-[14px] shrink-0 ml-3">
                  전화 연결
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 온라인 상담 접수 */}
        <section className="mb-6">
          <h3 className="text-[15px] font-semibold text-[#111] mb-3">온라인 상담 접수</h3>
          <div className="space-y-3">
            {ONLINE_COUNSELING.map((item) => (
              <div
                key={item.title}
                className="border border-primary-sub3 bg-white rounded-[16px] p-4"
              >
                <p className="text-[16px] font-semibold text-[#111]">{item.title}</p>
                <p className="text-[12px] text-gray-icon mt-1 mb-4">{item.desc}</p>
                <button className="w-full bg-primary text-white text-[14px] font-medium py-3 rounded-[9px]">
                  상담 신청하기
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 가까운 기관 찾기 */}
        <section className="mb-6">
          <h3 className="text-[15px] font-semibold text-[#111] mb-3">가까운 기관 찾기</h3>
          <div className="border border-primary-sub3 bg-white rounded-[16px] p-4">
            <p className="text-[16px] font-semibold text-[#111]">지역 정신건강복지센터</p>
            <p className="text-[12px] text-gray-icon mt-1 mb-4">시 군 구 단위 운영 ･ 방문 상담 가능</p>
            <button className="w-full bg-primary text-white text-[14px] font-medium py-3 rounded-[9px]">
              지역 기관 찾기
            </button>
          </div>
        </section>

        {/* Footer disclaimer */}
        <div className="text-center mt-4">
          <p className="text-[12px] text-gray-muted">이 화면은 전문 상담이나 위기 판단을 대신하지 않아요.</p>
          <p className="text-[12px] text-gray-muted">위기 상황이라면 지금 바로 109로 연락해 주세요.</p>
        </div>
      </main>

      <BottomTabBar />
    </div>
  );
}

export default DiaryHelp;
