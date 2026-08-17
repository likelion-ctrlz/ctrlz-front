import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";

const CRISIS_LINES = [
  {
    title: "자살예방상담전화 109",
    desc: "24시간 운영 ･ 무료 ･ 익명 가능",
  },
  {
    title: "정신건강 위기상담전화 1577-0199",
    desc: "24시간 운영 ･ 무료",
  },
  {
    title: "청소년상담 1388",
    desc: "24시간 운영 ･ 문자･카카오 상담 가능",
  },
];

const ONLINE_COUNSELING = [
  {
    title: "마음이음 온라인 상담",
    desc: "정신건강복지센터 운영 ･ 채팅･이메일 상담 신청 가능",
  },
  {
    title: "청년 마음건강 지원사업",
    desc: "전국 정신건강복지센터 연계 ･ 무료 심리상담 제공",
  },
];

function DiaryHelp() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">
      {/* Status bar spacer */}

      {/* Header */}
      <header className="relative flex items-center h-[53px] px-5">
        <button onClick={() => navigate("/diary/report")} className="w-[34px] h-[34px] flex items-center justify-center">
          <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
            <path d="M7 1L1 7.5L7 14" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-[#00CB93] tracking-[-0.5px] leading-[44px]">
          전문 도움 요청하기
        </p>
      </header>

      {/* Main content */}
      <main className="flex-1 px-5 pb-[130px]">
        {/* Intro section */}
        <section className="mb-6">
          <h2 className="text-[16px] font-semibold text-[#111] mb-2">도움을 요청하는 건 용기 있는 일이에요</h2>
          <p className="text-[14px] text-[#949494] mb-1">지금 힘드신가요? 아래 전문기관에서 판단 없이 들어드려요</p>
          <p className="text-[14px] text-[#949494]">언제든 연락해도 괜찮아요</p>
        </section>

        {/* 위기 상담 전화 */}
        <section className="mb-6">
          <h3 className="text-[15px] font-semibold text-[#111] mb-3">위기 상담 전화</h3>
          <div className="space-y-3">
            {CRISIS_LINES.map((item) => (
              <div
                key={item.title}
                className="border border-[#AAEEDB] bg-white rounded-[16px] p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-[16px] font-semibold text-[#111]">{item.title}</p>
                  <p className="text-[12px] text-[#CACACA] mt-1">{item.desc}</p>
                </div>
                <button className="bg-[#00CB93] text-white text-[13px] font-medium px-4 py-2 rounded-[14px] shrink-0 ml-3">
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
                className="border border-[#AAEEDB] bg-white rounded-[16px] p-4"
              >
                <p className="text-[16px] font-semibold text-[#111]">{item.title}</p>
                <p className="text-[12px] text-[#CACACA] mt-1 mb-4">{item.desc}</p>
                <button className="w-full bg-[#00CB93] text-white text-[14px] font-medium py-3 rounded-[9px]">
                  상담 신청하기
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 가까운 기관 찾기 */}
        <section className="mb-6">
          <h3 className="text-[15px] font-semibold text-[#111] mb-3">가까운 기관 찾기</h3>
          <div className="border border-[#AAEEDB] bg-white rounded-[16px] p-4">
            <p className="text-[16px] font-semibold text-[#111]">지역 정신건강복지센터</p>
            <p className="text-[12px] text-[#CACACA] mt-1 mb-4">시 군 구 단위 운영 ･ 방문 상담 가능</p>
            <button className="w-full bg-[#00CB93] text-white text-[14px] font-medium py-3 rounded-[9px]">
              지역 기관 찾기
            </button>
          </div>
        </section>

        {/* Footer disclaimer */}
        <div className="text-center mt-4">
          <p className="text-[12px] text-[#949494]">이 화면은 전문 상담이나 위기 판단을 대신하지 않아요.</p>
          <p className="text-[12px] text-[#949494]">위기 상황이라면 지금 바로 109로 연락해 주세요.</p>
        </div>
      </main>

      <BottomTabBar />
    </div>
  );
}

export default DiaryHelp;
