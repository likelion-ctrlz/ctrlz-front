import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

function MissionDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div>
      <Header title="미션 상세" />

      <div style={{ padding: "0 24px 24px" }}>
        <div style={{ height: 180, background: "#f2f2f2", borderRadius: 12, marginBottom: 16 }} />

        <h2 style={{ fontSize: 19, marginBottom: 10 }}>근처 공원 다녀오기</h2>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <span style={{ fontSize: 12, background: "#f2f2f2", padding: "4px 10px", borderRadius: 12 }}>난이도 중</span>
          <span style={{ fontSize: 12, background: "#f2f2f2", padding: "4px 10px", borderRadius: 12 }}>토큰 +20</span>
        </div>

        <div style={{
          background: "#fafafa", borderRadius: 10, padding: 20, marginBottom: 24, minHeight: 100
        }}>
          <p style={{ fontSize: 13, color: "#999" }}>실시간으로 인증하고있다고 안내</p>
          <p style={{ fontSize: 14, marginTop: 8 }}>근처 공원 산책이 얼마나 도움이 되는지 설명</p>
        </div>

        <button
          onClick={() => navigate(`/missions/${id}/verify`)}
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

export default MissionDetail;