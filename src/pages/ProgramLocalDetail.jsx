import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import Header from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";
import { getPrograms, applyProgram } from "../api/programsApi";

function ProgramLocalDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | error | done
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    // 백엔드에 단건 조회(GET /programs/{id})가 아직 없어서 목록에서 찾음
    getPrograms()
      .then((data) => {
        if (cancelled) return;
        const found = data.find((p) => p.program_id === id);
        if (!found) {
          setStatus("error");
          return;
        }
        setProgram(found);
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
      await applyProgram(id);
      if (program?.apply_url) {
        window.open(program.apply_url, "_blank", "noopener,noreferrer");
      }
      navigate(`/programs/local/${id}/complete`);
    } catch (err) {
      setApplyError(err.message || "신청에 실패했어요. 다시 시도해주세요.");
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <Header title="지역연계 프로그램" onBack={() => navigate("/programs/local")} />

      {status === "loading" && (
        <LoadingScreen fullScreen={false} />
      )}
      {status === "error" && (
        <p className="text-[14px] text-gray-muted text-center mt-10">
          정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
        </p>
      )}

      {status === "done" && (
        <main className="flex-1 overflow-y-auto pb-[110px]">
          {/* Hero image with gradient and title */}
          <div className="relative h-[245px] w-full overflow-hidden bg-gray-panel">
            {program.image_url && (
              <img src={program.image_url} alt={program.title} className="absolute inset-0 w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-45% to-primary-deep" />
            <p className="absolute bottom-5 left-5 text-[36px] font-bold text-white m-0 tracking-[-0.9px]">
              {program.title}
            </p>
          </div>

          {/* Tags */}
          {(program.region || program.agency_name) && (
            <div className="flex gap-[6px] px-5 mt-4">
              {[program.region, program.agency_name].filter(Boolean).map((tag) => (
                <span
                  key={tag}
                  className="bg-[rgba(255,255,255,0.1)] border border-primary rounded-[15px] px-[20px] h-[30px] flex items-center text-[12px] text-primary tracking-[-0.3px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* 이런 프로그램이에요 */}
          {program.description && (
            <div className="px-5 mt-6">
              <p className="text-[16px] font-semibold text-black m-0 mb-3">이런 프로그램이에요</p>
              <div className="bg-[rgba(184,184,184,0.08)] rounded-[16px] px-5 py-4">
                <p className="text-[12px] text-primary m-0 leading-[25px] whitespace-pre-line">
                  {program.description}
                </p>
              </div>
            </div>
          )}

          {/* 접수 방법 안내 section */}
          <div className="px-5 mt-8">
            <p className="text-[16px] font-semibold text-black m-0">접수 방법 안내</p>
            <p className="text-[14px] text-gray-muted m-0 mt-1 mb-4">한 단계씩 천천히 진행해봐요</p>

            {/* 접수 절차 */}
            <div className="bg-[rgba(184,184,184,0.08)] rounded-[16px] px-5 py-4 mb-4">
              <p className="text-[12px] font-medium text-black m-0 mb-2">접수 절차</p>
              <ol className="list-decimal pl-4 space-y-1">
                <li className="text-[11px] text-gray-muted">아래 신청 버튼을 눌러 접수 양식을 작성해요</li>
                <li className="text-[11px] text-gray-muted">담당자가 1~2일 내로 연락하여 일정을 안내해드려요</li>
                <li className="text-[11px] text-gray-muted">첫 상담은 대면 또는 전화로 진행할 수 있어요</li>
                <li className="text-[11px] text-gray-muted">이후 프로그램 참여 여부를 편하게 결정하면 돼요</li>
              </ol>
            </div>

            {/* 기관 연락처 */}
            {program.contact && (
              <div className="bg-[rgba(184,184,184,0.08)] rounded-[16px] px-5 py-4 mb-4">
                <p className="text-[12px] font-medium text-black m-0 mb-2">기관 연락처</p>
                <p className="text-[11px] text-gray-muted m-0">{program.contact}</p>
              </div>
            )}

            {/* 접수 전에 궁금한 게 있다면 */}
            <div className="bg-[rgba(184,184,184,0.08)] rounded-[16px] px-5 py-4 mb-6">
              <p className="text-[12px] font-medium text-black m-0 mb-2">접수 전에 궁금한 게 있다면</p>
              <p className="text-[11px] text-gray-muted m-0">전화나 이메일로 먼저 물어봐도 괜찮아요 부담없이 연락해 보세요</p>
            </div>

            {applyError && (
              <p className="text-[12px] font-medium text-danger tracking-[-0.3px] mb-3">{applyError}</p>
            )}

            {/* 참여 신청하기 버튼 */}
            <button
              onClick={handleApply}
              disabled={applying}
              className="w-full h-[68px] bg-white border border-primary rounded-[16px] text-primary text-[20px] font-semibold cursor-pointer disabled:opacity-40"
            >
              {applying ? "신청 중..." : "참여 신청하기"}
            </button>
          </div>
        </main>
      )}

      <BottomTabBar />
    </div>
  );
}

export default ProgramLocalDetail;
