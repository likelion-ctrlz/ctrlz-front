import { useNavigate, useParams } from "react-router-dom";

function HobbyDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div className="p-5">
      <h2>한붓 그리기 (#{id})</h2>
      <p>일시: 매주 수요일 / 장소: 동탄 2h / 필요 토큰: 100</p>
      <button onClick={() => navigate("/hobbies")}>신청하기</button>
    </div>
  );
}
export default HobbyDetail;
