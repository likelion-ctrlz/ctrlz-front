import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import chevronLeft from "../assets/icon/chevron-left.png";
import { CATEGORIES, LOCAL_PROGRAMS } from "../data/localPrograms";

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
          <img src={chevronLeft} alt="" className="w-[34px] h-[34px]" />
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-primary tracking-[-0.5px] leading-[44px]">
          지역연계 프로그램
        </p>
      </header>

      {/* Content */}
      <main className="flex-1 px-5 pb-[130px] overflow-y-auto">
        {/* Location + Tab toggle */}
        <div className="flex items-center justify-between mb-1 mt-2">
          <div className="flex items-center gap-2">
            <span className="text-[16px]">📍</span>
            <span className="text-[16px] font-semibold text-primary">서울 강동구</span>
          </div>
          <div className="flex items-center bg-gray-100 rounded-full p-[2px]">
            <button className="px-3 py-1 rounded-full text-[12px] border-none cursor-pointer bg-primary text-white font-semibold">
              지역연계
            </button>
            <button
              onClick={() => navigate("/programs")}
              className="px-3 py-1 rounded-full text-[12px] border-none cursor-pointer bg-transparent text-gray-muted"
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
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-muted">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="var(--color-gray-muted)" strokeWidth="2" />
              <path d="M20 20L16.5 16.5" stroke="var(--color-gray-muted)" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="프로그램 검색"
            className="w-full h-[44px] rounded-[15px] border border-primary pl-10 pr-4 text-[14px] outline-none"
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
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-primary border-primary"
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
              className="rounded-[16px] border border-primary overflow-hidden cursor-pointer"
            >
              {/* Image area with gradient */}
              <div className="relative h-[194px] rounded-[14px] m-[15px] overflow-hidden">
                <img src={program.image} alt={program.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-45% to-primary-deep" />
                <p className="absolute bottom-4 left-4 text-[24px] font-bold text-white m-0">
                  {program.title}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 px-4 pt-1">
                {program.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-primary rounded-[15px] px-[12px] h-[23px] flex items-center text-[10px] text-primary font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {program.available && (
                  <span className="bg-primary border border-primary rounded-[15px] px-[12px] h-[23px] flex items-center text-[10px] text-white font-semibold">
                    신청 가능
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="px-4 pt-2 pb-4 text-[14px] text-gray-muted m-0">
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
