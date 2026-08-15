import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BottomTabBar from "../components/BottomTabBar";
import { logout } from "../api/authApi";

const MENU = [
  { title: "계정 정보", desc: "닉네임, 소셜 로그인 연결" },
  { title: "상태 히스토리", desc: "자가진단 결과 변화 추이" },
  { title: "토큰 현황", desc: "적립 사용내역", value: "120" },
  { title: "알림 설정", desc: "미션 일기장 알림" },
  { title: "이용약관 로그인", desc: "" },
];

function MyPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("로그아웃 실패", err);
    } finally {
      navigate("/");
    }
  };

  return (
    <div className="pb-20">
      <Header title="마이페이지" />

      <div className="px-6 pt-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-gray-200" />
          <div>
            <p className="text-base font-medium">남곽춘</p>
            <p className="text-xs text-gray-400">상태 레벨2. 은둔형</p>
          </div>
        </div>

        {MENU.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between py-4 border-b border-gray-100 cursor-pointer"
          >
            <div>
              <p className="text-sm mb-1">{item.title}</p>
              {item.desc && <p className="text-xs text-gray-400">{item.desc}</p>}
            </div>
            {item.value ? (
              <span className="text-sm text-gray-600">{item.value}</span>
            ) : (
              <span className="text-gray-300">›</span>
            )}
          </div>
        ))}

        <button
          onClick={handleLogout}
          className="w-full text-center text-red-500 text-sm py-4 mt-6"
        >
          로그아웃
        </button>
      </div>

      <BottomTabBar />
    </div>
  );
}

export default MyPage;
