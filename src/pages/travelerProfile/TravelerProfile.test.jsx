// TravelerProfile.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import TravelerProfile from "./TravelerProfile";
import apiClient from "../../services/apliClient";

// Mock useParams
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useParams: () => ({ id: "1" }),
}));

vi.mock("../../services/apliClient");

describe("TravelerProfile component", () => {
  const profileData = { id_user: 1, userName: "JohnDoe", bio: "Viajero", avatar: "" };
  const tripsData = [
    { id_trip: 1, country: "España" },
    { id_trip: 2, country: "Italia" },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("shows loading initially", () => {
    apiClient.get.mockResolvedValueOnce({ data: profileData });
    apiClient.get.mockResolvedValueOnce({ data: tripsData });

    render(
      <MemoryRouter>
        <TravelerProfile />
      </MemoryRouter>
    );

    expect(screen.getByText("Cargando perfil...")).toBeInTheDocument();
  });

  it("renders profile info and trips", async () => {
    apiClient.get.mockResolvedValueOnce({ data: profileData });
    apiClient.get.mockResolvedValueOnce({ data: tripsData });

    render(
      <MemoryRouter>
        <TravelerProfile />
      </MemoryRouter>
    );

    await waitFor(() => {
      // Perfil
      expect(screen.getByText("@JohnDoe")).toBeInTheDocument();
      expect(screen.getByText("Viajero")).toBeInTheDocument();
      // Avatar fallback
      const avatar = screen.getByRole("img");
      expect(avatar).toHaveAttribute("src", "/avatars/default-avatar.png");

      // Estadísticas
      expect(screen.getByText("2")).toBeInTheDocument(); // Viajes
      expect(screen.getByText("2")).toBeInTheDocument(); // Países únicos

      // Trips
      expect(screen.queryByText("Aún no has publicado viajes.")).not.toBeInTheDocument();
    });
  });

  it("handles no trips", async () => {
    apiClient.get.mockResolvedValueOnce({ data: profileData });
    apiClient.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <TravelerProfile />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Aún no has publicado viajes.")).toBeInTheDocument();
    });
  });

  it("shows error message if API fails", async () => {
    apiClient.get.mockRejectedValue(new Error("Network error"));

    render(
      <MemoryRouter>
        <TravelerProfile />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("No se pudo cargar la información del perfil.")).toBeInTheDocument();
    });
  });

  it("switches tabs correctly", async () => {
    apiClient.get.mockResolvedValueOnce({ data: profileData });
    apiClient.get.mockResolvedValueOnce({ data: tripsData });

    render(
      <MemoryRouter>
        <TravelerProfile />
      </MemoryRouter>
    );

    await waitFor(() => {
      // Tab viajes activa
      expect(screen.getByText("Aún no has publicado viajes.") || screen.getAllByRole("img")).toBeTruthy();

      // Cambiar a guardados
      const guardadosBtn = screen.getByText("Guardados");
      fireEvent.click(guardadosBtn);
      expect(screen.getByText("✨ Aquí aparecerán tus viajes guardados próximamente.")).toBeInTheDocument();

      // Cambiar a pasaporte
      const pasaporteBtn = screen.getByText("Pasaporte");
      fireEvent.click(pasaporteBtn);
      expect(screen.getByText("🌍 Próximamente podrás ver tu pasaporte visual aquí.")).toBeInTheDocument();
    });
  });

  it("renders profile not found if profile is null", async () => {
    apiClient.get.mockResolvedValueOnce({ data: null });
    apiClient.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <TravelerProfile />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("No se encontró el perfil.")).toBeInTheDocument();
    });
  });
});
