import type { Metadata } from "next";
import Link from "next/link";
import LoginBrandPanel from "@/components/auth/LoginBrandPanel";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "OpenDayCare · Iniciar sesión",
  description: "Ingresá para ver el día de hoy.",
};

export default function LoginPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1.05fr 1fr",
        background: "#FBF4EC",
      }}
    >
      <LoginBrandPanel />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
        }}
      >
        <div style={{ width: "100%", maxWidth: 392 }}>
          <h2
            style={{
              fontFamily: "Fredoka",
              fontWeight: 600,
              fontSize: 30,
              margin: "0 0 6px",
              color: "#3F362E",
            }}
          >
            Iniciar sesión
          </h2>
          <p
            style={{
              margin: "0 0 28px",
              color: "#94887B",
              fontSize: 15,
            }}
          >
            Ingresá para ver el día de hoy.
          </p>
          <LoginForm />
          <p
            style={{
              textAlign: "center",
              margin: "24px 0 0",
              color: "#94887B",
              fontSize: 14.5,
            }}
          >
            ¿Te invitó la guardería?{" "}
            <Link
              href="/active-account"
              style={{ color: "#C5503A", fontWeight: 800 }}
            >
              Activá tu cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}