import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import micIcon from "../assets/mic.png";
import ellipse446 from "../assets/diary/ellipse-446.svg";
import ellipse444 from "../assets/diary/ellipse-444.svg";
import ellipse443 from "../assets/diary/ellipse-443.svg";
import ellipse445 from "../assets/diary/ellipse-445.svg";
import ellipse442 from "../assets/diary/ellipse-442.svg";
import { createDiaryEntry } from "../api/diaryApi";

const BG_STYLE = {
  backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 402 874' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(7.9137e-15 42.4 -42.4 7.3313e-15 201 386)'><stop stop-color='rgba(0,203,147,1)' offset='0'/><stop stop-color='rgba(12,206,152,1)' offset='0.0625'/><stop stop-color='rgba(25,208,158,1)' offset='0.125'/><stop stop-color='rgba(50,213,168,1)' offset='0.25'/><stop stop-color='rgba(74,218,179,1)' offset='0.375'/><stop stop-color='rgba(99,223,189,1)' offset='0.5'/><stop stop-color='rgba(149,233,210,1)' offset='0.75'/><stop stop-color='rgba(198,243,231,1)' offset='1'/></radialGradient></defs></svg>")`,
  backgroundSize: "cover",
};

// 기록 완료 화면은 방사형 그라데이션 반경이 더 커서(71.25) 초록이 화면 전체에 훨씬 진하게 깔림
const BG_STYLE_COMPLETE = {
  backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 402 874' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-0.0000050545 71.25 -71.25 -0.0000050545 201 386)'><stop stop-color='rgba(0,203,147,1)' offset='0'/><stop stop-color='rgba(12,206,152,1)' offset='0.0625'/><stop stop-color='rgba(25,208,158,1)' offset='0.125'/><stop stop-color='rgba(50,213,168,1)' offset='0.25'/><stop stop-color='rgba(74,218,179,1)' offset='0.375'/><stop stop-color='rgba(99,223,189,1)' offset='0.5'/><stop stop-color='rgba(149,233,210,1)' offset='0.75'/><stop stop-color='rgba(198,243,231,1)' offset='1'/></radialGradient></defs></svg>")`,
  backgroundSize: "cover",
};

// 마이크를 둘러싼 겹동그라미 — Figma 원본 링 이미지를 그대로 동심원으로 겹쳐 그림
// pulsing이면(녹음 중) 마이크 크기에서 시작해 바깥으로 퍼지며 옅어지는 파동 링을 추가로 겹침
function PulseRings({ children, pulsing = false }) {
  return (
    <div className="relative w-[335px] h-[335px] flex items-center justify-center">
      <img src={ellipse446} alt="" className="absolute inset-0 m-auto w-[335px] h-[335px]" />
      <img src={ellipse444} alt="" className="absolute inset-0 m-auto w-[250px] h-[250px]" />
      <img src={ellipse443} alt="" className="absolute inset-0 m-auto w-[211px] h-[211px]" />
      <img src={ellipse445} alt="" className="absolute inset-0 m-auto w-[175px] h-[180px]" />
      {pulsing && (
        <>
          <div className="absolute inset-0 m-auto w-[161px] h-[161px] rounded-full border-2 border-white/70 animate-[ripple_2s_ease-out_infinite]" />
          <div className="absolute inset-0 m-auto w-[161px] h-[161px] rounded-full border-2 border-white/70 animate-[ripple_2s_ease-out_infinite] [animation-delay:1s]" />
        </>
      )}
      {children}
    </div>
  );
}

// 녹음 시작 화면에서 랜덤으로 보여줄 멘트
const RECORD_PROMPTS = [
  "오늘 어떤 하루였나요?",
  "힘든 일이 있다면\n저한테 편하게 말해주세요",
  "지금 고민중인게 있으세요?",
  "좋은 하루예요! 사용자님에게\n오늘 재밌는 일이 있었나요?",
  "오늘 하루 중 조금이라도\n편안했던 순간이 있나요?",
];

// 녹음 상태: idle | recording | analyzing | done
function DiaryRecord() {
  const [status, setStatus] = useState("idle");
  const [seconds, setSeconds] = useState(0);
  const [micReady, setMicReady] = useState(false);
  const [error, setError] = useState("");
  const [prompt] = useState(
    () => RECORD_PROMPTS[Math.floor(Math.random() * RECORD_PROMPTS.length)]
  );
  // 멘트가 길면 한 줄로는 다 안 보여서 아래 작은 안내 문구를 빼고 멘트 자체가 줄바꿈되게 함
  const isLongPrompt = prompt.length > 15;
  const navigate = useNavigate();

  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);

  // 페이지 진입 시 마이크 권한을 미리 받아둬서, 시작 버튼을 누르면 바로 녹음이 시작되게 함
  useEffect(() => {
    let cancelled = false;
    navigator.mediaDevices
      ?.getUserMedia({ audio: true })
      .then((stream) => {
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamRef.current = stream;
        setMicReady(true);
      })
      .catch(() => {
        if (!cancelled) setError("마이크 권한을 허용한 뒤 다시 시도해주세요.");
      });

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // 녹음 타이머
  useEffect(() => {
    if (status !== "recording") return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [status]);

  // 기록 완료 화면을 잠깐 보여준 뒤 일기 캘린더로 돌아감 — 질문은 하루에 하나뿐이라 더 진행할 게 없음
  useEffect(() => {
    if (status !== "done") return;
    const timer = setTimeout(() => navigate("/diary"), 1800);
    return () => clearTimeout(timer);
  }, [status, navigate]);

  const handleStart = () => {
    if (!streamRef.current) return;
    setError("");
    chunksRef.current = [];

    const recorder = new MediaRecorder(streamRef.current);
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    recorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
      setStatus("analyzing");
      try {
        await createDiaryEntry({ audio: new File([blob], "diary.webm", { type: blob.type }) });
        setStatus("done");
      } catch {
        setStatus("idle");
        setSeconds(0);
        setError("기록에 실패했어요. 네트워크 상태를 확인하고 다시 시도해주세요.");
      }
    };

    recorderRef.current = recorder;
    recorder.start();
    setSeconds(0);
    setStatus("recording");
  };

  const handleStop = () => {
    recorderRef.current?.stop();
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  // 분석 완료 — 기록 완료 화면 (하루에 질문은 하나뿐이라 바로 완료 처리)
  if (status === "done") {
    return (
      <div className="relative flex min-h-dvh flex-col" style={BG_STYLE_COMPLETE}>
        <Header title="일기" onBack={() => navigate("/diary")} invert />

        <main className="flex-1 flex flex-col items-center justify-center px-5 z-10">
          <h2 className="text-[24px] font-bold text-white text-center leading-normal mb-[60px]">
            기록 완료!
          </h2>

          <PulseRings>
            <img src={ellipse442} alt="" className="absolute inset-0 m-auto w-[161px] h-[161px]" />
            <img src={micIcon} alt="" className="relative w-[56px] h-[92px] object-contain" />
          </PulseRings>
        </main>

        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-[100px]" />
      </div>
    );
  }

  // 녹음 중 / 분석 중 / 대기
  return (
    <div className="relative flex min-h-dvh flex-col" style={BG_STYLE}>
      <Header title="일기" onBack={() => navigate("/diary")} invert />

      <main className="flex-1 flex flex-col items-center justify-center px-5 z-10">
        {/* 상태 텍스트 */}
        {status === "idle" && (
          <>
            <h2
              className={`text-[24px] font-bold text-white text-center leading-normal whitespace-pre-line ${
                isLongPrompt ? "mb-[60px]" : "mb-[12px]"
              }`}
            >
              {prompt}
            </h2>
            {!isLongPrompt && (
              <p className="text-[14px] font-medium text-primary-sub4 text-center leading-normal mb-[60px]">
                오늘 하루에 대한 생각을 자유롭게 말해주세요
              </p>
            )}
          </>
        )}
        {status === "recording" && (
          <p className="text-[18px] font-medium text-white text-center mb-[60px]">
            듣고 있어요...<br/>
            <span className="text-[14px] text-primary-sub4">{formatTime(seconds)}</span>
          </p>
        )}
        {status === "analyzing" && (
          <p className="text-[18px] font-medium text-white text-center mb-[60px]">
            이야기를 정리하고 있어요...
          </p>
        )}

        <PulseRings pulsing={status === "recording"}>
          {/* 중앙 버튼 */}
          <button
            onClick={status === "idle" ? handleStart : status === "recording" ? handleStop : undefined}
            disabled={status === "idle" && !micReady}
            className="absolute inset-0 m-auto w-[161px] h-[161px] rounded-full flex items-center justify-center disabled:opacity-40"
          >
            {status === "recording" ? (
              <>
                <div className="absolute inset-0 rounded-full bg-white" />
                {/* 정지 아이콘 */}
                <div className="relative w-[36px] h-[36px] bg-primary rounded-[6px]" />
              </>
            ) : (
              <>
                <img src={ellipse442} alt="" className="absolute inset-0 w-full h-full" />
                {/* 마이크 아이콘 */}
                <img
                  src={micIcon}
                  alt=""
                  className={`relative w-[56px] h-[92px] object-contain ${status === "analyzing" ? "opacity-50" : ""}`}
                />
              </>
            )}
          </button>
        </PulseRings>

        {error && (
          <p className="text-[13px] font-medium text-white text-center mt-[20px] px-5">{error}</p>
        )}
      </main>

      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-[100px]" />
    </div>
  );
}

export default DiaryRecord;
