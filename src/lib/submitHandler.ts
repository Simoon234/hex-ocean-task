import { DishType, Submit } from "../types";

const submitHandler = ({ mutate, val }: Submit) => {
  const requiredValues = {
    name: val.name,
    preparation_time: val.preparation_time,
    type: val.type,
  };
  if (val.type === DishType.pizza) {
    return mutate({
      ...requiredValues,
      no_of_slices: val.no_of_slices,
      diameter: val.diameter,
    });
  }
  if (val.type === DishType.soup) {
    return mutate({
      ...requiredValues,
      spiciness_scale: val.spiciness_scale,
    });
  }
  if (val.type === DishType.sandwich) {
    return mutate({
      ...requiredValues,
      slices_of_bread: val.slices_of_bread,
    });
  }
  return false;
};

export default submitHandler;
