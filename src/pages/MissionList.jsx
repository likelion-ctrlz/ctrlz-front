import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const MISSIONS = [
  { id: 1, title: "창문 열고 3분 바람 쐬기", level: "난이도 하", token: "+10" },
  { id: 2, title: "편의점 다녀오기", level: "난이도 하", token: "+20" },
  { id: 3, title: "근처 공원 다녀오기", level: "난이도 하", token: "+20" },
  { id: 4, title: "동네 카페에서 15분 머물기", level: "난이도 하", token: "+20" },
];

const FILTERS = ["전체", "오늘", "난이도 별"];

function MissionList() {
  const [filter, setFilter] = useState("전체");
  const navigate = useNavigate();

  return (
    <Layout title="미션" showBack={false}>
      <div className="flex gap-2 pb-4">
        {FILTERS.map((f) => (
          <span
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-2xl text-[13px] cursor-pointer ${
              filter === f ? "bg-black text-white" : "bg-[#f2f2f2] text-[#333]"
            }`}
          >
            {f}
          </span>
        ))}
      </div>

      {MISSIONS.map((m) => (
        <div
          key={m.id}
          onClick={() => navigate(`/missions/${m.id}`)}
          className="flex gap-3 py-3 border-b border-[#f0f0f0] cursor-pointer"
        >
          <div className="w-14 h-14 bg-[#f2f2f2] rounded-lg shrink-0" />
          <div>
            <p className="text-[15px] mb-1">{m.title}</p>
            <p className="text-xs text-[#999]">{m.level}</p>
          </div>
          <span className="ml-auto text-[13px] text-[#666] self-center">{m.token}</span>
        </div>
      ))}
    </Layout>
  );
}

export default MissionList;
