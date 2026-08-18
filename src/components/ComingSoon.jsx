import { useNavigate } from "react-router-dom";
import chevronLeft from "../assets/icon/chevron-left.png";
import moroLv1 from "../assets/moro-lv1.png";

// 아직 구현되지 않은 기능에 자리표시자로 붙이는 공용 "개발 중입니다" 화면.
// title/backTo/message만 라우트별로 다르게 넘겨서 여러 곳에서 재사용함.
function ComingSoon({ title, backTo = "/home", message = "곧 만나보실 수 있어요" }) {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-dvh flex-col bg-white">
      <header className="relative flex items-center h-[53px] px-5">
        <button onClick={() => navigate(backTo)} className="w-[34px] h-[34px] flex items-center justify-center">
          <img src={chevronLeft} alt="" className="w-[34px] h-[34px]" />
        </button>
        {title && (
          <p className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium text-primary tracking-[-0.5px] leading-[44px]">
            {title}
          </p>
        )}
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-5">
        <img src={moroLv1} alt="" className="w-[135px] h-[203px] object-contain mb-[24px]" />
        <p className="text-[18px] font-semibold text-primary tracking-[-0.45px] text-center">
          개발 중입니다...
        </p>
        <p className="text-[14px] font-medium text-gray-muted tracking-[-0.35px] text-center mt-[8px]">
          {message}
        </p>
      </main>
    </div>
  );
}

export default ComingSoon;
