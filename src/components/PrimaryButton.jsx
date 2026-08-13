function PrimaryButton({ text, onClick, disabled = false, variant = "black" }) {
  const styles = {
    black: "bg-black text-white",
    disabled: "bg-gray-300 text-white",
    kakao: "bg-[#FEE500] text-black",
    outline: "bg-white text-black border border-gray-200",
  };

  const style = disabled ? styles.disabled : styles[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-4 rounded-lg text-base ${style}`}
    >
      {text}
    </button>
  );
}

export default PrimaryButton;