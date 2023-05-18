import { memo } from "react";
import { SoupSelectProps } from "../../types";

const SoupSelect = memo(
  ({
    handleChange,
    spiciness_scale,
    touchedSoup,
    handleBlur,
    errorSoup,
  }: SoupSelectProps) => {
    return (
      <>
        <label className="w-full" htmlFor="spiciness_scale">
          <p className="mb-2">Spiciness</p>
          <input
            name="spiciness_scale"
            value={spiciness_scale}
            onChange={handleChange}
            aria-label="spiciness_scale"
            aria-invalid={errorSoup && touchedSoup ? "true" : "false"}
            min={1}
            max={10}
            className={`${
              errorSoup && touchedSoup ? "border-2 border-red-500" : ""
            }`}
            onBlur={handleBlur}
            type="number"
          />
        </label>
        {errorSoup && touchedSoup ? (
          <span className="text-red-500 font-bold underline">{errorSoup}</span>
        ) : null}
      </>
    );
  }
);

SoupSelect.displayName = "SoupSelect";

export default SoupSelect;
