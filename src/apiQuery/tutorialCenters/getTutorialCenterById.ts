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
}

const getTutorialCenterById = async (
  tutorial_center_id: string
): Promise<ResponseProps> => {
  return await axiosClient
    .get(`${baseURL}/admin/tutorial-centers/${tutorial_center_id}`)
    .then((res) => {
      return res.data;
    });
};

export const useGetTutorialCenterById = (tutorial_center_id: string) => {
  const result = useQuery<ResponseProps>(
    [Querykeys.VIEW_TUTORIAL_CENTER, tutorial_center_id],
    () => getTutorialCenterById(tutorial_center_id),
    {
      enabled: Boolean(tutorial_center_id),
    }
  );

  // console.log("VIEW_TUTORIAL_CENTER_ID", result.data);

  return {
    ...result,
    tutorialCenter: result.data,
  };
};
