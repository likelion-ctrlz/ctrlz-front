import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";

function MissionVerify() {
  const navigate = useNavigate();

  return (
    <div>
      <Header title="미션 상세" />

      <div className="px-6 pt-2">
        <div className="relative h-80 bg-neutral-900 rounded-xl mb-5 flex items-center justify-center">
          <div className="absolute top-4 left-4 w-7 h-7 border-t-[3px] border-l-[3px] border-white" />
          <div className="absolute top-4 right-4 w-7 h-7 border-t-[3px] border-r-[3px] border-white" />
          <div className="absolute bottom-4 left-4 w-7 h-7 border-b-[3px] border-l-[3px] border-white" />
          <div className="absolute bottom-4 right-4 w-7 h-7 border-b-[3px] border-r-[3px] border-white" />

          <div className="w-16 h-16 rounded-full border-[3px] border-white" />
        </div>

        <h2 className="text-lg text-center mb-2">공원에서 사진을 찍어주세요</h2>
        <p className="text-sm text-gray-400 text-center mb-10">
          촬영 시각과 위치가 자동으로 첨부돼요
        </p>

        <PrimaryButton text="촬영하기" onClick={() => navigate("/home")} />
      </div>
    </div>
  );
}

export default MissionVerify;