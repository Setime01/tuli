import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Querykeys } from "../queryKeys";
import { axiosClient } from "../../services/axiosClient";
import { baseURL } from "../baseURL";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { updateFavoriteSubjects } from "state/global";

interface ResponseProps {}

const removeSubjectFromFavorite = async (
  subjectId: number
): Promise<ResponseProps> => {
  return await axiosClient.post(
    `${baseURL}/student/remove-subject-from-favorite?subjectId=${subjectId}`
  );
};

export const useRemoveSubjectFromFavorite = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation(
    (subjectId: number) => removeSubjectFromFavorite(subjectId),
    {
      onSuccess: (response) => {
        // @ts-ignore
        dispatch(updateFavoriteSubjects({ type: "remove", subjectId: response?.data?.subjectId}))
        queryClient.invalidateQueries([Querykeys.VIEW_SUBJECTS]);
        toast.success("Subject removed from favorite");
      },

      onError: (error: any) => {
        // console.log(
        //  "REMOVE_SUBJECT_FROM_FAV_ERR " + JSON.stringify(error, null, 2)
        // );

        toast.error(error.response?.data?.message);

        throw error;
      },
    }
  );
};
