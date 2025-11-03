// TripForm.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import TripForm from "./TripForm";
import apiClient from "../../services/apliClient";
import { getAuth } from "firebase/auth";

// Mock de apiClient
vi.mock("../../services/apliClient");

// Mock de Firebase
vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(),
}));

describe("TripForm component", () => {
  const mockUser = { uid: "123", email: "test@example.com" };

  beforeEach(() => {
    vi.resetAllMocks();
    window.alert = vi.fn(); // mock alert
    getAuth.mockReturnValue({ currentUser: mockUser });
  });

  it("renders form fields", () => {
    render(<TripForm />);
    expect(screen.getByLabelText("Título")).toBeInTheDocument();
    expect(screen.getByLabelText("Descripción")).toBeInTheDocument();
    expect(screen.getByLabelText("Fotos (máx. 3)")).toBeInTheDocument();
    expect(screen.getByLabelText("Fecha inicio")).toBeInTheDocument();
    expect(screen.getByLabelText("Fecha fin")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Introduce una ciudad")).toBeInTheDocument();
    expect(screen.getByText("Guardar viaje")).toBeInTheDocument();
  });

  it("updates input fields correctly", () => {
    render(<TripForm />);
    const titleInput = screen.getByLabelText("Título");
    fireEvent.change(titleInput, { target: { value: "Mi viaje" } });
    expect(titleInput.value).toBe("Mi viaje");

    const descInput = screen.getByLabelText("Descripción");
    fireEvent.change(descInput, { target: { value: "Descripción del viaje" } });
    expect(descInput.value).toBe("Descripción del viaje");
  });

  it("adds and removes countries", () => {
    render(<TripForm />);
    const countryInput = screen.getByPlaceholderText("Introduce una ciudad");
    const addBtn = screen.getByText("Añadir");

    fireEvent.change(countryInput, { target: { value: "Madrid" } });
    fireEvent.click(addBtn);
    expect(screen.getByText("Madrid")).toBeInTheDocument();

    const removeBtn = screen.getByText("×");
    fireEvent.click(removeBtn);
    expect(screen.queryByText("Madrid")).not.toBeInTheDocument();
  });

  it("adds images", () => {
    render(<TripForm />);
    const fileInput = screen.getByLabelText("Fotos (máx. 3)");
    const file = new File(["test"], "test.png", { type: "image/png" });

    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(screen.getByText("1 imágenes seleccionadas")).toBeInTheDocument();
  });

  it("submits form successfully", async () => {
    const mockResponse = { data: { id_trip: 1 } };
    apiClient.post.mockResolvedValueOnce(mockResponse);

    render(<TripForm />);

    fireEvent.change(screen.getByLabelText("Título"), { target: { value: "Viaje Test" } });
    fireEvent.change(screen.getByLabelText("Descripción"), { target: { value: "Desc" } });
    const addBtn = screen.getByText("Añadir");
    fireEvent.change(screen.getByPlaceholderText("Introduce una ciudad"), { target: { value: "Paris" } });
    fireEvent.click(addBtn);

    fireEvent.submit(screen.getByText("Guardar viaje"));

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith("Viaje creado con éxito ✈️");
      // Formulario reiniciado
      expect(screen.getByLabelText("Título").value).toBe("");
      expect(screen.queryByText("Paris")).not.toBeInTheDocument();
    });
  });

  it("shows error alert on API failure", async () => {
    apiClient.post.mockRejectedValueOnce({ response: { status: 500 } });

    render(<TripForm />);
    fireEvent.change(screen.getByLabelText("Título"), { target: { value: "Viaje Test" } });
    fireEvent.submit(screen.getByText("Guardar viaje"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Error al crear el viaje 😕");
    });
  });

  it("alerts 403 error correctly", async () => {
    apiClient.post.mockRejectedValueOnce({ response: { status: 403 } });

    render(<TripForm />);
    fireEvent.change(screen.getByLabelText("Título"), { target: { value: "Viaje Test" } });
    fireEvent.submit(screen.getByText("Guardar viaje"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("No tienes permiso para crear el viaje (403)");
    });
  });

  it("logs error if no Firebase user", async () => {
    getAuth.mockReturnValue({ currentUser: null });
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<TripForm />);
    fireEvent.submit(screen.getByText("Guardar viaje"));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("❌ No hay usuario logueado en Firebase");
    });
  });
});
