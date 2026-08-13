import { useNavigate, useParams } from "react-router-dom";

function ProgramDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div className="p-5">
      <h2>서울 청년기지개 센터 (#{id})</h2>
      <p>일시: 매주 수요일 / 필요 토큰: 100</p>
      <button onClick={() => navigate("/programs")}>신청하기</button>
    </div>
  );
}
export default ProgramDetail;
