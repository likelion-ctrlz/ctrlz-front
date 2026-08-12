import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BottomTabBar from "../components/BottomTabBar";

const MISSIONS = [
  { id: 1, title: "창문 열고 3분 바람 쐬기", level: "난이도 하", token: "+10" },
  { id: 2, title: "편의점 다녀오기", level: "난이도 하", token: "+20" },
  { id: 3, title: "근처 공원 다녀오기", level: "난이도 하", token: "+20" },
  { id: 4, title: "동네 카페에서 15분 머물기", level: "난이도 하", token: "+20" },
];

const FILTERS = ["전체", "오늘", "난이도 별"];

function MissionList() {
  const [filter, setFilter] = useState("전체");
  const navigate = useNavigate();

  return (
    <div style={{ paddingBottom: 70 }}>
      <Header title="미션" showBack={false} />

      <div style={{ display: "flex", gap: 8, padding: "16px 24px" }}>
        {FILTERS.map((f) => (
          <span
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "6px 14px", borderRadius: 16, fontSize: 13, cursor: "pointer",
              backgroundColor: filter === f ? "#000" : "#f2f2f2",
              color: filter === f ? "#fff" : "#333"
            }}
          >
            {f}
          </span>
        ))}
      </div>

      <div style={{ padding: "0 24px" }}>
        {MISSIONS.map((m) => (
          <div
            key={m.id}
            onClick={() => navigate(`/missions/${m.id}`)}
            style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: "1px solid #f0f0f0", cursor: "pointer" }}
          >
            <div style={{ width: 56, height: 56, background: "#f2f2f2", borderRadius: 8, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 15, marginBottom: 4 }}>{m.title}</p>
              <p style={{ fontSize: 12, color: "#999" }}>{m.level}</p>
            </div>
            <span style={{ marginLeft: "auto", fontSize: 13, color: "#666", alignSelf: "center" }}>{m.token}</span>
          </div>
        ))}
      </div>

      <BottomTabBar />
    </div>
  );
}

export default MissionList;