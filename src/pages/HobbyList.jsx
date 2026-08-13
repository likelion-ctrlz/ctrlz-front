import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";

function HobbyList() {
  const navigate = useNavigate();
  const hobbies = [
    { id: 1, title: "한붓 그리기" },
    { id: 2, title: "도자기" },
    { id: 3, title: "비누만들기" },
  ];
  return (
    <div className="p-5">
      <h2>나에게 맞는 활동을 찾아보세요</h2>
      {hobbies.map((h) => (
        <div key={h.id} onClick={() => navigate(`/hobbies/${h.id}`)} className="p-3 border-b border-[#eee] cursor-pointer">
          {h.title}
        </div>
      ))}
      <BottomTabBar />
    </div>
  );
}

export default HobbyList;   // ← 이 줄이 빠졌을 가능성이 커요
