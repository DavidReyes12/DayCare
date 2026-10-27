type FeedHeaderProps = {
  eyebrow: string;
  greeting: string;
  subtitle: string;
};

export default function FeedHeader({
  eyebrow,
  greeting,
  subtitle,
}: FeedHeaderProps) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div
        style={{
          fontSize: 12.5,
          fontWeight: 800,
          letterSpacing: ".8px",
          color: "#D9583C",
          marginBottom: 4,
        }}
      >
        {eyebrow}
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
        {greeting}
      </h1>
      <p style={{ margin: "5px 0 0", color: "#94887B", fontSize: 14.5 }}>
        {subtitle}
      </p>
    </div>
  );
}
