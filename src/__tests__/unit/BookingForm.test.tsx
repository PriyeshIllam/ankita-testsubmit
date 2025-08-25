import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookingForm from "../../components/BookingForm";
import { Event } from "../../utils/types";

const mockEvent: Event = {
  id: "1",
  name: "React Conference",
  date: "2025-09-01",
  location: "Stockholm",
  description: "A React event",
  seats: 5,
  price: 100,
  title: ""
};

describe("BookingForm component", () => {
  it("renders all input fields and buttons", () => {
    render(<BookingForm event={mockEvent} onCancel={jest.fn()} onConfirm={jest.fn()} />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Quantity")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Confirm booking")).toBeInTheDocument();
  });

  it("updates state on input change", () => {
    render(<BookingForm event={mockEvent} onCancel={jest.fn()} onConfirm={jest.fn()} />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText("Quantity"), { target: { value: "3" } });

    expect(screen.getByLabelText("Name")).toHaveValue("John");
    expect(screen.getByLabelText("Email")).toHaveValue("john@example.com");
    expect(screen.getByLabelText("Quantity")).toHaveValue(3);
  });

  it("shows error if required fields are empty", () => {
    const handleConfirm = jest.fn();
    render(<BookingForm event={mockEvent} onCancel={jest.fn()} onConfirm={handleConfirm} />);

    fireEvent.click(screen.getByText("Confirm booking"));

    expect(screen.getByText("Please fill all fields")).toBeInTheDocument();
    expect(handleConfirm).not.toHaveBeenCalled();
  });

  it("shows error if quantity exceeds available seats", () => {
    const handleConfirm = jest.fn();
    render(<BookingForm event={mockEvent} onCancel={jest.fn()} onConfirm={handleConfirm} />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText("Quantity"), { target: { value: "10" } });

    fireEvent.click(screen.getByText("Confirm booking"));

    expect(screen.getByText(`Only ${mockEvent.seats} seats available`)).toBeInTheDocument();
    expect(handleConfirm).not.toHaveBeenCalled();
  });

  it("shows error if quantity is less than 1", () => {
    const handleConfirm = jest.fn();
    render(<BookingForm event={mockEvent} onCancel={jest.fn()} onConfirm={handleConfirm} />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText("Quantity"), { target: { value: "0" } });

    fireEvent.click(screen.getByText("Confirm booking"));

    expect(screen.getByText("Quantity must be at least 1")).toBeInTheDocument();
    expect(handleConfirm).not.toHaveBeenCalled();
  });

  it("shows error for invalid email format", () => {
    const handleConfirm = jest.fn();
    render(<BookingForm event={mockEvent} onCancel={jest.fn()} onConfirm={handleConfirm} />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "invalid-email" } });
    fireEvent.change(screen.getByLabelText("Quantity"), { target: { value: "2" } });

    fireEvent.click(screen.getByText("Confirm booking"));

    expect(screen.getByText("Please enter a valid email")).toBeInTheDocument();
    expect(handleConfirm).not.toHaveBeenCalled();
  });

  it("calls onConfirm with valid data", () => {
    const handleConfirm = jest.fn();
    render(<BookingForm event={mockEvent} onCancel={jest.fn()} onConfirm={handleConfirm} />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText("Quantity"), { target: { value: "2" } });

    fireEvent.click(screen.getByText("Confirm booking"));

    expect(handleConfirm).toHaveBeenCalledWith({
      eventId: mockEvent.id,
      name: "John",
      email: "john@example.com",
      quantity: 2,
    });
  });

  it("clears error after correcting the input", () => {
    const handleConfirm = jest.fn();
    render(<BookingForm event={mockEvent} onCancel={jest.fn()} onConfirm={handleConfirm} />);

    fireEvent.click(screen.getByText("Confirm booking"));
    expect(screen.getByText("Please fill all fields")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText("Quantity"), { target: { value: "2" } });

    fireEvent.click(screen.getByText("Confirm booking"));
    expect(screen.queryByText("Please fill all fields")).not.toBeInTheDocument();
    expect(handleConfirm).toHaveBeenCalled();
  });

  it("calls onCancel when cancel button is clicked", () => {
    const handleCancel = jest.fn();
    render(<BookingForm event={mockEvent} onCancel={handleCancel} onConfirm={jest.fn()} />);

    fireEvent.click(screen.getByText("Cancel"));
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });
});
