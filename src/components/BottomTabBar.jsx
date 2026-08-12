import { useNavigate } from "react-router-dom";

function BottomTabBar() {
  const navigate = useNavigate();
  const tabs = [
    { label: "홈", path: "/home" },
    { label: "미션", path: "/missions" },
    { label: "취미", path: "/hobbies" },
    { label: "일기", path: "/diary" },
    { label: "MY", path: "/mypage" },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "space-around", padding: "12px 0", borderTop: "1px solid #eee" }}>
      {tabs.map((tab) => (
        <button key={tab.path} onClick={() => navigate(tab.path)} style={{ background: "none", border: "none" }}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default BottomTabBar;