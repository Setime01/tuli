import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Querykeys } from "../queryKeys";
import { toast } from "react-toastify";
import { axiosClient } from "services/axiosClient";
import { baseURL } from "apiQuery/baseURL";

interface ResponseProps {
  data: any;
}

const completedContent = async (content_id: string): Promise<ResponseProps> => {
  return await axiosClient.patch(
    `${baseURL}/student/completed/content/${content_id}`,
    content_id
  );
};

export const useCompletedContent = () => {
  const queryClient = useQueryClient();

  return useMutation((content_id: string) => completedContent(content_id), {
    onSuccess: () => {
      queryClient.invalidateQueries([Querykeys.USER_PROFILE]);
      toast.success("Content completed successfully");
    },

    onError: (error: any) => {
      // console.log("CONTENT_COMPLETED " + error);
      toast.error(error.response?.data?.message);
      throw error;
    },
  });
};
