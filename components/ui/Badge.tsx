export type PostType = "LOGRO" | "ACTIVIDAD" | "ANUNCIO";

export type PostTypeColors = {
  bg: string;
  dot: string;
  text: string;
};

const POST_TYPE_STYLES: Record<PostType, PostTypeColors> = {
  LOGRO: { bg: "#CFEBD8", dot: "#3E9B6C", text: "#3E9B6C" },
  ACTIVIDAD: { bg: "#C7E7F1", dot: "#2E89A6", text: "#2E89A6" },
  ANUNCIO: { bg: "#CCD8F4", dot: "#4E72C8", text: "#4E72C8" },
};

type BadgeProps = {
  type: PostType;
};

export default function Badge({ type }: BadgeProps) {
  const colors = POST_TYPE_STYLES[type];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        padding: "6px 12px",
        borderRadius: 999,
        background: colors.bg,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: colors.dot,
        }}
      />
      <span
        style={{
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: ".5px",
          color: colors.text,
        }}
      >
        {type}
      </span>
    </div>
  );
}
