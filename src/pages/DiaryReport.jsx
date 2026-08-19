import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import Header from "../components/Header";
import { getDiarySummary } from "../api/diaryApi";

const PERIODS = [
  { label: "오늘", days: 1 },
  { label: "1주일", days: 7 },
  { label: "1개월", days: 30 },
  { label: "3개월", days: 90 },
];

// 감정 라벨 4종 고정 — 백엔드/AI 파트가 이 순서·색상 매핑으로 고정함 (편안함·설렘=긍정/초록, 불안·무기력=주의/빨강)
const EMOTION_BARS = [
  { label: "편안함", color: "primary" },
  { label: "설렘", color: "primary" },
  { label: "불안", color: "danger" },
  { label: "무기력", color: "danger" },
];

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function formatKoreanDate(date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${WEEKDAYS[date.getDay()]}요일`;
}

function MoodBarChart({ percentages, mostFrequent }) {
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
          {EMOTION_BARS.map((bar) => {
            const percent = percentages[bar.label] || 0;
            const height = percent > 0 ? Math.max(8, (percent / 100) * 140) : 4;
            const isHighlight = bar.label === mostFrequent;
            return (
              <div key={bar.label} className="flex flex-col items-center justify-end h-full gap-[8px]">
                {isHighlight && (
                  <>
                    <span
                      className={`text-[10px] font-semibold tracking-[-0.25px] whitespace-nowrap ${
                        bar.color === "primary" ? "text-primary" : "text-danger"
                      }`}
                    >
                      가장 자주 기록됐어요
                    </span>
                    <span
                      className="w-[12px] h-[12px] rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: bar.color === "primary" ? "#00cb93" : "#ff627e" }}
                    >
                      <span className="w-[6px] h-[6px] rounded-full bg-white" />
                    </span>
                  </>
                )}
                <div className="relative w-[35px]" style={{ height }}>
                  <div
                    className={`absolute inset-0 rounded-t-[10px] ${
                      bar.color === "primary" ? "bg-primary" : "bg-danger"
                    } ${percent === 0 ? "opacity-30" : ""}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-4 mt-[10px]">
        {EMOTION_BARS.map((bar) => (
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

const EMOTION_COLOR = { 편안함: "primary", 설렘: "primary", 불안: "danger", 무기력: "danger" };

function DiaryReport() {
  const navigate = useNavigate();
  const { state } = useLocation();
  // 달력에서 특정 날짜를 눌러 들어온 경우 "오늘" 기준으로, 그 외(예: 바텀탭 등)에는 "1주일" 기본
  const [period, setPeriod] = useState(state?.date ? PERIODS[0] : PERIODS[1]);
  const [summary, setSummary] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | error | done

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    getDiarySummary(period.days)
      .then((data) => {
        if (cancelled) return;
        setSummary(data);
        setStatus("done");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [period]);

  const recentTrend = summary ? [...summary.emotion_trend].reverse() : [];

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">
      <Header title="일기" onBack={() => navigate("/diary")} />

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
              key={p.label}
              onClick={() => setPeriod(p)}
              className={`h-[30px] px-[19px] flex items-center justify-center rounded-[15px] text-[12px] tracking-[-0.3px] border border-primary whitespace-nowrap ${
                period.label === p.label
                  ? "bg-primary text-white font-semibold"
                  : "bg-[rgba(255,255,255,0.1)] text-primary font-medium"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {status === "loading" && (
          <p className="text-[14px] text-gray-muted text-center mt-10">불러오는 중이에요...</p>
        )}
        {status === "error" && (
          <p className="text-[14px] text-gray-muted text-center mt-10">
            감정 리포트를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
          </p>
        )}

        {status === "done" && summary && (
          <>
            {/* 감정 추이 차트 */}
            <h2 className="text-[16px] font-semibold text-black tracking-[-0.4px] mt-[32px] mb-[19px]">
              {period.label} 감정 추이 차트
            </h2>
            <MoodBarChart
              percentages={summary.emotion_percentages}
              mostFrequent={summary.most_frequent_emotion}
            />

            {/* 감정 요약 */}
            <h2 className="text-[16px] font-semibold text-black tracking-[-0.4px] mt-[38px] mb-3">
              감정 요약
            </h2>
            <div className="bg-[rgba(184,184,184,0.08)] rounded-[16px] p-4">
              <p className="text-[12px] text-gray-icon tracking-[-0.3px] mb-3">
                {formatKoreanDate(new Date())}
              </p>
              <div className="space-y-2">
                {summary.most_frequent_emotion ? (
                  <p
                    className={`text-[14px] tracking-[-0.35px] ${
                      EMOTION_COLOR[summary.most_frequent_emotion] === "danger" ? "text-danger" : "text-primary"
                    }`}
                  >
                    {`✓ 가장 자주 기록된 감정은 "${summary.most_frequent_emotion}"이에요`}
                  </p>
                ) : (
                  <p className="text-[14px] text-gray-muted tracking-[-0.35px]">
                    ✓ 이 기간에는 기록된 일기가 없어요
                  </p>
                )}
                {summary.ai_summary && (
                  <p className="text-[14px] text-primary tracking-[-0.35px]">✓ {summary.ai_summary}</p>
                )}
                {summary.most_frequent_emotion && (
                  <p className="text-[14px] text-primary tracking-[-0.35px]">
                    ✓ 꾸준히 기록한 것만으로도 충분히 잘하고 있어요
                  </p>
                )}
              </div>
            </div>

            {/* 나의 감정 돌아보기 */}
            {recentTrend.length > 0 && (
              <>
                <h2 className="text-[16px] font-semibold text-black tracking-[-0.4px] mt-[27px] mb-3">
                  나의 감정 돌아보기
                </h2>
                <div className="border border-[rgba(170,238,219,0.87)] bg-mint-pale2 rounded-[16px] p-5 space-y-5">
                  {recentTrend.slice(0, 5).map((item, i) => {
                    const color = EMOTION_COLOR[item.primary] || "primary";
                    return (
                      <div key={`${item.date}-${i}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[12px] text-gray-icon tracking-[-0.3px]">{item.date}</span>
                          <span
                            className={`text-[12px] font-semibold tracking-[-0.3px] ${
                              color === "primary" ? "text-primary" : "text-danger"
                            }`}
                          >
                            {item.primary}
                          </span>
                        </div>
                        <div className={`w-full h-[8px] rounded-full ${color === "primary" ? "bg-primary-sub4" : "bg-danger/20"}`}>
                          <div className={`h-full w-full rounded-full ${color === "primary" ? "bg-primary" : "bg-danger"}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* 반복되는 감정 패턴 */}
            <h2 className="text-[16px] font-semibold text-black tracking-[-0.4px] mt-[38px] mb-3">
              반복되는 감정 패턴
            </h2>
            <div className="space-y-2 mb-[35px]">
              {summary.pattern ? (
                <>
                  <p className="text-[16px] font-semibold text-gray-muted tracking-[-0.4px]">
                    {summary.pattern.pattern_text}
                  </p>
                  <p className="text-[16px] font-semibold text-gray-muted tracking-[-0.4px]">
                    이 패턴을 알아챘다는 것 자체가 변화의 시작이에요
                  </p>
                </>
              ) : (
                <p className="text-[16px] font-semibold text-gray-muted tracking-[-0.4px]">
                  아직 패턴을 알아보기엔 기록이 부족해요. 조금 더 기록해봐요
                </p>
              )}
            </div>
          </>
        )}

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
