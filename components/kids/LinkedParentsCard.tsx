import Link from "next/link";

export type ParentStatus = "ACTIVA" | "PENDIENTE";

export type LinkedParent = {
  name: string;
  relationInfo: string;
  avatarLetter: string;
  avatarBg: string;
  status: ParentStatus;
};

type LinkedParentsCardProps = {
  parents: LinkedParent[];
  summaryHref: string;
  linkHref: string;
};

const STATUS_BADGE_STYLES: Record<
  ParentStatus,
  { bg: string; color: string }
> = {
  ACTIVA: { bg: "#CFEBD8", color: "#3E9B6C" },
  PENDIENTE: { bg: "#F7E7A6", color: "#9A7B1E" },
};

export default function LinkedParentsCard({
  parents,
  summaryHref,
  linkHref,
}: LinkedParentsCardProps) {
  return (
    <div style={{ width: 300, flex: "none", display: "flex", flexDirection: "column", gap: 14 }}>
      <Link
        href={summaryHref}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 9,
          width: "100%",
          padding: 13,
          borderRadius: 14,
          background: "#3F362E",
          color: "#fff",
          fontWeight: 800,
          fontSize: 15,
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
        Resumen del día
      </Link>

      <div
        style={{
          background: "#FFFDF9",
          border: "1px solid #ECE0D0",
          borderRadius: 16,
          padding: "16px 18px",
        }}
      >
        <div
          style={{
            fontSize: 12.5,
            fontWeight: 800,
            letterSpacing: ".8px",
            color: "#8A7C6D",
            marginBottom: 14,
          }}
        >
          PADRES VINCULADOS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {parents.map((parent) => (
            <div
              key={parent.name}
              style={{ display: "flex", alignItems: "center", gap: 12 }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: parent.avatarBg,
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
                {parent.avatarLetter}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 14.5,
                    color: "#3F362E",
                  }}
                >
                  {parent.name}
                </div>
                <div style={{ fontSize: 12.5, color: "#A89A8B" }}>
                  {parent.relationInfo}
                </div>
              </div>
              <span
                style={{
                  flex: "none",
                  fontSize: 10.5,
                  fontWeight: 800,
                  padding: "4px 9px",
                  borderRadius: 999,
                  background: STATUS_BADGE_STYLES[parent.status].bg,
                  color: STATUS_BADGE_STYLES[parent.status].color,
                }}
              >
                {parent.status}
              </span>
            </div>
          ))}

          <Link
            href={linkHref}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "8px 0 0",
            }}
          >
            <span
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1.5px dashed #D8CBBA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#B0A290",
                flex: "none",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
            <span style={{ fontWeight: 800, fontSize: 14.5, color: "#C5503A" }}>
              Vincular otro padre
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
