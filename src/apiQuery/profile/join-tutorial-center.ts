import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Querykeys } from "../queryKeys";
import { toast } from "react-toastify";
import { axiosClient } from "services/axiosClient";
import { baseURL } from "apiQuery/baseURL";

interface ResponseProps {
  data: any;
}

interface Props {
  current_password: string;
  new_password: string;
}

const joinTutorialCenter = async (code: string): Promise<ResponseProps> => {
  return await axiosClient.post(`${baseURL}/student/join/tutorial-center`, {
    code,
  });
};

export const useJoinTutorialCenter = () => {
  const queryClient = useQueryClient();

  return useMutation((code: string) => joinTutorialCenter(code), {
    onSuccess: () => {
      queryClient.invalidateQueries([Querykeys.USER_PROFILE]);
      toast.success("Successful");
    },

    onError: (error: any) => {
      // console.log("JOIN_TUTORIAL_CENTER_ERR " + error);
      toast.error(error.response?.data?.message);
      throw error;
    },
  });
};
