import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PizzaSelect from "./PizzaSelect";

describe("PizzaSelect", () => {
  beforeEach(() => {
    const mocks = {
      no_of_slices: 2,
      diameter: 1,
      handleChange: vi.fn(),
      errorsNo_of_slices: "Error",
      errorsDiameter: "",
      touchedNo_of_slices: false,
      touchedDiameter: false,
      handleBlur: vi.fn(),
    };
    render(<PizzaSelect {...mocks} />);
  });
  describe("PizzaSelect - test no_of_slices", () => {
    it("should render Number of slices paragraph", () => {
      const element = screen.getByText(/Number*/);
      expect(element).toHaveTextContent("Number of slices");
    });
    it("should render input", () => {
      const input = screen.getByLabelText("number_of_slices");
      expect(input).toBeDefined();
    });
    it("should return expected value", () => {
      const inputProp = screen.getByLabelText(
        "number_of_slices"
      ) as HTMLInputElement;
      expect(inputProp.value).toBe("2");
      expect(inputProp).toBeTruthy();
    });
    it("name should be type text", () => {
      const nameInput = screen.getByLabelText(/number_of_slices/);
      expect(nameInput).toHaveAttribute("type", "number");
    });
    it("should return error if touched", async () => {
      const mocks = {
        no_of_slices: 2,
        diameter: 1,
        handleChange: vi.fn(),
        errorsNo_of_slices: "Error message",
        errorsDiameter: "",
        touchedNo_of_slices: true,
        touchedDiameter: false,
        handleBlur: vi.fn(),
      };
      render(<PizzaSelect {...mocks} />);
      const error = screen.getByText(/Error/);
      expect(error).toHaveTextContent("Error message");
      expect(error).toBeDefined();
      expect(error).toBeInTheDocument();
    });
    it("should return error if value is less than 0", async () => {
      const mocks = {
        no_of_slices: 0,
        diameter: 1,
        handleChange: vi.fn(),
        errorsNo_of_slices: "Less than 0",
        errorsDiameter: "",
        touchedNo_of_slices: true,
        touchedDiameter: false,
        handleBlur: vi.fn(),
      };
      render(<PizzaSelect {...mocks} />);
      const error = screen.getByText(/Less/);
      expect(error).toHaveTextContent("Less than 0");
      expect(error).toBeDefined();
      expect(error).toBeInTheDocument();
    });
  });

  describe("PizzaSelect - diameter", () => {
    it("paragraph should be defined", () => {
      const paragraph = screen.getByText(/diameter/i);
      expect(paragraph).toHaveTextContent("Diameter");
    });
    it("input should be defined", () => {
      const input = screen.getByLabelText("diameter");
      expect(input).toBeDefined();
      expect(input).toBeInTheDocument();
      expect(input).toBeTruthy();
    });
    it("input should have give the value", () => {
      const input = screen.getByLabelText("diameter") as HTMLInputElement;
      expect(input.value).toBe("1");
    });
    it("name should be type text", () => {
      const nameInput = screen.getByLabelText(/diameter/);
      expect(nameInput).toHaveAttribute("type", "number");
    });
    it("should return error if diameter was touched", async () => {
      const mocks = {
        no_of_slices: 2,
        diameter: 1,
        handleChange: vi.fn(),
        errorsNo_of_slices: "",
        errorsDiameter: "Error message",
        touchedNo_of_slices: false,
        touchedDiameter: true,
        handleBlur: vi.fn(),
      };
      render(<PizzaSelect {...mocks} />);
      const error = screen.getByText(/Error/);
      expect(error).toHaveTextContent("Error message");
      expect(error).toBeDefined();
      expect(error).toBeInTheDocument();
    });
  });

  describe("PizzaSelect - related test for diameter and no_of_slices", () => {
    it("should be no error", async () => {
      const mocks = {
        no_of_slices: 0,
        diameter: 1,
        handleChange: vi.fn(),
        errorsNo_of_slices: "",
        errorsDiameter: "",
        touchedNo_of_slices: false,
        touchedDiameter: false,
        handleBlur: vi.fn(),
      };
      render(<PizzaSelect {...mocks} />);
      const error = screen.queryByText(/Error/);
      expect(error).toBeNull();
    });
  });
});
