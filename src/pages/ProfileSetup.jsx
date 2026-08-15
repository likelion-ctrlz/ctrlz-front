import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import { loginWithNickname } from "../api/authApi";

function ProfileSetup() {
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNext = async () => {
    if (!nickname.trim()) return;
    setLoading(true);
    setError("");

    try {
      await loginWithNickname(nickname);
      navigate("/diagnosis");
    } catch (err) {
      setError("로그인에 실패했어요. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

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
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="border border-gray-200 rounded-lg px-3.5 py-3.5 text-sm"
        />
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

        <div className="mt-auto pt-6">
          <PrimaryButton
            text={loading ? "처리 중..." : "다음"}
            onClick={handleNext}
            disabled={!nickname.trim() || loading}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileSetup;
