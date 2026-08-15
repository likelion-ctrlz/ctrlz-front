import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    // TODO: 실제 업로드 & AI 인증 API 호출
    setTimeout(() => {
      setUploading(false);
      navigate(`/missions/${id}/result`, { state: { success: true } });
    }, 1500);
  };

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
        <span className="flex-1 text-center text-[15px] font-medium">미션</span>
        <div className="w-[34px]" />
      </header>

      <main className="flex-1 flex flex-col px-5 pt-4 pb-8">
        {/* 촬영 영역 */}
        {!photo ? (
          <>
            {/* 카메라 뷰파인더 영역 */}
            <div className="w-full aspect-square bg-gray-900 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
              {/* 코너 가이드 */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white rounded-br-lg" />

              {/* 중앙 원형 가이드 */}
              <div className="w-[106px] h-[106px] rounded-full border-2 border-white/50" />
            </div>

            <h3 className="text-[17px] font-medium mb-2">
              미션 인증 사진을 찍어주세요
            </h3>
            <p className="text-[13px] text-gray-500 mb-auto">
              촬영 시각과 위치가 자동으로 첨부 돼요
            </p>

            <p className="text-[12px] text-gray-400 text-center mb-4">
              갤러리 업로드는 지원하지 않아요. 실시간 촬영만 인증에 사용됩니다
            </p>

            {/* 촬영 버튼 — 실제로는 카메라 입력 */}
            <label className="w-full py-[22px] rounded-xl bg-primary text-white text-[16px] font-semibold text-center cursor-pointer block">
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
            {/* 촬영된 사진 미리보기 */}
            <div className="w-full aspect-square rounded-2xl mb-6 overflow-hidden">
              <img src={photo} alt="촬영된 사진" className="w-full h-full object-cover" />
            </div>

            <h3 className="text-[17px] font-medium mb-2">
              이 사진으로 인증할까요?
            </h3>
            <p className="text-[13px] text-gray-500 mb-auto">
              촬영 시각과 위치가 자동으로 첨부됩니다
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setPhoto(null)}
                className="flex-1 py-[18px] rounded-xl border border-gray-200 text-[14px] font-medium"
              >
                다시 촬영
              </button>
              <button
                onClick={handleSubmit}
                disabled={uploading}
                className="flex-1 py-[18px] rounded-xl bg-primary text-white text-[14px] font-semibold"
              >
                {uploading ? "인증 중..." : "인증하기"}
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default MissionVerify;
