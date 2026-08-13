import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

function MissionDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div>
      <Header title="미션 상세" />

      <div className="px-6 pb-6">
        <div className="h-44 bg-gray-100 rounded-xl mb-4" />

        <h2 className="text-lg mb-3">근처 공원 다녀오기</h2>
        <div className="flex gap-2 mb-6">
          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">난이도 중</span>
          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">토큰 +20</span>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 mb-6 min-h-[100px]">
          <p className="text-xs text-gray-400">실시간으로 인증하고있다고 안내</p>
          <p className="text-sm mt-2">근처 공원 산책이 얼마나 도움이 되는지 설명</p>
        </div>

        <button
          onClick={() => navigate(`/missions/${id}/verify`)}
          className="w-full py-4 bg-black text-white rounded-lg text-base"
        >
          미션 시작하기
        </button>
      </div>
    </div>
  );
}

export default MissionDetail;