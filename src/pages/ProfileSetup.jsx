import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function ProfileSetup() {
  const navigate = useNavigate();

  return (
    <div>
      <Header title="프로필 설정" />

      <div className="px-6 min-h-[calc(100vh-60px)] flex flex-col">
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

        <button
          onClick={() => navigate("/diagnosis")}
          className="w-full py-4 bg-black text-white rounded-lg text-base mt-6"
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default ProfileSetup;