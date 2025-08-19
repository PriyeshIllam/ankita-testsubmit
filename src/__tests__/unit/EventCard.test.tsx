import { render, screen, fireEvent } from "@testing-library/react";
import EventCard from "../../components/EventCard"; 
import { Event } from "@/utils/types";
import "@testing-library/jest-dom";

const mockEvent: Event = {
  id: "1",
  name: "React Conference",
  date: "2025-09-01",
  location: "New York",
  description: "A conference about React and frontend development.",
  seats: 120,
  price: 99,
  title: ""
};

describe("EventCard component", () => {
  it("renders event details", () => {
    render(<EventCard event={mockEvent} />);

    expect(screen.getByText("React Conference")).toBeInTheDocument();
    expect(screen.getByText("2025-09-01 - New York")).toBeInTheDocument();
    expect(screen.getByText("A conference about React and frontend development.")).toBeInTheDocument();
    expect(screen.getByText(/Seats: 120/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /book now/i })).toBeInTheDocument();
  });

  it("calls onBookClick when Book Now is clicked", () => {
    const handleBookClick = jest.fn();
    render(<EventCard event={mockEvent} onBookClick={handleBookClick} />);

    const button = screen.getByRole("button", { name: /book now/i });
    fireEvent.click(button);

    expect(handleBookClick).toHaveBeenCalledTimes(1);
  });
});


