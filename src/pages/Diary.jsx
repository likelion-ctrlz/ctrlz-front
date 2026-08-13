import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";

function Diary() {
  const navigate = useNavigate();
  return (
    <div className="p-5">
      <h2>말하는 일기장</h2>
      <p>오늘의 하루는 어땠나요? 편하게 말해보세요</p>
      <button onClick={() => navigate("/diary/report")}>기록 완료</button>
      <BottomTabBar />
    </div>
  );
}
export default Diary;
