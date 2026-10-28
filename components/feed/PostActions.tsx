import Link from "next/link";

type PostActionsProps = {
  likes: number;
  comments: number;
  detailHref?: string;
  editHref?: string;
};

export default function PostActions({
  likes,
  comments,
  detailHref = "#",
  editHref = "#",
}: PostActionsProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        marginTop: 16,
        paddingTop: 14,
        borderTop: "1px solid #F0E6D8",
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          color: "#E0654A",
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="#E0654A"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z" />
        </svg>
        {likes}
      </span>
      <Link
        href={detailHref}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          color: "#94887B",
          fontWeight: 700,
          fontSize: 14,
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
        </svg>
        {comments}
      </Link>
      <span style={{ flex: 1 }} />
      <Link
        href={editHref}
        style={{
          color: "#C5503A",
          fontWeight: 800,
          fontSize: 14,
        }}
      >
        Editar
      </Link>
    </div>
  );
}
