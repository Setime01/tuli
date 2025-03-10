import { useCallback } from "react";
import axios from "axios";
import { baseURL } from "apiQuery/baseURL";
import { toast } from "react-toastify";

interface ResponseProps {
  accessToken: string;
}

export function useVerifyPhoneOTP(): ({
  code,
  pinId,
}: {
  code: number;
  pinId: string;
}) => Promise<ResponseProps> {
  return useCallback(async ({ code, pinId }) => {
    try {
      const res = await axios.post(`${baseURL}/auth/otp/verify`, {
        pin_id: pinId,
        pin: code,
      });

      // console.log("VERIFIED_PHONE", res.data);

      return res?.data;
    } catch (error: any) {
      // console.log("VERIFY_EMAIL_ERROR", error);
      toast.error(error.response?.data?.message);
      throw error;
    }
  }, []);
}
