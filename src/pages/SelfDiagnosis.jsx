import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const OPTIONS = ["전혀 없다", "가끔 있다", "자주 있다", "항상 있다"];

function SelfDiagnosis() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  return (
    <div>
      <Header title="자기진단" />

      <div className="pt-1 px-6">
        <div className="h-1 bg-[#eee] rounded-sm mb-6">
          <div className="w-1/5 h-full bg-black rounded-sm" />
        </div>

        <h2 className="text-[19px] leading-normal mb-8">
          최근 6개월간, 힘든 일이 생겼을 때<br />속마음을 털어놓을 사람이 있었나요?
        </h2>

        {OPTIONS.map((option) => (
          <div
            key={option}
            onClick={() => setSelected(option)}
            className="flex items-center gap-3 py-4 px-1 border-b border-[#f0f0f0] cursor-pointer"
          >
            <span
              className={`w-5 h-5 rounded-full ${
                selected === option ? "border-[6px] border-black" : "border border-[#ccc]"
              }`}
            />
            {option}
          </div>
        ))}
      </div>

      <div className="p-6">
        <button
          onClick={() => navigate("/diagnosis/result")}
          disabled={!selected}
          className={`w-full p-4 text-white border-none rounded-[10px] text-base ${
            selected ? "bg-black" : "bg-[#ccc]"
          }`}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default SelfDiagnosis;
