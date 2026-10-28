export default function KidsSearchBar() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 11,
        background: "#FFFDF9",
        border: "1px solid #ECE0D0",
        borderRadius: 14,
        padding: "12px 16px",
        marginBottom: 22,
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#B0A290"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        placeholder="Buscar niño…"
        style={{
          flex: 1,
          border: "none",
          background: "none",
          fontSize: 15,
          color: "#3F362E",
        }}
      />
    </div>
  );
}
