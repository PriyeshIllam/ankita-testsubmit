import { render, screen } from "@testing-library/react";
import Header from "../../components/Header"; 
import "@testing-library/jest-dom";

describe("Header component", () => {
  it("renders the title", () => {
    render(<Header />);
    expect(screen.getByText("Evently (Event Booking)")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Header />);

    const homeLink = screen.getByRole("link", { name: "Home" });
    const eventsLink = screen.getByRole("link", { name: "Events" });
    const bookingsLink = screen.getByRole("link", { name: "Bookings" });

    expect(homeLink).toHaveAttribute("href", "/");
    expect(eventsLink).toHaveAttribute("href", "/events");
    expect(bookingsLink).toHaveAttribute("href", "/bookings");
  });
});

