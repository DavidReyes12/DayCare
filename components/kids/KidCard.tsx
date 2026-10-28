export type KidBadgeVariant = "allergy" | "action";

export type KidCardBadge = {
  label: string;
  variant: KidBadgeVariant;
};

export type KidCardProps = {
  id: string;
  name: string;
  avatarLetter: string;
  avatarBg: string;
  avatarColor: string;
  meta: string;
  badge?: KidCardBadge;
};

const BADGE_STYLES: Record<KidBadgeVariant, { bg: string; color: string }> = {
  allergy: { bg: "#FBD8CC", color: "#D9684A" },
  action: { bg: "#F9D2DE", color: "#C56486" },
};

export default function KidCard({
  id,
  name,
  avatarLetter,
  avatarBg,
  avatarColor,
  meta,
  badge,
}: KidCardProps) {
  return (
    <a
      className="kid"
      href={`/kids/${id}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        minWidth: 0,
        background: "#FFFDF9",
        borderRadius: 18,
        padding: 16,
        boxShadow: "0 4px 14px -12px rgba(120,90,60,.5)",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: avatarBg,
          color: avatarColor,
          fontFamily: "Fredoka",
          fontWeight: 600,
          fontSize: 19,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "none",
        }}
      >
        {avatarLetter}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "Fredoka",
            fontWeight: 600,
            fontSize: 16,
            color: "#3F362E",
          }}
        >
          {name}
        </div>
        <div style={{ fontSize: 13, color: "#A89A8B" }}>{meta}</div>
      </div>
      {badge ? (
        <span
          style={{
            flex: "none",
            fontSize: 11,
            fontWeight: 800,
            padding: "5px 9px",
            borderRadius: 999,
            background: BADGE_STYLES[badge.variant].bg,
            color: BADGE_STYLES[badge.variant].color,
          }}
        >
          {badge.label}
        </span>
      ) : (
        <svg
          style={{ flex: "none" }}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#CBB89F"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </a>
  );
}
