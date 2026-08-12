import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function ProfileSetup() {
  const navigate = useNavigate();

  return (
    <div>
      <Header title="프로필 설정" />

      <div style={{ padding: "24px", minHeight: "calc(100vh - 60px)", display: "flex", flexDirection: "column" }}>
        <p style={{ color: "#999", fontSize: 13, marginBottom: 8 }}>●●●</p>
        <h2 style={{ fontSize: 20, lineHeight: 1.4, marginBottom: 8 }}>
          실명 대신 사용할<br />닉네임을 정해주세요
        </h2>
        <p style={{ color: "#888", fontSize: 14, marginBottom: 40 }}>
          닉네임은 마이페이지에서 언제든 바꿀 수 있어요
        </p>

        <input
          type="text"
          placeholder="닉네임 입력"
          style={{
            padding: 14, border: "1px solid #ddd", borderRadius: 10,
            fontSize: 15, marginBottom: "auto"
          }}
        />

        <button
          onClick={() => navigate("/diagnosis")}
          style={{
            width: "100%", padding: 16, backgroundColor: "#000",
            color: "#fff", border: "none", borderRadius: 10, fontSize: 16, marginTop: 24
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default ProfileSetup;