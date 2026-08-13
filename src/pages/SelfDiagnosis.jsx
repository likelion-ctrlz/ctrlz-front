import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";

const OPTIONS = ["전혀 없다", "가끔 있다", "자주 있다", "항상 있다"];

function SelfDiagnosis() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  return (
    <div>
      <Header title="자기진단" />

      <div className="px-6 pt-1">
        <div className="h-1 bg-gray-100 rounded-full mb-6">
          <div className="w-1/5 h-full bg-black rounded-full" />
        </div>

        <h2 className="text-lg leading-relaxed mb-8">
          최근 6개월간, 힘든 일이 생겼을 때<br />속마음을 털어놓을 사람이 있었나요?
        </h2>

        {OPTIONS.map((option) => (
          <div
            key={option}
            onClick={() => setSelected(option)}
            className="flex items-center gap-3 py-4 border-b border-gray-100 cursor-pointer"
          >
            <span
              className={`w-5 h-5 rounded-full ${
                selected === option ? "border-[6px] border-black" : "border border-gray-300"
              }`}
            />
            {option}
          </div>
        ))}
      </div>

      <div className="px-6 py-6">
        <PrimaryButton
          text="다음"
          disabled={!selected}
          onClick={() => navigate("/diagnosis/result")}
        />
      </div>
    </div>
  );
}

export default SelfDiagnosis;