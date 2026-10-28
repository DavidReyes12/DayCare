import type { Metadata } from "next";
import ActivateAccountCard from "@/components/auth/ActivateAccountCard";

export const metadata: Metadata = {
  title: "OpenDayCare · Activar cuenta",
  description: "Activá tu cuenta para seguir el día de tu hijo.",
};

export default function ActiveAccountPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FBF4EC",
        padding: 40,
      }}
    >
      <div style={{ width: "100%", maxWidth: 440 }}>
        <ActivateAccountCard />
      </div>
    </div>
  );
}