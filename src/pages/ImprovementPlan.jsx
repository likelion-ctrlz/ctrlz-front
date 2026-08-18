import { useNavigate } from "react-router-dom";
import chevronLeft from "../assets/icon/chevron-left.png";
import ellipseBg from "../assets/mypage/Ellipse.svg";
import IMPROVEMENT_CONTENT from "../data/improvementContent.js";

function ImprovementPlan() {
  const navigate = useNavigate();

  // 기본값: 은둔형 (추후 사용자 진단 유형에 따라 분기 가능)
  const type = "은둔형";
  const content = IMPROVEMENT_CONTENT[type];

  return (
    <div className="relative flex min-h-dvh flex-col bg-mint-light">
      {/* Header */}
      <header className="relative flex items-center h-[53px] px-5">
        <button onClick={() => navigate(-1)} className="w-[34px] h-[34px] flex items-center justify-center">
          <img src={chevronLeft} alt="" className="w-[34px] h-[34px]" />
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[18px] font-semibold text-primary tracking-[-0.45px] leading-[44px]">
          나를 위한 개선 방안
        </p>
      </header>

      <main className="flex-1 flex flex-col px-5 pb-[40px]">
        {/* 콘텐츠 카드 */}
        <div className="mt-[49px] bg-white border border-primary-sub3 rounded-[12px] px-[14px] py-[30px]">
          {/* 왜 개선해야 할까요? */}
          <h2 className="text-[20px] font-semibold text-primary tracking-[-0.5px] leading-[25px] text-center">
            왜 개선해야 할까요?
          </h2>
          <p className="mt-[20px] text-[14px] font-medium text-gray-muted tracking-[-0.35px] leading-[25px]">
            {content.why}
          </p>

          {/* 어떻게 개선해야 할까요? */}
          <h2 className="mt-[30px] text-[20px] font-semibold text-primary tracking-[-0.5px] leading-[25px] text-center">
            어떻게 개선해야 할까요?
          </h2>

          {/* 스텝 리스트 */}
          <div className="mt-[26px] flex flex-col gap-[14px]">
            {content.steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-[20px]">
                {/* 번호 원 - Ellipse.svg 배경 */}
                <div className="relative w-[36px] h-[36px] shrink-0 flex items-center justify-center">
                  <img src={ellipseBg} alt="" className="absolute inset-0 w-full h-full" />
                  <span className="relative text-[16px] font-semibold text-[#00CB93] tracking-[-0.4px]">{idx + 1}</span>
                </div>
                {/* 텍스트 */}
                <div className="flex flex-col justify-center pt-[2px]">
                  <p className="text-[14px] font-semibold text-primary tracking-[-0.35px] leading-[25px]">
                    {step.title}
                  </p>
                  <p className="text-[10px] font-medium text-gray-muted tracking-[-0.25px] leading-[25px]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 자세히 보기 */}
          <p className="mt-[24px] text-[16px] font-medium text-[#949494] tracking-[-0.4px] text-center">
            자세히 보기
          </p>
        </div>

        {/* 다음 버튼 */}
        <button
          onClick={() => navigate("/mypage")}
          className="mt-[24px] w-full h-[68px] bg-white border border-primary rounded-[16px] flex items-center justify-center"
        >
          <span className="text-[20px] font-semibold text-primary tracking-[-0.5px]">다음</span>
        </button>
      </main>
    </div>
  );
}

export default ImprovementPlan;
