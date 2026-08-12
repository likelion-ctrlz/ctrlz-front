import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Login() {
  const navigate = useNavigate();

  return (
    <div>
      <Header title="시작하기" />

      <div style={{ padding: "24px" }}>
        <h2 style={{ fontSize: 20, lineHeight: 1.4, marginBottom: 8 }}>
          신청서 작성 없이,<br />지금 바로 시작해요
        </h2>
        <p style={{ color: "#888", fontSize: 14, marginBottom: 60 }}>
          전화방문 심사 없이 소셜로그인 한 번이면 충분해요
        </p>

        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          backgroundColor: "#f2f2f2", margin: "0 auto 60px"
        }} />

        <button
          onClick={() => navigate("/profile-setup")}
          style={{
            width: "100%", padding: 16, backgroundColor: "#FEE500",
            border: "none", borderRadius: 10, fontSize: 15, marginBottom: 12
          }}
        >
          카카오로 시작하기
        </button>

        <button
          onClick={() => navigate("/profile-setup")}
          style={{
            width: "100%", padding: 16, backgroundColor: "#fff",
            border: "1px solid #ddd", borderRadius: 10, fontSize: 15, marginBottom: 24
          }}
        >
          구글로 시작하기
        </button>

        <p style={{ textAlign: "center", color: "#999", fontSize: 12 }}>
          계속 진행 시 이용약관 및 개인정보처리방침에 동의하게 됩니다
        </p>
      </div>
    </div>
  );
}

export default Login;