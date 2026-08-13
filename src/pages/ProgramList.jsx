import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const PROGRAMS = [
  { id: 1, title: "한붓 그리기", type: "1:1 지도", dist: "1.2 Km" },
  { id: 2, title: "도자기", type: "소규모 체험", dist: "1.2 Km" },
  { id: 3, title: "비누만들기", type: "소규모 체험", dist: "1.2 Km" },
  { id: 4, title: "체형교정", type: "1:1 지도", dist: "1.2 Km" },
];

const FILTERS = ["전체", "상담", "체험"];

function ProgramList() {
  const [filter, setFilter] = useState("전체");
  const navigate = useNavigate();

  return (
    <div>
      <Header title="지역 프로그램 기관" showBack={false} />

      <div className="px-6 pt-4">
        <input
          type="text"
          placeholder="지역 또는 프로그램 검색"
          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm mb-4"
        />

        <div className="flex gap-2 mb-4">
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

        {PROGRAMS.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/programs/${p.id}`)}
            className="flex gap-3 py-3 border-b border-gray-100 cursor-pointer"
          >
            <div className="w-14 h-14 bg-gray-100 rounded-lg flex-shrink-0" />
            <div>
              <p className="text-sm mb-1">{p.title}</p>
              <p className="text-xs text-gray-400">{p.type}</p>
            </div>
            <span className="ml-auto text-sm text-gray-500 self-center">{p.dist}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgramList;