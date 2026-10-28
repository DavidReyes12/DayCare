import Sidebar from "@/components/layout/Sidebar";
import FeedHeader from "@/components/feed/FeedHeader";
import Composer from "@/components/feed/Composer";
import SectionDivider from "@/components/feed/SectionDivider";
import PostCard from "@/components/feed/PostCard";
import { PostType } from "@/components/ui/Badge";

const currentUser = {
  name: "Caro Giménez",
  role: "Maestra · Soles",
  avatarLetter: "C",
};

type Post = {
  author: string;
  time: string;
  publishedBy: string;
  type: PostType;
  audience: string;
  text: string;
  photo?: { href: string; label: string };
  likes: number;
  comments: number;
};

const posts: Post[] = [
  {
    author: "Mateo",
    time: "14:20",
    publishedBy: "publicado por vos",
    type: "LOGRO",
    audience: "familia de Mateo",
    text: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    likes: 3,
    comments: 1,
  },
  {
    author: "Mateo",
    time: "09:40",
    publishedBy: "publicado por vos",
    type: "ACTIVIDAD",
    audience: "familia de Mateo",
    text: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    photo: {
      href: "foto.dc.html",
      label: "Foto · pintando con témperas",
    },
    likes: 5,
    comments: 2,
  },
  {
    author: "Anuncio general",
    time: "07:50",
    publishedBy: "publicado por vos",
    type: "ANUNCIO",
    audience: "toda la sala",
    text: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    likes: 8,
    comments: 0,
  },
];

const POST_AVATAR_LETTERS: Record<PostType, string> = {
  LOGRO: "M",
  ACTIVIDAD: "M",
  ANUNCIO: "",
};

const POST_AVATAR_STYLES: Record<PostType, { bg: string; color: string }> = {
  LOGRO: { bg: "#A9D9E8", color: "#1F7A93" },
  ACTIVIDAD: { bg: "#A9D9E8", color: "#1F7A93" },
  ANUNCIO: { bg: "#CCD8F4", color: "#4E72C8" },
};

export default function FeedPage() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F6ECDF",
      }}
    >
      <Sidebar roomName="Sala Soles" user={{ ...currentUser, logoutHref: "login.dc.html" }} />

      <main
        style={{
          flex: 1,
          minWidth: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            maxWidth: 760,
            width: "100%",
            margin: "0 auto",
            padding: "34px 40px 80px",
          }}
        >
          <FeedHeader
            eyebrow="GUARDERÍA · SALA SOLES"
            greeting="Buenas, Caro"
            subtitle="12 niños · martes 17 jun"
          />

          <Composer
            avatarLetter={currentUser.avatarLetter}
            createHref="crear-publicacion.dc.html"
          />

          <SectionDivider label="PUBLICADO HOY" />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {posts.map((post, index) => {
              const avatarStyle = POST_AVATAR_STYLES[post.type];
              return (
                <PostCard
                  key={index}
                  author={post.author}
                  avatarLetter={POST_AVATAR_LETTERS[post.type] || undefined}
                  avatarBg={avatarStyle.bg}
                  avatarColor={avatarStyle.color}
                  avatarIcon={
                    post.type === "ANUNCIO" ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6" />
                      </svg>
                    ) : undefined
                  }
                  time={post.time}
                  publishedBy={post.publishedBy}
                  type={post.type}
                  audience={post.audience}
                  text={post.text}
                  photoHref={post.photo?.href}
                  photoLabel={post.photo?.label}
                  detailHref="detalle-publicacion.dc.html"
                  editHref="crear-publicacion.dc.html"
                  likes={post.likes}
                  comments={post.comments}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
