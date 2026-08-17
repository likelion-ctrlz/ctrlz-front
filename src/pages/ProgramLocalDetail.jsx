import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import programCalligraphy from "../assets/program-calligraphy.png";
import chevronLeft from "../assets/icon/chevron-left.png";

function ProgramLocalDetail() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      {/* Status bar spacer */}

      {/* Header */}
      <header className="relative flex items-center h-[53px] px-5">
        <button onClick={() => navigate("/programs/local")} className="w-[34px] h-[34px] flex items-center justify-center">
          <img src={chevronLeft} alt="" className="w-[34px] h-[34px]" />
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-[#00CB93] tracking-[-0.5px] leading-[44px]">
          지역연계 프로그램
        </p>
      </header>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto pb-[130px]">
        {/* Hero image with gradient and title */}
        <div className="relative h-[245px] w-full overflow-hidden">
          <img src={programCalligraphy} alt="서예 입문 클래스" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-45% to-[#007C57]" />
          <p className="absolute bottom-5 left-5 text-[36px] font-bold text-white m-0 tracking-[-0.9px]">
            서예 입문 클래스
          </p>
        </div>

        {/* Tags */}
        <div className="flex gap-2 px-5 mt-4">
          {["강동구", "문화 ･ 예술", "성인 누구나"].map((tag) => (
            <span
              key={tag}
              className="border border-[#00CB93] rounded-[15px] px-[20px] h-[30px] flex items-center text-[12px] text-[#00CB93] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Details card */}
        <div className="mx-5 mt-5 bg-[rgba(184,184,184,0.08)] rounded-[16px] px-5 py-4">
          <div className="space-y-4">
            <div>
              <p className="text-[12px] font-medium text-black m-0">일정</p>
              <p className="text-[11px] text-[#949494] m-0 mt-1">2025년 7월 5일 ~ 2026년 9월 30일 (매주 토요일)</p>
            </div>
            <div>
              <p className="text-[12px] font-medium text-black m-0">장소</p>
              <p className="text-[11px] text-[#949494] m-0 mt-1">강동구 문화예술회관 3층 공예실</p>
            </div>
            <div>
              <p className="text-[12px] font-medium text-black m-0">소요 시간</p>
              <p className="text-[11px] text-[#949494] m-0 mt-1">오전 10:00 ~ 12:00</p>
            </div>
            <div>
              <p className="text-[12px] font-medium text-black m-0">정원</p>
              <p className="text-[11px] text-[#949494] m-0 mt-1">회차당 15명</p>
            </div>
          </div>
        </div>

        {/* 이런 프로그램이에요 */}
        <div className="px-5 mt-6">
          <p className="text-[16px] font-semibold text-black m-0 mb-3">이런 프로그램이에요</p>
          <div className="bg-[rgba(184,184,184,0.08)] rounded-[16px] px-5 py-4">
            <p className="text-[12px] text-[#00CB93] m-0 leading-[25px]">
              붓과 먹으로 한 글자씩 써 내려가는 시간이에요 서예를 통해 집중하고
              <br />나만의 속도를 표현하는 경험을 나눠볼 수 있어요
            </p>
          </div>
        </div>

        {/* 접수 방법 안내 section */}
        <div className="px-5 mt-8">
          <p className="text-[16px] font-semibold text-black m-0">접수 방법 안내</p>
          <p className="text-[14px] text-[#949494] m-0 mt-1 mb-4">한 단계씩 천천히 진행해봐요</p>

          {/* 접수 절차 */}
          <div className="bg-[rgba(184,184,184,0.08)] rounded-[16px] px-5 py-4 mb-4">
            <p className="text-[12px] font-medium text-black m-0 mb-2">접수 절차</p>
            <ol className="list-decimal pl-4 space-y-1">
              <li className="text-[11px] text-[#949494]">아래 신청 버튼을 눌러 접수 양식을 작성해요</li>
              <li className="text-[11px] text-[#949494]">담당자가 1~2일 내로 연락하여 일정을 안내해드려요</li>
              <li className="text-[11px] text-[#949494]">첫 상담은 대면 또는 전화로 진행할 수 있어요</li>
              <li className="text-[11px] text-[#949494]">이후 프로그램 참여 여부를 편하게 결정하면 돼요</li>
            </ol>
          </div>

          {/* 기관 연락처 */}
          <div className="bg-[rgba(184,184,184,0.08)] rounded-[16px] px-5 py-4 mb-4">
            <p className="text-[12px] font-medium text-black m-0 mb-2">기관 연락처</p>
            <p className="text-[11px] text-[#949494] m-0">전화 문의 02 - 000 - 0000 (평일 09:00 ~ 18:00)</p>
            <p className="text-[11px] text-[#949494] m-0 mt-2">이메일 문의 support@example.go.kr</p>
          </div>

          {/* 접수 전에 궁금한 게 있다면 */}
          <div className="bg-[rgba(184,184,184,0.08)] rounded-[16px] px-5 py-4 mb-6">
            <p className="text-[12px] font-medium text-black m-0 mb-2">접수 전에 궁금한 게 있다면</p>
            <p className="text-[11px] text-[#949494] m-0">전화나 이메일로 먼저 물어봐도 괜찮아요 부담없이 연락해 보세요</p>
          </div>

          {/* 참여 신청하기 버튼 */}
          <button
            onClick={() => navigate("/programs/local/1/complete")}
            className="w-full h-[68px] bg-white border border-[#00CB93] rounded-[16px] text-[#00CB93] text-[20px] font-semibold cursor-pointer"
          >
            참여 신청하기
          </button>
        </div>
      </main>

      <BottomTabBar />
    </div>
  );
}

export default ProgramLocalDetail;
