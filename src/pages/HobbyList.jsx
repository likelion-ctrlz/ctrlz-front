import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BottomTabBar from "../components/BottomTabBar";

const HOBBIES = [
  { id: 1, title: "한붓 그리기", type: "1:1 지도", token: "토큰 100" },
  { id: 2, title: "도자기", type: "소규모 체험", token: "토큰 200" },
  { id: 3, title: "비누만들기", type: "소규모 체험", token: "토큰 150" },
  { id: 4, title: "체형교정", type: "1:1 지도", token: "토큰 200" },
];

function HobbyList() {
  const navigate = useNavigate();

  return (
    <div className="pb-20">
      <Header title="취미활동" showBack={false} />

      <div className="px-6 pt-4">
        <h2 className="text-lg mb-4">나에게 맞는 활동을 찾아보세요</h2>

        {HOBBIES.map((h) => (
          <div
            key={h.id}
            onClick={() => navigate(`/hobbies/${h.id}`)}
            className="flex gap-3 py-3 border-b border-gray-100 cursor-pointer"
          >
            <div className="w-14 h-14 bg-gray-100 rounded-lg flex-shrink-0" />
            <div>
              <p className="text-sm mb-1">{h.title}</p>
              <p className="text-xs text-gray-400">{h.type}</p>
            </div>
            <span className="ml-auto text-sm text-gray-500 self-center">{h.token}</span>
          </div>
        ))}
      </div>

      <BottomTabBar />
    </div>
  );
}

export default HobbyList;