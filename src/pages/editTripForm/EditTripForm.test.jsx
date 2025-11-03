// EditTripForm.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import EditTripForm from "./EditTripForm";
import apiClient from "../../services/apliClient";

// Mock de useParams
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useParams: () => ({ id: "123" }),
}));

vi.mock("../../services/apliClient");

describe("EditTripForm component", () => {
  const tripData = {
    title: "Viaje a París",
    description: "Hermoso viaje",
    startDate: "2025-11-01",
    endDate: "2025-11-10",
    country: ["Francia"],
    images: [{ id: 1, url: "/paris.jpg" }],
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders loading state initially", () => {
    apiClient.get.mockResolvedValueOnce({ data: tripData });
    render(
      <MemoryRouter>
        <EditTripForm />
      </MemoryRouter>
    );

    expect(screen.getByText(/Cargando datos del viaje/i)).toBeInTheDocument();
  });

  it("renders form with fetched data", async () => {
    apiClient.get.mockResolvedValueOnce({ data: tripData });

    render(
      <MemoryRouter>
        <EditTripForm />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Título/i)).toHaveValue("Viaje a París");
      expect(screen.getByLabelText(/Descripción/i)).toHaveValue("Hermoso viaje");
      expect(screen.getByLabelText(/Fecha inicio/i)).toHaveValue("2025-11-01");
      expect(screen.getByLabelText(/Fecha fin/i)).toHaveValue("2025-11-10");
      expect(screen.getByText("Francia")).toBeInTheDocument();
      expect(screen.getByAltText("Imagen del viaje")).toHaveAttribute("src", "/paris.jpg");
    });
  });

  it("allows adding and removing countries", async () => {
    apiClient.get.mockResolvedValueOnce({ data: tripData });
    render(
      <MemoryRouter>
        <EditTripForm />
      </MemoryRouter>
    );

    await screen.findByDisplayValue("Viaje a París");

    const countryInput = screen.getByPlaceholderText("Introduce una ciudad");
    const addBtn = screen.getByText("Añadir");

    // Añadir nueva ciudad
    fireEvent.change(countryInput, { target: { value: "Italia" } });
    fireEvent.click(addBtn);

    expect(screen.getByText("Italia")).toBeInTheDocument();

    // Eliminar ciudad
    const removeBtn = screen.getByText("×", { selector: "button" });
    fireEvent.click(removeBtn);

    expect(screen.queryByText("Francia")).not.toBeInTheDocument();
  });

  it("marks and unmarks existing images for deletion", async () => {
    apiClient.get.mockResolvedValueOnce({ data: tripData });
    render(
      <MemoryRouter>
        <EditTripForm />
      </MemoryRouter>
    );

    await screen.findByAltText("Imagen del viaje");

    const deleteBtn = screen.getByText("Eliminar");
    fireEvent.click(deleteBtn);

    expect(screen.getByText("Deshacer")).toBeInTheDocument();

    // Desmarcar
    fireEvent.click(screen.getByText("Deshacer"));
    expect(screen.getByText("Eliminar")).toBeInTheDocument();
  });

  it("submits the form successfully", async () => {
    apiClient.get.mockResolvedValueOnce({ data: tripData });
    apiClient.put.mockResolvedValueOnce({ data: { success: true } });

    window.alert = vi.fn();

    render(
      <MemoryRouter>
        <EditTripForm />
      </MemoryRouter>
    );

    await screen.findByDisplayValue("Viaje a París");

    const submitBtn = screen.getByText("Guardar cambios");
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(apiClient.put).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith("Viaje actualizado con éxito ✈️");
    });
  });
});
