import React, { ChangeEvent } from "react";
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

export interface ErrorRes {
  slices_of_bread: string[] | null;
  name: string[] | null;
  type: string[] | null;
  preparation_time: string[] | null;
  no_of_slices: string[] | null;
  diameter: string[] | null;
  spiciness_scale: string[] | null;
}

export interface PizzaSelectProps {
  no_of_slices: number;
  diameter: number;
  handleChange: (e: ChangeEvent) => void;
  errorsNo_of_slices: string;
  errorsDiameter: string;
  touchedNo_of_slices: boolean;
  touchedDiameter: boolean;
  handleBlur: React.FocusEventHandler<HTMLInputElement> | undefined;
}
