import { useCallback } from "react";
import { DishType, UserSelectDisplayProps } from "../types";
import PizzaSelect from "../components/conditionals/PizzaSelect";
import SoupSelect from "../components/conditionals/SoupSelect";
import SandwichSelect from "../components/conditionals/SandwichSelect";

const UseSelectDisplay = ({
  handleChange,
  handleBlur,
  type,
  touched,
  errors,
  values,
}: UserSelectDisplayProps) => {
  const handleSelectedOption = useCallback(() => {
    switch (type) {
      case DishType.pizza: {
        return (
          <PizzaSelect
            errorsNo_of_slices={errors.no_of_slices as string}
            touchedNo_of_slices={touched.no_of_slices as boolean}
            handleBlur={handleBlur}
            errorsDiameter={errors.diameter as string}
            touchedDiameter={touched.diameter as boolean}
            no_of_slices={values.no_of_slices as number}
            diameter={values.diameter as number}
            handleChange={handleChange}
          />
        );
      }
      case DishType.soup: {
        return (
          <SoupSelect
            spiciness_scale={values.spiciness_scale as number}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errorSoup={errors.spiciness_scale as string}
            touchedSoup={touched.spiciness_scale as boolean}
          />
        );
      }
      case DishType.sandwich: {
        return (
          <SandwichSelect
            slices_of_bread={values.slices_of_bread as number}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errorSlicesOfBread={errors.slices_of_bread as string}
            touchedSlicesOfBread={touched.slices_of_bread as boolean}
          />
        );
      }
      default: {
        return "";
      }
    }
  }, [
    errors.diameter,
    errors.no_of_slices,
    errors.slices_of_bread,
    errors.spiciness_scale,
    handleBlur,
    handleChange,
    touched.diameter,
    touched.no_of_slices,
    touched.slices_of_bread,
    touched.spiciness_scale,
    type,
    values.diameter,
    values.no_of_slices,
    values.slices_of_bread,
    values.spiciness_scale,
  ]);
  return {
    handleSelectedOption,
  };
};

export default UseSelectDisplay;
