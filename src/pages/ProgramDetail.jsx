import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import chevronLeft from "../assets/icon/chevron-left.png";
import { getHobbyDetail, applyHobby } from "../api/hobbiesApi";
import { getMe } from "../api/usersApi";

function ProgramDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [hobby, setHobby] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | error | done
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    Promise.all([getHobbyDetail(id), getMe()])
      .then(([hobbyData, me]) => {
        if (cancelled) return;
        setHobby(hobbyData);
        setTokenBalance(me.token_balance);
        setStatus("done");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleApply = async () => {
    if (applying) return;
    setApplying(true);
    setApplyError("");
    try {
      await applyHobby(id);
      navigate(`/programs/${id}/complete`);
    } catch (err) {
      setApplyError(err.message || "신청에 실패했어요. 다시 시도해주세요.");
    } finally {
      setApplying(false);
    }
  };

  const scheduleRows = hobby
    ? [
        ["일정", hobby.schedule],
        ["장소", hobby.location],
        ["소요 시간", hobby.duration],
        ["정원", hobby.capacity],
      ].filter(([, value]) => value)
    : [];

  const burdenRows = hobby
    ? [
        ["신체 활동", hobby.physical_burden],
        ["사회적 상호작용", hobby.social_burden],
        ["사전 준비", hobby.preparation_burden],
      ].filter(([, value]) => value)
    : [];

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      {/* Header */}
      <header className="relative flex items-center h-[53px] px-5">
        <button onClick={() => navigate("/programs")} className="w-[34px] h-[34px] flex items-center justify-center">
          <img src={chevronLeft} alt="" className="w-[34px] h-[34px]" />
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-primary tracking-[-0.5px] leading-[44px]">
          취미 프로그램
        </p>
      </header>

      {status === "loading" && (
        <p className="text-[14px] text-gray-muted text-center mt-10">불러오는 중이에요...</p>
      )}
      {status === "error" && (
        <p className="text-[14px] text-gray-muted text-center mt-10">
          정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
        </p>
      )}

      {status === "done" && (
        <main className="flex-1 overflow-y-auto pb-[130px]">
          {/* Hero image with gradient and title — 화면 폭 전체(모서리 없음) */}
          <div className="relative h-[245px] w-full overflow-hidden bg-gray-panel">
            {hobby.image_url && (
              <img src={hobby.image_url} alt={hobby.title} className="absolute inset-0 w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-45% to-primary-deep" />
            <p className="absolute bottom-5 left-5 text-[36px] font-bold text-white m-0 tracking-[-0.9px]">
              {hobby.title}
            </p>
          </div>

          {/* Tags */}
          {hobby.tags?.length > 0 && (
            <div className="flex gap-[6px] px-5 mt-4">
              {hobby.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[rgba(255,255,255,0.1)] border border-primary rounded-[15px] px-[20px] h-[30px] flex items-center text-[12px] text-primary tracking-[-0.3px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Details card */}
          {scheduleRows.length > 0 && (
            <div className="mx-5 mt-4 bg-[rgba(184,184,184,0.08)] rounded-[16px] px-[26px] py-4">
              <div className="space-y-[13px]">
                {scheduleRows.map(([label, value]) => (
                  <div key={label}>
                    <p className="text-[12px] text-black tracking-[-0.3px] m-0">{label}</p>
                    <p className="text-[11px] text-gray-muted tracking-[-0.275px] m-0 mt-1">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 이런 활동이에요 */}
          {hobby.detail_description && (
            <div className="px-5 mt-6">
              <p className="text-[16px] font-semibold text-black m-0 mb-3">이런 활동이에요</p>
              <div className="bg-[rgba(184,184,184,0.08)] rounded-[16px] px-[26px] py-4">
                <p className="text-[12px] text-primary tracking-[-0.3px] m-0 leading-[25px] whitespace-pre-line">
                  {hobby.detail_description}
                </p>
              </div>
            </div>
          )}

          {/* 부담 수준 */}
          {burdenRows.length > 0 && (
            <div className="px-5 mt-6">
              <p className="text-[16px] font-semibold text-black m-0 mb-3">부담 수준</p>
              <div className="bg-[rgba(184,184,184,0.08)] rounded-[16px] px-[26px] py-4">
                <div className="space-y-2">
                  {burdenRows.map(([label, value]) => (
                    <div key={label} className="flex justify-between text-[12px] tracking-[-0.3px]">
                      <span className="text-black">{label}</span>
                      <span className="text-primary">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 참여 조건 안내 */}
          {hobby.conditions?.length > 0 && (
            <div className="px-5 mt-6">
              <p className="text-[16px] font-semibold text-black m-0 mb-3">참여 조건 안내</p>
              <div className="bg-[rgba(184,184,184,0.08)] rounded-[16px] px-[26px] py-4">
                <div className="space-y-2 text-[12px] text-black tracking-[-0.3px]">
                  {hobby.conditions.map((cond) => (
                    <p key={cond} className="m-0">{cond}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 토큰 정보 */}
          <div className="mx-5 mt-6 bg-[rgba(184,184,184,0.08)] rounded-[16px] px-[26px] py-4">
            <div className="space-y-2 text-[12px] tracking-[-0.3px]">
              <div className="flex justify-between">
                <span className="text-black">참여에 필요한 토큰</span>
                <span className="text-primary font-semibold">{hobby.token_cost} 토큰</span>
              </div>
              <div className="flex justify-between text-[11px] tracking-[-0.275px]">
                <span className="text-gray-muted">내 보유 토큰</span>
                <span className="text-gray-muted">{tokenBalance} 토큰</span>
              </div>
            </div>
          </div>

          {applyError && (
            <p className="px-5 mt-3 text-[12px] font-medium text-danger tracking-[-0.3px]">{applyError}</p>
          )}

          {/* 참여 신청하기 버튼 */}
          <div className="px-5 mt-6">
            <button
              onClick={handleApply}
              disabled={applying || tokenBalance < hobby.token_cost}
              className="w-full h-[68px] bg-white border border-primary rounded-[16px] text-primary text-[20px] font-semibold tracking-[-0.5px] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {tokenBalance < hobby.token_cost ? "토큰이 부족해요" : applying ? "신청 중..." : "참여 신청하기"}
            </button>
          </div>
        </main>
      )}

      <BottomTabBar />
    </div>
  );
}

export default ProgramDetail;
