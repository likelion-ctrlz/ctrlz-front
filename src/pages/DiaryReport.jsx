import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import chevronLeft from "../assets/icon/chevron-left.png";

function DiaryReport() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">
      {/* Status bar spacer */}

      {/* Header */}
      <header className="relative flex items-center h-[53px] px-5">
        <button onClick={() => navigate("/diary")} className="w-[34px] h-[34px] flex items-center justify-center">
          <img src={chevronLeft} alt="" className="w-[34px] h-[34px]" />
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-primary tracking-[-0.5px] leading-[44px]">
          일기
        </p>
      </header>

      {/* Main content */}
      <main className="flex-1 px-5 pb-[130px]">
        {/* Section 1: 오늘의 감정 요약 */}
        <section className="mb-6">
          <h2 className="text-[16px] font-semibold text-[#111] mb-3">오늘의 감정 요약</h2>
          <div className="bg-gray-100 rounded-[16px] p-4">
            <p className="text-[12px] text-gray-icon mb-3">2026년 8월 24일 월요일</p>
            <div className="space-y-2">
              <p className="text-[14px] text-danger">✓ 가장 자주 기록된 감정은 "무기력"이에요</p>
              <p className="text-[14px] text-primary">✓ 지난 주보다 편안함이 조금 늘었어요</p>
              <p className="text-[14px] text-primary">✓ 꾸준히 기록한 것만으로도 충분히 잘하고 있어요</p>
            </div>
          </div>
        </section>

        {/* Section 2: 나의 감정 돌아보기 */}
        <section className="mb-6">
          <h2 className="text-[16px] font-semibold text-[#111] mb-3">나의 감정 돌아보기</h2>
          <div className="border border-primary-sub3 bg-mint-pale2 rounded-[16px] p-4 space-y-0">
            {/* 3일 전 */}
            <div className="py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] text-[#111]">3일 전</span>
                <span className="text-[13px] text-primary font-medium">편안함</span>
              </div>
              <div className="w-full h-[8px] rounded-full bg-gray-300 overflow-hidden flex">
                <div className="h-full bg-danger rounded-l-full" style={{ width: "20%" }} />
                <div className="h-full bg-primary rounded-r-full" style={{ width: "60%" }} />
              </div>
            </div>

            <div className="border-t border-gray-300" />

            {/* 5일 전 */}
            <div className="py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] text-[#111]">5일 전</span>
                <span className="text-[13px] text-danger font-medium">무기력</span>
              </div>
              <div className="w-full h-[8px] rounded-full bg-gray-300 overflow-hidden flex">
                <div className="h-full bg-danger rounded-l-full" style={{ width: "65%" }} />
                <div className="h-full bg-primary rounded-r-full" style={{ width: "15%" }} />
              </div>
            </div>

            <div className="border-t border-gray-300" />

            {/* 7일 전 */}
            <div className="py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] text-[#111]">7일 전</span>
                <span className="text-[13px] text-danger font-medium">불안</span>
              </div>
              <div className="w-full h-[8px] rounded-full bg-gray-300 overflow-hidden flex">
                <div className="h-full bg-danger rounded-l-full" style={{ width: "55%" }} />
                <div className="h-full bg-primary rounded-r-full" style={{ width: "20%" }} />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: 반복되는 감정 패턴 */}
        <section className="mb-6">
          <h2 className="text-[16px] font-semibold text-[#111] mb-3">반복되는 감정 패턴</h2>
          <div className="space-y-2">
            <p className="text-[14px] text-gray-muted">무기력함이 주로 저녁 시간대에 많이 기록 됐어요</p>
            <p className="text-[14px] text-gray-muted">이 패턴을 알아챘다는 것 자체가 변화의 시작이에요</p>
          </div>
        </section>

        {/* Section 4: 도움 요청하기 */}
        <section>
          <button
            onClick={() => navigate("/diary/help")}
            className="w-full border border-[rgba(170,238,219,0.87)] bg-mint-pale2 rounded-[16px] p-4 text-left"
          >
            <p className="text-[16px] font-semibold text-primary">도움 요청하기</p>
          </button>
        </section>
      </main>

      <BottomTabBar />
    </div>
  );
}

export default DiaryReport;
