import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import Header from "../components/Header";
import { getMissionImage } from "../data/missions";
import { getMissionDetail } from "../api/missionsApi";

function MissionDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [mission, setMission] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | error | done

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    getMissionDetail(id)
      .then((data) => {
        if (cancelled) return;
        setMission(data);
        setStatus("done");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">
      <Header title="미션" onBack={() => navigate(-1)} />

      {status === "loading" && (
        <p className="text-[14px] text-gray-muted text-center mt-10">불러오는 중이에요...</p>
      )}
      {status === "error" && (
        <p className="text-[14px] text-gray-muted text-center mt-10">
          미션 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
        </p>
      )}

      {status === "done" && (
        <main className="flex-1 flex flex-col px-5 pt-[35px] pb-[110px]">
          {/* 미션 카드 */}
          <div className="w-full h-[122px] rounded-[16px] border border-primary relative flex items-center px-6">
            <div className="relative w-[75px] h-[75px] flex items-center justify-center shrink-0">
              {/* 아이콘 뒤 글로우 */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(0,203,147,0.45) 0%, rgba(0,203,147,0.15) 45%, rgba(0,203,147,0) 75%)",
                }}
              />
              <img
                src={getMissionImage({ id: mission.mission_id })}
                alt=""
                className="relative max-w-full max-h-full object-contain"
              />
            </div>
            <div className="ml-10">
              <p className="text-[16px] font-semibold text-black tracking-[-0.4px] leading-[25px]">
                {mission.title}
              </p>
              <p className="text-[10px] font-medium text-gray-icon tracking-[-0.25px] leading-[25px]">
                {mission.description}
              </p>
            </div>
          </div>

          {/* 미션 안내 */}
          <p className="text-[12px] font-medium text-gray-icon tracking-[-0.3px] leading-[25px] mt-[25px]">
            미션 안내
          </p>
          <p className="text-[14px] text-primary-text-dark tracking-[-0.35px] leading-[25px] mt-[6px] whitespace-pre-line">
            {mission.detail_description}
          </p>

          {/* 뱃지 */}
          <div className="flex gap-[15px] mt-[20px]">
            <span className="px-4 h-[30px] rounded-[15px] border border-primary bg-[rgba(255,255,255,0.1)] text-[12px] font-medium text-primary tracking-[-0.3px] flex items-center">
              난이도 {mission.difficulty_label}
            </span>
            <span className="px-4 h-[30px] rounded-[15px] border border-primary bg-[rgba(255,255,255,0.1)] text-[12px] font-medium text-primary tracking-[-0.3px] flex items-center">
              토큰 {mission.token_reward + mission.bonus_token}+
            </span>
            <span className="px-4 h-[30px] rounded-[15px] border border-primary bg-[rgba(255,255,255,0.1)] text-[12px] font-medium text-primary tracking-[-0.3px] flex items-center">
              + {mission.xp_reward} XP
            </span>
          </div>

          {/* 인증 조건 */}
          <div
            className="w-full rounded-[16px] mt-[48px] px-5 py-[13px]"
            style={{ backgroundColor: "rgba(184,184,184,0.08)" }}
          >
            <p className="text-[12px] font-medium text-gray-icon tracking-[-0.3px] mb-2">
              인증 조건 확인
            </p>
            {mission.conditions.map((cond, i) => (
              <p
                key={i}
                className="text-[14px] font-medium text-primary tracking-[-0.35px] leading-[25px]"
              >
                ✓ {cond}
              </p>
            ))}
          </div>

          <div className="flex-1" />

          {/* 사진 촬영 버튼 */}
          <button
            onClick={() => navigate(`/missions/${id}/verify`)}
            className="w-full h-[68px] rounded-[16px] bg-white border border-primary text-primary text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center mt-[20px]"
          >
            사진 촬영하기
          </button>
        </main>
      )}

      <BottomTabBar />
    </div>
  );
}

export default MissionDetail;
