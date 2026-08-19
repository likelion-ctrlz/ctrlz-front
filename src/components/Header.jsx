import chevronLeft from "../assets/icon/chevron-left.png";

// 앱 전반에서 반복되는 상단 헤더(뒤로가기 + 중앙 타이틀). 대부분의 페이지가 동일한 마크업을
// 그대로 복붙해 쓰고 있어서 하나로 통일함. 어두운 배경(초록/블랙) 위에 쓸 때는 invert로
// 아이콘·텍스트를 흰색으로 뒤집고, 타이틀 옆에 보조 텍스트가 필요하면(자가진단 문항 수 등) right로 넘기면 됨.
function Header({ title, onBack, invert = false, titleClassName = "", right }) {
  return (
    <header className="relative flex items-center h-[53px] px-5 z-10">
      <button onClick={onBack} className="w-[34px] h-[34px] flex items-center justify-center">
        <img src={chevronLeft} alt="" className={`w-[34px] h-[34px] ${invert ? "brightness-0 invert" : ""}`} />
      </button>
      {title && (
        <p
          className={
            titleClassName ||
            `absolute left-1/2 -translate-x-1/2 text-[20px] font-medium tracking-[-0.5px] leading-[44px] whitespace-nowrap ${
              invert ? "text-white" : "text-primary"
            }`
          }
        >
          {title}
        </p>
      )}
      {right}
    </header>
  );
}

export default Header;
