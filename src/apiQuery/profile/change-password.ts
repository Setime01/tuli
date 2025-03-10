import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Querykeys } from "../queryKeys";
import { toast } from "react-toastify";
import { axiosClient } from "services/axiosClient";
import { baseURL } from "apiQuery/baseURL";

interface ResponseProps {
  data: any;
}

interface RequestProps {
  current_password: string;
  new_password: string;
}

const changePassword = async ({
  current_password,
  new_password,
}: RequestProps): Promise<ResponseProps> => {
  return await axiosClient.post(`${baseURL}/student/change-password`, {
    current_password,
    new_password,
  });
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ current_password, new_password }: RequestProps) =>
      changePassword({ current_password, new_password }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([Querykeys.USER_PROFILE]);
        toast.success("Password changed successfully");
      },

      onError: (error: any) => {
        // console.log("PASSWORD_UPDATE_ERR " + error);
        toast.error(error.response?.data?.message);
        throw error;
      },
    }
  );
};
