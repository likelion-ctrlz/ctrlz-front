import { useNavigate } from "react-router-dom";

function Onboarding() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      padding: "40px 24px 24px"
    }}>
      <div style={{
        flex: 1,
        backgroundColor: "#f2f2f2",
        borderRadius: 12,
        marginBottom: 24
      }} />

      <h1 style={{ textAlign: "center", fontSize: 24, marginBottom: 8 }}>CtrlZ</h1>
      <p style={{ textAlign: "center", color: "#666", marginBottom: 40 }}>
        지금 이 순간, 작은 발걸음부터
      </p>

      <button
        onClick={() => navigate("/login")}
        style={{
          width: "100%",
          padding: "16px",
          backgroundColor: "#000",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          fontSize: 16,
          marginBottom: 12
        }}
      >
        시작하기
      </button>

      <p style={{ textAlign: "center", color: "#999", fontSize: 13 }}>
        이미 계정이 있어요
      </p>
    </div>
  );
}

export default Onboarding;