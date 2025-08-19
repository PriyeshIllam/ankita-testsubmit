import { render, screen } from "@testing-library/react";
import BookingModal from "../../components/BookingModal"; 
import { Event } from "@/utils/types";
import "@testing-library/jest-dom";

// Mock BookingForm to isolate BookingModal
jest.mock("../../components/BookingForm", () => {
  return ({ event, onCancel, onConfirm }: any) => (
    <div data-testid="booking-form">
      <p>{event.name}</p>
      <button onClick={onCancel}>Cancel</button>
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

const mockEvent: Event = {
  id: "1",
  name: "React Conference",
  date: "2025-09-01",
  location: "Stockholm",
  description: "A React event",
  seats: 50,
  price: 100,
  title: ""
};

describe("BookingModal component", () => {
  it("renders modal with correct event name", () => {
    render(
      <BookingModal
        event={mockEvent}
        onClose={jest.fn()}
        onConfirm={jest.fn()}
      />
    );

    // Check modal container
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(`Book: ${mockEvent.name}`)).toBeInTheDocument();

    // BookingForm is rendered
    expect(screen.getByTestId("booking-form")).toBeInTheDocument();
  });

  it("passes onCancel and onConfirm to BookingForm", () => {
    const handleCancel = jest.fn();
    const handleConfirm = jest.fn();

    render(
      <BookingModal
        event={mockEvent}
        onClose={handleCancel}
        onConfirm={handleConfirm}
      />
    );

    // Cancel button
    const cancelBtn = screen.getByText("Cancel");
    cancelBtn.click();
    expect(handleCancel).toHaveBeenCalledTimes(1);

    // Confirm button
    const confirmBtn = screen.getByText("Confirm");
    confirmBtn.click();
    expect(handleConfirm).toHaveBeenCalledWith({
      eventId: mockEvent.id,
      name: "John Doe",
      email: "john@example.com",
      quantity: 2,
    });
  });
});

