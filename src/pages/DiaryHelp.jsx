import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import Header from "../components/Header";
import { CRISIS_LINES, ONLINE_COUNSELING, LOCAL_CENTER_LINK } from "../data/crisisSupport";

function DiaryHelp() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">
      {/* Status bar spacer */}

      <Header title="전문 도움 요청하기" onBack={() => navigate("/diary/report")} />

      {/* Main content */}
      <main className="flex-1 px-5 pb-[95px] mt-[31px]">
        {/* Intro section */}
        <section className="mb-6">
          <h2 className="text-[16px] font-semibold text-black mb-2">도움을 요청하는 건 용기 있는 일이에요</h2>
          <p className="text-[14px] text-gray-muted mb-1">지금 힘드신가요? 아래 전문기관에서 판단 없이 들어드려요</p>
          <p className="text-[14px] text-gray-muted">언제든 연락해도 괜찮아요</p>
        </section>

        {/* 위기 상담 전화 */}
        <section className="mb-6">
          <h3 className="text-[15px] font-semibold text-black mb-3">위기 상담 전화</h3>
          <div className="space-y-3">
            {CRISIS_LINES.map((item) => (
              <div
                key={item.title}
                className="border border-primary-sub3 bg-white rounded-[16px] p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-[16px] font-semibold text-black">{item.title}</p>
                  <p className="text-[12px] text-gray-icon mt-1">{item.desc}</p>
                </div>
                <a
                  href={`tel:${item.phone}`}
                  className="bg-primary text-white text-[13px] font-medium px-4 py-2 rounded-[14px] shrink-0 ml-3 text-center"
                >
                  전화 연결
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* 온라인 상담 접수 */}
        <section className="mb-6">
          <h3 className="text-[15px] font-semibold text-black mb-3">온라인 상담 접수</h3>
          <div className="space-y-3">
            {ONLINE_COUNSELING.map((item) => (
              <div
                key={item.title}
                className="border border-primary-sub3 bg-white rounded-[16px] p-4"
              >
                <p className="text-[16px] font-semibold text-black">{item.title}</p>
                <p className="text-[12px] text-gray-icon mt-1 mb-4">{item.desc}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-primary text-white text-[14px] font-medium py-3 rounded-[9px]"
                >
                  상담 신청하기
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* 가까운 기관 찾기 */}
        <section className="mb-6">
          <h3 className="text-[15px] font-semibold text-black mb-3">가까운 기관 찾기</h3>
          <div className="border border-primary-sub3 bg-white rounded-[16px] p-4">
            <p className="text-[16px] font-semibold text-black">지역 정신건강복지센터</p>
            <p className="text-[12px] text-gray-icon mt-1 mb-4">시 군 구 단위 운영 ･ 방문 상담 가능</p>
            <a
              href={LOCAL_CENTER_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-primary text-white text-[14px] font-medium py-3 rounded-[9px]"
            >
              지역 기관 찾기
            </a>
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
