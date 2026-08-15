import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfileSetup() {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const isValid = nickname.length >= 2 && nickname.length <= 12;

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <div className="h-[44px]" />

      {/* Header */}
      <header className="flex items-center h-[53px] px-5">
        <button onClick={() => navigate(-1)} className="w-[34px] h-[34px] flex items-center justify-center">
          <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
            <path d="M7 1L1 7.5L7 14" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="flex-1 text-center text-[15px] font-medium">닉네임 설정</span>
        <div className="w-[34px]" />
      </header>

      <main className="flex-1 flex flex-col px-5 pt-8 pb-8">
        <h2 className="text-[18px] font-semibold mb-2">닉네임을 알려주세요</h2>
        <p className="text-[14px] text-gray-500 mb-8">실명 없이 사용할 닉네임을 적어주세요</p>

        {/* 입력 필드 */}
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="이름을 입력하세요"
          maxLength={12}
          className="w-full py-[13px] px-4 rounded-xl border border-gray-200 text-[14px] placeholder-gray-400 outline-none focus:border-primary mb-3"
        />
        <p className="text-[12px] text-gray-400 mb-auto">
          2글자 ~ 12글자, 특수문자 제외
        </p>

        <p className="text-[14px] text-gray-500 text-center mb-4">
          위의 내용을 확인했다면 진단을 시작해볼까요?
        </p>

        <button
          onClick={() => navigate("/diagnosis")}
          disabled={!isValid}
          className={`w-full py-[22px] rounded-xl text-[16px] font-semibold transition-all ${
            isValid
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-400"
          }`}
        >
          자가진단 시작하기
        </button>
      </main>
    </div>
  );
}

export default ProfileSetup;
