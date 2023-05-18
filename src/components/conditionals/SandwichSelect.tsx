import { SandwichSelectProps } from "../../types";

function SandwichSelect({
  handleChange,
  slices_of_bread,
  touchedSlicesOfBread,
  errorSlicesOfBread,
  handleBlur,
}: SandwichSelectProps) {
  return (
    <>
      <label className="w-full" htmlFor="slices_of_bread">
        <p className="mb-2">Slices of bread</p>
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          name="slices_of_bread"
          value={slices_of_bread}
          aria-invalid={
            errorSlicesOfBread && touchedSlicesOfBread ? "true" : "false"
          }
          aria-label="slices_of_bread"
          type="number"
          aria-errormessage="slices_of_bread-id"
        />
      </label>
      {errorSlicesOfBread && touchedSlicesOfBread ? (
        <span
          id="slices_of_bread-id"
          className="text-red-500 font-bold underline"
        >
          {errorSlicesOfBread}
        </span>
      ) : null}
    </>
  );
}

export default SandwichSelect;
