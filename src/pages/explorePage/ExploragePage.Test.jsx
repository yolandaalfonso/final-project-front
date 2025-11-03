// ExplorePage.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ExplorePage from "./ExplorePage";

describe("ExplorePage component", () => {
  it("renders hero section with title and subtitle", () => {
    render(<ExplorePage />);

    expect(screen.getByText("Encuentra tu próxima aventura")).toBeInTheDocument();
    expect(screen.getByText("Busca viajes por ciudad, país o duración...")).toBeInTheDocument();

    // Input de búsqueda
    expect(screen.getByPlaceholderText("Buscar por ciudad, país o región...")).toBeInTheDocument();

    // Botón Buscar
    expect(screen.getByText("Buscar")).toBeInTheDocument();
  });

  it("renders all trips initially", () => {
    render(<ExplorePage />);
    // Los títulos de todos los trips deben aparecer
    expect(screen.getByText("Aventura Romántica en París")).toBeInTheDocument();
    expect(screen.getByText("Trekking en los Alpes")).toBeInTheDocument();
    expect(screen.getByText("Relax y Yoga en Bali")).toBeInTheDocument();
    expect(screen.getByText("Neón y Tradición en Tokio")).toBeInTheDocument();

    // Botón Cargar más aparece
    expect(screen.getByText("Cargar más")).toBeInTheDocument();
  });

  it("filters trips based on search query", () => {
    render(<ExplorePage />);
    const input = screen.getByPlaceholderText("Buscar por ciudad, país o región...");

    // Buscar "Bali"
    fireEvent.change(input, { target: { value: "Bali" } });

    expect(screen.getByText("Relax y Yoga en Bali")).toBeInTheDocument();
    expect(screen.queryByText("Aventura Romántica en París")).not.toBeInTheDocument();
    expect(screen.queryByText("Trekking en los Alpes")).not.toBeInTheDocument();
    expect(screen.queryByText("Neón y Tradición en Tokio")).not.toBeInTheDocument();
  });

  it("shows no results message if search does not match any trip", () => {
    render(<ExplorePage />);
    const input = screen.getByPlaceholderText("Buscar por ciudad, país o región...");

    fireEvent.change(input, { target: { value: "México" } });

    expect(screen.getByText('No se encontraron viajes que coincidan con "México"')).toBeInTheDocument();

    // Grid de trips no aparece
    expect(screen.queryByText("Aventura Romántica en París")).not.toBeInTheDocument();
  });

  it("shows the load more button only when there are results", () => {
    render(<ExplorePage />);
    const input = screen.getByPlaceholderText("Buscar por ciudad, país o región...");

    // Al inicio hay resultados
    expect(screen.getByText("Cargar más")).toBeInTheDocument();

    // Si filtramos a 0 resultados, desaparece
    fireEvent.change(input, { target: { value: "NoExiste" } });
    expect(screen.queryByText("Cargar más")).not.toBeInTheDocument();
  });
});
