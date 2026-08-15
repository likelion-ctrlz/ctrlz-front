import { useNavigate, useLocation } from "react-router-dom";

const TABS = [
  {
    label: "홈",
    path: "/home",
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.5Z"
          stroke={active ? "#00CB93" : "#BDBDBD"}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M9 21V14H15V21"
          stroke={active ? "#00CB93" : "#BDBDBD"}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "미션",
    path: "/missions",
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 11L12 14L22 4"
          stroke={active ? "#00CB93" : "#BDBDBD"}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16"
          stroke={active ? "#00CB93" : "#BDBDBD"}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "일기",
    path: "/diary",
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 4H20V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4Z"
          stroke={active ? "#00CB93" : "#BDBDBD"}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M4 4C4 2.89543 4.89543 2 6 2H18C19.1046 2 20 2.89543 20 4"
          stroke={active ? "#00CB93" : "#BDBDBD"}
          strokeWidth="1.8"
        />
        <path d="M8 10H16M8 14H13"
          stroke={active ? "#00CB93" : "#BDBDBD"}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "프로그램",
    path: "/programs",
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5"
          stroke={active ? "#00CB93" : "#BDBDBD"}
          strokeWidth="1.8"
        />
        <rect x="14" y="3" width="7" height="7" rx="1.5"
          stroke={active ? "#00CB93" : "#BDBDBD"}
          strokeWidth="1.8"
        />
        <rect x="3" y="14" width="7" height="7" rx="1.5"
          stroke={active ? "#00CB93" : "#BDBDBD"}
          strokeWidth="1.8"
        />
        <rect x="14" y="14" width="7" height="7" rx="1.5"
          stroke={active ? "#00CB93" : "#BDBDBD"}
          strokeWidth="1.8"
        />
      </svg>
    ),
  },
  {
    label: "마이페이지",
    path: "/mypage",
    icon: (active) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4"
          stroke={active ? "#00CB93" : "#BDBDBD"}
          strokeWidth="1.8"
        />
        <path
          d="M4 20C4 17.2386 7.58172 15 12 15C16.4183 15 20 17.2386 20 20V21H4V20Z"
          stroke={active ? "#00CB93" : "#BDBDBD"}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

function BottomTabBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center pt-2 pb-2">
        {TABS.map((tab) => {
          const isActive = location.pathname.startsWith(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center gap-1 min-w-[56px]"
            >
              {tab.icon(isActive)}
              <span className={`text-[10px] ${isActive ? "text-primary font-semibold" : "text-gray-400"}`}>
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
