import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import programCalligraphy from "../assets/program-calligraphy.png";

const CATEGORIES = ["전체", "문화", "스포츠", "요리", "심리", "상담"];

const LOCAL_PROGRAMS = [
  {
    id: 1,
    title: "서예 입문 클래스",
    tags: ["강동구", "문화 ･ 예술", "성인 누구나"],
    description: "한국문화원 ･ 매주 화요일 오전",
    available: true,
    image: programCalligraphy,
  },
];

function ProgramLocal() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("전체");
  const [search, setSearch] = useState("");

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      {/* Status bar spacer */}

      {/* Header */}
      <header className="relative flex items-center h-[53px] px-5">
        <button onClick={() => navigate("/programs")} className="w-[34px] h-[34px] flex items-center justify-center">
          <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
            <path d="M7 1L1 7.5L7 14" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-[#00CB93] tracking-[-0.5px] leading-[44px]">
          지역연계 프로그램
        </p>
      </header>

      {/* Content */}
      <main className="flex-1 px-5 pb-[130px] overflow-y-auto">
        {/* Location + Tab toggle */}
        <div className="flex items-center justify-between mb-1 mt-2">
          <div className="flex items-center gap-2">
            <span className="text-[16px]">📍</span>
            <span className="text-[16px] font-semibold text-[#00CB93]">서울 강동구</span>
          </div>
          <div className="flex items-center bg-[#F5F5F5] rounded-full p-[2px]">
            <button className="px-3 py-1 rounded-full text-[12px] border-none cursor-pointer bg-[#00CB93] text-white font-semibold">
              지역연계
            </button>
            <button
              onClick={() => navigate("/programs")}
              className="px-3 py-1 rounded-full text-[12px] border-none cursor-pointer bg-transparent text-[#949494]"
            >
              취미
            </button>
          </div>
        </div>

        <p className="text-[16px] font-semibold text-black mt-3 mb-1">
          내 근처 지역 프로그램을 찾아봐요
        </p>

        {/* Search bar */}
        <div className="relative my-4">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#949494]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#949494" strokeWidth="2" />
              <path d="M20 20L16.5 16.5" stroke="#949494" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="프로그램 검색"
            className="w-full h-[44px] rounded-[15px] border border-[#00CB93] pl-10 pr-4 text-[14px] outline-none"
          />
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto mb-5 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 h-[30px] px-[20px] rounded-[15px] text-[13px] border cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#00CB93] text-white border-[#00CB93]"
                  : "bg-white text-[#00CB93] border-[#00CB93]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Section title */}
        <p className="text-[16px] font-semibold text-black mb-3">나와 맞는 추천 프로그램</p>

        {/* Program cards */}
        <div className="flex flex-col gap-4">
          {LOCAL_PROGRAMS.map((program) => (
            <div
              key={program.id}
              onClick={() => navigate(`/programs/local/${program.id}`)}
              className="rounded-[16px] border border-[#00CB93] overflow-hidden cursor-pointer"
            >
              {/* Image area with gradient */}
              <div className="relative h-[194px] rounded-[14px] m-[15px] overflow-hidden">
                <img src={program.image} alt={program.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-45% to-[#007C57]" />
                <p className="absolute bottom-4 left-4 text-[24px] font-bold text-white m-0">
                  {program.title}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 px-4 pt-1">
                {program.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-[#00CB93] rounded-[15px] px-[12px] h-[23px] flex items-center text-[10px] text-[#00CB93] font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {program.available && (
                  <span className="bg-[#00CB93] border border-[#00CB93] rounded-[15px] px-[12px] h-[23px] flex items-center text-[10px] text-white font-semibold">
                    신청 가능
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="px-4 pt-2 pb-4 text-[14px] text-[#949494] m-0">
                {program.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      <BottomTabBar />
    </div>
  );
}

export default ProgramLocal;
