import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import Header from "../components/Header";
import moroLv1 from "../assets/moro-lv1.png";
import { submitMission } from "../api/missionsApi";

// 로딩/완료 화면 배경 — 피그마의 방사형 그라데이션(중심 50%,59% / #00CB93 → 외곽 #C6F3E7)을
// 실측 픽셀 색상으로 검증해서 재현 (타원 반경이 화면보다 훨씬 커서 완만하게 퍼짐)
const RADIAL_BG =
  "radial-gradient(1281px 977px at 50% 59%, #00CB93 0%, #0CCE98 6.25%, #19D09E 12.5%, #32D5A8 25%, #4ADAB3 37.5%, #63DFBD 50%, #95E9D2 75%, #C6F3E7 100%)";

function MissionVerify() {
  const navigate = useNavigate();
  const { id } = useParams();
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  // idle: 촬영 대기 | loading: 달그락 달그락 | done: 미션 완료! 전환 화면
  const [stage, setStage] = useState("idle");
  const [error, setError] = useState("");
  const [cameraReady, setCameraReady] = useState(false);

  // 앱 화면 안에서 바로 실시간 카메라를 띄움 (네이티브 카메라 앱으로 나갔다 오지 않게)
  useEffect(() => {
    let cancelled = false;

    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: "environment" }, audio: false })
      .then((stream) => {
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraReady(true);
      })
      .catch(() => {
        if (!cancelled) {
          setError("카메라를 사용할 수 없어요. 카메라 권한을 허용한 뒤 다시 시도해주세요.");
        }
      });

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const handleCapture = async () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;
    setError("");

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.9));
    if (!blob) {
      setError("사진을 저장하지 못했어요. 다시 시도해주세요.");
      return;
    }

    setStage("loading");
    const photoUrl = URL.createObjectURL(blob);

    try {
      const result = await submitMission(id, {
        photo: new File([blob], "mission.jpg", { type: "image/jpeg" }),
        takenAt: new Date().toISOString(),
      });
      const resultWithPhoto = { ...result, photoUrl };

      if (result.ai_verdict) {
        setStage("done");
        setTimeout(() => {
          navigate(`/missions/${id}/result`, { state: resultWithPhoto });
        }, 900);
      } else {
        navigate(`/missions/${id}/result`, { state: resultWithPhoto });
      }
    } catch (err) {
      setStage("idle");
      setError(err.message || "인증에 실패했어요. 네트워크 상태를 확인하고 다시 시도해주세요.");
    }
  };

  if (stage === "loading" || stage === "done") {
    return (
      <div className="relative flex min-h-dvh flex-col" style={{ background: RADIAL_BG }}>
        <Header title="미션" invert />

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
      <Header title="미션" onBack={() => navigate(-1)} />

      <main className="flex-1 flex flex-col pb-[130px]">
        {/* 카메라 영역 — 실시간 카메라를 화면 안에 바로 띄우고, 가운데 버튼으로 촬영 */}
        <div className="relative w-full h-[363px] bg-black border-t border-b border-primary overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />
          <button
            onClick={handleCapture}
            disabled={!cameraReady}
            aria-label="촬영"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] rounded-full border-2 border-white/70 disabled:opacity-40"
          />
        </div>

        {/* 안내 텍스트 */}
        <h3 className="px-5 text-[24px] font-semibold text-black tracking-[-0.6px] leading-[30px] mt-[28px]">
          미션 인증 사진을 찍어주세요
        </h3>
        <p className="px-5 text-[16px] font-semibold text-gray-detail tracking-[-0.4px] leading-[30px] mt-[6px]">
          촬영 시각이 자동으로 첨부 돼요
        </p>

        {error && (
          <p className="px-5 text-[14px] font-medium text-danger tracking-[-0.35px] mt-[12px]">{error}</p>
        )}

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
