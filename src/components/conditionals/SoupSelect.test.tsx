import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SoupSelect from "./SoupSelect";

describe("SoupSelect", () => {
  beforeEach(() => {
    const mocks = {
      handleChange: vi.fn(),
      handleBlur: vi.fn(),
      spiciness_scale: 2,
      errorSoup: "",
      touchedSoup: false,
    };
    render(<SoupSelect {...mocks} />);
  });
  describe("SoupSelect - test spiciness_scale", () => {
    it("should render Number of spiciness - paragraph", () => {
      const element = screen.getByText(/Spiciness*/);
      expect(element).toHaveTextContent("Spiciness");
    });

    it("should return expected value", () => {
      const inputProp = screen.getByRole("spinbutton", {
        name: /spiciness_scale/i,
      }) as HTMLInputElement;
      expect(inputProp.value).toBe("2");
      expect(inputProp).toBeTruthy();
    });
    it("spiciness_scale should be of type number", () => {
      const inputProp = screen.getByRole("spinbutton", {
        name: /spiciness_scale/i,
      }) as HTMLInputElement;
      expect(inputProp).toHaveAttribute("type", "number");
    });
    it("should return an error", async () => {
      const mocks = {
        handleChange: vi.fn(),
        handleBlur: vi.fn(),
        spiciness_scale: 2,
        errorSoup: "Min value required",
        touchedSoup: true,
      };
      render(<SoupSelect {...mocks} />);
      const error = screen.getByText(/Min*/);
      expect(error).toHaveTextContent("Min value required");
      expect(error).toBeDefined();
      expect(error).toBeInTheDocument();
    });
  });
});
