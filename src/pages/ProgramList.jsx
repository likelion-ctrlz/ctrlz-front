import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";

function ProgramList() {
  const navigate = useNavigate();
  const programs = [{ id: 1, title: "서울 청년기지개 센터" }];
  return (
    <div style={{ padding: 20 }}>
      <h2>지역 프로그램 기관</h2>
      {programs.map((p) => (
        <div key={p.id} onClick={() => navigate(`/programs/${p.id}`)} style={{ padding: 12, borderBottom: "1px solid #eee" }}>
          {p.title}
        </div>
      ))}
      <BottomTabBar />
    </div>
  );
}
export default ProgramList;