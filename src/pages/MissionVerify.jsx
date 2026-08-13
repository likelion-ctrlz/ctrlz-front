import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const CORNERS = [
  "top-4 left-4 border-t-[3px] border-l-[3px]",
  "top-4 right-4 border-t-[3px] border-r-[3px]",
  "bottom-4 left-4 border-b-[3px] border-l-[3px]",
  "bottom-4 right-4 border-b-[3px] border-r-[3px]",
];

function MissionVerify() {
  const navigate = useNavigate();

  return (
    <div>
      <Header title="미션 상세" />

      <div className="p-6">
        <div className="relative h-[340px] bg-[#1a1a1a] rounded-xl mb-5 flex items-center justify-center">
          {/* 카메라 모서리 프레임 */}
          {CORNERS.map((cls, i) => (
            <div key={i} className={`absolute w-7 h-7 border-white border-solid ${cls}`} />
          ))}
          {/* 셔터 원 */}
          <div className="w-16 h-16 rounded-full border-[3px] border-white" />
        </div>

        <h2 className="text-lg text-center mb-2">
          공원에서 사진을 찍어주세요
        </h2>
        <p className="text-[13px] text-[#999] text-center mb-10">
          촬영 시각과 위치가 자동으로 첨부돼요
        </p>

        <button
          onClick={() => navigate("/home")}
          className="w-full p-4 bg-black text-white border-none rounded-[10px] text-base"
        >
          촬영하기
        </button>
      </div>
    </div>
  );
}

export default MissionVerify;
