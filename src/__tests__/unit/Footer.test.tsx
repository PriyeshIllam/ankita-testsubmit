import { render, screen } from "@testing-library/react";
import Footer from "../../app/components/Footer"; 

describe("Footer component", () => {
  it("renders footer text with current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear();

    expect(
      screen.getByRole("contentinfo")
    ).toHaveTextContent(`© ${year} Evently. All rights reserved.`);
  });

  it("has correct role for accessibility", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
