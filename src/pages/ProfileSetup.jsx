import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { loginWithNickname } from "../api/authApi";

// 완성 음절(가-힣)뿐 아니라 타이핑 중간에 생기는 한글 낱자(ㄱ-ㅎ, ㅏ-ㅣ)도 허용,
// 영문/숫자만 허용하고 특수문자·공백·이모지는 제외
const NICKNAME_PATTERN = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]*$/;

function ProfileSetup() {
  const [nickname, setNickname] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const hasInvalidChars =
    nickname.length > 0 && !NICKNAME_PATTERN.test(nickname);
  const isTooShort = nickname.length > 0 && nickname.length < 2;
  const isTooLong = nickname.length > 12;
  const isValid =
    nickname.length >= 2 && nickname.length <= 12 && !hasInvalidChars;

  let errorMessage = "";
  if (hasInvalidChars) {
    errorMessage = "특수문자는 사용할 수 없어요";
  } else if (isTooShort) {
    errorMessage = "2글자 이상 입력해주세요";
  } else if (isTooLong) {
    errorMessage = "12글자 이하로 입력해주세요";
  }

  const handleSubmit = async () => {
    if (!isValid || submitting) return;
    setSubmitting(true);
    try {
      await loginWithNickname(nickname);
      navigate("/diagnosis");
    } catch (err) {
      alert(err.message || "로그인에 실패했어요. 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">
      {/* Status bar */}

      <Header
        title="닉네임 설정"
        onBack={() => navigate(-1)}
        titleClassName="absolute left-1/2 -translate-x-1/2 text-[14px] font-bold text-primary tracking-[-0.35px] leading-[44px] whitespace-nowrap"
      />

      {/* Content */}
      <main className="flex-1 flex flex-col px-5">
        {/* 제목 */}
        <h2 className="text-[20px] font-semibold text-primary tracking-[-0.5px] leading-[25px] mt-[103px]">
          닉네임을 알려주세요
        </h2>

        {/* 부제 */}
        <p className="text-[16px] font-medium text-gray-muted tracking-[-0.4px] leading-[25px] mt-[16px]">
          실명 없이 사용할 닉네임을 적어주세요
        </p>

        {/* 입력 필드 */}
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="이름을 입력하세요"
          maxLength={12}
          className={`w-full h-[46px] mt-[26px] px-4 rounded-[12px] border text-[14px] tracking-[-0.35px] placeholder-gray-input outline-none ${
            errorMessage
              ? "border-danger-strong focus:border-danger-strong"
              : "border-gray-icon focus:border-primary"
          }`}
        />

        {/* 글자수 안내 */}
        <p className="text-[12px] font-medium text-gray-muted tracking-[-0.3px] leading-[25px] mt-[10px]">
          2글자 ~ 12글자, 특수문자 제외
        </p>

        {/* 형식 오류 안내 */}
        {errorMessage && (
          <p className="text-[12px] font-medium text-danger-strong tracking-[-0.3px] leading-[17px] mt-[4px]">
            {errorMessage}
          </p>
        )}

        {/* 빈 공간 */}
        <div className="flex-1" />

        {/* 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={!isValid || submitting}
          className={`w-full h-[68px] rounded-[16px] border text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center mb-[32px] transition-all ${
            isValid && !submitting
              ? "bg-white border-primary text-primary"
              : "bg-white border-gray-300 text-gray-400"
          }`}
        >
          {submitting ? "로그인 중..." : "자가진단 시작하기"}
        </button>
      </main>
    </div>
  );
}

export default ProfileSetup;
