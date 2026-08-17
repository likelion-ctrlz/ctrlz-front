import { useNavigate, useParams } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import programPottery from "../assets/program-pottery.png";

function ProgramDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      {/* Status bar spacer */}
      <div className="h-[44px]" />

      {/* Header */}
      <header className="relative flex items-center h-[53px] px-5">
        <button onClick={() => navigate("/programs")} className="w-[34px] h-[34px] flex items-center justify-center">
          <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
            <path d="M7 1L1 7.5L7 14" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-[#00CB93] tracking-[-0.5px] leading-[44px]">
          프로그램
        </p>
      </header>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto pb-[130px]">
        {/* Hero image with gradient and title */}
        <div className="relative h-[240px] mx-5 rounded-[14px] overflow-hidden">
          <img src={programPottery} alt="도자기 원데이클래스" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-45% to-[#007C57]" />
          <p className="absolute bottom-5 left-5 text-[24px] font-bold text-white m-0">
            도자기 원데이클래스
          </p>
        </div>

        {/* Tags */}
        <div className="flex gap-2 px-5 mt-4">
          {["공예", "실내", "초보 환영"].map((tag) => (
            <span
              key={tag}
              className="border border-[#00CB93] rounded-[15px] px-[12px] h-[23px] flex items-center text-[10px] text-[#00CB93] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Details card */}
        <div className="mx-5 mt-4 bg-[rgba(184,184,184,0.08)] rounded-[16px] px-5 py-4">
          <div className="space-y-4">
            <div>
              <p className="text-[14px] font-bold text-black m-0">일정</p>
              <p className="text-[12px] text-[#949494] m-0 mt-1">2026년 8월 30일 (일) 오후 2시</p>
            </div>
            <div>
              <p className="text-[14px] font-bold text-black m-0">장소</p>
              <p className="text-[12px] text-[#949494] m-0 mt-1">서울 마포구 모로 공방 스튜디오</p>
            </div>
            <div>
              <p className="text-[14px] font-bold text-black m-0">소요 시간</p>
              <p className="text-[12px] text-[#949494] m-0 mt-1">약 2시간</p>
            </div>
            <div>
              <p className="text-[14px] font-bold text-black m-0">정원</p>
              <p className="text-[12px] text-[#949494] m-0 mt-1">최대 8명 (소규모로 진행)</p>
            </div>
          </div>
        </div>

        {/* 이런 활동이에요 */}
        <div className="px-5 mt-6">
          <p className="text-[16px] font-semibold text-black m-0 mb-3">이런 활동이에요</p>
          <div className="bg-[rgba(184,184,184,0.08)] rounded-[16px] px-5 py-4">
            <p className="text-[12px] text-[#00CB93] m-0 leading-[25px]">
              손으로 흙을 빚으며 집중과 이완을 동시에 경험할 수 있는 클래스예요
              <br />별도 경험이 없어도 강사가 처음부터 함께 도와드려요
            </p>
          </div>
        </div>

        {/* 부담 수준 */}
        <div className="px-5 mt-6">
          <p className="text-[16px] font-semibold text-black m-0 mb-3">부담 수준</p>
          <div className="bg-[rgba(184,184,184,0.08)] rounded-[16px] px-5 py-4">
            <div className="space-y-3">
              <div className="flex justify-between text-[12px]">
                <span className="text-black font-medium">신체 활동</span>
                <span className="text-[#00CB93] font-semibold">낮음</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-black font-medium">사회적 상호작용</span>
                <span className="text-[#00CB93] font-semibold">소규모</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-black font-medium">사전 준비</span>
                <span className="text-[#00CB93] font-semibold">없음</span>
              </div>
            </div>
          </div>
        </div>

        {/* 참여 조건 안내 */}
        <div className="px-5 mt-6">
          <p className="text-[16px] font-semibold text-black m-0 mb-3">참여 조건 안내</p>
          <div className="bg-[rgba(184,184,184,0.08)] rounded-[16px] px-5 py-4">
            <div className="space-y-2 text-[12px] text-black">
              <p className="m-0">• 재료비 포함, 별도 준비물 없어요</p>
              <p className="m-0">• 참여 취소는 하루 전까지 가능해요</p>
              <p className="m-0">• 사진 촬영은 자유이며 공유 의무는 없어요</p>
            </div>
          </div>
        </div>

        {/* 토큰 정보 */}
        <div className="mx-5 mt-6 bg-[rgba(184,184,184,0.08)] rounded-[16px] px-5 py-4">
          <div className="space-y-2 text-[12px]">
            <div className="flex justify-between">
              <span className="text-black font-medium">참여에 필요한 토큰</span>
              <span className="text-[#00CB93] font-semibold">5 토큰</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#949494]">내 보유 토큰</span>
              <span className="text-[#949494]">12 토큰</span>
            </div>
          </div>
        </div>

        {/* 참여 신청하기 버튼 */}
        <div className="px-5 mt-6">
          <button
            onClick={() => navigate(`/programs/${id}/complete`)}
            className="w-full h-[68px] bg-[#00CB93] rounded-[16px] text-white text-[20px] font-semibold border-none cursor-pointer"
          >
            참여 신청하기
          </button>
        </div>
      </main>

      <BottomTabBar />
    </div>
  );
}

export default ProgramDetail;
