import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import ProgramTabToggle from "../components/ProgramTabToggle";
import chevronLeft from "../assets/icon/chevron-left.png";
import { CATEGORIES, LOCAL_PROGRAMS } from "../data/localPrograms";
import searchIcon from "../assets/program/Group 246.svg";
import locateIcon from "../assets/program/locate.png";

function ProgramLocal() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("전체");
  const [search, setSearch] = useState("");

  return (
    <div className="flex min-h-dvh flex-col bg-white">
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
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-[15px]">
            <img src={locateIcon} alt="" className="w-[21px] h-[26px]" />
            <span className="text-[16px] font-semibold text-primary underline decoration-primary underline-offset-4">
              서울 강동구
            </span>
          </div>
          <ProgramTabToggle active="local" />
        </div>

        <p className="text-[16px] font-semibold text-black mt-3 mb-1">
          내 근처 지역 프로그램을 찾아봐요
        </p>

        {/* Search bar */}
        <div className="relative my-4">
          <div className="absolute left-[12px] top-1/2 -translate-y-1/2">
            <img src={searchIcon} alt="" className="w-[16px] h-[16px]" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="프로그램 검색"
            className="w-full h-[39px] rounded-[15px] border border-[#00CB93] bg-[rgba(255,255,255,0.1)] pl-[36px] pr-4 text-[14px] outline-none"
          />
        </div>

        {/* Category chips */}
        <div className="flex gap-[6px] mb-5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`w-[57px] h-[30px] flex items-center justify-center rounded-[15px] text-[12px] tracking-[-0.3px] border border-primary cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-primary text-white font-semibold"
                  : "bg-[rgba(255,255,255,0.1)] text-primary font-medium"
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
              className="rounded-[16px] border border-primary bg-[rgba(255,255,255,0.76)] cursor-pointer pb-[20px]"
            >
              {/* Image area with gradient */}
              <div className="relative h-[194px] rounded-[14px] mx-4 mt-[16px] overflow-hidden">
                <img src={program.image} alt={program.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 rounded-[14px] bg-gradient-to-b from-[#FFFFFF00] to-[#007C57]" />
                <p className="absolute bottom-4 left-4 text-[24px] font-bold text-white m-0">
                  {program.title}
                </p>
              </div>

              {/* Tags — 이미지 아래에 배치 */}
              <div className="flex flex-wrap gap-[6px] px-4 mt-[14px]">
                {program.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[rgba(255,255,255,0.1)] border border-primary rounded-[15px] px-[14px] h-[23px] flex items-center text-[10px] text-primary tracking-[-0.25px] whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
                {program.available && (
                  <span className="bg-primary border border-primary rounded-[15px] px-[14px] h-[23px] flex items-center text-[10px] text-white font-semibold whitespace-nowrap">
                    신청 가능
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="px-4 mt-[12px] text-[14px] text-gray-muted tracking-[-0.35px] m-0">
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
