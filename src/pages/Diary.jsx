import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import PrimaryButton from "../components/PrimaryButton";

function Diary() {
  const [mode, setMode] = useState("음성");
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, ". ");

  return (
    <Layout title="말하는 일기장">
      <div>
        <p className="text-sm text-gray-400 mb-4">{today}</p>

        <div className="flex bg-gray-100 rounded-full p-1 mb-10">
          {["음성", "텍스트"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2 rounded-full text-sm transition ${
                mode === m ? "bg-black text-white" : "text-gray-500"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {mode === "음성" ? (
          <div className="flex flex-col items-center mb-16">
            <div className="w-32 h-32 rounded-full bg-black text-white flex items-center justify-center text-2xl mb-6">
              ●
            </div>
            <div className="flex gap-1 mb-4">
              {[8, 20, 28, 24, 14, 22, 10].map((h, i) => (
                <div key={i} className="w-1 bg-gray-300 rounded" style={{ height: h }} />
              ))}
            </div>
            <p className="text-sm text-gray-500">오늘의 하루는 어땠나요? 편하게 말해보세요</p>
          </div>
        ) : (
          <textarea
            className="w-full h-48 border border-gray-200 rounded-xl p-4 text-sm mb-16 resize-none"
            placeholder="오늘의 하루는 어땠나요? 편하게 적어보세요"
          />
        )}

        <PrimaryButton text="기록 완료" onClick={() => navigate("/diary/report")} />
      </div>
    </Layout>
  );
}

export default Diary;
