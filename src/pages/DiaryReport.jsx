import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import chevronLeft from "../assets/icon/chevron-left.png";

const PERIODS = ["오늘", "1주일", "1개월", "3개월"];

// 오늘의 감정 추이 차트 — 막대 높이(px)와 강조 문구는 Figma 실측값
const MOOD_BARS = [
  { label: "편안함", color: "primary", height: 60, dashed: true, highlight: "지난 주보다 조금 늘었어요" },
  { label: "설렘", color: "primary", height: 37 },
  { label: "불안", color: "danger", height: 37 },
  { label: "무기력", color: "danger", height: 127, highlight: "오늘 가장 자주 기록됐어요" },
];

const MOOD_HISTORY = [
  { day: "3일 전", label: "편안함", color: "primary", percent: 48 },
  { day: "5일 전", label: "무기력", color: "danger", percent: 55 },
  { day: "7일 전", label: "불안", color: "danger", percent: 38 },
];

function MoodBarChart() {
  return (
    <div className="relative">
      {/* 배경 그리드 */}
      <div
        className="h-[144px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(236,236,236,0.4) 0px, rgba(236,236,236,0.4) 1px, transparent 1px, transparent 24px)",
        }}
      >
        <div className="grid grid-cols-4 items-end h-full">
          {MOOD_BARS.map((bar) => (
            <div key={bar.label} className="flex flex-col items-center justify-end h-full gap-[8px]">
              {bar.highlight && (
                <>
                  <span
                    className={`text-[10px] font-semibold tracking-[-0.25px] whitespace-nowrap ${
                      bar.color === "primary" ? "text-primary" : "text-danger"
                    }`}
                  >
                    {bar.highlight}
                  </span>
                  <span
                    className="w-[12px] h-[12px] rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: bar.color === "primary" ? "#00cb93" : "#ff627e" }}
                  >
                    <span className="w-[6px] h-[6px] rounded-full bg-white" />
                  </span>
                </>
              )}
              <div className="relative w-[35px]" style={{ height: bar.height }}>
                <div
                  className={`absolute inset-0 rounded-t-[10px] ${
                    bar.color === "primary" ? "bg-primary" : "bg-danger"
                  }`}
                />
                {bar.dashed && (
                  <div
                    className="absolute inset-x-0 top-0 rounded-t-[10px] border border-dashed border-primary bg-white/65"
                    style={{ height: "80%" }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 mt-[10px]">
        {MOOD_BARS.map((bar) => (
          <span
            key={bar.label}
            className={`text-center text-[12px] font-semibold tracking-[-0.3px] ${
              bar.color === "primary" ? "text-primary" : "text-danger"
            }`}
          >
            {bar.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function DiaryReport() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState("오늘");

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">
      {/* Header */}
      <header className="relative flex items-center h-[53px] px-5">
        <button onClick={() => navigate("/diary")} className="w-[34px] h-[34px] flex items-center justify-center">
          <img src={chevronLeft} alt="" className="w-[34px] h-[34px]" />
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-primary tracking-[-0.5px] leading-[44px]">
          일기
        </p>
      </header>

      <main className="flex-1 px-5 pb-[130px]">
        {/* 감정 흐름 */}
        <h2 className="text-[16px] font-semibold text-black tracking-[-0.4px] mt-[35px]">
          사용자님의 감정 흐름
        </h2>
        <p className="text-[14px] font-medium text-gray-muted tracking-[-0.35px] mt-[2px]">
          기록된 대화를 바탕으로 감정 변화를 살펴 볼 수 있어요
        </p>

        {/* 기간 선택 칩 */}
        <div className="flex gap-[8px] mt-[15px]">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`h-[30px] px-[19px] flex items-center justify-center rounded-[15px] text-[12px] tracking-[-0.3px] border border-primary whitespace-nowrap ${
                period === p
                  ? "bg-primary text-white font-semibold"
                  : "bg-[rgba(255,255,255,0.1)] text-primary font-medium"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* 오늘의 감정 추이 차트 */}
        <h2 className="text-[16px] font-semibold text-black tracking-[-0.4px] mt-[32px] mb-[19px]">
          오늘의 감정 추이 차트
        </h2>
        <MoodBarChart />

        {/* 오늘의 감정 요약 */}
        <h2 className="text-[16px] font-semibold text-black tracking-[-0.4px] mt-[38px] mb-3">
          오늘의 감정 요약
        </h2>
        <div className="bg-[rgba(184,184,184,0.08)] rounded-[16px] p-4">
          <p className="text-[12px] text-gray-icon tracking-[-0.3px] mb-3">2026년 8월 24일 월요일</p>
          <div className="space-y-2">
            <p className="text-[14px] text-danger tracking-[-0.35px]">{'✓ 가장 자주 기록된 감정은 "무기력"이에요'}</p>
            <p className="text-[14px] text-primary tracking-[-0.35px]">✓ 지난 주보다 편안함이 조금 늘었어요</p>
            <p className="text-[14px] text-primary tracking-[-0.35px]">✓ 꾸준히 기록한 것만으로도 충분히 잘하고 있어요</p>
          </div>
        </div>

        {/* 나의 감정 돌아보기 */}
        <h2 className="text-[16px] font-semibold text-black tracking-[-0.4px] mt-[27px] mb-3">
          나의 감정 돌아보기
        </h2>
        <div className="border border-[rgba(170,238,219,0.87)] bg-mint-pale2 rounded-[16px] p-5 space-y-5">
          {MOOD_HISTORY.map((item) => (
            <div key={item.day}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] text-gray-icon tracking-[-0.3px]">{item.day}</span>
                <span
                  className={`text-[12px] font-semibold tracking-[-0.3px] ${
                    item.color === "primary" ? "text-primary" : "text-danger"
                  }`}
                >
                  {item.label}
                </span>
              </div>
              <div
                className={`w-full h-[8px] rounded-full ${
                  item.color === "primary" ? "bg-primary-sub4" : "bg-danger/20"
                }`}
              >
                <div
                  className={`h-full rounded-full ${item.color === "primary" ? "bg-primary" : "bg-danger"}`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 반복되는 감정 패턴 */}
        <h2 className="text-[16px] font-semibold text-black tracking-[-0.4px] mt-[38px] mb-3">
          반복되는 감정 패턴
        </h2>
        <div className="space-y-2 mb-[35px]">
          <p className="text-[16px] font-semibold text-gray-muted tracking-[-0.4px]">
            무기력함이 주로 저녁 시간대에 많이 기록 됐어요
          </p>
          <p className="text-[16px] font-semibold text-gray-muted tracking-[-0.4px]">
            이 패턴을 알아챘다는 것 자체가 변화의 시작이에요
          </p>
        </div>

        {/* 도움 요청하기 */}
        <button
          onClick={() => navigate("/diary/help")}
          className="w-full h-[89px] border border-[rgba(170,238,219,0.87)] bg-mint-pale2 rounded-[16px] px-5 flex items-center text-left"
        >
          <p className="text-[16px] font-semibold text-primary tracking-[-0.4px]">도움 요청하기</p>
        </button>
      </main>

      <BottomTabBar />
    </div>
  );
}

export default DiaryReport;
