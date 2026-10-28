export type KidInfoRow = {
  label: string;
  value: string;
};

type KidInfoCardProps = {
  rows: KidInfoRow[];
};

export default function KidInfoCard({ rows }: KidInfoCardProps) {
  return (
    <div
      style={{
        background: "#FFFDF9",
        border: "1px solid #ECE0D0",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      {rows.map((row, index) => (
        <div
          key={row.label}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "15px 18px",
            borderBottom:
              index < rows.length - 1 ? "1px solid #F0E6D8" : "none",
          }}
        >
          <span style={{ color: "#94887B", fontSize: 14.5 }}>
            {row.label}
          </span>
          <span
            style={{ fontWeight: 800, color: "#3F362E", fontSize: 14.5 }}
          >
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}
