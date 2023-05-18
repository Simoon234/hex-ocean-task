import { act, renderHook, waitFor } from "@testing-library/react";
import usePostData from "./usePost";

describe("fetch data", async () => {
  it("check if state is equal false", async () => {
    const { result } = renderHook(() => usePostData());
    expect(result.current.success).toEqual(false);
  });
  it("check if state is equal true after success post", async () => {
    const { result } = renderHook(() => usePostData());

    act(() => {
      result.current.handlePost({
        name: "tests",
        type: "pizza",
        preparation_time: "22:22:22",
        diameter: 2,
        no_of_slices: 2,
        slices_of_bread: 2,
        spiciness_scale: 2,
      });
    });

    await waitFor(() => {
      expect(result.current.success).toEqual(true);
      expect(result.current.customError).toEqual([]);
    });
  });

  it("should return an error - time is not matching format [error]", async () => {
    const { result } = renderHook(() => usePostData());
    act(() => {
      result.current.handlePost({
        name: "tests",
        type: "pizza",
        preparation_time: "22:22:",
        diameter: 2,
        no_of_slices: 2,
        slices_of_bread: 2,
        spiciness_scale: 2,
      });
    });

    await waitFor(() => {
      expect(result.current.success).toEqual(false);
      expect(result.current.customError).toHaveLength(1);
    });
  });
});
