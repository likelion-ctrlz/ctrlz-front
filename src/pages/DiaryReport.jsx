import { useNavigate } from "react-router-dom";

function DiaryReport() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: 20 }}>
      <h2>AI 요약</h2>
      <p>최근 7일 감정 추이: 기분이 오락가락해요</p>
      <button onClick={() => navigate("/diary")}>저장하기</button>
    </div>
  );
}
export default DiaryReport;