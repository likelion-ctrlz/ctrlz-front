import { useNavigate } from "react-router-dom";

function Header({ title, showBack = true }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px",
        borderBottom: "1px solid #eee",
      }}
    >
      <div style={{ width: 24 }}>
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            style={{ background: "none", border: "none", fontSize: 20, padding: 0 }}
          >
            {"<"}
          </button>
        )}
      </div>

      <h1 style={{ fontSize: 17, fontWeight: 600, margin: 0 }}>{title}</h1>

      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          border: "1px solid #ddd",
        }}
      />
    </div>
  );
}

export default Header;
