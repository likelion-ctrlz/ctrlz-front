import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import BottomTabBar from "../components/BottomTabBar";

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
    <div className="pb-20">
      <Header title="미션" showBack={false} />

      <div className="flex gap-2 px-6 py-4">
        {FILTERS.map((f) => (
          <span
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-sm cursor-pointer ${
              filter === f ? "bg-black text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            {f}
          </span>
        ))}
      </div>

      <div className="px-6">
        {MISSIONS.map((m) => (
          <div
            key={m.id}
            onClick={() => navigate(`/missions/${m.id}`)}
            className="flex gap-3 py-3 border-b border-gray-100 cursor-pointer"
          >
            <div className="w-14 h-14 bg-gray-100 rounded-lg flex-shrink-0" />
            <div>
              <p className="text-sm mb-1">{m.title}</p>
              <p className="text-xs text-gray-400">{m.level}</p>
            </div>
            <span className="ml-auto text-sm text-gray-500 self-center">{m.token}</span>
          </div>
        ))}
      </div>

      <BottomTabBar />
    </div>
  );
}

export default MissionList;