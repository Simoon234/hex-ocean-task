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
          className={`${
            errorsNo_of_slices && touchedNo_of_slices
              ? "border-2 border-red-500"
              : ""
          }`}
          name="no_of_slices"
          aria-label="number_of_slices"
          type="number"
          aria-invalid={
            errorsNo_of_slices && touchedNo_of_slices ? "true" : "false"
          }
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
          className={`${
            errorsDiameter && touchedDiameter ? "border-2 border-red-500" : ""
          }`}
          name="diameter"
          aria-label="diameter"
          min={1}
          step="0.1"
          type="number"
          aria-invalid={errorsDiameter && touchedDiameter ? "true" : "false"}
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
