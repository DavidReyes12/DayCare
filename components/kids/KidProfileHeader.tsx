type KidProfileHeaderProps = {
  name: string;
  subtitle: string;
  avatarLetter: string;
  avatarBg: string;
  avatarColor: string;
  editHref: string;
};

export default function KidProfileHeader({
  name,
  subtitle,
  avatarLetter,
  avatarBg,
  avatarColor,
  editHref,
}: KidProfileHeaderProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      <div
        style={{
          width: 84,
          height: 84,
          borderRadius: "50%",
          background: avatarBg,
          color: avatarColor,
          fontFamily: "Fredoka",
          fontWeight: 600,
          fontSize: 34,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
        }}
      >
        {avatarLetter}
      </div>
      <div style={{ flex: 1 }}>
        <h1
          style={{
            fontFamily: "Fredoka",
            fontWeight: 600,
            fontSize: 28,
            margin: 0,
            color: "#3F362E",
          }}
        >
          {name}
        </h1>
        <p style={{ margin: "3px 0 0", color: "#94887B", fontSize: 15 }}>
          {subtitle}
        </p>
      </div>
      <a
        href={editHref}
        style={{
          border: "1.5px solid #ECE0D0",
          background: "#FFFDF9",
          color: "#6E6359",
          fontWeight: 700,
          fontSize: 14,
          padding: "9px 16px",
          borderRadius: 12,
        }}
      >
        Editar
      </a>
    </div>
  );
}
