import { useFormik } from "formik";
import { useMutation } from "react-query";
import initialFormikValues from "../lib/initialFormikValues";
import validationSchema from "../lib/validationSchema";
import usePostData from "../hooks/usePost";

function Form() {
  const { handlePost } = usePostData();
  const { isLoading } = useMutation({
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
      console.log(val);
    },
    validationSchema,
    initialValues: initialFormikValues,
  });

  return <div>Forms</div>;
}

export default Form;
