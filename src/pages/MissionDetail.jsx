import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

function HobbyDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div>
      <Header title="한붓 그리기" />

      <div className="px-6 pb-6">
        <div className="h-40 bg-gray-100 rounded-xl mb-4" />

        <h2 className="text-lg mb-3">한붓 그리기</h2>
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 w-14">난이도</span>
            <div className="h-2 flex-1 bg-gray-100 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 w-14">소요시간</span>
            <div className="h-2 flex-1 bg-gray-100 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 w-14">만족도</span>
            <div className="h-2 flex-1 bg-gray-100 rounded" />
          </div>
        </div>

        <div className="border border-gray-100 rounded-xl p-5 mb-6 text-sm space-y-1 text-gray-700">
          <p>일시: 매주 수요일</p>
          <p>장소: 동탄 2h</p>
          <p>필요 토큰: 100</p>
          <p>안내사항: ~~</p>
        </div>

        <button
          onClick={() => navigate("/hobbies")}
          className="w-full py-4 bg-black text-white rounded-lg text-base"
        >
          미션 시작하기
        </button>
      </div>
    </div>
  );
}

export default HobbyDetail;

