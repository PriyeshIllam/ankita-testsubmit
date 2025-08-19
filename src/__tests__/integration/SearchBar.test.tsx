import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../../components/SearchBar";

describe("SearchBar integration test", () => {
  it("calls onSearch when user types", () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);

    const input = screen.getByRole("searchbox");

    // simulate typing
    fireEvent.change(input, { target: { value: "React" } });

    expect(handleSearch).toHaveBeenCalledWith("React");
  });

  it("clears search when Clear button is clicked", () => {
    const handleSearch = jest.fn();
    render(<SearchBar onSearch={handleSearch} />);

    const input = screen.getByRole("searchbox");
    const button = screen.getByRole("button", { name: /clear/i });

    // user types something
    fireEvent.change(input, { target: { value: "Next.js" } });
    expect(handleSearch).toHaveBeenCalledWith("Next.js");

    // user clicks Clear
    fireEvent.click(button);
    expect(handleSearch).toHaveBeenCalledWith("");
  });

  it("renders correctly without crashing even if onSearch is not provided", () => {
    render(<SearchBar />);
    const input = screen.getByRole("searchbox");
    expect(input).toBeInTheDocument();
  });
});