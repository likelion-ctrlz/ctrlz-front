import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import ProfileSetup from "./pages/ProfileSetup";
import SelfDiagnosis from "./pages/SelfDiagnosis";
import DiagnosisResult from "./pages/DiagnosisResult";
import Home from "./pages/Home";
import MissionList from "./pages/MissionList";
import MissionDetail from "./pages/MissionDetail";
import MissionVerify from "./pages/MissionVerify";
import MissionResult from "./pages/MissionResult";
import HobbyList from "./pages/HobbyList";
import HobbyDetail from "./pages/HobbyDetail";
import Diary from "./pages/Diary";
import DiaryReport from "./pages/DiaryReport";
import ProgramList from "./pages/ProgramList";
import ProgramDetail from "./pages/ProgramDetail";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <BrowserRouter>
      <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-white">
        <Routes>
          {/* Auth */}
          <Route path="/" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />

          {/* Diagnosis */}
          <Route path="/diagnosis" element={<SelfDiagnosis />} />
          <Route path="/diagnosis/result" element={<DiagnosisResult />} />

          {/* Main */}
          <Route path="/home" element={<Home />} />

          {/* Mission */}
          <Route path="/missions" element={<MissionList />} />
          <Route path="/missions/:id" element={<MissionDetail />} />
          <Route path="/missions/:id/verify" element={<MissionVerify />} />
          <Route path="/missions/:id/result" element={<MissionResult />} />

          {/* Hobby */}
          <Route path="/hobbies" element={<HobbyList />} />
          <Route path="/hobbies/:id" element={<HobbyDetail />} />

          {/* Diary */}
          <Route path="/diary" element={<Diary />} />
          <Route path="/diary/report" element={<DiaryReport />} />

          {/* Program */}
          <Route path="/programs" element={<ProgramList />} />
          <Route path="/programs/:id" element={<ProgramDetail />} />

          {/* My Page */}
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
