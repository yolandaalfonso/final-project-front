// AuthRepository.test.js
import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import AuthRepository from "./AuthRepository";

// Mock de axios
vi.mock("axios");

describe("AuthRepository", () => {
  let repo;

  beforeEach(() => {
    repo = new AuthRepository();
    localStorage.clear();
    vi.resetAllMocks();
  });

  it("login guarda token y retorna datos", async () => {
    const credentials = { email: "test@example.com", password: "1234" };
    const mockResponse = { data: { idToken: "abc123", refreshToken: "refresh123" } };

    axios.create.mockReturnValue({
      post: vi.fn().mockResolvedValue(mockResponse),
      interceptors: { request: { use: vi.fn() } },
    });

    const result = await repo.login(credentials);

    expect(result.token).toBe("abc123");
    expect(result.refreshToken).toBe("refresh123");
    expect(result.user.email).toBe("test@example.com");
    expect(localStorage.getItem("token")).toBe("abc123");
  });

  it("login lanza error si respuesta no tiene token", async () => {
    const credentials = { email: "test@example.com", password: "1234" };
    const mockResponse = { data: {} };

    axios.create.mockReturnValue({
      post: vi.fn().mockResolvedValue(mockResponse),
      interceptors: { request: { use: vi.fn() } },
    });

    await expect(repo.login(credentials)).rejects.toThrow("No se recibió un token válido del servidor");
  });

  it("login lanza error si axios falla", async () => {
    const credentials = { email: "test@example.com", password: "1234" };

    axios.create.mockReturnValue({
      post: vi.fn().mockRejectedValue({ response: { data: { error: "Invalid credentials" } } }),
      interceptors: { request: { use: vi.fn() } },
    });

    await expect(repo.login(credentials)).rejects.toThrow("Invalid credentials");
  });

  it("getCurrentUser retorna datos correctamente", async () => {
    const token = "abc123";
    const mockResponse = { data: { id_user: 1, email: "user@test.com" } };

    axios.create.mockReturnValue({
      get: vi.fn().mockResolvedValue(mockResponse),
    });

    const result = await repo.getCurrentUser(token);
    expect(result.id_user).toBe(1);
    expect(result.email).toBe("user@test.com");
  });

  it("getCurrentUser retorna null si axios falla", async () => {
    const token = "abc123";

    axios.create.mockReturnValue({
      get: vi.fn().mockRejectedValue(new Error("Network error")),
    });

    const result = await repo.getCurrentUser(token);
    expect(result).toBeNull();
  });

  it("logout llama a axios.post correctamente", async () => {
    const mockPost = vi.fn().mockResolvedValue({});
    axios.create.mockReturnValue({
      post: mockPost,
    });

    await repo.logout();
    expect(mockPost).toHaveBeenCalledWith("/auth/logout");
  });

  it("logout lanza error si axios falla", async () => {
    const mockPost = vi.fn().mockRejectedValue(new Error("Network error"));
    axios.create.mockReturnValue({
      post: mockPost,
    });

    await expect(repo.logout()).rejects.toThrow("Error al cerrar sesión");
  });
});
