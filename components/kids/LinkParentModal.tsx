"use client";

import { useEffect, useState } from "react";

type Relation = "Mamá" | "Papá" | "Tutor/a";

type LinkParentFormState = {
  parentName: string;
  email: string;
  relation: Relation;
};

const RELATIONS: Relation[] = ["Mamá", "Papá", "Tutor/a"];

const INITIAL_FORM: LinkParentFormState = {
  parentName: "",
  email: "",
  relation: "Mamá",
};

const INVITATION_CODE = "7K4P9";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  borderRadius: 14,
  border: "1.5px solid #EADFD0",
  background: "#fff",
  fontSize: 15,
  color: "#3F362E",
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: ".7px",
  color: "#94887B",
  marginBottom: 8,
  display: "block",
};

type LinkParentModalProps = {
  kidName: string;
};

export default function LinkParentModal({ kidName }: LinkParentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<LinkParentFormState>(INITIAL_FORM);

  const close = () => {
    setIsOpen(false);
    setForm(INITIAL_FORM);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const canSubmit =
    form.parentName.trim() !== "" &&
    form.email.trim() !== "";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;
    close();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      close();
    }
  };

  const getPillStyle = (relation: Relation): React.CSSProperties => {
    const selected = form.relation === relation;
    return {
      flex: 1,
      padding: 11,
      borderRadius: 999,
      border: selected ? "1.5px solid #9FB8EC" : "1.5px solid #ECE0D0",
      background: selected ? "#CCD8F4" : "#FFFDF9",
      color: selected ? "#4E72C8" : "#6E6359",
      fontWeight: 800,
      fontSize: 14,
      cursor: "pointer",
    };
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 0 0",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1.5px dashed #D8CBBA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#B0A290",
            flex: "none",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
        <span style={{ fontWeight: 800, fontSize: 14.5, color: "#C5503A" }}>
          Vincular otro padre
        </span>
      </button>

      {isOpen ? (
        <div
          onClick={handleBackdropClick}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(63,54,46,.45)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 480,
              background: "#FBF4EC",
              border: "1px solid #ECE0D0",
              borderRadius: 24,
              boxShadow: "0 20px 50px -24px rgba(63,54,46,.35)",
              overflow: "hidden",
            }}
          >
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 26px",
                  borderBottom: "1px solid #ECE0D0",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "Fredoka",
                      fontWeight: 600,
                      fontSize: 18,
                      color: "#3F362E",
                    }}
                  >
                    Vincular padre
                  </div>
                  <div style={{ fontSize: 13, color: "#A89A8B" }}>
                    a {kidName}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={close}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: "#F0E6D8",
                    color: "#94887B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div style={{ padding: "22px 26px" }}>
                <div
                  style={{
                    display: "flex",
                    gap: 11,
                    background: "#E3ECFB",
                    borderRadius: 14,
                    padding: "13px 16px",
                    marginBottom: 20,
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4E72C8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flex: "none", marginTop: 1 }}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                  <span style={{ fontSize: 13.5, color: "#3F5694", lineHeight: 1.45 }}>
                    Le enviaremos un correo con un código para que active su cuenta.
                    Solo verá el feed de {kidName}.
                  </span>
                </div>

                <label style={labelStyle}>
                  NOMBRE DEL PADRE/MADRE *
                </label>
                <input
                  value={form.parentName}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, parentName: event.target.value }))
                  }
                  required
                  placeholder="Ej. Diego Fernández"
                  style={{ ...inputStyle, marginBottom: 18 }}
                />

                <label style={labelStyle}>
                  EMAIL *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                  required
                  placeholder="correo@ejemplo.com"
                  style={{ ...inputStyle, marginBottom: 18 }}
                />

                <label style={labelStyle}>
                  PARENTESCO
                </label>
                <div
                  style={{
                    display: "flex",
                    gap: 9,
                    marginBottom: 20,
                  }}
                >
                  {RELATIONS.map((relation) => (
                    <button
                      key={relation}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, relation }))
                      }
                      style={getPillStyle(relation)}
                    >
                      {relation}
                    </button>
                  ))}
                </div>

                <div
                  style={{
                    background: "#FBF1D6",
                    border: "1.5px dashed #E6D08A",
                    borderRadius: 16,
                    padding: 18,
                    textAlign: "center",
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: ".7px",
                      color: "#A88526",
                      marginBottom: 8,
                    }}
                  >
                    CÓDIGO DE INVITACIÓN
                  </div>
                  <div
                    style={{
                      fontFamily: "Fredoka",
                      fontWeight: 600,
                      fontSize: 34,
                      letterSpacing: 7,
                      color: "#8A7234",
                    }}
                  >
                    {INVITATION_CODE}
                  </div>
                  <div style={{ fontSize: 13, color: "#A88526", marginTop: 6 }}>
                    Vence en 7 días
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 9,
                    width: "100%",
                    padding: 14,
                    borderRadius: 14,
                    background: "linear-gradient(180deg,#F4977E,#EE8164)",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 15.5,
                    border: "none",
                    cursor: canSubmit ? "pointer" : "not-allowed",
                    boxShadow: "0 10px 22px -8px rgba(238,129,100,.7)",
                    opacity: canSubmit ? 1 : 0.5,
                  }}
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m22 2-7 20-4-9-9-4z" />
                    <path d="M22 2 11 13" />
                  </svg>
                  Enviar invitación
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
