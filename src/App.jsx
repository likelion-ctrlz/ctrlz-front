import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import ProfileSetup from "./pages/ProfileSetup";
import SelfDiagnosis from "./pages/SelfDiagnosis";
import DiagnosisResult from "./pages/DiagnosisResult";
import Home from "./pages/Home";
import MissionList from "./pages/MissionList";
import MissionDetail from "./pages/MissionDetail";
import MissionVerify from "./pages/MissionVerify";
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
      <div className="mx-auto min-h-screen w-full max-w-[430px] bg-white">
        <Routes>
          <Route path="/" element={<Onboarding />} />
      
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/diagnosis" element={<SelfDiagnosis />} />
          <Route path="/diagnosis/result" element={<DiagnosisResult />} />
          <Route path="/home" element={<Home />} />
          <Route path="/missions" element={<MissionList />} />
          <Route path="/missions/:id" element={<MissionDetail />} />
          <Route path="/missions/:id/verify" element={<MissionVerify />} />
          <Route path="/hobbies" element={<HobbyList />} />
          <Route path="/hobbies/:id" element={<HobbyDetail />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/diary/report" element={<DiaryReport />} />
          <Route path="/programs" element={<ProgramList />} />
          <Route path="/programs/:id" element={<ProgramDetail />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;