// ImageCard.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ImageCard from "./ImageCard";

describe("ImageCard component", () => {
  const fields = [
    { label: "Nombre", key: "name" },
    { label: "Edad", key: "age" },
    { label: "Ciudad", key: "city" },
    { label: "País", key: "country" },
  ];

  const data = {
    name: "Juan",
    age: 30,
    city: "Madrid",
    // country no está definido para probar el valor por defecto "-"
  };

  it("renders all provided fields with their values or '-' if missing", () => {
    render(<ImageCard data={data} fields={fields} />);

    // Labels
    fields.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    // Values
    expect(screen.getByText("Juan")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("Madrid")).toBeInTheDocument();
    expect(screen.getByText("-")).toBeInTheDocument(); // country
  });

  it("creates rows of maximum 3 columns", () => {
    const { container } = render(<ImageCard data={data} fields={fields} />);
    const rows = container.querySelectorAll(".info-row");
    expect(rows.length).toBe(Math.ceil(fields.length / 3));

    // Primera fila tiene 3 columnas
    expect(rows[0].children.length).toBe(3);

    // Segunda fila tiene 1 columna
    expect(rows[1].children.length).toBe(1);
  });
});
