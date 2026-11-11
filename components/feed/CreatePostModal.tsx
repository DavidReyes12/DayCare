"use client";

import { useState } from "react";

type PostCategory =
  | "Comida"
  | "Siesta"
  | "Actividad"
  | "Logro"
  | "Ánimo"
  | "Foto"
  | "Anuncio";

type PhotoPreview = { name: string; url: string };

type CreatePostFormState = {
  selectedKids: string[];
  wholeRoom: boolean;
  category: PostCategory;
  description: string;
  photos: PhotoPreview[];
};

const INITIAL_FORM: CreatePostFormState = {
  selectedKids: [],
  wholeRoom: true,
  category: "Comida",
  description: "",
  photos: [],
};

export default function CreatePostModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<CreatePostFormState>(INITIAL_FORM);

  const close = () => {
    setIsOpen(false);
    setForm(INITIAL_FORM);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
          justifyContent: "center",
          gap: 8,
          width: "100%",
          padding: 12,
          borderRadius: 14,
          background: "linear-gradient(180deg,#F4977E,#EE8164)",
          color: "#fff",
          fontWeight: 800,
          fontSize: 14.5,
          border: "none",
          cursor: "pointer",
          boxShadow: "0 8px 18px -8px rgba(238,129,100,.75)",
          marginBottom: 18,
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
        Nueva publicación
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
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "40px 24px",
            overflow: "auto",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 580,
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
                  Nueva publicación
                </span>
                <button
                  type="submit"
                  style={{
                    color: "#D9583C",
                    fontWeight: 800,
                    fontSize: 15,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Publicar
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
