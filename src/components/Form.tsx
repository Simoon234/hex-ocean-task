import { useFormik } from "formik";
import { useMutation } from "react-query";
import { useEffect } from "react";
import initialFormikValues from "../lib/initialFormikValues";
import validationSchema from "../lib/validationSchema";
import usePostData from "../hooks/usePost";
import UseSelectDisplay from "../hooks/useSelectDisplay";
import submitHandler from "../lib/submitHandler";
import ErrorsResponse from "./errors/ErrorResponse";
import { ButtonType, DishType } from "../types";
import Button from "./common/Button";

function Form() {
  const { handlePost, setErrors, customError, setSuccess, success } =
    usePostData();
  const { isLoading, mutate } = useMutation({
    mutationFn: handlePost,
  });
  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    resetForm,
  } = useFormik({
    onSubmit: async (val) => {
      submitHandler({
        mutate,
        val,
      });
    },
    validationSchema,
    initialValues: initialFormikValues,
  });

  const { handleSelectedOption } = UseSelectDisplay({
    errors,
    handleBlur,
    handleChange,
    touched,
    type: values.type,
    values,
  });

  useEffect(() => {
    if (success) {
      resetForm();
      setSuccess(false);
    }
  }, [success, resetForm, setSuccess]);

  return (
    <form
      className="flex flex-col max-w-2xl w-[80%] m-auto justify-center items-center h-full"
      onSubmit={handleSubmit}
    >
      <label className="w-full" htmlFor="name">
        <p className="mb-2">Name</p>
        <input
          name="name"
          aria-label="input-name"
          onBlur={handleBlur}
          value={values.name}
          onChange={handleChange}
          className={`${
            errors.name && touched.name ? "border-2 border-red-500" : ""
          }`}
          type="text"
          aria-invalid={errors.name && touched.name ? "true" : "false"}
          aria-errormessage="name-id"
        />
      </label>
      {errors.name && touched.name ? (
        <span id="name-id" className="text-red-500 font-bold underline">
          {errors.name}
        </span>
      ) : null}
      <label className="w-full" htmlFor="preparation_time">
        <p className="mb-2">Preparation time</p>
        <input
          step={1}
          value={values.preparation_time}
          name="preparation_time"
          aria-label="input-preparation_time"
          onChange={handleChange}
          className={`${
            errors.preparation_time && touched.preparation_time
              ? "border-2 border-red-500"
              : ""
          }`}
          onBlur={handleBlur}
          aria-invalid={
            errors.preparation_time && touched.preparation_time
              ? "true"
              : "false"
          }
          aria-errormessage="preparation_time-id"
          type="time"
        />
      </label>
      {errors.preparation_time && touched.preparation_time ? (
        <span
          id="preparation_time-id"
          className="text-red-500 font-bold underline"
        >
          {errors.preparation_time}
        </span>
      ) : null}
      <label className="w-full" htmlFor="type">
        <p className="mb-2">Type</p>
        <select
          onBlur={handleBlur}
          value={values.type}
          className={`${
            errors.type && touched.type ? "border-2 border-red-500" : ""
          }`}
          onChange={handleChange}
          aria-invalid={errors.type && touched.type ? "true" : "false"}
          aria-errormessage="type-id"
          name="type"
        >
          <option value="">Select a type</option>
          <option value={DishType.pizza}>pizza</option>
          <option value={DishType.soup}>soup</option>
          <option value={DishType.sandwich}>sandwich</option>
        </select>
      </label>
      {errors.type && touched.type ? (
        <span id="type-id" className="text-red-500 font-bold underline">
          {errors.type}
        </span>
      ) : null}
      {handleSelectedOption()}
      <Button
        type={ButtonType.submit}
        isLoading={isLoading}
        setErrors={setErrors}
      />
      {values.name !== "" &&
        values.type !== "" &&
        values.preparation_time !== "" && (
          <Button
            type={ButtonType.button}
            isLoading={isLoading}
            resetForm={resetForm}
            setErrors={setErrors}
          />
        )}
      <ErrorsResponse customError={customError} />
    </form>
  );
}

export default Form;
