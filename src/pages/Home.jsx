import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="p-5">
      <h2>안녕하세요, OO님</h2>
      <p>120 토큰 · LV.2 · 4일</p>
      <h3>오늘의 미션</h3>
      <p>편의점 다녀오기</p>
      <button onClick={() => navigate("/missions/1")}>미션 시작하기</button>
      <BottomTabBar />
    </div>
  );
}
export default Home;
