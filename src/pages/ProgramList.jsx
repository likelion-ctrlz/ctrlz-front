import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import { CATEGORIES, ACTIVITIES } from "../data/programs";

function ProgramList() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("취미");
  const [activeCategory, setActiveCategory] = useState("전체");
  const [search, setSearch] = useState("");

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      {/* Header */}
      <div className="flex items-center px-5 py-4 bg-white">
        <button
          onClick={() => navigate("/home")}
          className="bg-transparent border-none p-0"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="#222"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="flex-1 text-center text-[17px] font-semibold text-[#00CB93] m-0">
          프로그램
        </h1>
        <div className="w-6" />
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pt-4 pb-[130px] overflow-y-auto">
        {/* Title + Tab toggle row */}
        <div className="flex items-center justify-between mb-1">
          <p className="text-[16px] font-semibold text-black m-0">
            나에게 맞는 취미를 찾아봐요
          </p>
          <div className="flex items-center bg-[#F5F5F5] rounded-full p-[2px]">
            <button
              onClick={() => setActiveTab("취미")}
              className={`px-3 py-1 rounded-full text-[12px] border-none cursor-pointer ${
                activeTab === "취미"
                  ? "bg-[#00CB93] text-white font-semibold"
                  : "bg-transparent text-[#949494]"
              }`}
            >
              취미
            </button>
            <button
              onClick={() => navigate("/programs/local")}
              className="px-3 py-1 rounded-full text-[12px] border-none cursor-pointer bg-transparent text-[#949494]"
            >
              지역연계
            </button>
          </div>
        </div>

        <p className="text-[14px] text-[#949494] mb-4 mt-1">
          관심사와 지금 상태에 맞게 추천해드려요
        </p>

        {/* Search bar */}
        <div className="relative mb-4">
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
            placeholder="활동 검색"
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
        <p className="text-[16px] font-semibold text-black mb-3">추천 활동</p>

        {/* Activity cards */}
        <div className="flex flex-col gap-4">
          {ACTIVITIES.map((activity) => (
            <div
              key={activity.id}
              onClick={() => navigate(`/programs/${activity.id}`)}
              className="rounded-[16px] border border-[#00CB93] overflow-hidden cursor-pointer"
            >
              {/* Image area with gradient overlay */}
              <div className="relative h-[194px] rounded-[14px] m-[15px] overflow-hidden">
                <img src={activity.image} alt={activity.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 rounded-[14px] bg-gradient-to-b from-transparent from-45% to-[#007C57]" />
                <p className="absolute bottom-4 left-4 text-[24px] font-bold text-white m-0">
                  {activity.title}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 px-4 pt-3">
                {activity.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-[#00CB93] rounded-[15px] px-[12px] h-[23px] flex items-center text-[11px] text-[#00CB93]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="px-4 pt-2 pb-4 text-[14px] text-[#949494] m-0">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <BottomTabBar />
    </div>
  );
}

export default ProgramList;
