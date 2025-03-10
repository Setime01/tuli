import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Querykeys } from "../queryKeys";
import { axiosClient } from "../../services/axiosClient";
import { baseURL } from "../baseURL";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { updateFavoriteTests } from "state/global";

interface ResponseProps {}

const addTestToFavorite = async (testId: string): Promise<ResponseProps> => {
  return await axiosClient.post(`${baseURL}/student/mark-test-as-favorite?testId=${testId}`);
};

export const useAddTestToFavorite = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation((testId: string) => addTestToFavorite(testId), {
    onSuccess: (response) => {
      // @ts-ignore
      dispatch(updateFavoriteTests({type: "add", testId: response?.data?.testId}));
      queryClient.invalidateQueries([Querykeys.VIEW_TESTS]);
      toast.success("Test added to favorite");
    },

    onError: (error: any) => {
      // console.error("ADD_Test_TO_FAV_ERR " + JSON.stringify(error, null, 2));
      // toast.error(error.response?.data?.message ?? "Something went wrong!");
      toast.warn("Cannot add favourite test at this time! We are working on it!");

      throw error;
    },
  });
};
