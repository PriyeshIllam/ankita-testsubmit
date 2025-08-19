import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "../../components/BookingForm"; // adjust path
import { Event } from "@/utils/types";
import "@testing-library/jest-dom";

const mockEvent: Event = {
  id: "1",
  name: "React Conference",
  date: "2025-09-01",
  location: "NYC",
  description: "A React event",
  seats: 5,
  price: 100,
  title: ""
};

describe("BookingForm integration", () => {
  it("submits correct booking when all fields are filled", () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();

    render(<BookingForm event={mockEvent} onConfirm={onConfirm} onCancel={onCancel} />);

    // Fill inputs
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText("Quantity"), { target: { value: "3" } });

    // Submit form
    fireEvent.click(screen.getByText("Confirm booking"));

    // onConfirm should be called with correct data
    expect(onConfirm).toHaveBeenCalledWith({
      eventId: mockEvent.id,
      name: "John Doe",
      email: "john@example.com",
      quantity: 3,
    });

    // No error message
    expect(screen.queryByText(/please fill/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/only \d+ seats/i)).not.toBeInTheDocument();
  });

  it("shows error when required fields are empty", () => {
    const onConfirm = jest.fn();
    render(<BookingForm event={mockEvent} onConfirm={onConfirm} onCancel={jest.fn()} />);

    fireEvent.click(screen.getByText("Confirm booking"));

    expect(screen.getByText("Please fill all fields")).toBeInTheDocument();
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it("shows error when quantity exceeds available seats", () => {
    const onConfirm = jest.fn();
    render(<BookingForm event={mockEvent} onConfirm={onConfirm} onCancel={jest.fn()} />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText("Quantity"), { target: { value: "10" } });

    fireEvent.click(screen.getByText("Confirm booking"));

    expect(screen.getByText("Only 5 seats available")).toBeInTheDocument();
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it("calls onCancel when cancel button is clicked", () => {
    const onCancel = jest.fn();
    render(<BookingForm event={mockEvent} onConfirm={jest.fn()} onCancel={onCancel} />);

    fireEvent.click(screen.getByText("Cancel"));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
