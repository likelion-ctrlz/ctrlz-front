import BottomTabBar from "../components/BottomTabBar";

function MyPage() {
  return (
    <div style={{ padding: 20 }}>
      <h2>남곽춘 · 상태 레벨2. 은둔형</h2>
      <p>계정 정보</p>
      <p>상태 히스토리</p>
      <p>토큰 현황: 120</p>
      <p>알림 설정</p>
      <BottomTabBar />
    </div>
  );
}
export default MyPage;