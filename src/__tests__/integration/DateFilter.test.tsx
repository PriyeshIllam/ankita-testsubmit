import { render, screen, fireEvent } from "@testing-library/react";
import DateFilter from "../../components/DateFilter"; 

describe("DateFilter integration test", () => {
  it("renders label and input", () => {
    render(<DateFilter />);
    
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    //expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    //expect(screen.getByRole("spinbutton", { hidden: true })).toBeInTheDocument(); 
  });

  it("calls onChange with selected date", () => {
    const handleChange = jest.fn();
    render(<DateFilter onChange={handleChange} />);

    const input = screen.getByLabelText(/date/i);

    fireEvent.change(input, { target: { value: "2025-08-19" } });

    expect(handleChange).toHaveBeenCalledWith("2025-08-19");
  });

  it("does not crash if onChange is not provided", () => {
    render(<DateFilter />);
    const input = screen.getByLabelText(/date/i);

    // Simulate user action without onChange
    fireEvent.change(input, { target: { value: "2025-08-19" } });

    expect(input).toHaveValue("2025-08-19"); // input updates fine
  });
});
