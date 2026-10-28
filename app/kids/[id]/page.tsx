import type { KidInfoRow } from "@/components/kids/KidInfoCard";
import type { LinkedParent } from "@/components/kids/LinkedParentsCard";
import KidAllergyAlert from "@/components/kids/KidAllergyAlert";
import KidInfoCard from "@/components/kids/KidInfoCard";
import KidProfileHeader from "@/components/kids/KidProfileHeader";
import LinkedParentsCard from "@/components/kids/LinkedParentsCard";
import Sidebar from "@/components/layout/Sidebar";
import Link from "next/link";
import { Suspense } from "react";

type KidListItem = {
  id: string;
  name: string;
  avatarLetter: string;
  avatarBg: string;
  avatarColor: string;
  meta: string;
};

const KIDS: KidListItem[] = [
  { id: "mateo-fernandez", name: "Mateo Fernández", avatarLetter: "M", avatarBg: "#A9D9E8", avatarColor: "#1F7A93", meta: "3 años · 2 padres vinculados" },
  { id: "sofia-mendez", name: "Sofía Méndez", avatarLetter: "S", avatarBg: "#F4B8CC", avatarColor: "#C44A7A", meta: "2 años · 1 padre vinculado" },
  { id: "benjamin-ruiz", name: "Benjamín Ruiz", avatarLetter: "B", avatarBg: "#B9DEC4", avatarColor: "#3E8B62", meta: "3 años · 2 padres vinculados" },
  { id: "valentina-soto", name: "Valentina Soto", avatarLetter: "V", avatarBg: "#F4DC8E", avatarColor: "#9A7B1E", meta: "2 años · sin padres vinculados" },
  { id: "tomas-diaz", name: "Tomás Díaz", avatarLetter: "T", avatarBg: "#C9B6E8", avatarColor: "#7B5FC0", meta: "3 años · 1 padre vinculado" },
  { id: "emma-castro", name: "Emma Castro", avatarLetter: "E", avatarBg: "#F4B8CC", avatarColor: "#C44A7A", meta: "2 años · 1 padre vinculado" },
  { id: "lucas-romero", name: "Lucas Romero", avatarLetter: "L", avatarBg: "#A9D9E8", avatarColor: "#1F7A93", meta: "3 años · 1 padre vinculado" },
  { id: "olivia-vega", name: "Olivia Vega", avatarLetter: "O", avatarBg: "#B9DEC4", avatarColor: "#3E8B62", meta: "2 años · 1 padre vinculado" },
];

const FALLBACK_KID: KidListItem = KIDS[0];
const FALLBACK_ROOM = "Sala Soles";
const ALLERGY_NOTE = "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.";

const INFO_ROWS: KidInfoRow[] = [
  { label: "Fecha de nacimiento", value: "12 mar 2022" },
  { label: "Sala", value: "Soles" },
  { label: "Ingreso", value: "feb 2025" },
];

const LINKED_PARENTS: LinkedParent[] = [
  { name: "Lucía Fernández", relationInfo: "Mamá · activa", avatarLetter: "L", avatarBg: "#C9B6E8", status: "ACTIVA" },
  { name: "Diego Fernández", relationInfo: "Papá · invitación enviada", avatarLetter: "D", avatarBg: "#A9C7E8", status: "PENDIENTE" },
];

const currentUser = { name: "Caro Giménez", role: "Maestra · Soles", avatarLetter: "C" };
const KIDS_BY_ID = new Map(KIDS.map((kid) => [kid.id, kid]));

export function generateStaticParams() {
  return KIDS.map((kid) => ({ id: kid.id }));
}

type KidProfilePageProps = PageProps<"/kids/[id]">;

function ProfileFallback() {
  return (
    <div style={{ maxWidth: 820, width: "100%", margin: "0 auto", padding: "34px 40px 80px" }}>
      <Link href="/kids" style={{ display: "flex", alignItems: "center", gap: 7, color: "#94887B", fontWeight: 700, fontSize: 14, marginBottom: 20 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        Volver a Niños
      </Link>
      <div style={{ color: "#94887B", fontWeight: 700, fontSize: 14 }}>Cargando perfil…</div>
    </div>
  );
}

async function KidProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const kid = KIDS_BY_ID.get(id) ?? FALLBACK_KID;
  const age = kid.meta.split(" · ")[0];

  return (
    <div style={{ maxWidth: 820, width: "100%", margin: "0 auto", padding: "34px 40px 80px" }}>
      <Link href="/kids" style={{ display: "flex", alignItems: "center", gap: 7, color: "#94887B", fontWeight: 700, fontSize: 14, marginBottom: 20 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        Volver a Niños
      </Link>
      <div style={{ display: "flex", gap: 26, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 300, display: "flex", flexDirection: "column", gap: 18 }}>
          <KidProfileHeader name={kid.name} subtitle={`${age} · ${FALLBACK_ROOM}`} avatarLetter={kid.avatarLetter} avatarBg={kid.avatarBg} avatarColor={kid.avatarColor} editHref="/agregar-nino" />
          <KidAllergyAlert note={ALLERGY_NOTE} />
          <KidInfoCard rows={INFO_ROWS} />
        </div>
        <LinkedParentsCard parents={LINKED_PARENTS} summaryHref="/resumen-dia" linkHref="/vincular-padre" />
      </div>
    </div>
  );
}

export default function KidProfilePage({ params }: KidProfilePageProps) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F6ECDF" }}>
      <Sidebar roomName="Sala Soles" user={{ ...currentUser, logoutHref: "/login" }} activeItem="kids" />
      <main style={{ flex: 1, minWidth: 0, height: "100vh", overflowY: "auto" }}>
        <Suspense fallback={<ProfileFallback />}>
          <KidProfile params={params} />
        </Suspense>
      </main>
    </div>
  );
}
