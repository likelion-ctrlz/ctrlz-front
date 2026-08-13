import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Login() {
  const navigate = useNavigate();

  return (
    <div>
      <Header title="시작하기" />

      <div className="px-6">
        <h2 className="text-xl leading-snug mb-2">
          신청서 작성 없이,<br />지금 바로 시작해요
        </h2>
        <p className="text-gray-400 text-sm mb-16">
          전화방문 심사 없이 소셜로그인 한 번이면 충분해요
        </p>

        <div className="w-20 h-20 rounded-full bg-gray-100 mx-auto mb-16" />

        <button
          onClick={() => navigate("/profile-setup")}
          className="w-full py-4 bg-[#FEE500] rounded-lg text-sm mb-3"
        >
          카카오로 시작하기
        </button>

        <button
          onClick={() => navigate("/profile-setup")}
          className="w-full py-4 bg-white border border-gray-200 rounded-lg text-sm mb-6"
        >
          구글로 시작하기
        </button>

        <p className="text-center text-gray-400 text-xs">
          계속 진행 시 이용약관 및 개인정보처리방침에 동의하게 됩니다
        </p>
      </div>
    </div>
  );
}

export default Login;