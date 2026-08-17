import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfileSetup() {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const isValid = nickname.length >= 2 && nickname.length <= 12;

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">
      {/* Status bar */}

      {/* Header */}
      <header className="relative flex items-center h-[53px] px-5">
        <button onClick={() => navigate(-1)} className="w-[34px] h-[34px] flex items-center justify-center">
          <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
            <path d="M7 1L1 7.5L7 14" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[14px] font-bold text-[#00CB93] tracking-[-0.35px] leading-[44px]">
          닉네임 설정
        </p>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col px-5">
        {/* 제목 */}
        <h2 className="text-[20px] font-semibold text-[#00CB93] tracking-[-0.5px] leading-[25px] mt-[53px]">
          닉네임을 알려주세요
        </h2>

        {/* 부제 */}
        <p className="text-[16px] font-medium text-[#949494] tracking-[-0.4px] leading-[25px] mt-[16px]">
          실명 없이 사용할 닉네임을 적어주세요
        </p>

        {/* 입력 필드 */}
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="이름을 입력하세요"
          maxLength={12}
          className="w-full h-[46px] mt-[35px] px-4 rounded-[12px] border border-[#CACACA] text-[14px] tracking-[-0.35px] placeholder-[#D5D5D5] outline-none focus:border-[#00CB93]"
        />

        {/* 글자수 안내 */}
        <p className="text-[12px] font-medium text-[#949494] tracking-[-0.3px] leading-[25px] mt-[10px]">
          2글자 ~ 12글자, 특수문자 제외
        </p>

        {/* 빈 공간 */}
        <div className="flex-1" />

        {/* 하단 안내 */}
        <p className="text-[16px] font-medium text-[#949494] tracking-[-0.4px] leading-[25px] text-center mb-[16px]">
          위의 내용을 확인했다면 진단을 시작해볼까요?
        </p>

        {/* 버튼 */}
        <button
          onClick={() => navigate("/diagnosis")}
          disabled={!isValid}
          className={`w-full h-[68px] rounded-[16px] border text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center mb-[66px] transition-all ${
            isValid
              ? "bg-white border-[#00CB93] text-[#00CB93]"
              : "bg-white border-[#E0E0E0] text-[#BDBDBD]"
          }`}
        >
          자가진단 시작하기
        </button>
      </main>
    </div>
  );
}

export default ProfileSetup;
