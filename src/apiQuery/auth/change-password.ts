import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { axiosClient } from "services/axiosClient";
import { baseURL } from "apiQuery/baseURL";

interface ResponseProps {}

const changePassword = async ({
  current_password,
  new_password,
}: {
  current_password: string;
  new_password: string;
}): Promise<ResponseProps> => {
  return await axiosClient.post(`${baseURL}/change-password`, {
    current_password,
    new_password,
  });
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      current_password,
      new_password,
    }: {
      current_password: string;
      new_password: string;
    }) => changePassword({ current_password, new_password }),
    {
      onSuccess: () => {
        // queryClient.invalidateQueries([Querykeys.VIEW_LISTING]);
        toast.success("Password changed successfully");
      },

      onError: (error: any) => {
        // console.log("PASSWORD_CHANGE " + error);
        toast.error(error.response?.data?.message);
        throw error;
      },
    }
  );
};
