import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Querykeys } from "../queryKeys";
import { toast } from "react-toastify";
import { axiosClient } from "services/axiosClient";
import { baseURL } from "apiQuery/baseURL";
import { SubmitTestProps } from "./types";

interface ResponseProps {
  data: any;
}

const submitTest = async (
  variables: SubmitTestProps
): Promise<ResponseProps> => {
  return await axiosClient.post(`${baseURL}/student/submit-test`, variables);
};

export const useSubmitTest = () => {
  const queryClient = useQueryClient();

  return useMutation((variables: SubmitTestProps) => submitTest(variables), {
    onSuccess: () => {
      queryClient.invalidateQueries([Querykeys.USER_PROFILE]);
      toast.success("Test completed successfully");
    },

    onError: (error: any) => {
      // console.log("TEST_SUBMIT_ERR " + error);
      toast.error(error.response?.data?.message);
      throw error;
    },
  });
};
