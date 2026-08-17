import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import moroLv1 from "../assets/moro-lv1.png";

function MissionVerify() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleCapture = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhoto(url);
    }
  };

  const handleSubmit = () => {
    setUploading(true);
    // 3초 대기 후 완료 (달그락 모션 보여주기)
    setTimeout(() => {
      setUploading(false);
      navigate(`/missions/${id}/result`, { state: { success: true } });
    }, 3000);
  };

  return (
    <div className={`relative flex min-h-dvh flex-col ${uploading ? "bg-[#00CB93]" : "bg-white"}`}>
      <div className="h-[44px]" />

      {/* Header */}
      <header className="relative flex items-center h-[53px] px-5">
        <button onClick={() => navigate(-1)} className="w-[34px] h-[34px] flex items-center justify-center">
          <svg width="8" height="15" viewBox="0 0 8 15" fill="none">
            <path d="M7 1L1 7.5L7 14" stroke={uploading ? "white" : "#111"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <p className={`absolute left-1/2 -translate-x-1/2 text-[20px] font-medium tracking-[-0.5px] leading-[44px] ${uploading ? "text-white" : "text-[#00CB93]"}`}>
          미션
        </p>
      </header>

      <main className="flex-1 flex flex-col px-5 pb-[130px]">
        {/* 달그락 모션 — 인증 대기 중 */}
        {uploading ? (
          <div className="flex-1 flex flex-col items-center justify-center -mt-[53px]">
            {/* 원형 배경 */}
            <div className="w-[250px] h-[250px] rounded-full border-[3px] border-white/30 flex items-center justify-center">
              <img
                src={moroLv1}
                alt="모로 알"
                className="w-[146px] h-auto object-contain animate-wobble"
              />
            </div>
            <p className="text-[20px] font-semibold text-white tracking-[-0.5px] mt-[40px]">
              달그락 달그락...
            </p>
          </div>
        ) : !photo ? (
          <>
            {/* 카메라 영역 */}
            <div className="w-full aspect-square bg-[#F5F5F5] rounded-[16px] mt-[19px] flex items-center justify-center">
              <div className="w-[80px] h-[80px] rounded-full border-2 border-[#CACACA]" />
            </div>

            {/* 안내 텍스트 */}
            <h3 className="text-[20px] font-semibold text-black tracking-[-0.5px] mt-[28px]">
              미션 인증 사진을 찍어주세요
            </h3>
            <p className="text-[14px] font-medium text-[#949494] tracking-[-0.35px] leading-[25px] mt-[8px]">
              촬영 시각과 위치가 자동으로 첨부 돼요
            </p>

            <div className="flex-1" />

            <p className="text-[12px] font-medium text-[#CACACA] tracking-[-0.3px] text-center mb-[16px]">
              갤러리 업로드는 지원하지 않아요. 실시간 촬영만 인증에 사용 됩니다
            </p>

            {/* 촬영 버튼 */}
            <label className="w-full h-[68px] rounded-[16px] bg-white border border-[#00CB93] text-[#00CB93] text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center cursor-pointer">
              사진 촬영하기
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleCapture}
                className="hidden"
              />
            </label>
          </>
        ) : (
          <>
            {/* 미리보기 */}
            <div className="w-full aspect-square rounded-[16px] mt-[19px] overflow-hidden">
              <img src={photo} alt="촬영된 사진" className="w-full h-full object-cover" />
            </div>

            <h3 className="text-[20px] font-semibold text-black tracking-[-0.5px] mt-[28px]">
              이 사진으로 인증할까요?
            </h3>
            <p className="text-[14px] font-medium text-[#949494] tracking-[-0.35px] leading-[25px] mt-[8px]">
              촬영 시각과 위치가 자동으로 첨부됩니다
            </p>

            <div className="flex-1" />

            <div className="flex gap-3">
              <button
                onClick={() => setPhoto(null)}
                className="flex-1 h-[68px] rounded-[16px] border border-[#CACACA] text-[#949494] text-[16px] font-semibold"
              >
                다시 촬영
              </button>
              <button
                onClick={handleSubmit}
                disabled={uploading}
                className="flex-1 h-[68px] rounded-[16px] bg-white border border-[#00CB93] text-[#00CB93] text-[16px] font-semibold"
              >
                {uploading ? "인증 중..." : "인증하기"}
              </button>
            </div>
          </>
        )}
      </main>

      {!uploading && <BottomTabBar />}
      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-black rounded-[100px]" />
    </div>
  );
}

export default MissionVerify;
