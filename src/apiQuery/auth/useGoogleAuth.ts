import { useCallback } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setActiveTutorialCenter,
  setCredentials,
  setTutorialCenters,
} from "../../state/global";
import { axiosClient } from "../../services/axiosClient";
import { baseURL } from "../baseURL";
import { general } from "../../enums";
import { toast } from "react-toastify";
import { isLessThanOneHour } from "../../utils/helpers";

interface googleAuthProps {
  idToken: string;
}

interface ResponseProps {
  access_token: string;
}

export function _useGoogleAuth(): ({
  idToken,
}: googleAuthProps) => Promise<ResponseProps> {
  const dispatch = useDispatch();

  return useCallback(async (data) => {
    try {
      const res = await axiosClient.post(`${baseURL}/auth/google/login`, {
        token: data.idToken,
      });

      localStorage.setItem(general.TOKEN, res?.data?.access_token);

      const user = res.data.user;
      
      if(user.created_at  && isLessThanOneHour(user.created_at)) {
        localStorage.setItem('requestParentDetails', 'true');
      }

      dispatch(
        setCredentials({
          user,
        })
      );

      dispatch(
        setActiveTutorialCenter(user.tutorial_centers_belonged_to[0]?.id)
      );

      dispatch(setTutorialCenters(user?.tutorial_centers_belonged_to));

      console.log({ user, data: res.data });

      return res?.data;
    } catch (error: any) {
      console.error("GOOGLE_AUTH_ERR", JSON.stringify(error, null, 2));
      toast.error(error?.response?.data?.message ?? "Something went wrong!");
      throw error;
    }
  }, []);
}
