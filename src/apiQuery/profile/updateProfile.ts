import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Querykeys } from "../queryKeys";
import { toast } from "react-toastify";
import { axiosClient } from "services/axiosClient";
import { baseURL } from "apiQuery/baseURL";

interface ResponseProps {
  data: any;
}

const updateProfile = async (variables: any): Promise<ResponseProps> => {
  return await axiosClient.patch(
    `${baseURL}/student/update-profile`,
    variables
  );
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation((variables: any) => updateProfile(variables), {
    onSuccess: () => {
      queryClient.invalidateQueries([Querykeys.USER_PROFILE]);
      toast.success("Profile updated successfully");
    },

    onError: (error: any) => {
      // console.log("PROFILE_UPDATE_ERR " + error);
      toast.error(error.response?.data?.message);
      throw error;
    },
  });
};
