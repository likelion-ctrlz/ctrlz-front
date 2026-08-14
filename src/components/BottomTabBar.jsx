import { useNavigate, useLocation } from "react-router-dom";

const TABS = [
  { label: "홈", path: "/home" },
  { label: "미션", path: "/missions" },
  { label: "취미", path: "/hobbies" },
  { label: "일기", path: "/diary" },
  { label: "MY", path: "/mypage" },
];

function BottomTabBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white flex justify-around pt-3 pb-[calc(max(env(safe-area-inset-bottom),34px)+0.75rem)] border-t border-gray-100">
      {TABS.map((tab) => {
        const isActive = location.pathname.startsWith(tab.path);
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`text-sm ${isActive ? "text-black font-semibold" : "text-gray-400"}`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default BottomTabBar;