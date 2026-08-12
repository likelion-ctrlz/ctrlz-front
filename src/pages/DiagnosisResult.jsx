import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function DiagnosisResult() {
  const navigate = useNavigate();

  return (
    <div>
      <Header title="진단 결과" showBack={false} />

      <div style={{ padding: "4px 24px 0" }}>
        <div style={{ height: 4, background: "#000", borderRadius: 2, marginBottom: 32 }} />

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <span style={{
            display: "inline-block", padding: "8px 20px",
            backgroundColor: "#000", color: "#fff", borderRadius: 20, fontSize: 14
          }}>
            상태 레벨2
          </span>
        </div>

        <div style={{
          border: "1px solid #eee", borderRadius: 12, padding: 20, marginBottom: 32
        }}>
          <p style={{ color: "#999", fontSize: 13, marginBottom: 8 }}>첫 미션 제안</p>
          <h3 style={{ fontSize: 18, marginBottom: 12 }}>창문 열고 3분 바람 쐬기</h3>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ fontSize: 12, background: "#f2f2f2", padding: "4px 10px", borderRadius: 12 }}>난이도 하</span>
            <span style={{ fontSize: 12, background: "#f2f2f2", padding: "4px 10px", borderRadius: 12 }}>토큰 +10</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 24px 24px" }}>
        <button
          onClick={() => navigate("/home")}
          style={{
            width: "100%", padding: 16, backgroundColor: "#000",
            color: "#fff", border: "none", borderRadius: 10, fontSize: 16
          }}
        >
          미션 시작하기
        </button>
      </div>
    </div>
  );
}

export default DiagnosisResult;