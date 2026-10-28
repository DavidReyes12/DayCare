type KidAllergyAlertProps = {
  note: string;
};

export default function KidAllergyAlert({ note }: KidAllergyAlertProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        background: "#FBDAD6",
        borderRadius: 16,
        padding: "16px 18px",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 11,
          background: "#F4A8A0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
          <path d="M12 9v4M12 17h.01" />
        </svg>
      </div>
      <div>
        <div
          style={{
            fontWeight: 800,
            color: "#C5413A",
            fontSize: 15,
            marginBottom: 2,
          }}
        >
          Alergias y notas
        </div>
        <div style={{ color: "#B25249", fontSize: 14.5, lineHeight: 1.5 }}>
          {note}
        </div>
      </div>
    </div>
  );
}
