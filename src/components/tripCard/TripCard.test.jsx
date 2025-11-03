import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TripCard from "./TripCard";

// Mock de useNavigate
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("TripCard Component", () => {
  const tripWithImage = {
    id_trip: 1,
    title: "Trip to Paris",
    images: [{ url: "/images/paris.jpg" }],
  };

  const tripWithoutImage = {
    id_trip: 2,
    title: "Trip to Rome",
    images: [],
  };

  it("renders trip title and image correctly", () => {
    render(
      <MemoryRouter>
        <TripCard trip={tripWithImage} />
      </MemoryRouter>
    );

    expect(screen.getByText("Trip to Paris")).toBeInTheDocument();
    expect(screen.getByAltText("Trip to Paris")).toHaveAttribute(
      "src",
      "/images/paris.jpg"
    );
  });

  it("renders default image if no images are provided", () => {
    render(
      <MemoryRouter>
        <TripCard trip={tripWithoutImage} />
      </MemoryRouter>
    );

    expect(screen.getByAltText("Trip to Rome")).toHaveAttribute(
      "src",
      "/images/default-trip.jpg"
    );
  });

  it("calls navigate with correct path on click", () => {
    render(
      <MemoryRouter>
        <TripCard trip={tripWithImage} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Trip to Paris"));
    expect(mockedNavigate).toHaveBeenCalledWith("/trips/1");
  });
});