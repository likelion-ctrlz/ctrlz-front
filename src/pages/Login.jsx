import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Login() {
  const navigate = useNavigate();

  return (
    <div>
      <Header title="시작하기" />

      <div className="p-6">
        <h2 className="text-xl leading-[1.4] mb-2">
          신청서 작성 없이,<br />지금 바로 시작해요
        </h2>
        <p className="text-[#888] text-sm mb-[60px]">
          전화방문 심사 없이 소셜로그인 한 번이면 충분해요
        </p>

        <div className="w-20 h-20 rounded-full bg-[#f2f2f2] mx-auto mb-[60px]" />

        <button
          onClick={() => navigate("/profile-setup")}
          className="w-full p-4 bg-[#FEE500] border-none rounded-[10px] text-[15px] mb-3"
        >
          카카오로 시작하기
        </button>

        <button
          onClick={() => navigate("/profile-setup")}
          className="w-full p-4 bg-white border border-[#ddd] rounded-[10px] text-[15px] mb-6"
        >
          구글로 시작하기
        </button>

        <p className="text-center text-[#999] text-xs">
          계속 진행 시 이용약관 및 개인정보처리방침에 동의하게 됩니다
        </p>
      </div>
    </div>
  );
}

export default Login;
