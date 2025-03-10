import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Querykeys } from "../queryKeys";
import { toast } from "react-toastify";
import { axiosClient } from "services/axiosClient";
import { baseURL } from "apiQuery/baseURL";

interface ResponseProps {
  created_at: string;
  id: number;
  name: string;
  updated_at: string;
  contents: any[];
  test: any[];
}

const getSubjectById = async ({
  tutorial_center_id,
  subject_id,
}: {
  tutorial_center_id: string;
  subject_id: string;
}): Promise<ResponseProps> => {
  return await axiosClient
    .get(`${baseURL}/subjects/${subject_id}`, {
      params: {
        tutorial_center_id,
      },
    })
    .then((res) => {
      return res.data;
    });
};

export const useGetSubjectById = ({
  tutorial_center_id,
  subject_id,
}: {
  tutorial_center_id: string;
  subject_id: string;
}) => {
  const result = useQuery<ResponseProps>(
    [Querykeys.VIEW_SUBJECTS, { subject_id, tutorial_center_id }],

    () => getSubjectById({ subject_id, tutorial_center_id }),
    {
      enabled: Boolean(subject_id),
    }
  );

  // console.log("VIEW_SUBJECT_ID", result.data);

  return {
    ...result,
    subject: result.data,
  };
};
