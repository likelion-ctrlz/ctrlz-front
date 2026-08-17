import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import moroLv1 from "../assets/moro-lv1.png";
import chevronLeft from "../assets/icon/chevron-left.png";

// 로딩/완료 화면 배경 — 피그마의 방사형 그라데이션(중심 50%,59% / #00CB93 → 외곽 #C6F3E7)을
// 실측 픽셀 색상으로 검증해서 재현 (타원 반경이 화면보다 훨씬 커서 완만하게 퍼짐)
const RADIAL_BG =
  "radial-gradient(1281px 977px at 50% 59%, #00CB93 0%, #0CCE98 6.25%, #19D09E 12.5%, #32D5A8 25%, #4ADAB3 37.5%, #63DFBD 50%, #95E9D2 75%, #C6F3E7 100%)";

function MissionVerify() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  // 실제 AI 인증 로직이 붙기 전까지, ?fail=1 로 실패 화면을 확인할 수 있게 함
  const forceFail = searchParams.get("fail") === "1";
  // idle: 촬영 대기 | loading: 달그락 달그락 | done: 미션 완료! 전환 화면
  const [stage, setStage] = useState("idle");

  const handleCapture = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (forceFail) {
      navigate(`/missions/${id}/result`, { state: { success: false } });
      return;
    }
    setStage("loading");
    // 달그락 달그락... 잠시 대기 후 "미션 완료!" 전환을 보여주고 결과 페이지로 이동
    setTimeout(() => {
      setStage("done");
      setTimeout(() => {
        navigate(`/missions/${id}/result`, { state: { success: true } });
      }, 900);
    }, 2200);
  };

  if (stage === "loading" || stage === "done") {
    return (
      <div className="relative flex min-h-dvh flex-col" style={{ background: RADIAL_BG }}>
        <header className="relative flex items-center h-[53px] px-5">
          <button className="w-[34px] h-[34px] flex items-center justify-center">
            <img src={chevronLeft} alt="" className="w-[34px] h-[34px] brightness-0 invert" />
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-white tracking-[-0.5px] leading-[44px]">
            미션
          </p>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center">
          <div className="w-[250px] h-[250px] rounded-full border-[3px] border-white/30 flex items-center justify-center">
            <img
              src={moroLv1}
              alt="모로 알"
              className={`w-[146px] h-auto object-contain ${stage === "loading" ? "animate-wobble" : ""}`}
            />
          </div>
          <p className="text-[24px] font-semibold text-white tracking-[-0.5px] mt-[40px]">
            {stage === "loading" ? "달그락 달그락..." : "미션 완료!"}
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">
      {/* Header */}
      <header className="relative flex items-center h-[53px] px-5">
        <button onClick={() => navigate(-1)} className="w-[34px] h-[34px] flex items-center justify-center">
          <img src={chevronLeft} alt="" className="w-[34px] h-[34px]" />
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-primary tracking-[-0.5px] leading-[44px]">
          미션
        </p>
      </header>

      <main className="flex-1 flex flex-col pb-[130px]">
        {/* 카메라 영역 — 탭하면 바로 촬영 (피그마와 동일하게 화면 폭 전체, 모서리 없음) */}
        <label className="relative w-full h-[363px] bg-[rgba(0,0,0,0.5)] border-t border-b border-primary flex items-center justify-center cursor-pointer">
          <div className="w-[80px] h-[80px] rounded-full border-2 border-white/70" />
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleCapture}
            className="hidden"
          />
        </label>

        {/* 안내 텍스트 */}
        <h3 className="px-5 text-[24px] font-semibold text-black tracking-[-0.6px] leading-[30px] mt-[28px]">
          미션 인증 사진을 찍어주세요
        </h3>
        <p className="px-5 text-[16px] font-semibold text-gray-detail tracking-[-0.4px] leading-[30px] mt-[6px]">
          촬영 시각과 위치가 자동으로 첨부 돼요
        </p>

        <div className="flex-1" />

        <p className="px-5 text-[12px] font-medium text-gray-muted tracking-[-0.3px] text-center mb-[16px]">
          갤러리 업로드는 지원하지 않아요. 실시간 촬영만 인증에 사용 됩니다
        </p>
      </main>

      <BottomTabBar />
    </div>
  );
}

export default MissionVerify;
