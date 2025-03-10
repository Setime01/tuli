import { useCallback } from "react";
import axios from "axios";
import { baseURL } from "apiQuery/baseURL";
import { toast } from "react-toastify";
import { general } from "enums";
import { useDispatch } from "react-redux";

import {
  setActiveTutorialCenter,
  setCredentials,
  setTutorialCenters,
} from "state/global";

import { ROUTE_PATH } from "constants/route_path";
import { useRouter } from "next/router";

interface LoginProps {
  phone: string;
  password: string;
}

interface ResponseProps {
  accessToken: string;
}

export function useLogin(): ({
  phone,
  password,
}: LoginProps) => Promise<ResponseProps> {
  const dispatch = useDispatch();
  const { push } = useRouter();

  return useCallback(async (data) => {
    const { phone, password } = data;

    try {
      const res = await axios.post(`${baseURL}/auth/login`, {
        phone,
        password,
      });

      // console.log("LOGIN_RESULT", res);

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


      // this is not be neccessary since AuthLayoutProtectedRoute already routes users accordingly when isAuthenticated. To use this, on logout i can destroy previous path
      push(ROUTE_PATH.dashboard);
      return res?.data;
    } catch (error: any) {
      // console.log("LOGIN_ERR", error);
      toast.error(error.response?.data?.message ?? "Something went wrong!");
      throw error;
    }
  }, []);
}
