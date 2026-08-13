import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

function ProgramDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div>
      <Header title="서울 청년기지개 센터" />

      <div className="px-6 pb-6">
        <div className="h-40 bg-gray-100 rounded-xl mb-4" />

        <h2 className="text-lg mb-4">서울 청년기지개 센터</h2>

        <div className="border border-gray-100 rounded-xl p-5 mb-6 text-sm space-y-1 text-gray-700">
          <p>일시: 매주 수요일</p>
          <p>장소: 동탄 2h</p>
          <p>필요 토큰: 100</p>
          <p>안내사항: ~~</p>
        </div>

        <h3 className="text-sm text-gray-500 mb-3">연계 현황</h3>
        <div className="border border-gray-100 rounded-xl p-5 mb-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">
            ✓
          </div>
          <div>
            <p className="text-sm font-medium">신청 완료</p>
            <p className="text-xs text-gray-400">기관 검토 후 개별 연락</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/programs")}
          className="w-full py-4 bg-black text-white rounded-lg text-base"
        >
          신청하기
        </button>
      </div>
    </div>
  );
}

export default ProgramDetail;