import { useNavigate, useLocation } from "react-router-dom";
import iconHome from "../assets/icon/tab/home.png";
import iconMission from "../assets/icon/tab/mission.png";
import iconDiary from "../assets/icon/tab/diary.png";
import iconProgram from "../assets/icon/tab/program.png";
import iconMypage from "../assets/icon/tab/mypage.png";

const TABS = [
  { label: "홈", path: "/home", icon: iconHome },
  { label: "미션", path: "/missions", icon: iconMission },
  { label: "일기", path: "/diary", icon: iconDiary },
  { label: "프로그램", path: "/programs", icon: iconProgram },
  { label: "마이페이지", path: "/mypage", icon: iconMypage },
];

function BottomTabBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-primary pb-[env(safe-area-inset-bottom)] z-50">
      <div className="flex items-center px-4 pt-4 pb-2">
        {TABS.map((tab) => {
          const isActive = location.pathname.startsWith(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <span
                className="block w-6 h-6"
                style={{
                  backgroundColor: isActive ? "var(--color-primary)" : "var(--color-gray-icon)",
                  WebkitMaskImage: `url(${tab.icon})`,
                  maskImage: `url(${tab.icon})`,
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              />
              <span className={`text-[11px] ${isActive ? "text-primary font-semibold" : "text-gray-icon"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default BottomTabBar;
