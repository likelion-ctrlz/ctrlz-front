import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import PrimaryButton from "../components/PrimaryButton";

function DiagnosisResult() {
  const navigate = useNavigate();

  return (
    <Layout title="진단 결과" showBack={false} showTabBar={false}>
      <div>
        <div className="h-1 bg-black rounded-full mb-8" />

        <div className="text-center mb-6">
          <span className="inline-block px-5 py-2 bg-black text-white rounded-full text-sm">
            상태 레벨2
          </span>
        </div>

        <div className="border border-gray-100 rounded-xl p-5 mb-8">
          <p className="text-xs text-gray-400 mb-2">첫 미션 제안</p>
          <h3 className="text-lg mb-3">창문 열고 3분 바람 쐬기</h3>
          <div className="flex gap-2">
            <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-full">난이도 하</span>
            <span className="text-xs bg-gray-100 px-2.5 py-1 rounded-full">토큰 +10</span>
          </div>
        </div>
      </div>

      <div>
        <PrimaryButton text="미션 시작하기" onClick={() => navigate("/home")} />
      </div>
    </Layout>
  );
}

export default DiagnosisResult;
