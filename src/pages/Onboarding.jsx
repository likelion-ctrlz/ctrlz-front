import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import PrimaryButton from "../components/PrimaryButton";

function Onboarding() {
  const navigate = useNavigate();

  return (
    <Layout showHeader={false} showTabBar={false}>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 bg-[#f2f2f2] rounded-xl mb-6" />

        <h1 className="text-center text-2xl mb-2">CtrlZ</h1>
        <p className="text-center text-[#666] mb-10">
          지금 이 순간, 작은 발걸음부터
        </p>

        <PrimaryButton text="시작하기" onClick={() => navigate("/profile-setup")} />

        <p className="text-center text-[#999] text-[13px] mt-3">
          이미 계정이 있어요
        </p>
      </div>
    </Layout>
  );
}

export default Onboarding;
