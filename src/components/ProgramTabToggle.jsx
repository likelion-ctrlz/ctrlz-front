import { useNavigate } from "react-router-dom";

function ProgramTabToggle({ active }) {
  const navigate = useNavigate();

  const segmentClass = (isActive) =>
    `px-[6px] h-full flex items-center justify-center whitespace-nowrap text-[12px] tracking-[-0.3px] ${
      isActive
        ? "bg-primary text-white font-semibold"
        : "bg-[#f4f4f4] text-gray-icon font-medium"
    }`;

  const hobbyButton = (
    <button
      key="hobby"
      type="button"
      onClick={() => active !== "hobby" && navigate("/programs")}
      className={segmentClass(active === "hobby")}
    >
      취미
    </button>
  );

  const localButton = (
    <button
      key="local"
      type="button"
      onClick={() => active !== "local" && navigate("/programs/local")}
      className={segmentClass(active === "local")}
    >
      지역연계
    </button>
  );

  return (
    <div className="flex h-[21px] rounded-[6px] overflow-hidden shrink-0">
      {active === "local" ? [localButton, hobbyButton] : [hobbyButton, localButton]}
    </div>
  );
}

export default ProgramTabToggle;
