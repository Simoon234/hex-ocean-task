import { DishType, Submit } from "../types";

const submitHelper = ({ mutate, val }: Submit) => {
  const requiredValues = {
    name: val.name,
    preparation_time: val.preparation_time,
    type: val.type,
  };
  if (val.type === DishType.pizza) {
    mutate({
      ...requiredValues,
      no_of_slices: val.no_of_slices,
      diameter: val.diameter,
    });
  }
  if (val.type === DishType.soup) {
    mutate({
      ...requiredValues,
      spiciness_scale: val.spiciness_scale,
    });
  }
  if (val.type === DishType.sandwich) {
    mutate({
      ...requiredValues,
      slices_of_bread: val.slices_of_bread,
    });
  }
};

export default submitHelper;
