import React, { ChangeEvent, FocusEventHandler } from "react";
import { FormikErrors, FormikTouched } from "formik";
import { ButtonType, DishType } from "./enums";

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

export interface SandwichSelectProps {
  handleChange: (e: ChangeEvent) => void;
  slices_of_bread: number;
  errorSlicesOfBread: string;
  touchedSlicesOfBread: boolean;
  handleBlur: React.FocusEventHandler<HTMLInputElement> | undefined;
}

export interface SoupSelectProps {
  spiciness_scale: number;
  handleChange: (e: ChangeEvent) => void;
  errorSoup: string;
  touchedSoup: boolean;
  handleBlur: FocusEventHandler<HTMLInputElement> | undefined;
}

export interface UserSelectDisplayProps {
  type: string;
  handleChange: (e: ChangeEvent) => void;
  errors: FormikErrors<DishesFields>;
  touched: FormikTouched<DishesFields>;
  values: DishesFields;
  handleBlur: React.FocusEventHandler<HTMLInputElement> | undefined;
}

export interface Submit {
  val: DishesFields;
  mutate: any;
}

export interface ErrorResponse {
  customError: ErrorRes[] | null;
}

export interface ButtonProps {
  type: ButtonType;
  isLoading: boolean;
  setErrors: (x: ErrorRes[] | null) => void;
  resetForm?: () => void;
}
