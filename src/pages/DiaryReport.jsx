import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const TAGS = ["약간의 긴장", "평온", "무기력"];
const BARS = [50, 70, 90, 85, 60, 40, 55];

function DiaryReport() {
  const navigate = useNavigate();

  return (
    <div className="px-6 pb-6">
      <Header title="말하는 일기장" />

      <div className="pt-4">
        <p className="text-sm text-gray-400 mb-2">AI요약</p>
        <div className="border border-gray-200 rounded-xl p-4 mb-8 space-y-2">
          <div className="h-2 bg-gray-100 rounded w-full" />
          <div className="h-2 bg-gray-100 rounded w-full" />
          <div className="h-2 bg-gray-100 rounded w-2/3" />
        </div>

        <h3 className="text-base mb-3">최근 7일 감정 추이</h3>
        <div className="flex gap-2 mb-4">
          {TAGS.map((tag) => (
            <span key={tag} className="text-xs border border-gray-200 rounded-full px-3 py-1">
              {tag}
            </span>
          ))}
        </div>

        <div className="border border-gray-200 rounded-xl p-4 mb-2">
          <div className="flex items-end gap-2 h-24">
            {BARS.map((h, i) => (
              <div key={i} className="flex-1 bg-gray-300 rounded-t" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-400 mb-8">기분이 오락가락해요</p>

        <button
          onClick={() => navigate("/diary")}
          className="w-full py-4 bg-black text-white rounded-lg text-base"
        >
          저장하기
        </button>
      </div>
    </div>
  );
}

export default DiaryReport;