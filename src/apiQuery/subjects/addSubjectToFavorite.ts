import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Querykeys } from "../queryKeys";
import { axiosClient } from "../../services/axiosClient";
import { baseURL } from "../baseURL";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { updateFavoriteSubjects } from "state/global";
interface ResponseProps {}

const addSubjectToFavorite = async (
  subjectId: number
): Promise<ResponseProps> => {
  return await axiosClient.post(`${baseURL}/student/mark-subject-as-favorite?subjectId=${subjectId}`);
};

export const useAddSubjectToFavorite = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation((subjectId: number) => addSubjectToFavorite(subjectId), {
    onSuccess: (response) => {
      // @ts-ignore
      dispatch(updateFavoriteSubjects({ type: "add", subjectId: response?.data?.subjectId}))
      queryClient.invalidateQueries([Querykeys.VIEW_SUBJECTS]);
      toast.success("Subject added to favorite");
    },

    onError: (error: any) => {
      // console.error("ADD_SUBJECT_TO_FAV_ERR " + JSON.stringify(error, null, 2));
      toast.error(error.response?.data?.message ?? "Something went wrong!");
      // toast.warn("Cannot add subject test at this time! We are working on it!");

      throw error;
    },
  });
};
