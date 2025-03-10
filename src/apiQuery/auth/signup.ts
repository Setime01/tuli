import { useCallback } from "react";
import axios from "axios";
import { baseURL } from "apiQuery/baseURL";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { ROUTE_PATH } from "constants/route_path";
import { useRouter } from "next/router";
import { setToken } from "state/authSetup";
import { gender, general } from "enums";

import {
  setActiveTutorialCenter,
  setCredentials,
  setTutorialCenters,
} from "state/global";


interface SignupProps {
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  password: string | null;
  country: string;
  gender: keyof typeof gender;
}

interface ResponseProps {}

export function useSignup(): (
  variables: SignupProps
) => Promise<ResponseProps> {
  const dispatch = useDispatch();
  const { push } = useRouter();

  return useCallback(async (data) => {
    try {
      const res = await axios.post(`${baseURL}/auth/signup`, data);

      // dispatch(setToken(res?.data?.accessToken));

      localStorage.setItem(general.TOKEN, res?.data?.access_token);

      const user = res.data.user;

      dispatch(
        setCredentials({
          user,
        })
      );

      dispatch(
        setActiveTutorialCenter(user.tutorial_centers_belonged_to[0]?.id)
      );

      dispatch(setTutorialCenters(user?.tutorial_centers_belonged_to));
      // console.log("SIGN_UP_DATA", res.data);

      return res?.data;
    } catch (error: any) {
      // console.log("SIGN_UP_ERR", error);
      toast.error(error.response?.data?.message ?? "Something went wrong!");
      throw error;
    }
  }, []);
}
