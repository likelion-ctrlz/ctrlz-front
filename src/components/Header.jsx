import { useNavigate } from "react-router-dom";

function Header({ title, showBack = true }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between py-4 px-5 border-b border-[#eee]">
      <div className="w-6">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="bg-transparent border-none text-xl p-0"
          >
            {"<"}
          </button>
        )}
      </div>

      <h1 className="text-[17px] font-semibold m-0">{title}</h1>

      <div className="w-6 h-6 rounded-full border border-[#ddd]" />
    </div>
  );
}

export default Header;
