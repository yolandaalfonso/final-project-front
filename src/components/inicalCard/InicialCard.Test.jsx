// InicialCard.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import InicialCard from "./InicialCard";

describe("InicialCard component", () => {
  it("renders image, title and text correctly when provided", () => {
    const props = {
      img: "/images/logo.png",
      title: "Mi aventura",
      text: "Explorando el mundo",
    };

    render(<InicialCard {...props} />);

    // Imagen
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", props.img);

    // Título
    expect(screen.getByText(props.title)).toBeInTheDocument();

    // Texto
    expect(screen.getByText(props.text)).toBeInTheDocument();
  });

  it("renders default title and text if not provided", () => {
    render(<InicialCard img="/images/logo.png" />);

    expect(screen.getByText("Registra tus aventuras")).toBeInTheDocument();
    expect(screen.getByText("Crea un diario digital de tus viajes con fotos, notas y mapas")).toBeInTheDocument();
  });
});
