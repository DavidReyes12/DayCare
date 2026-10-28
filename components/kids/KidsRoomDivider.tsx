type KidsRoomDividerProps = {
  roomLabel: string;
  kidCount: number;
};

export default function KidsRoomDivider({
  roomLabel,
  kidCount,
}: KidsRoomDividerProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 14,
      }}
    >
      <span
        style={{
          fontSize: 12.5,
          fontWeight: 800,
          letterSpacing: ".8px",
          color: "#3F362E",
        }}
      >
        {roomLabel}
      </span>
      <span style={{ fontSize: 13, color: "#A89A8B" }}>
        {kidCount} niños
      </span>
      <span
        style={{ flex: 1, height: 1, background: "#E7DAC8" }}
      />
    </div>
  );
}
