import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../../components/SearchBar"; 
import "@testing-library/jest-dom";

describe("SearchBar component", () => {
  it("renders input and clear button", () => {
    render(<SearchBar />);
    
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
  });

  it("calls onSearch when typing in input", () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);

    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "React" } });

    expect(handleSearch).toHaveBeenCalledWith("React");
  });

  it("calls onSearch with empty string when Clear is clicked", () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);

    const button = screen.getByRole("button", { name: /clear/i });
    fireEvent.click(button);

    expect(handleSearch).toHaveBeenCalledWith("");
  });
});

