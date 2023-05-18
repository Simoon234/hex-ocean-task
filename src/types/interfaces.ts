import DishType from "./enums";

export interface DishesFields {
  name: string;
  type: DishType | string;
  preparation_time: string;
  no_of_slices?: number | null;
  diameter?: number | null;
  spiciness_scale?: number | null;
  slices_of_bread?: number | null;
}
