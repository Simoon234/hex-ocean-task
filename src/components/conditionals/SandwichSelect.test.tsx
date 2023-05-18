import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SandwichSelect from "./SandwichSelect";

describe("SandwichSelect", () => {
  beforeEach(() => {
    const mocks = {
      handleChange: vi.fn(),
      handleBlur: vi.fn(),
      slices_of_bread: 2,
      errorSlicesOfBread: "",
      touchedSlicesOfBread: false,
    };
    render(<SandwichSelect {...mocks} />);
  });
  describe("SandwichSelect - test slices_of_bread", () => {
    it("should render Number of slices - paragraph", () => {
      const element = screen.getByText(/Slices*/);
      expect(element).toHaveTextContent("Slices of bread");
    });

    it("should return expected value", () => {
      const inputProp = screen.getByRole("spinbutton", {
        name: /slices_of_bread/i,
      }) as HTMLInputElement;
      expect(inputProp.value).toBe("2");
      expect(inputProp).toBeTruthy();
    });
    it("slices_of_bread should be of type number", () => {
      const inputProp = screen.getByRole("spinbutton", {
        name: /slices_of_bread/i,
      }) as HTMLInputElement;
      expect(inputProp).toHaveAttribute("type", "number");
    });
    it("should return an error", async () => {
      const mocks = {
        handleChange: vi.fn(),
        handleBlur: vi.fn(),
        slices_of_bread: -1,
        errorSlicesOfBread: "Min value required",
        touchedSlicesOfBread: true,
      };
      render(<SandwichSelect {...mocks} />);
      const error = screen.getByText(/Min*/);
      expect(error).toHaveTextContent("Min value required");
      expect(error).toBeDefined();
      expect(error).toBeInTheDocument();
    });
  });
});
