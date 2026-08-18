import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import chevronLeft from "../assets/icon/chevron-left.png";

function PrivacySettings() {
  const navigate = useNavigate();
  const [consents, setConsents] = useState({
    emotion: true,
    location: true,
    voice: true,
  });

  const toggleConsent = (key) => {
    setConsents((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const SECTIONS = [
    {
      key: "emotion",
      title: "감정 기록 저장",
      descriptions: [
        "하루의 감정과 경험을 안전하게 기록하고 회복 여정을 추적하기 위해 수집합니다",
        "기록은 서버에 암호화되어 보관되며, 언제든지 개별 삭제 또는 전체 기록 삭제가 가능합니다",
      ],
      consentLabel: "감정 기록 저장 동의",
    },
    {
      key: "location",
      title: "위치 정보 수집",
      descriptions: [
        "지역별 맞춤 지원 프로그램과 취미활동을 추천하기 위해 선택적으로 수집합니다",
        "위치 정보는 필수가 아니며, 거부해도 서비스 이용에 지장이 없습니다",
      ],
      consentLabel: "위치 정보 수집 동의",
    },
    {
      key: "voice",
      title: "음성 기록 이용",
      descriptions: [
        "음성 기록은 음석, 텍스트 변환과 AI 응답 생성에만 사용되며, 다른 목적으로 공유되지 않습니다",
        "녹음 파일은 처리후 30일 뒤 자동 삭제되며, 수동 삭제도 가능합니다",
      ],
      consentLabel: "음성 기록 이용 동의",
    },
  ];

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">
      {/* Header */}
      <header className="relative flex items-center h-[53px] px-5">
        <button onClick={() => navigate(-1)} className="w-[34px] h-[34px] flex items-center justify-center">
          <img src={chevronLeft} alt="" className="w-[34px] h-[34px]" />
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-primary tracking-[-0.5px] leading-[44px]">
          개인정보 설정
        </p>
      </header>

      {/* 구분선 */}
      <div className="w-full h-[1px] bg-border" />

      <main className="flex-1 flex flex-col pb-[130px]">
        {SECTIONS.map((section, idx) => (
          <div key={section.key}>
            {/* 섹션 */}
            <div className="px-[32px] pt-[22px] pb-[24px]">
              {/* 제목 */}
              <h3 className="text-[16px] font-semibold text-primary-text-darker tracking-[-0.4px] leading-[25px]">
                {section.title}
              </h3>

              {/* 설명 텍스트들 */}
              <div className="mt-[15px] flex flex-col gap-[12px]">
                {section.descriptions.map((desc, i) => (
                  <p key={i} className="text-[12px] font-medium text-[#949494] tracking-[-0.3px] leading-[20px]">
                    {desc}
                  </p>
                ))}
              </div>

              {/* 동의 토글 */}
              <div className="flex items-center justify-between mt-[20px]">
                <p className="text-[16px] font-semibold text-primary tracking-[-0.4px] leading-[25px]">
                  {section.consentLabel}
                </p>
                {/* Toggle Switch */}
                <button
                  onClick={() => toggleConsent(section.key)}
                  className={`w-[57px] h-[26px] rounded-full relative transition-colors ${
                    consents[section.key] ? "bg-primary" : "bg-gray-300"
                  }`}
                  aria-label={`${section.consentLabel} 토글`}
                >
                  <div
                    className={`absolute top-[3px] w-[20px] h-[20px] rounded-full bg-white shadow transition-transform ${
                      consents[section.key] ? "translate-x-[34px]" : "translate-x-[3px]"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* 섹션 구분선 */}
            {idx < SECTIONS.length - 1 && (
              <div className="w-full h-[1px] bg-border" />
            )}
          </div>
        ))}

        {/* 구분선 */}
        <div className="w-full h-[1px] bg-border" />

        {/* 기록 관리 */}
        <div className="px-[32px] pt-[22px]">
          <h3 className="text-[16px] font-semibold text-primary-text-darker tracking-[-0.4px] leading-[25px]">
            기록 관리
          </h3>

          {/* 개별 감정 기록 삭제 */}
          <div className="mt-[16px] bg-[#f6f6f6] rounded-[12px] px-[22px] py-[20px]">
            <p className="text-[14px] font-semibold text-[#949494] tracking-[-0.35px] leading-[20px]">
              개별 감정 기록 삭제
            </p>
            <p className="text-[12px] font-medium text-[#949494] tracking-[-0.3px] leading-[20px] mt-[10px]">
              마이페이지 &gt; 저장된 기록에서 각 항목의 삭제 버튼을 누르면 즉시 삭제됩니다
            </p>
          </div>

          {/* 전체 기록 일괄 삭제 */}
          <div className="mt-[16px] bg-[#f6f6f6] rounded-[12px] px-[22px] py-[20px]">
            <p className="text-[14px] font-semibold text-[#949494] tracking-[-0.35px] leading-[20px]">
              전체 기록 일괄 삭제
            </p>
            <p className="text-[12px] font-medium text-[#949494] tracking-[-0.3px] leading-[20px] mt-[10px]">
              설정 &gt; 데이터 관리에서 모든 감정 기록을 한 번에 삭제 할 수 있습니다 (복구는 불가합니다)
            </p>
          </div>
        </div>

        {/* 구분선 */}
        <div className="w-full h-[1px] bg-border mt-[24px]" />

        {/* 문의 */}
        <div className="px-[32px] pt-[22px]">
          <h3 className="text-[16px] font-semibold text-primary-text-darker tracking-[-0.4px] leading-[25px]">
            문의
          </h3>
          <p className="text-[12px] font-medium text-[#949494] tracking-[-0.3px] leading-[20px] mt-[16px]">
            개인정보 처리와 삭제 절차에 대해 더 알고 싶으신가요?
          </p>
          <button className="mt-[24px] text-[16px] font-semibold text-primary tracking-[-0.4px] leading-[25px]">
            고객 지원 문의하기
          </button>
        </div>
      </main>

      <BottomTabBar />
      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-[100px]" />
    </div>
  );
}

export default PrivacySettings;
