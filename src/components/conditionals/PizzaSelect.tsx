import { PizzaSelectProps } from "../../types";

function PizzaSelect({
  handleChange,
  no_of_slices,
  diameter,
  handleBlur,
  touchedNo_of_slices,
  errorsNo_of_slices,
  touchedDiameter,
  errorsDiameter,
}: PizzaSelectProps) {
  return (
    <>
      <label className="w-full" htmlFor="no_of_slices">
        <p className="mb-2">
          Number of slices <span>*</span>
        </p>
        <input
          onBlur={handleBlur}
          value={no_of_slices}
          onChange={handleChange}
          min={1}
          name="no_of_slices"
          aria-label="number_of_slices"
          type="number"
        />
      </label>
      {errorsNo_of_slices && touchedNo_of_slices ? (
        <span className="text-red-500 font-bold underline">
          {errorsNo_of_slices}
        </span>
      ) : null}
      <label className="w-full" htmlFor="diameter">
        <p className="mb-2">
          Diameter <span>*</span>
        </p>
        <input
          onBlur={handleBlur}
          value={diameter}
          onChange={handleChange}
          name="diameter"
          aria-label="diameter"
          min={1}
          step="0.1"
          type="number"
        />
      </label>
      {errorsDiameter && touchedDiameter ? (
        <span className="text-red-500 font-bold underline">
          {errorsDiameter}
        </span>
      ) : null}
    </>
  );
}

export default PizzaSelect;
