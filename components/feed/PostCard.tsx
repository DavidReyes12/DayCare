import Badge, { PostType } from "@/components/ui/Badge";
import PostActions from "@/components/feed/PostActions";

export type PostCardProps = {
  author: string;
  avatarLetter?: string;
  avatarBg: string;
  avatarColor: string;
  avatarIcon?: React.ReactNode;
  time: string;
  publishedBy: string;
  type: PostType;
  audience: string;
  text: string;
  photoHref?: string;
  photoLabel?: string;
  likes: number;
  comments: number;
};

export default function PostCard({
  author,
  avatarLetter,
  avatarBg,
  avatarColor,
  avatarIcon,
  time,
  publishedBy,
  type,
  audience,
  text,
  photoHref,
  photoLabel,
  likes,
  comments,
}: PostCardProps) {
  return (
    <div
      style={{
        background: "#FFFDF9",
        border: "1px solid #ECE0D0",
        borderRadius: 20,
        padding: "20px 22px",
        boxShadow: "0 4px 16px -12px rgba(120,90,60,.5)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: avatarBg,
            color: avatarColor,
            fontFamily: "Fredoka",
            fontWeight: 600,
            fontSize: 17,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "none",
          }}
        >
          {avatarLetter ?? avatarIcon}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "Fredoka",
              fontWeight: 600,
              fontSize: 16.5,
              color: "#3F362E",
            }}
          >
            {author}
          </div>
          <div style={{ fontSize: 12.5, color: "#A89A8B" }}>
            {time} · {publishedBy}
          </div>
        </div>
        <Badge type={type} />
      </div>

      <div style={{ fontSize: 12.5, color: "#A89A8B", marginBottom: 10 }}>
        Para: {audience}
      </div>
      <p
        style={{
          fontSize: 15.5,
          lineHeight: 1.55,
          color: "#4A4038",
          margin: 0,
        }}
      >
        {text}
      </p>

      {photoHref && photoLabel && (
        <a
          href={photoHref}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginTop: 14,
            border: "1.5px dashed #DBCDBA",
            borderRadius: 16,
            background: "#F4ECE1",
            height: 200,
            color: "#B0A290",
          }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 21" />
          </svg>
          <span style={{ fontSize: 13.5 }}>{photoLabel}</span>
        </a>
      )}

      <PostActions likes={likes} comments={comments} />
    </div>
  );
}
