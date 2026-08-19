import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { createDiaryEntry } from "../api/diaryApi";

const MAX_LENGTH = 1000;

// 텍스트 기록 시작 화면에서 랜덤으로 보여줄 멘트 (녹음 화면과 톤을 맞춤)
const WRITE_PROMPTS = [
  "오늘 어떤 하루였나요?",
  "힘든 일이 있다면 편하게 적어주세요",
  "지금 고민중인게 있으세요?",
  "오늘 하루 중 조금이라도 편안했던 순간이 있나요?",
];

// 상태: writing | analyzing | done
function DiaryWrite() {
  const [status, setStatus] = useState("writing");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [prompt] = useState(() => WRITE_PROMPTS[Math.floor(Math.random() * WRITE_PROMPTS.length)]);
  const navigate = useNavigate();

  useEffect(() => {
    if (status !== "done") return;
    const timer = setTimeout(() => navigate("/diary"), 1500);
    return () => clearTimeout(timer);
  }, [status, navigate]);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setError("");
    setStatus("analyzing");
    try {
      await createDiaryEntry({ textContent: content.trim() });
      setStatus("done");
    } catch {
      setStatus("writing");
      setError("기록에 실패했어요. 네트워크 상태를 확인하고 다시 시도해주세요.");
    }
  };

  if (status === "done") {
    return (
      <div className="relative flex min-h-dvh flex-col bg-primary">
        <Header title="일기" onBack={() => navigate("/diary")} invert />

        <main className="flex-1 flex flex-col items-center justify-center px-5">
          <h2 className="text-[24px] font-bold text-white text-center leading-normal">기록 완료!</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">
      <Header title="일기" onBack={() => navigate("/diary")} />

      <main className="flex-1 flex flex-col px-5 pb-[40px]">
        <h2 className="text-[20px] font-semibold text-black tracking-[-0.5px] leading-[25px] mt-[24px]">
          {prompt}
        </h2>
        <p className="text-[14px] font-medium text-gray-muted tracking-[-0.35px] leading-[20px] mt-[8px]">
          오늘 있었던 일, 느꼈던 감정을 자유롭게 적어주세요
        </p>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value.slice(0, MAX_LENGTH))}
          placeholder="여기에 적어주세요..."
          disabled={status === "analyzing"}
          className="flex-1 mt-[20px] w-full rounded-[16px] border border-primary px-4 py-3 text-[14px] tracking-[-0.35px] outline-none resize-none placeholder-gray-input disabled:opacity-60"
        />

        <p className="text-[12px] font-medium text-gray-muted tracking-[-0.3px] text-right mt-[8px]">
          {content.length}/{MAX_LENGTH}
        </p>

        {error && (
          <p className="text-[13px] font-medium text-danger tracking-[-0.325px] mt-[8px]">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={!content.trim() || status === "analyzing"}
          className={`w-full h-[68px] rounded-[16px] border text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center mt-[20px] transition-all ${
            content.trim() && status !== "analyzing"
              ? "bg-white border-primary text-primary"
              : "bg-white border-gray-300 text-gray-400"
          }`}
        >
          {status === "analyzing" ? "이야기를 정리하고 있어요..." : "기록 완료하기"}
        </button>
      </main>
    </div>
  );
}

export default DiaryWrite;
