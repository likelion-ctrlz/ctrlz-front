import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import chevronLeft from "../assets/icon/chevron-left.png";
import { getDiaryEntries } from "../api/diaryApi";

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

const NOW = new Date();
const TODAY = NOW.getDate();
const DAYS_IN_MONTH = new Date(NOW.getFullYear(), NOW.getMonth() + 1, 0).getDate();
const FIRST_WEEKDAY = new Date(NOW.getFullYear(), NOW.getMonth(), 1).getDay(); // 0=일 ~ 6=토

// 실제 이번 달 달력을 주 단위(일~토)로 묶어서 만듦 — 1일이 항상 실제 요일 자리에 옴
function buildMonthWeeks() {
  const weeks = [];
  let week = new Array(FIRST_WEEKDAY).fill(null);
  for (let day = 1; day <= DAYS_IN_MONTH; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

const monthWeeks = buildMonthWeeks();

const CURRENT_WEEK_INDEX = monthWeeks.findIndex((week) => week.includes(TODAY));
const WEEKS_BEFORE = monthWeeks.slice(0, CURRENT_WEEK_INDEX);
const CURRENT_WEEK = monthWeeks[CURRENT_WEEK_INDEX];
const WEEKS_AFTER = monthWeeks.slice(CURRENT_WEEK_INDEX + 1);

// 한 주(week) 안에서 연속으로 기록된 날짜들을 찾아 [시작 index, 끝 index] 묶음으로 반환
// 연속된 날짜는 하나의 이어진 초록 캡슐로, 혼자 있는 날짜는 그대로 하나짜리 캡슐로 그려짐
function getStreakRuns(week, recordedDays) {
  const runs = [];
  let start = null;
  week.forEach((day, i) => {
    const active = day != null && recordedDays.includes(day);
    if (active) {
      if (start === null) start = i;
    } else if (start !== null) {
      runs.push([start, i - 1]);
      start = null;
    }
  });
  if (start !== null) runs.push([start, week.length - 1]);
  return runs;
}

function WeekRow({ week, recordedDays }) {
  const runs = getStreakRuns(week, recordedDays);

  return (
    <div className="relative grid grid-cols-7 items-center h-[26px] px-[1px]">
      {runs.map(([start, end]) => (
        <div
          key={`${start}-${end}`}
          className="absolute top-0 h-[26px] bg-[rgba(0,203,147,0.45)] rounded-[17px]"
          style={{
            left: `calc(${(start / 7) * 100}% + 8px)`,
            width: `calc(${((end - start + 1) / 7) * 100}% - 16px)`,
          }}
        />
      ))}
      {week.map((day, i) => {
        if (!day) return <span key={i} />;
        const isToday = day === TODAY;
        const isRecorded = recordedDays.includes(day);
        return (
          <span
            key={i}
            className={`relative z-10 justify-self-center w-[31px] h-[26px] rounded-[17px] flex items-center justify-center text-[14px] tracking-[-0.35px] ${
              isToday
                ? "bg-primary text-white font-semibold"
                : isRecorded
                ? "text-primary font-medium"
                : "text-gray-icon font-medium"
            }`}
          >
            {day}
          </span>
        );
      })}
    </div>
  );
}

function Diary() {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [recordedDays, setRecordedDays] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    // 이번 달 전체를 커버할 만큼 넉넉히 가져와서 이번 달에 해당하는 날짜만 뽑음
    getDiaryEntries(DAYS_IN_MONTH)
      .then((entries) => {
        if (cancelled) return;
        const days = entries
          .map((e) => new Date(e.created_at))
          .filter((d) => d.getFullYear() === NOW.getFullYear() && d.getMonth() === NOW.getMonth())
          .map((d) => d.getDate());
        setRecordedDays([...new Set(days)]);
      })
      .catch(() => {
        // 실패해도 캘린더 자체는 보여줘야 하니 조용히 무시(오늘 기록만 못 뜨는 정도)
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">
      {/* Green background */}
      <div
        className={`absolute top-0 left-0 w-full bg-primary transition-all duration-300 ${
          calendarOpen ? "h-[263px]" : "h-[134px]"
        }`}
      />

      {/* Status bar spacer */}

      {/* Header */}
      <header className="relative flex items-center h-[53px] px-5 z-10">
        <button onClick={() => navigate("/home")} className="w-[34px] h-[34px] flex items-center justify-center">
          <img src={chevronLeft} alt="" className="w-[34px] h-[34px] brightness-0 invert" />
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-white tracking-[-0.5px] leading-[44px]">
          일기
        </p>
      </header>

      <main className="flex-1 flex flex-col px-5 pb-[130px] z-10">
        {/* Calendar card */}
        <div
          className="w-full bg-white border border-primary rounded-[16px] mt-[23px] px-5 pt-[13px] transition-all duration-300"
        >
          {/* Day of week header */}
          <div className="grid grid-cols-7 items-center px-[2px]">
            {DAYS.map((day, i) => (
              <span key={i} className="justify-self-center text-[14px] font-medium text-primary tracking-[-0.35px] leading-[25px] w-[20px] text-center">
                {day}
              </span>
            ))}
          </div>

          {/* Separator */}
          <div className="w-full h-[1px] bg-primary mt-[8px] mb-[17px]" />

          {/* 달력 본문 — 이번 주는 항상 보이고, 나머지 주는 아래 바를 누르면
              grid-template-rows(0fr → 1fr) 트릭으로 부드럽게 펼쳐지고 접힘 */}
          <div className="flex flex-col">
            {WEEKS_BEFORE.length > 0 && (
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  calendarOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-[12px] pb-[12px]">
                    {WEEKS_BEFORE.map((week, wi) => (
                      <WeekRow key={`before-${wi}`} week={week} recordedDays={recordedDays} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <WeekRow week={CURRENT_WEEK} recordedDays={recordedDays} />

            {WEEKS_AFTER.length > 0 && (
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  calendarOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-col gap-[12px] pt-[12px]">
                    {WEEKS_AFTER.map((week, wi) => (
                      <WeekRow key={`after-${wi}`} week={week} recordedDays={recordedDays} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Toggle handle */}
          <button
            onClick={() => setCalendarOpen(!calendarOpen)}
            className="w-full flex justify-center pt-[21px] pb-[14px]"
          >
            <div className="w-[90px] h-[2px] bg-primary rounded-full" />
          </button>
        </div>

        {/* Guide text */}
        <h3 className="text-[16px] font-semibold text-black tracking-[-0.4px] leading-[20px] mt-[40px]">
          정확한 감정 분석을 위해
          <br />
          하루에 한번만 일기 기록이 가능해요!
        </h3>
        <p className="text-[14px] font-medium text-gray-muted tracking-[-0.35px] leading-[17px] mt-[11px]">
          오늘 있었던 일, 느꼈던 감정을 저에게 하나도 빠짐없이 다 말해주세요
        </p>

        {/* Action buttons */}
        <div className="flex gap-[15px] mt-[28px]">
          <button
            onClick={() => navigate("/diary/record")}
            className="flex-1 h-[105px] rounded-[16px] bg-white border border-primary px-[14px] pt-[11px] flex items-start text-left"
          >
            <p className="text-[16px] font-bold text-primary tracking-[-0.4px] leading-[30px]">
              녹음으로 기록하기
            </p>
          </button>
          <button
            onClick={() => navigate("/diary/write")}
            className="flex-1 h-[105px] rounded-[16px] bg-white border border-primary px-[14px] pt-[11px] flex items-start text-left"
          >
            <p className="text-[16px] font-bold text-primary tracking-[-0.4px] leading-[30px]">
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
