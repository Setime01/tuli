import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Querykeys } from "../queryKeys";
import { axiosClient } from "../../services/axiosClient";
import { baseURL } from "../baseURL";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { updateFavoriteTests } from "state/global";

interface ResponseProps {}

const removeTestFromFavorite = async (
  testId: string
): Promise<ResponseProps> => {
  return await axiosClient.post(
    `${baseURL}/student/remove-test-from-favorite?testId=${testId}`
  );
};

export const useRemoveTestFromFavorite = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation((testId: string) => removeTestFromFavorite(testId), {
    onSuccess: (reponse) => {
      // @ts-ignore
     dispatch(updateFavoriteTests({type: "remove", testId: reponse?.data?.testId}));
      queryClient.invalidateQueries([Querykeys.VIEW_TESTS]);
      toast.success("Test removed from favorite");
    },

    onError: (error: any) => {
      // console.log("REMOVE_Test_FROM_FAV_ERR " + JSON.stringify(error, null, 2));
      toast.error(error.response?.data?.message);

      throw error;
    },
  });
};
