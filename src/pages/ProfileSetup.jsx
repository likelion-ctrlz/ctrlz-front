import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import PrimaryButton from "../components/PrimaryButton";

function ProfileSetup() {
  const navigate = useNavigate();

  return (
    <Layout title="프로필 설정" showTabBar={false}>
      <div className="flex-1 flex flex-col">
        <p className="text-gray-400 text-xs mb-2">●●●</p>
        <h2 className="text-xl leading-snug mb-2">
          실명 대신 사용할<br />닉네임을 정해주세요
        </h2>
        <p className="text-gray-400 text-sm mb-10">
          닉네임은 마이페이지에서 언제든 바꿀 수 있어요
        </p>

        <input
          type="text"
          placeholder="닉네임 입력"
          className="border border-gray-200 rounded-lg px-3.5 py-3.5 text-sm mb-auto"
        />

        <div className="mt-6">
          <PrimaryButton text="다음" onClick={() => navigate("/diagnosis")} />
        </div>
      </div>
    </Layout>
  );
}

export default ProfileSetup;
