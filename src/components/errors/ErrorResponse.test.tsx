import { render, screen, waitFor } from "@testing-library/react";
import ErrorsResponse from "./ErrorResponse";

describe("ErrorResponse", () => {
  it("should not be any errors", async () => {
    render(<ErrorsResponse customError={null} />);
    await waitFor(() => {
      const preparation = screen.queryByText(/Preparation*/);
      const diameter = screen.queryByText(/Diameter*/);
      const name = screen.queryByText(/Name*/);
      const numberOf = screen.queryByText(/Number of*/);
      const spiciness = screen.queryByText(/Spiciness*/);
      const slices = screen.queryByText(/Slices*/);
      expect(preparation).not.toBeInTheDocument();
      expect(diameter).not.toBeInTheDocument();
      expect(name).not.toBeInTheDocument();
      expect(numberOf).not.toBeInTheDocument();
      expect(spiciness).not.toBeInTheDocument();
      expect(slices).not.toBeInTheDocument();
    });
  });
  it("should display empty string[].That means that, there was an error", async () => {
    render(
      <ErrorsResponse
        customError={[
          {
            preparation_time: [""],
            name: [""],
            diameter: [""],
            no_of_slices: [""],
            type: [""],
            slices_of_bread: [""],
            spiciness_scale: [""],
          },
        ]}
      />
    );

    await waitFor(() => {
      const name = screen.getByLabelText("name");
      const diameter = screen.getByLabelText("diameter");
      const spiciness = screen.getByLabelText("spiciness");
      const slices0fBread = screen.getByLabelText("slices_of_bread");
      const prepTime = screen.getByLabelText("preparation_time");
      const type = screen.getByLabelText("type");
      const slices = screen.getByLabelText("number_of_slices");

      expect(name).toBeInTheDocument();
      expect(name).toBeDefined();
      expect(name).toBeTruthy();
      expect(name).toHaveTextContent("");

      expect(diameter).toBeInTheDocument();
      expect(diameter).toBeDefined();
      expect(diameter).toBeTruthy();
      expect(diameter).toHaveTextContent("");

      expect(spiciness).toBeInTheDocument();
      expect(spiciness).toBeDefined();
      expect(spiciness).toBeTruthy();
      expect(spiciness).toHaveTextContent("");

      expect(slices0fBread).toBeInTheDocument();
      expect(slices0fBread).toBeDefined();
      expect(slices0fBread).toBeTruthy();
      expect(slices0fBread).toHaveTextContent("");

      expect(prepTime).toBeInTheDocument();
      expect(prepTime).toBeDefined();
      expect(prepTime).toBeTruthy();
      expect(prepTime).toHaveTextContent("");

      expect(type).toBeInTheDocument();
      expect(type).toBeDefined();
      expect(type).toBeTruthy();
      expect(type).toHaveTextContent("");

      expect(slices).toBeInTheDocument();
      expect(slices).toBeDefined();
      expect(slices).toBeTruthy();
      expect(slices).toHaveTextContent("");
    });
  });
});
