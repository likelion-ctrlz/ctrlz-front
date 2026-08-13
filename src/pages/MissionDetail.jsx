import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

function MissionDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div>
      <Header title="미션 상세" />

      <div className="px-6 pb-6">
        <div className="h-[180px] bg-[#f2f2f2] rounded-xl mb-4" />

        <h2 className="text-[19px] mb-2.5">근처 공원 다녀오기</h2>
        <div className="flex gap-2 mb-4">
          <span className="text-xs bg-[#f2f2f2] py-1 px-2.5 rounded-xl">난이도 중</span>
          <span className="text-xs bg-[#f2f2f2] py-1 px-2.5 rounded-xl">토큰 +20</span>
        </div>

        <div className="bg-[#fafafa] rounded-[10px] p-5 mb-6 min-h-[100px]">
          <p className="text-[13px] text-[#999]">실시간으로 인증하고있다고 안내</p>
          <p className="text-sm mt-2">근처 공원 산책이 얼마나 도움이 되는지 설명</p>
        </div>

        <button
          onClick={() => navigate(`/missions/${id}/verify`)}
          className="w-full p-4 bg-black text-white border-none rounded-[10px] text-base"
        >
          미션 시작하기
        </button>
      </div>
    </div>
  );
}

export default MissionDetail;
