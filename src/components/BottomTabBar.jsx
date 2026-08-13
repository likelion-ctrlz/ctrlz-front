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
    <div className="flex justify-around py-3 border-t border-[#eee]">
      {tabs.map((tab) => (
        <button key={tab.path} onClick={() => navigate(tab.path)} className="bg-transparent border-none">
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default BottomTabBar;
