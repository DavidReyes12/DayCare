type ComposerProps = {
  avatarLetter: string;
  createHref: string;
};

export default function Composer({
  avatarLetter,
  createHref,
}: ComposerProps) {
  return (
    <a
      href={createHref}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        background: "#FFFDF9",
        border: "1px solid #ECE0D0",
        borderRadius: 18,
        padding: "14px 18px",
        marginBottom: 24,
        boxShadow: "0 4px 14px -10px rgba(120,90,60,.4)",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "#F2937A",
          color: "#fff",
          fontFamily: "Fredoka",
          fontWeight: 600,
          fontSize: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
        }}
      >
        {avatarLetter}
      </div>
      <span style={{ flex: 1, color: "#A89A8B", fontSize: 15 }}>
        Compartí un momento…
      </span>
      <span
        style={{
          width: 38,
          height: 38,
          borderRadius: 12,
          background: "#FBE3D8",
          color: "#E0654A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </span>
    </a>
  );
}
