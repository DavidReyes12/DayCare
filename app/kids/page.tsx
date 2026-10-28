import type { KidCardBadge } from "@/components/kids/KidCard";
import KidCard from "@/components/kids/KidCard";
import KidsHeader from "@/components/kids/KidsHeader";
import KidsRoomDivider from "@/components/kids/KidsRoomDivider";
import KidsSearchBar from "@/components/kids/KidsSearchBar";
import Sidebar from "@/components/layout/Sidebar";

type KidListItem = {
  id: string;
  name: string;
  avatarLetter: string;
  avatarBg: string;
  avatarColor: string;
  meta: string;
  badge?: KidCardBadge;
};

const KIDS: KidListItem[] = [
  {
    id: "mateo-fernandez",
    name: "Mateo Fernández",
    avatarLetter: "M",
    avatarBg: "#A9D9E8",
    avatarColor: "#1F7A93",
    meta: "3 años · 2 padres vinculados",
    badge: { label: "MANÍ", variant: "allergy" },
  },
  {
    id: "sofia-mendez",
    name: "Sofía Méndez",
    avatarLetter: "S",
    avatarBg: "#F4B8CC",
    avatarColor: "#C44A7A",
    meta: "2 años · 1 padre vinculado",
  },
  {
    id: "benjamin-ruiz",
    name: "Benjamín Ruiz",
    avatarLetter: "B",
    avatarBg: "#B9DEC4",
    avatarColor: "#3E8B62",
    meta: "3 años · 2 padres vinculados",
  },
  {
    id: "valentina-soto",
    name: "Valentina Soto",
    avatarLetter: "V",
    avatarBg: "#F4DC8E",
    avatarColor: "#9A7B1E",
    meta: "2 años · sin padres vinculados",
    badge: { label: "VINCULAR", variant: "action" },
  },
  {
    id: "tomas-diaz",
    name: "Tomás Díaz",
    avatarLetter: "T",
    avatarBg: "#C9B6E8",
    avatarColor: "#7B5FC0",
    meta: "3 años · 1 padre vinculado",
    badge: { label: "LACTOSA", variant: "allergy" },
  },
  {
    id: "emma-castro",
    name: "Emma Castro",
    avatarLetter: "E",
    avatarBg: "#F4B8CC",
    avatarColor: "#C44A7A",
    meta: "2 años · 1 padre vinculado",
  },
  {
    id: "lucas-romero",
    name: "Lucas Romero",
    avatarLetter: "L",
    avatarBg: "#A9D9E8",
    avatarColor: "#1F7A93",
    meta: "3 años · 1 padre vinculado",
  },
  {
    id: "olivia-vega",
    name: "Olivia Vega",
    avatarLetter: "O",
    avatarBg: "#B9DEC4",
    avatarColor: "#3E8B62",
    meta: "2 años · 1 padre vinculado",
  },
];

const currentUser = {
  name: "Caro Giménez",
  role: "Maestra · Soles",
  avatarLetter: "C",
};

export default function KidsPage() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F6ECDF",
      }}
    >
      <Sidebar
        roomName="Sala Soles"
        user={{ ...currentUser, logoutHref: "/login" }}
        activeItem="kids"
      />

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
            maxWidth: 880,
            width: "100%",
            margin: "0 auto",
            padding: "34px 40px 80px",
          }}
        >
          <KidsHeader addHref="/agregar-nino" />

          <KidsSearchBar />

          <KidsRoomDivider roomLabel="SALA SOLES" kidCount={KIDS.length} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 14,
            }}
          >
            {KIDS.map((kid) => (
              <KidCard
                key={kid.id}
                id={kid.id}
                name={kid.name}
                avatarLetter={kid.avatarLetter}
                avatarBg={kid.avatarBg}
                avatarColor={kid.avatarColor}
                meta={kid.meta}
                badge={kid.badge}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
