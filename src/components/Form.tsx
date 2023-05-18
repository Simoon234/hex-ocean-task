import { useFormik } from "formik";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import initialFormikValues from "../lib/initialFormikValues";
import DishType from "../types/enums";
import validationSchema from "../lib/validationSchema";
import usePostData from "../hooks/usePost";
import UseSelectDisplay from "../hooks/useSelectDisplay";
import submitHelper from "../lib/submitHandler";

function Form() {
  const { handlePost, setErrors } = usePostData();
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
      submitHelper({
        mutate,
        val,
      });
    },
    validationSchema,
    initialValues: initialFormikValues,
  });

  function resetFields() {
    toast.warning("All fields has been reset", {
      pauseOnHover: false,
      toastId: "reset",
      draggable: false,
    });
    setErrors([]);
    resetForm();
  }

  const { handleSelectedOption } = UseSelectDisplay({
    errors,
    handleBlur,
    handleChange,
    touched,
    type: values.type,
    values,
  });

  return (
    <form
      className="flex flex-col max-w-2xl w-[80%] m-auto justify-center items-center h-full"
      onSubmit={handleSubmit}
    >
      <label className="w-full" htmlFor="name">
        <p className="mb-2">
          Name <span>*</span>
        </p>
        <input
          name="name"
          aria-label="input-name"
          onBlur={handleBlur}
          value={values.name}
          onChange={handleChange}
          className="w-full bg-backgroundFormColor mb-2 p-2 rounded drop-shadow-md outline-none"
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
        <p className="mb-2">
          Type <span>*</span>
        </p>
        <select
          onBlur={handleBlur}
          value={values.type}
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
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full ${
          isLoading
            ? "bg-[#063970] bg-opacity-70"
            : "bg-[#063970] hover:bg-[#064470]"
        }  tracking-wide transition-all mt-5 p-2 rounded uppercase leading-2px text-white font-bold`}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
      {values.name !== "" &&
        values.type !== "" &&
        values.preparation_time !== "" && (
          <button
            type="button"
            onClick={resetFields}
            aria-label="reset-btn"
            disabled={isLoading}
            className={`w-full ${
              isLoading ? "bg-red-200 bg-opacity-50 bg-[#064470]" : "bg-red-800"
            }  tracking-wide transition-all mt-5 p-2 rounded uppercase leading-2px text-white font-bold`}
          >
            {isLoading ? "Submitting..." : "Reset"}
          </button>
        )}
    </form>
  );
}

export default Form;
