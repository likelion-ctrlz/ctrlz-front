import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import chevronLeft from "../assets/icon/chevron-left.png";

const INTEREST_OPTIONS = ["음악", "문화", "스포츠", "상담", "그림", "요리"];

function ProfileEdit() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [interests, setInterests] = useState(["음악"]);
  const [city, setCity] = useState("서울");
  const [district, setDistrict] = useState("강동구");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");

  const toggleInterest = (item) => {
    setInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">
      {/* Header */}
      <header className="relative flex items-center h-[53px] px-5">
        <button onClick={() => navigate(-1)} className="w-[34px] h-[34px] flex items-center justify-center">
          <img src={chevronLeft} alt="" className="w-[34px] h-[34px]" />
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-primary tracking-[-0.5px] leading-[44px]">
          프로필 편집
        </p>
      </header>

      {/* 구분선 */}
      <div className="w-full h-[1px] bg-border" />

      <main className="flex-1 flex flex-col pb-[130px]">
        {/* 닉네임 섹션 */}
        <div className="px-[32px] pt-[22px] pb-[24px]">
          <h3 className="text-[16px] font-semibold text-primary-text-darker tracking-[-0.4px] leading-[25px]">
            닉네임
          </h3>
          <div className="mt-[14px] h-[46px] rounded-[12px] border border-[#cacaca] flex items-center px-[14px]">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="이름을 입력하세요"
              className="w-full text-[14px] font-medium tracking-[-0.35px] leading-[25px] text-black placeholder-[#d5d5d5] outline-none bg-transparent"
            />
          </div>
          <p className="mt-[10px] text-[12px] font-medium text-[#949494] tracking-[-0.3px] leading-[20px]">
            한 번 변경한 닉네임은 변경할 수 없습니다
          </p>
        </div>

        {/* 구분선 */}
        <div className="w-full h-[1px] bg-border" />

        {/* 관심사 섹션 */}
        <div className="px-[32px] pt-[22px] pb-[24px]">
          <h3 className="text-[16px] font-semibold text-primary-text-darker tracking-[-0.4px] leading-[25px]">
            관심사
          </h3>
          <div className="mt-[16px] flex flex-wrap gap-[6px]">
            {INTEREST_OPTIONS.map((item) => (
              <button
                key={item}
                onClick={() => toggleInterest(item)}
                className={`h-[30px] px-[20px] rounded-[15px] border border-primary text-[12px] tracking-[-0.3px] leading-[25px] ${
                  interests.includes(item)
                    ? "bg-white font-semibold text-primary"
                    : "bg-white/10 font-medium text-primary"
                }`}
              >
                {item}
              </button>
            ))}
            <button className="h-[30px] w-[42px] rounded-[15px] border border-primary flex items-center justify-center text-primary text-[24px] leading-[25px] tracking-[-0.6px]">
              +
            </button>
          </div>
        </div>

        {/* 구분선 */}
        <div className="w-full h-[1px] bg-border" />

        {/* 지역 섹션 */}
        <div className="px-[32px] pt-[22px] pb-[24px]">
          <h3 className="text-[16px] font-semibold text-primary-text-darker tracking-[-0.4px] leading-[25px]">
            지역
          </h3>

          {/* 시/도 */}
          <p className="mt-[16px] text-[12px] font-medium text-[#949494] tracking-[-0.3px] leading-[20px]">
            시/도
          </p>
          <div className="mt-[8px] h-[46px] rounded-[12px] border border-[#cacaca] flex items-center px-[14px] justify-between">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full text-[14px] font-medium tracking-[-0.35px] leading-[25px] text-black outline-none bg-transparent appearance-none"
            >
              <option value="서울">서울</option>
              <option value="부산">부산</option>
              <option value="대구">대구</option>
              <option value="인천">인천</option>
              <option value="광주">광주</option>
              <option value="대전">대전</option>
              <option value="울산">울산</option>
            </select>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="shrink-0">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="#cacaca" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* 구/군 */}
          <p className="mt-[16px] text-[12px] font-medium text-[#949494] tracking-[-0.3px] leading-[20px]">
            구/군
          </p>
          <div className="mt-[8px] h-[46px] rounded-[12px] border border-[#cacaca] flex items-center px-[14px] justify-between">
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full text-[14px] font-medium tracking-[-0.35px] leading-[25px] text-black outline-none bg-transparent appearance-none"
            >
              <option value="강동구">강동구</option>
              <option value="강남구">강남구</option>
              <option value="강서구">강서구</option>
              <option value="강북구">강북구</option>
              <option value="마포구">마포구</option>
            </select>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="shrink-0">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="#cacaca" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* 구분선 */}
        <div className="w-full h-[1px] bg-border" />

        {/* 생년월일 섹션 */}
        <div className="px-[32px] pt-[22px] pb-[24px]">
          <h3 className="text-[16px] font-semibold text-primary-text-darker tracking-[-0.4px] leading-[25px]">
            생년월일
          </h3>
          <p className="mt-[8px] text-[12px] font-medium text-[#949494] tracking-[-0.3px] leading-[20px]">
            YYYY-MM-DD
          </p>
          <div className="mt-[10px] h-[46px] rounded-[12px] border border-[#cacaca] flex items-center px-[14px]">
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full text-[14px] font-medium tracking-[-0.35px] leading-[25px] text-black outline-none bg-transparent"
            />
          </div>
        </div>

        {/* 구분선 */}
        <div className="w-full h-[1px] bg-border" />

        {/* 성별 섹션 */}
        <div className="px-[32px] pt-[22px] pb-[24px]">
          <h3 className="text-[16px] font-semibold text-primary-text-darker tracking-[-0.4px] leading-[25px]">
            성별
          </h3>
          <div className="mt-[14px] h-[46px] w-[174px] rounded-[12px] border border-[#cacaca] flex items-center px-[14px] justify-between">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full text-[14px] font-medium tracking-[-0.35px] leading-[25px] text-black outline-none bg-transparent appearance-none placeholder-[#d5d5d5]"
            >
              <option value="" disabled className="text-[#d5d5d5]">선택 안 함</option>
              <option value="남성">남성</option>
              <option value="여성">여성</option>
              <option value="기타">기타</option>
            </select>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="shrink-0">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="#cacaca" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* 하단 안내 + 저장 버튼 */}
        <div className="mt-auto px-[20px] pb-[24px]">
          <p className="text-[14px] font-medium text-[#949494] tracking-[-0.35px] leading-[25px] text-center">
            프로필 정보는 비공개로 관리되며 취미활동 추천에만 사용돼요
          </p>
          <button className="mt-[16px] w-full h-[68px] rounded-[16px] border border-primary flex items-center justify-center">
            <span className="text-[20px] font-semibold text-primary tracking-[-0.5px]">
              저장하기
            </span>
          </button>
        </div>
      </main>

      <BottomTabBar />
      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-[100px]" />
    </div>
  );
}

export default ProfileEdit;
