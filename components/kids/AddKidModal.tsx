"use client";

import { useEffect, useState } from "react";

type RoomName = "Soles" | "Lunas" | "Estrellas";

type AddKidFormState = {
  fullName: string;
  birthDate: string;
  room: RoomName;
  allergies: string;
  medicalNotes: string;
};

const ROOMS: RoomName[] = ["Soles", "Lunas", "Estrellas"];

const INITIAL_FORM: AddKidFormState = {
  fullName: "",
  birthDate: "",
  room: "Soles",
  allergies: "",
  medicalNotes: "",
};

export function formatBirthDateInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export function isValidBirthDate(value: string): boolean {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return false;
  const [day, month, year] = value.split("/").map((part) => Number(part));
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

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

export default function AddKidModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<AddKidFormState>(INITIAL_FORM);

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

  const canSave =
    form.fullName.trim() !== "" &&
    isValidBirthDate(form.birthDate) &&
    form.room.trim() !== "";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSave) return;
    close();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      close();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "11px 18px",
          borderRadius: 14,
          background: "linear-gradient(180deg,#F4977E,#EE8164)",
          color: "#fff",
          fontWeight: 800,
          fontSize: 14.5,
          border: "none",
          cursor: "pointer",
          boxShadow: "0 8px 18px -8px rgba(238,129,100,.7)",
        }}
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        Agregar niño
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
              maxWidth: 520,
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
                <button
                  type="button"
                  onClick={close}
                  style={{
                    color: "#94887B",
                    fontWeight: 700,
                    fontSize: 15,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Cancelar
                </button>
                <span
                  style={{
                    fontFamily: "Fredoka",
                    fontWeight: 600,
                    fontSize: 18,
                    color: "#3F362E",
                  }}
                >
                  Agregar niño
                </span>
                <button
                  type="submit"
                  disabled={!canSave}
                  style={{
                    color: "#D9583C",
                    fontWeight: 800,
                    fontSize: 15,
                    background: "none",
                    border: "none",
                    cursor: canSave ? "pointer" : "not-allowed",
                    padding: 0,
                    opacity: canSave ? 1 : 0.5,
                  }}
                >
                  Guardar
                </button>
              </div>

              <div style={{ padding: "24px 26px" }}>
                <label style={labelStyle}>
                  NOMBRE COMPLETO *
                </label>
                <input
                  value={form.fullName}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, fullName: event.target.value }))
                  }
                  required
                  placeholder="Ej. Martina López"
                  style={{ ...inputStyle, marginBottom: 18 }}
                />

                <div
                  style={{
                    display: "flex",
                    gap: 14,
                    marginBottom: 18,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>
                      FECHA DE NACIMIENTO *
                    </label>
                    <input
                      value={form.birthDate}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          birthDate: formatBirthDateInput(event.target.value),
                        }))
                      }
                      required
                      inputMode="numeric"
                      maxLength={10}
                      pattern="\\d{2}/\\d{2}/\\d{4}"
                      title="Formato dd/mm/aaaa"
                      aria-invalid={
                        form.birthDate !== "" && !isValidBirthDate(form.birthDate)
                      }
                      placeholder="dd/mm/aaaa"
                      style={{
                        ...inputStyle,
                        borderColor:
                          form.birthDate !== "" &&
                          !isValidBirthDate(form.birthDate)
                            ? "#D9583C"
                            : "#EADFD0",
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>SALA *</label>
                    <select
                      value={form.room}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          room: event.target.value as RoomName,
                        }))
                      }
                      required
                      style={{
                        ...inputStyle,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      {ROOMS.map((room) => (
                        <option key={room} value={room}>
                          {room}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <label style={labelStyle}>ALERGIAS (ETIQUETAS)</label>
                <input
                  value={form.allergies}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, allergies: event.target.value }))
                  }
                  placeholder="Ej. Maní, Lactosa"
                  style={{ ...inputStyle, marginBottom: 18 }}
                />

                <label style={labelStyle}>NOTAS MÉDICAS</label>
                <textarea
                  value={form.medicalNotes}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      medicalNotes: event.target.value,
                    }))
                  }
                  placeholder="Indicaciones, medicación, contactos…"
                  style={{
                    ...inputStyle,
                    minHeight: 90,
                    resize: "vertical",
                    lineHeight: 1.5,
                    fontFamily: "inherit",
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
