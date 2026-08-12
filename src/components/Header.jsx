import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ paddingBottom: 70 }}>
      <div style={{ padding: "24px 24px 0" }}>
        <h2 style={{ fontSize: 20, marginBottom: 20 }}>안녕하세요, 남곽춘님</h2>

        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {[
            { label: "보유 토큰", value: "120" },
            { label: "보유 토큰", value: "LV.2" },
            { label: "보유 토큰", value: "4일" },
          ].map((item, i) => (
            <div key={i} style={{
              flex: 1, border: "1px solid #eee", borderRadius: 10,
              padding: "16px 8px", textAlign: "center"
            }}>
              <p style={{ fontSize: 16, fontWeight: 700 }}>{item.value}</p>
              <p style={{ fontSize: 11, color: "#999" }}>{item.label}</p>
            </div>
          ))}
        </div>

        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16, marginBottom: 16 }}>
          <p style={{ fontSize: 13, color: "#999", marginBottom: 8 }}>오늘의 미션</p>
          <div style={{ height: 100, background: "#f2f2f2", borderRadius: 8, marginBottom: 12 }} />
          <h3 style={{ fontSize: 17, marginBottom: 8 }}>편의점 다녀오기</h3>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 12, background: "#f2f2f2", padding: "4px 10px", borderRadius: 12 }}>난이도 하</span>
            <span style={{ fontSize: 12, background: "#f2f2f2", padding: "4px 10px", borderRadius: 12 }}>토큰 +10</span>
          </div>
          <button
            onClick={() => navigate("/missions/1")}
            style={{
              width: "100%", padding: 14, backgroundColor: "#000",
              color: "#fff", border: "none", borderRadius: 10, fontSize: 15
            }}
          >
            미션 시작하기
          </button>
        </div>

        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <p style={{ fontSize: 13, color: "#999", marginBottom: 12 }}>오늘의 AI 레포트</p>
          {[70, 90, 50].map((w, i) => (
            <div key={i} style={{ height: 8, width: `${w}%`, background: "#eee", borderRadius: 4, marginBottom: 8 }} />
          ))}
        </div>
      </div>

      <BottomTabBar />
    </div>
  );
}

export default Home;