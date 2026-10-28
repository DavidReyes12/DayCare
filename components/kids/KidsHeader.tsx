type KidsHeaderProps = {
  addHref: string;
};

export default function KidsHeader({ addHref }: KidsHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 22,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 12.5,
            fontWeight: 800,
            letterSpacing: ".8px",
            color: "#D9583C",
            marginBottom: 4,
          }}
        >
          GESTIÓN
        </div>
        <h1
          style={{
            fontFamily: "Fredoka",
            fontWeight: 600,
            fontSize: 30,
            margin: 0,
            color: "#3F362E",
          }}
        >
          Niños
        </h1>
      </div>
      <a
        href={addHref}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "11px 18px",
          borderRadius: 14,
          background: "linear-gradient(180deg,#F4977E,#EE8164)",
          color: "#fff",
          fontWeight: 800,
          fontSize: 14.5,
          boxShadow: "0 8px 18px -8px rgba(238,129,100,.7)",
        }}
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        Agregar niño
      </a>
    </div>
  );
}
