import * as Yup from "yup";

const validationSchema = Yup.object().shape(
  {
    name: Yup.string()
      .min(3, "The given value is too short! (Min. 3 characters)")
      .max(200, "This is very long text")
      .matches(/^[a-zA-Z\s]*$/, {
        message: "Given value contains numbers, special characters.",
      })
      .required("Please fill this field"),
    preparation_time: Yup.string().required("Please fill this field"),
    type: Yup.string().required("Please fill this field"),
    no_of_slices: Yup.number()
      .required("Please fill this field")
      .when("type", {
        is: "pizza",
        then: Yup.number()
          .min(1, "Number of slices must be more than 1")
          .required("Please fill this field"),
        otherwise: Yup.number().min(0),
      }),
    diameter: Yup.number()
      .required("Please fill this field")
      .min(1)
      .when("type", {
        is: "pizza",
        then: Yup.number()
          .min(1, "Diameter must be more than 1")
          .required("Please fill this field"),
        otherwise: Yup.number().min(0),
      }),
    spiciness_scale: Yup.number()
      .required("Please fill this field")
      .when("type", {
        is: "soup",
        then: Yup.number()
          .min(1, "Spiciness scale must be more than 1")
          .max(10, "Spiciness scale cannot be greater than 10")
          .required("Please fill this field"),
        otherwise: Yup.number().min(0),
      }),
    slices_of_bread: Yup.number()
      .required("Please fill this field")
      .when("type", {
        is: "sandwich",
        then: Yup.number()
          .min(1, "Slices of bread must be more than 1")
          .required("Please fill this field"),
        otherwise: Yup.number().min(0),
      }),
  },

  [["type", ""]]
);

export default validationSchema;
