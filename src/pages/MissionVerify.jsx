import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function MissionVerify() {
  const navigate = useNavigate();

  return (
    <div>
      <Header title="미션 상세" />

      <div style={{ padding: "24px" }}>
        <div style={{
          position: "relative",
          height: 340,
          backgroundColor: "#1a1a1a",
          borderRadius: 12,
          marginBottom: 20,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          {/* 카메라 모서리 프레임 */}
          {[
            { top: 16, left: 16, borderWidth: "3px 0 0 3px" },
            { top: 16, right: 16, borderWidth: "3px 3px 0 0" },
            { bottom: 16, left: 16, borderWidth: "0 0 3px 3px" },
            { bottom: 16, right: 16, borderWidth: "0 3px 3px 0" },
          ].map((pos, i) => (
            <div key={i} style={{
              position: "absolute", width: 28, height: 28,
              borderColor: "#fff", borderStyle: "solid", ...pos
            }} />
          ))}
          {/* 셔터 원 */}
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            border: "3px solid #fff"
          }} />
        </div>

        <h2 style={{ fontSize: 18, textAlign: "center", marginBottom: 8 }}>
          공원에서 사진을 찍어주세요
        </h2>
        <p style={{ fontSize: 13, color: "#999", textAlign: "center", marginBottom: 40 }}>
          촬영 시각과 위치가 자동으로 첨부돼요
        </p>

        <button
          onClick={() => navigate("/home")}
          style={{
            width: "100%", padding: 16, backgroundColor: "#000",
            color: "#fff", border: "none", borderRadius: 10, fontSize: 16
          }}
        >
          촬영하기
        </button>
      </div>
    </div>
  );
}

export default MissionVerify;