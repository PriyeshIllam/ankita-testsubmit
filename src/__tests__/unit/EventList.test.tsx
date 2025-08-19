import { render, screen, fireEvent } from "@testing-library/react";
import EventList from "../../components/EventList";
import { Event } from "@/utils/types";
import "@testing-library/jest-dom";

// Mock EventCard so we can control its behavior
jest.mock("../../components/EventCard", () => {
  return ({ event, onBookClick }: any) => (
    <div>
      <span>{event.name}</span>
      <button onClick={onBookClick}>Book</button>
    </div>
  );
});

// Mock BookingModal
jest.mock("../../components/BookingModal", () => {
  return ({ event, onClose, onConfirm }: any) => (
    <div>
      <p>Booking modal for {event.name}</p>
      <button onClick={onClose}>Close</button>
      <button
        onClick={() =>
          onConfirm({
            eventId: event.id,
            name: "John Doe",
            email: "john@example.com",
            quantity: 2,
          })
        }
      >
        Confirm
      </button>
    </div>
  );
});

const mockEvents: Event[] = [
  {
    id: "1", name: "React Conf", date: "2025-09-01", location: "NYC", price: 100,
    title: "",
    seats: 0
  },
  {
    id: "2", name: "Next.js Summit", date: "2025-10-01", location: "SF", price: 200,
    title: "",
    seats: 0
  },
];

describe("EventList component", () => {
  it("renders events", () => {
    render(<EventList events={mockEvents} />);
    expect(screen.getByText("React Conf")).toBeInTheDocument();
    expect(screen.getByText("Next.js Summit")).toBeInTheDocument();
  });

  it("opens modal when Book is clicked", () => {
    render(<EventList events={mockEvents} />);
    const bookButton = screen.getAllByText("Book")[0];
    fireEvent.click(bookButton);

    expect(screen.getByText("Booking modal for React Conf")).toBeInTheDocument();
  });

  it("closes modal when Close is clicked", () => {
    render(<EventList events={mockEvents} />);
    fireEvent.click(screen.getAllByText("Book")[0]);

    fireEvent.click(screen.getByText("Close"));

    expect(screen.queryByText(/Booking modal/)).not.toBeInTheDocument();
  });

  it("closes modal when Confirm is clicked", () => {
    render(<EventList events={mockEvents} />);
    fireEvent.click(screen.getAllByText("Book")[0]);

    fireEvent.click(screen.getByText("Confirm"));

    expect(screen.queryByText(/Booking modal/)).not.toBeInTheDocument();
  });
});