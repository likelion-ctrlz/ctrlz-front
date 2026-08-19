import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomTabBar from "../components/BottomTabBar";
import ProgramTabToggle from "../components/ProgramTabToggle";
import Header from "../components/Header";
import searchIcon from "../assets/program/Group 246.svg";
import locateIcon from "../assets/program/locate.png";
import { getPrograms } from "../api/programsApi";
import { getMe } from "../api/usersApi";

function ProgramLocal() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [programs, setPrograms] = useState([]);
  const [region, setRegion] = useState("");
  const [status, setStatus] = useState("loading"); // loading | error | done

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    getMe()
      .then((me) => {
        if (cancelled) return;
        setRegion(me.region || "");
        return getPrograms(me.region);
      })
      .then((data) => {
        if (cancelled || !data) return;
        setPrograms(data);
        setStatus("done");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = programs.filter((p) => {
    if (!search.trim()) return true;
    return p.title.includes(search.trim()) || (p.description || "").includes(search.trim());
  });

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <Header title="지역연계 프로그램" onBack={() => navigate("/programs")} />

      {/* Content */}
      <main className="flex-1 px-5 pb-[130px] overflow-y-auto">
        {/* Location + Tab toggle */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-[15px]">
            <img src={locateIcon} alt="" className="w-[21px] h-[26px]" />
            <span className="text-[16px] font-semibold text-primary underline decoration-primary underline-offset-4">
              {region || "지역 미설정"}
            </span>
          </div>
          <ProgramTabToggle active="local" />
        </div>

        <p className="text-[16px] font-semibold text-black mt-3 mb-1">
          내 근처 지역 프로그램을 찾아봐요
        </p>

        {/* Search bar */}
        <div className="relative my-4">
          <div className="absolute left-[12px] top-1/2 -translate-y-1/2">
            <img src={searchIcon} alt="" className="w-[16px] h-[16px]" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="프로그램 검색"
            className="w-full h-[39px] rounded-[15px] border border-[#00CB93] bg-[rgba(255,255,255,0.1)] pl-[36px] pr-4 text-[14px] outline-none"
          />
        </div>

        {/* Section title */}
        <p className="text-[16px] font-semibold text-black mb-3">나와 맞는 추천 프로그램</p>

        {status === "loading" && (
          <p className="text-[14px] text-gray-muted text-center mt-10">불러오는 중이에요...</p>
        )}
        {status === "error" && (
          <p className="text-[14px] text-gray-muted text-center mt-10">
            프로그램을 불러오지 못했어요. 잠시 후 다시 시도해주세요.
          </p>
        )}
        {status === "done" && filtered.length === 0 && (
          <p className="text-[14px] text-gray-muted text-center mt-10">조건에 맞는 프로그램이 없어요.</p>
        )}

        {/* Program cards */}
        <div className="flex flex-col gap-4">
          {filtered.map((program) => (
            <div
              key={program.program_id}
              onClick={() => navigate(`/programs/local/${program.program_id}`)}
              className="rounded-[16px] border border-primary bg-[rgba(255,255,255,0.76)] cursor-pointer pb-[20px]"
            >
              {/* Image area with gradient overlay */}
              <div className="relative h-[194px] rounded-[14px] mx-4 mt-[16px] overflow-hidden bg-gray-panel">
                {program.image_url && (
                  <img src={program.image_url} alt={program.title} className="absolute inset-0 w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 rounded-[14px] bg-gradient-to-b from-[#FFFFFF00] to-[#007C57]" />
                <p className="absolute bottom-4 left-4 text-[24px] font-bold text-white m-0">
                  {program.title}
                </p>
              </div>

              {/* Tags — 이미지 아래에 배치 */}
              <div className="flex flex-wrap gap-[6px] px-4 mt-[14px]">
                {[program.region, program.agency_name].filter(Boolean).map((tag) => (
                  <span
                    key={tag}
                    className="bg-[rgba(255,255,255,0.1)] border border-primary rounded-[15px] px-[14px] h-[23px] flex items-center text-[10px] text-primary tracking-[-0.25px] whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="px-4 mt-[12px] text-[14px] text-gray-muted tracking-[-0.35px] m-0">
                {program.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      <BottomTabBar />
    </div>
  );
}

export default ProgramLocal;
