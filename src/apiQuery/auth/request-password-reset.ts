import { useCallback } from "react";
import { baseURL } from "apiQuery/baseURL";
import { toast } from "react-toastify";
import axios from "axios";

interface ResponseProps {}

export function useRequestPasswordReset(): (
  email: string
) => Promise<ResponseProps> {
  return useCallback(async (email: string) => {
    try {
      const result = await axios.post(
        `${baseURL}/request/password-reset-token`,
        {
          email,
        }
      );
      // console.log("REQUEST_PASSWORD_RESET", result);

      toast.success(result.data?.message);

      return result?.data;
    } catch (error: any) {
      // console.log("REQUEST_PASSWORD_RESET_ERR", error);
      toast.error(error.response?.data?.message);
      throw error;
    }
  }, []);
}
