import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import PrimaryButton from "../components/PrimaryButton";

function MissionDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Layout title="미션 상세" showTabBar={false}>
      <div>
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

        <PrimaryButton
          text="미션 시작하기"
          onClick={() => navigate(`/missions/${id}/verify`)}
        />
      </div>
    </Layout>
  );
}

export default MissionDetail;
