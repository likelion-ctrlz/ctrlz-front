import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const RECORDED_DAYS = [13, 14, 15, 18, 19, 20, 22];
const TODAY = 24;

const monthWeeks = [
  [null, null, null, null, null, 1, null],
  [2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20, 21, 22],
  [23, 24, 25, 26, 27, 28, 29],
  [30, 31, null, null, null, null, null],
];

function Diary() {
  const [calendarOpen, setCalendarOpen] = useState(true);
  const navigate = useNavigate();

  const weekDays = [23, 24, 25, 26, 27, 28, 29];

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">
      {/* Green background */}
      <div
        className={`absolute top-0 left-0 w-full bg-[#00CB93] transition-all duration-300 ${
          calendarOpen ? "h-[307px]" : "h-[178px]"
        }`}
      />

      {/* Status bar spacer */}
      <div className="h-[44px]" />

      {/* Header */}
      <header className="relative flex items-center h-[53px] px-5 z-10">
        <button onClick={() => navigate("/home")} className="w-[34px] h-[34px] flex items-center justify-center">
          <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
            <path d="M7 1L1 7.5L7 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-white tracking-[-0.5px] leading-[44px]">
          일기
        </p>
      </header>

      <main className="flex-1 flex flex-col px-5 pb-[130px] z-10">
        {/* Calendar card */}
        <div
          className={`w-full bg-white border border-[#00CB93] rounded-[16px] mt-[6px] px-5 pt-[13px] transition-all duration-300 ${
            calendarOpen ? "pb-[20px]" : "pb-[15px]"
          }`}
        >
          {/* Day of week header */}
          <div className="flex justify-between items-center px-[2px]">
            {DAYS.map((day, i) => (
              <span key={i} className="text-[14px] font-medium text-[#00CB93] tracking-[-0.35px] leading-[25px] w-[20px] text-center">
                {day}
              </span>
            ))}
          </div>

          {/* Separator */}
          <div className="w-full h-[1px] bg-[#F0F0F0] mt-[8px] mb-[12px]" />

          {calendarOpen ? (
            /* Monthly calendar */
            <div className="flex flex-col gap-[12px]">
              {monthWeeks.map((week, wi) => (
                <div key={wi} className="flex justify-between items-center px-[2px]">
                  {week.map((day, di) => {
                    if (!day) return <span key={di} className="w-[31px] h-[26px]" />;
                    const isToday = day === TODAY;
                    const isRecorded = RECORDED_DAYS.includes(day);
                    return (
                      <span
                        key={di}
                        className={`w-[31px] h-[26px] rounded-[17px] flex items-center justify-center text-[14px] tracking-[-0.35px] ${
                          isToday
                            ? "bg-[#00CB93] text-white font-semibold"
                            : isRecorded
                            ? "bg-[rgba(0,203,147,0.45)] text-[#00CB93] font-medium"
                            : "text-[#CACACA] font-medium"
                        }`}
                      >
                        {day}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          ) : (
            /* Weekly calendar */
            <div className="flex justify-between items-center px-[2px]">
              {weekDays.map((day, i) => {
                const isToday = day === TODAY;
                return (
                  <span
                    key={i}
                    className={`w-[31px] h-[26px] rounded-[17px] flex items-center justify-center text-[14px] tracking-[-0.35px] ${
                      isToday
                        ? "bg-[#00CB93] text-white font-semibold"
                        : "text-[#CACACA] font-medium"
                    }`}
                  >
                    {day}
                  </span>
                );
              })}
            </div>
          )}

          {/* Toggle handle */}
          <button
            onClick={() => setCalendarOpen(!calendarOpen)}
            className="w-full flex justify-center pt-[12px]"
          >
            <div className="w-[90px] h-[2px] bg-[#CACACA] rounded-full" />
          </button>
        </div>

        {/* Guide text */}
        <h3 className="text-[16px] font-semibold text-black tracking-[-0.4px] leading-[30px] mt-[24px]">
          오늘 어떤 하루였나요?
        </h3>
        <p className="text-[14px] font-medium text-[#949494] tracking-[-0.35px] leading-[30px]">
          오늘 느낀 감정이나 있었던 일을 자유롭게 표현해주세요
        </p>

        {/* Action buttons */}
        <div className="flex gap-[15px] mt-[20px]">
          <button
            onClick={() => navigate("/diary/record")}
            className="flex-1 h-[105px] rounded-[16px] bg-[#E8FFF8] border border-[#00CB93] px-[14px] pt-[11px] text-left"
          >
            <p className="text-[16px] font-bold text-[#00CB93] tracking-[-0.4px] leading-[30px]">
              녹음으로 기록하기
            </p>
          </button>
          <button
            onClick={() => navigate("/diary/write")}
            className="flex-1 h-[105px] rounded-[16px] bg-[#E8FFF8] border border-[#00CB93] px-[14px] pt-[11px] text-left"
          >
            <p className="text-[16px] font-bold text-[#00CB93] tracking-[-0.4px] leading-[30px]">
              직접 기록하기
            </p>
          </button>
        </div>
      </main>

      <BottomTabBar />
    </div>
  );
}

export default Diary;
