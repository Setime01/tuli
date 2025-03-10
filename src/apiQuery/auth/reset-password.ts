import { useCallback } from "react";
import { baseURL } from "apiQuery/baseURL";
import { toast } from "react-toastify";
import axios from "axios";

interface ResponseProps {}

interface ResetProps {
  token: string;
  newPassword: string;
}

export function useResetPassword(): ({
  token,
  newPassword,
}: ResetProps) => Promise<ResponseProps> {
  return useCallback(async (data: ResetProps) => {
    try {
      const result = await axios.post(`${baseURL}/reset-password`, {
        token: data.token,
        newPassword: data.newPassword,
      });
      // console.log("RESET_PASSWORD", result);

      toast.success(result.data?.message);

      return result?.data;
    } catch (error: any) {
      // console.log("RESET_PASSWORD_ERR", error);
      toast.error(error.response?.data?.message);
      throw error;
    }
  }, []);
}
