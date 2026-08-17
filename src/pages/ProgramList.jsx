import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import chevronLeft from "../assets/icon/chevron-left.png";
import { CATEGORIES, ACTIVITIES } from "../data/programs";
import searchIcon from "../assets/program/Group 246.svg";

function ProgramList() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("전체");
  const [search, setSearch] = useState("");

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      {/* Header */}
      <header className="relative flex items-center h-[53px] px-5">
        <button onClick={() => navigate("/home")} className="w-[34px] h-[34px] flex items-center justify-center">
          <img src={chevronLeft} alt="" className="w-[34px] h-[34px]" />
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-primary tracking-[-0.5px] leading-[44px]">
          취미 프로그램
        </p>
      </header>

      {/* Content */}
      <main className="flex-1 px-5 pb-[130px] overflow-y-auto">
        {/* Headline + Tab toggle row */}
        <div className="flex items-start justify-between mt-2">
          <p className="text-[16px] font-semibold text-black leading-[25px] tracking-[-0.4px] m-0">
            미션을 통해 얻은 토큰으로
            <br />
            원하는 취미 프로그램을 신청해봐요!
          </p>
          <div className="flex items-center gap-2 shrink-0 mt-1">
            <span className="bg-primary text-white text-[12px] font-semibold tracking-[-0.3px] rounded-full px-3 py-1">
              취미
            </span>
            <button
              onClick={() => navigate("/programs/local")}
              className="text-gray-icon text-[12px] font-medium tracking-[-0.3px] bg-transparent border-none cursor-pointer"
            >
              지역연계
            </button>
          </div>
        </div>

        <p className="text-[14px] text-gray-muted tracking-[-0.35px] mt-2 mb-4">
          관심사와 지금 상태에 맞게 추천해드려요
        </p>

        {/* Search bar */}
        <div className="relative mb-4">
          <div className="absolute left-[12px] top-1/2 -translate-y-1/2">
            <img src={searchIcon} alt="" className="w-[16px] h-[16px]" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="활동 검색"
            className="w-[382px] max-w-full h-[39px] rounded-[15px] border border-[#00CB93] bg-[rgba(255,255,255,0.1)] pl-[36px] pr-4 text-[14px] outline-none"
          />
        </div>

        {/* Category chips */}
        <div className="flex gap-[6px] mb-5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`w-[57px] h-[30px] rounded-[15px] text-[12px] tracking-[-0.3px] border border-primary cursor-pointer whitespace-nowrap ${
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
        <p className="text-[16px] font-semibold text-black mb-3">추천 활동</p>

        {/* Activity cards */}
        <div className="flex flex-col gap-4">
          {ACTIVITIES.map((activity) => (
            <div
              key={activity.id}
              onClick={() => navigate(`/programs/${activity.id}`)}
              className="rounded-[16px] border border-primary bg-[rgba(255,255,255,0.76)] cursor-pointer pb-[20px]"
            >
              {/* Image area with gradient overlay */}
              <div className="relative h-[194px] rounded-[14px] mx-4 mt-[16px] overflow-hidden">
                <img src={activity.image} alt={activity.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 rounded-[14px] bg-gradient-to-b from-[#FFFFFF00] to-[#007C57]" />
                <p className="absolute bottom-4 left-4 text-[24px] font-bold text-white m-0">
                  {activity.title}
                </p>
              </div>

              {/* Tags — 이미지 아래에 배치 */}
              <div className="flex flex-wrap gap-[6px] px-4 mt-[14px]">
                {activity.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[rgba(255,255,255,0.1)] border border-primary rounded-[15px] px-[14px] h-[23px] flex items-center text-[10px] text-primary tracking-[-0.25px] whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="px-4 mt-[12px] text-[14px] text-gray-muted tracking-[-0.35px] m-0">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      <BottomTabBar />
    </div>
  );
}

export default ProgramList;
