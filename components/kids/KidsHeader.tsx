import AddKidModal from "@/components/kids/AddKidModal";

export default function KidsHeader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 22,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 12.5,
            fontWeight: 800,
            letterSpacing: ".8px",
            color: "#D9583C",
            marginBottom: 4,
          }}
        >
          GESTIÓN
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
          Niños
        </h1>
      </div>
      <AddKidModal />
    </div>
  );
}
