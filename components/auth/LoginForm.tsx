import Link from "next/link";

export default function LoginForm() {
  return (
    <>
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: ".7px",
          color: "#94887B",
          marginBottom: 8,
        }}
      >
        EMAIL
      </div>
      <input
        defaultValue="caro@opendaycare.com"
        type="email"
        style={{
          width: "100%",
          padding: "14px 16px",
          borderRadius: 14,
          border: "1.5px solid #EADFD0",
          background: "#fff",
          fontSize: 15,
          color: "#3F362E",
          marginBottom: 18,
        }}
      />
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: ".7px",
          color: "#94887B",
          marginBottom: 8,
        }}
      >
        CONTRASEÑA
      </div>
      <input
        type="password"
        placeholder="••••••••"
        style={{
          width: "100%",
          padding: "14px 16px",
          borderRadius: 14,
          border: "1.5px solid #EADFD0",
          background: "#fff",
          fontSize: 15,
          color: "#3F362E",
          marginBottom: 10,
        }}
      />
      <div style={{ textAlign: "right", marginBottom: 20 }}>
        <span
          style={{
            color: "#C5503A",
            fontSize: 13.5,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          ¿Olvidaste tu contraseña?
        </span>
      </div>
      <Link
        href="/"
        style={{
          display: "block",
          textAlign: "center",
          width: "100%",
          padding: 15,
          borderRadius: 15,
          background: "linear-gradient(180deg,#F4977E,#EE8164)",
          color: "#fff",
          fontWeight: 800,
          fontSize: 16,
          cursor: "pointer",
          boxShadow: "0 10px 22px -8px rgba(238,129,100,.7)",
        }}
      >
        Iniciar sesión
      </Link>
    </>
  );
}