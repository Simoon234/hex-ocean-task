import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DishesFields, ErrorRes } from "../types";

const usePostData = () => {
  const [customError, setErrors] = useState<ErrorRes[] | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const handlePost = async (dish: DishesFields) => {
    try {
      const res = await axios.post<string>(
        import.meta.env.VITE_API_URL,
        JSON.stringify(dish),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        toast.success("Successfully created", {
          pauseOnHover: false,
          toastId: "post-success",
        });
        setSuccess(true);
        setErrors([]);
        return res.data;
      }
    } catch (e: any) {
      setSuccess(false);
      if (e.response.status === 400) {
        toast.error("Bad request. Please try again.", {
          pauseOnHover: false,
          toastId: "post-error",
        });
        const errorBox: ErrorRes[] = [];
        const errorResponse = e.response.data;
        errorBox.push(errorResponse);
        setErrors(JSON.parse(JSON.stringify(errorBox)));
        return errorBox;
      }
      if (e.response.status === 500) {
        return toast.error("Server error. Please try again later.", {
          pauseOnHover: false,
          toastId: "post-error",
        });
      }
      return toast.error(e.message, {
        pauseOnHover: false,
        toastId: "post-error",
      });
    }
    return false;
  };

  return {
    success,
    setErrors,
    customError,
    handlePost,
    setSuccess,
  };
};

export default usePostData;
