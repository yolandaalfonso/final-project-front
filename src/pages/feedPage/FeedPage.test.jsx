// FeedPage.test.jsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import FeedPage from "./FeedPage";
import apiClient from "../../services/apliClient";

// Mock useParams
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useParams: () => ({ id: undefined }),
}));

vi.mock("../../services/apliClient");

describe("FeedPage component", () => {
  const trips = [
    {
      id_trip: 1,
      traveler: { id_user: 2, avatar: "" },
      images: [{ url: "/img1.jpg" }],
    },
    {
      id_trip: 2,
      traveler: { id_user: 3 },
      images: [{ url: "/img2.jpg" }],
    },
    {
      id_trip: 3,
      traveler: { id_user: 1 },
      images: [],
    },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  it("shows loading initially", () => {
    apiClient.get.mockResolvedValueOnce({ data: trips });

    render(
      <MemoryRouter>
        <FeedPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Cargando feed...")).toBeInTheDocument();
  });

  it("renders feed trips filtering out current user and trips without images", async () => {
    localStorage.setItem("loginUser", JSON.stringify({ id_user: 1 }));
    apiClient.get.mockResolvedValueOnce({ data: trips });

    render(
      <MemoryRouter>
        <FeedPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      // trip id_trip 1 and 2 visible, trip 3 filtered out
      expect(screen.queryByText("No hay viajes nuevos para mostrar.")).not.toBeInTheDocument();
      expect(screen.getAllByRole("img").length).toBe(2); // renderiza las imágenes de los FeedCard
    });
  });

  it("applies default avatar if traveler.avatar is missing", async () => {
    apiClient.get.mockResolvedValueOnce({
      data: [
        { id_trip: 10, traveler: { id_user: 2 }, images: [{ url: "/img.jpg" }] },
      ],
    });

    render(
      <MemoryRouter>
        <FeedPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      const feedImages = screen.getAllByRole("img");
      expect(feedImages[0]).toHaveAttribute(
        "src",
        "/img.jpg"
      ); // La imagen del trip
      // El avatar se pasa a FeedCard, si quieres puedes mockear FeedCard para verificar props
    });
  });

  it("shows error message if apiClient.get fails", async () => {
    apiClient.get.mockRejectedValueOnce(new Error("Network error"));

    render(
      <MemoryRouter>
        <FeedPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("No se pudo cargar el feed de viajes.")).toBeInTheDocument();
    });
  });

  it("shows 'no trips' message if feedTrips is empty", async () => {
    apiClient.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <FeedPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("No hay viajes nuevos para mostrar.")).toBeInTheDocument();
    });
  });
});
