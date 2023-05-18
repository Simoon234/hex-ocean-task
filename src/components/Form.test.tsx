import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Form from "./Form";

const queryClient = new QueryClient();

describe("Form", () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Form />;
      </QueryClientProvider>
    );
  });
  describe("name input", () => {
    let nameInput: HTMLElement;

    beforeEach(() => {
      nameInput = screen.getByLabelText(/input-name/);
    });

    it("should be name input", () => {
      expect(nameInput).toBeInTheDocument();
      expect(nameInput).toBeDefined();
      expect(nameInput).toBeTruthy();
    });

    it("name should be type text", () => {
      expect(nameInput).toHaveAttribute("type", "text");
    });
    it("name should have text Pizza", () => {
      fireEvent.change(nameInput, {
        target: {
          value: "Pizza",
        },
      });
      expect(nameInput).toHaveValue("Pizza");
    });
    it("check if input field was focused and than if the focus was removed", async () => {
      fireEvent.focus(nameInput);
      fireEvent.blur(nameInput);

      await waitFor(() => {
        const error = screen.getByText("Please fill this field");
        expect(error).toBeInTheDocument();
      });
    });
    it("Check validation error message. Provided numbers)", async () => {
      fireEvent.focus(nameInput);

      fireEvent.change(nameInput, {
        target: {
          value: "222",
        },
      });

      fireEvent.blur(nameInput);

      await waitFor(() => {
        const error = screen.getByText(
          "Given value contains numbers, special characters."
        );
        expect(error).toBeInTheDocument();
        expect(nameInput).toHaveErrorMessage(
          "Given value contains numbers, special characters."
        );
      });
    });
    it("Check validation error message. Provided special characters", async () => {
      fireEvent.focus(nameInput);

      fireEvent.change(nameInput, {
        target: {
          value: "!!!",
        },
      });

      fireEvent.blur(nameInput);

      await waitFor(() => {
        const error = screen.getByText(
          "Given value contains numbers, special characters."
        );
        expect(error).toBeInTheDocument();
        expect(nameInput).toHaveErrorMessage(
          "Given value contains numbers, special characters."
        );
      });
    });
    it("check if provided text has at least 3 characters", async () => {
      fireEvent.focus(nameInput);
      fireEvent.change(nameInput, {
        target: {
          value:
            "Contrary to popular belief, " +
            "Lorem Ipsum is not simply random text. " +
            "It has roots in a piece of classical Latin literature " +
            "from 45 BC, making it over 2000 years old. Richard McClintock, a" +
            " Latin professor at Hampden-Sydney College in Virginia, looked up " +
            "one of the more obscure Latin words, consectetur, from a Lorem " +
            "Ipsum passage, and going through the cites of the word in classical " +
            "literature, discovered the undoubtable source. Lorem Ipsum comes from " +
            'sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" ' +
            "(The Extremes of Good and Evil) by Cicero, written in 45 BC. " +
            "This book is a treatise on the theory of ethics, very popular " +
            'during the Renaissance. The first line of Lorem Ipsum, "' +
            'Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        },
      });

      fireEvent.blur(nameInput);

      await waitFor(() => {
        const error = screen.getByText("This is very long text");
        expect(error).toBeInTheDocument();
        expect(nameInput).toHaveErrorMessage("This is very long text");
      });
    });
  });

  describe("preparation_time input", () => {
    let prepTime: HTMLElement;
    beforeEach(() => {
      prepTime = screen.getByLabelText(/input-preparation_time/);
    });
    it("should be preparation_time input", () => {
      expect(prepTime).toBeInTheDocument();
      expect(prepTime).toBeDefined();
      expect(prepTime).toBeTruthy();
    });
    it("preparation_time should be type time", () => {
      expect(prepTime).toHaveAttribute("type", "time");
    });
    it("preparation_time return value in a valid format", async () => {
      fireEvent.change(prepTime, {
        target: {
          value: "12:00",
        },
      });
      expect(prepTime).toHaveValue("12:00");
    });
    it("should return error", async () => {
      fireEvent.focus(prepTime);
      fireEvent.blur(prepTime);

      await waitFor(() => {
        const error = screen.getByText("Please fill this field");
        expect(error).toBeInTheDocument();
      });
    });
    it("should return error if only two digest are provided", async () => {
      fireEvent.focus(prepTime);

      fireEvent.change(prepTime, { target: { value: "22" } });

      fireEvent.blur(prepTime);

      await waitFor(() => {
        const error = screen.getByText("Please fill this field");
        expect(error).toBeInTheDocument();
        expect(prepTime).toHaveErrorMessage("Please fill this field");
      });
    });
    it("should return NO error if there are provided 4 digest [22:22] ex.", async () => {
      fireEvent.focus(prepTime);

      fireEvent.change(prepTime, { target: { value: "22:22" } });

      fireEvent.blur(prepTime);

      await waitFor(() => {
        const error = screen.queryByText("Please fill this field");
        expect(error).toBeNull();
        expect(error).not.toBeInTheDocument();
        expect(prepTime).not.toHaveErrorMessage("Please fill this field");
      });
    });
  });

  describe("type select", () => {
    let typeSelect: HTMLElement;
    let options: HTMLElement[];
    beforeEach(() => {
      typeSelect = screen.getByRole("combobox");
      options = screen.getAllByRole("option");
    });
    it("should be type select", () => {
      expect(typeSelect).toBeInTheDocument();
      expect(typeSelect).toBeDefined();
      expect(typeSelect).toBeTruthy();
    });
    it("type select should have 4 options", () => {
      expect(options.length).toBe(4);
    });
    it("first type select should be empty", () => {
      expect(options[0]).toHaveValue("");
    });
    it("check option values", () => {
      expect(options[0]).toHaveValue("");
      expect(options[1]).toHaveValue("pizza");
      expect(options[2]).toHaveValue("soup");
      expect(options[3]).toHaveValue("sandwich");
    });
    it("check if select was touched", async () => {
      fireEvent.focus(typeSelect);
      fireEvent.blur(typeSelect);

      await waitFor(() => {
        const error = screen.getByText("Please fill this field");
        expect(error).toBeInTheDocument();
        expect(typeSelect).toHaveErrorMessage("Please fill this field");
      });
    });
    it("should render required labels when user selected pizza", async () => {
      fireEvent.change(typeSelect, {
        target: {
          value: "pizza",
        },
      });
      const numberOfSlices = screen.getByRole("spinbutton", {
        name: /number_of_slices/i,
      });
      expect(numberOfSlices).toBeInTheDocument();

      const diameter = screen.getByRole("spinbutton", {
        name: /diameter/i,
      });
      expect(diameter).toBeInTheDocument();
    });
    it("should render required labels when user selected soup", async () => {
      fireEvent.change(typeSelect, {
        target: {
          value: "soup",
        },
      });
      const spicinessScale = screen.getByRole("spinbutton", {
        name: /spiciness/i,
      });
      expect(spicinessScale).toBeInTheDocument();
      expect(spicinessScale).toBeTruthy();
    });
    it("should render required labels when user selected sandwich", async () => {
      fireEvent.change(typeSelect, {
        target: {
          value: "sandwich",
        },
      });
      const slicesOfBread = screen.getByRole("spinbutton", {
        name: /slices_of_bread/i,
      });
      expect(slicesOfBread).toBeInTheDocument();
      expect(slicesOfBread).toBeTruthy();
    });
    it("should not render required labels when user selected nothing", async () => {
      const numberOfSlices = screen.queryByRole("spinbutton", {
        name: /number_of_slices/i,
      });
      const diameter = screen.queryByRole("spinbutton", {
        name: /diameter/i,
      });
      const spicinessScale = screen.queryByRole("spinbutton", {
        name: /spiciness/i,
      });
      const slicesOfBread = screen.queryByRole("spinbutton", {
        name: /slices of bread/i,
      });
      expect(numberOfSlices).toBeNull();
      expect(diameter).toBeNull();
      expect(spicinessScale).toBeNull();
      expect(slicesOfBread).toBeNull();
    });
  });

  describe("button submit", () => {
    let submitButton: HTMLElement;
    beforeEach(() => {
      submitButton = screen.getByRole("button", {
        name: /submit/i,
      });
    });
    it("should be submit button", () => {
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toBeDefined();
      expect(submitButton).toBeTruthy();
    });
    it("submit button return errors [3]", async () => {
      fireEvent.submit(submitButton);
      const errors = await screen.findAllByText(/Please fill this field/);

      await waitFor(() => {
        expect(errors.length).toBeGreaterThan(1);
        expect(errors.length).toBe(3);
      });
    });
    it("submit values", () => {});
  });

  describe("reset button", () => {
    let typeSelect: HTMLElement;
    beforeEach(() => {
      typeSelect = screen.getByRole("combobox");
    });

    it("button should be visible if at least three fields are not empty", async () => {
      const name = screen.getByLabelText(/name*/);
      fireEvent.change(name, {
        target: {
          value: "John",
        },
      });
      const prepTime = screen.getByLabelText("input-preparation_time");
      fireEvent.change(prepTime, {
        target: {
          value: "22:22:22",
        },
      });
      fireEvent.change(typeSelect, {
        target: {
          value: "pizza",
        },
      });

      await waitFor(() => {
        const resetButton = screen.getByLabelText("reset-btn");
        expect(resetButton).toBeInTheDocument();
        expect(resetButton).toHaveTextContent("Reset");
      });
    });

    it("button should be visible and after click should disappear", async () => {
      const name = screen.getByLabelText(/name*/) as HTMLInputElement;
      const options = screen.getAllByRole("option");

      fireEvent.change(name, {
        target: {
          value: "John",
        },
      });
      const prepTime = screen.getByLabelText(
        "input-preparation_time"
      ) as HTMLInputElement;

      fireEvent.change(prepTime, {
        target: {
          value: "22:22:22",
        },
      });
      fireEvent.change(typeSelect, {
        target: {
          value: "pizza",
        },
      });

      await waitFor(() => {
        const resetButton = screen.getByLabelText("reset-btn");
        fireEvent.click(resetButton as Element | Node | Document | Window);
        expect(resetButton).not.toBeInTheDocument();
        expect(prepTime.value).toBe("");
        expect(name.value).toBe("");
        expect(options[0]).toHaveValue("");
      });
    });
  });

  describe("check nested errors", () => {
    let typeSelect: HTMLElement;
    beforeEach(() => {
      typeSelect = screen.getByRole("combobox");
    });

    it("should return validation errors - pizza select", async () => {
      fireEvent.change(typeSelect, {
        target: {
          value: "pizza",
        },
      });
      const numberOfSlices = screen.getByRole("spinbutton", {
        name: /number_of_slices/i,
      });
      expect(numberOfSlices).toBeInTheDocument();

      fireEvent.focus(numberOfSlices);

      fireEvent.change(numberOfSlices, {
        target: {
          value: "-1",
        },
      });
      fireEvent.blur(numberOfSlices);

      const diameter = screen.getByRole("spinbutton", {
        name: /diameter/i,
      });

      expect(diameter).toBeInTheDocument();

      fireEvent.focus(diameter);

      fireEvent.change(diameter, {
        target: {
          value: "-1",
        },
      });
      fireEvent.blur(diameter);

      await waitFor(() => {
        const errSlices = screen.getByText(
          "Number of slices must be more than 1"
        );
        expect(errSlices).toBeInTheDocument();
        expect(errSlices).toHaveTextContent(
          "Number of slices must be more than 1"
        );
        const diamater = screen.getByText("Diameter must be more than 1");
        expect(diamater).toBeInTheDocument();
        expect(diamater).toHaveTextContent("Diameter must be more than 1");
      });
    });

    it("should return validation errors - soup select", async () => {
      fireEvent.change(typeSelect, {
        target: {
          value: "soup",
        },
      });
      const spicinessScale = screen.getByRole("spinbutton", {
        name: /spiciness/i,
      });
      fireEvent.focus(spicinessScale);

      fireEvent.change(spicinessScale, {
        target: {
          value: "-1",
        },
      });
      fireEvent.blur(spicinessScale);

      await waitFor(() => {
        const errSlices = screen.getByText(
          "Spiciness scale must be more than 1"
        );
        expect(errSlices).toBeInTheDocument();
        expect(errSlices).toHaveTextContent(
          "Spiciness scale must be more than 1"
        );
      });
    });
    it("should return validation errors - sandwich select", async () => {
      fireEvent.change(typeSelect, {
        target: {
          value: "sandwich",
        },
      });
      const slicesOfBread = screen.getByRole("spinbutton", {
        name: /slices/i,
      });
      fireEvent.focus(slicesOfBread);

      fireEvent.change(slicesOfBread, {
        target: {
          value: "-1",
        },
      });
      fireEvent.blur(slicesOfBread);

      await waitFor(() => {
        const errSlices = screen.getByText(
          "Slices of bread must be more than 1"
        );
        expect(errSlices).toBeInTheDocument();
        expect(errSlices).toHaveTextContent(
          "Slices of bread must be more than 1"
        );
      });
    });
  });
});
