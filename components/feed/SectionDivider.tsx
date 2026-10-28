type SectionDividerProps = {
  label: string;
};

export default function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        marginBottom: 14,
      }}
    >
      <span
        style={{
          fontSize: 12.5,
          fontWeight: 800,
          letterSpacing: ".8px",
          color: "#8A7C6D",
        }}
      >
        {label}
      </span>
      <span style={{ flex: 1, height: 1, background: "#E7DAC8" }} />
    </div>
  );
}
