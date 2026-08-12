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

      <div style={{ padding: "4px 24px 0" }}>
        <div style={{ height: 4, background: "#eee", borderRadius: 2, marginBottom: 24 }}>
          <div style={{ width: "20%", height: "100%", background: "#000", borderRadius: 2 }} />
        </div>

        <h2 style={{ fontSize: 19, lineHeight: 1.5, marginBottom: 32 }}>
          최근 6개월간, 힘든 일이 생겼을 때<br />속마음을 털어놓을 사람이 있었나요?
        </h2>

        {OPTIONS.map((option) => (
          <div
            key={option}
            onClick={() => setSelected(option)}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "16px 4px", borderBottom: "1px solid #f0f0f0", cursor: "pointer"
            }}
          >
            <span style={{
              width: 20, height: 20, borderRadius: "50%",
              border: selected === option ? "6px solid #000" : "1px solid #ccc"
            }} />
            {option}
          </div>
        ))}
      </div>

      <div style={{ padding: 24 }}>
        <button
          onClick={() => navigate("/diagnosis/result")}
          disabled={!selected}
          style={{
            width: "100%", padding: 16,
            backgroundColor: selected ? "#000" : "#ccc",
            color: "#fff", border: "none", borderRadius: 10, fontSize: 16
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default SelfDiagnosis;