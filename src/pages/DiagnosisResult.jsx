import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function DiagnosisResult() {
  const navigate = useNavigate();

  return (
    <div>
      <Header title="진단 결과" showBack={false} />

      <div className="pt-1 px-6">
        <div className="h-1 bg-black rounded-sm mb-8" />

        <div className="text-center mb-6">
          <span className="inline-block py-2 px-5 bg-black text-white rounded-[20px] text-sm">
            상태 레벨2
          </span>
        </div>

        <div className="border border-[#eee] rounded-xl p-5 mb-8">
          <p className="text-[#999] text-[13px] mb-2">첫 미션 제안</p>
          <h3 className="text-lg mb-3">창문 열고 3분 바람 쐬기</h3>
          <div className="flex gap-2">
            <span className="text-xs bg-[#f2f2f2] py-1 px-2.5 rounded-xl">난이도 하</span>
            <span className="text-xs bg-[#f2f2f2] py-1 px-2.5 rounded-xl">토큰 +10</span>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <button
          onClick={() => navigate("/home")}
          className="w-full p-4 bg-black text-white border-none rounded-[10px] text-base"
        >
          미션 시작하기
        </button>
      </div>
    </div>
  );
}

export default DiagnosisResult;
