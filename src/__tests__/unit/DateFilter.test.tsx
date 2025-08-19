import { render, screen, fireEvent } from "@testing-library/react";
import DateFilter from "../../components/DateFilter"; // adjust the path if needed
import "@testing-library/jest-dom";

describe("DateFilter component", () => {
  it("renders label and date input", () => {
    render(<DateFilter />);
    
    // Label
    expect(screen.getByText("Date")).toBeInTheDocument();

    // Input should exist and be of type date
    const input = screen.getByLabelText("Date");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "date");
  });

  it("calls onChange with the selected date", () => {
    const handleChange = jest.fn();
    render(<DateFilter onChange={handleChange} />);

    const input = screen.getByLabelText("Date");
    fireEvent.change(input, { target: { value: "2025-08-19" } });

    expect(handleChange).toHaveBeenCalledWith("2025-08-19");
  });

  it("does not throw error when onChange is not provided", () => {
    render(<DateFilter />);
    const input = screen.getByLabelText("Date");

    fireEvent.change(input, { target: { value: "2025-08-19" } });

    // Still updates the input value in DOM
    expect(input).toHaveValue("2025-08-19");
  });
});

