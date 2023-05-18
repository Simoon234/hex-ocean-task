import { SoupSelectProps } from "../../types";

function SoupSelect({
  handleChange,
  spiciness_scale,
  touchedSoup,
  handleBlur,
  errorSoup,
}: SoupSelectProps) {
  return (
    <>
      <label className="w-full" htmlFor="spiciness_scale">
        <p className="mb-2">Spiciness</p>
        <input
          name="spiciness_scale"
          value={spiciness_scale}
          onChange={handleChange}
          aria-label="spiciness_scale"
          min={1}
          max={10}
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

export default SoupSelect;
