import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const PROGRAMS = [{ id: 1, title: "서울 청년기지개 센터", type: "지역 프로그램" }];

function ProgramList() {
  const navigate = useNavigate();

  return (
    <Layout title="지역 프로그램" showTabBar={false}>
      <div>
        <h2 className="text-lg mb-4">가까운 기관을 찾아보세요</h2>

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
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default ProgramList;
