import { toast } from "react-toastify";
import { useCallback } from "react";
import { ButtonProps, ButtonType } from "../../types";

function Button({ isLoading, type, setErrors, resetForm }: ButtonProps) {
  const resetFields = useCallback(() => {
    toast.warning("All fields has been reset", {
      pauseOnHover: false,
      toastId: "reset",
      draggable: false,
    });
    setErrors([]);
    if (resetForm) {
      resetForm();
    }
  }, [setErrors, resetForm]);

  if (type === ButtonType.submit) {
    return (
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
    );
  }

  return (
    <button
      type="button"
      onClick={resetFields}
      aria-label="reset-btn"
      disabled={isLoading}
      className={`w-full ${
        isLoading ? "bg-red-200 bg-opacity-70 bg-[#064470]" : "bg-red-600"
      }  tracking-wide transition-all mt-5 p-2 rounded uppercase leading-2px text-white font-bold`}
    >
      Reset
    </button>
  );
}

export default Button;
