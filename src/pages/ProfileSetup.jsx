import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function ProfileSetup() {
  const navigate = useNavigate();

  return (
    <div>
      <Header title="프로필 설정" />

      <div className="p-6 min-h-[calc(100vh-60px)] flex flex-col">
        <p className="text-[#999] text-[13px] mb-2">●●●</p>
        <h2 className="text-xl leading-[1.4] mb-2">
          실명 대신 사용할<br />닉네임을 정해주세요
        </h2>
        <p className="text-[#888] text-sm mb-10">
          닉네임은 마이페이지에서 언제든 바꿀 수 있어요
        </p>

        <input
          type="text"
          placeholder="닉네임 입력"
          className="p-3.5 border border-[#ddd] rounded-[10px] text-[15px] mb-auto"
        />

        <button
          onClick={() => navigate("/diagnosis")}
          className="w-full p-4 bg-black text-white border-none rounded-[10px] text-base mt-6"
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default ProfileSetup;
