import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Querykeys } from "../queryKeys";
import { toast } from "react-toastify";
import { axiosClient } from "services/axiosClient";
import { baseURL } from "apiQuery/baseURL";
import { TutorialCenters } from "./types";
import { useDispatch } from "react-redux";
import { setActiveTutorialCenter, setTutorialCenters } from "state/global";

interface ResponseProps {
  tutorial_centers: TutorialCenters[];
  pages: number;
}

const getTutorialCenters = async ({
  page,
}: {
  page: number;
}): Promise<ResponseProps> => {
  let params = {};

  if (page) {
    params = { ...params, page };
  }

  return await axiosClient
    .get(`${baseURL}/student/tutorial-centers`, {
      params,
    })
    .then((res) => res.data);
};

export const useGetTutorialCenters = ({ page }: { page: number }) => {
  const dispatch = useDispatch();
  const result = useQuery<ResponseProps>([Querykeys.VIEW_TUTORIAL_CENTER], () =>
    getTutorialCenters({ page })
  );

  // console.log("VIEW_TUTORIAL_CENTER", result.data);

  dispatch(setTutorialCenters(result.data?.tutorial_centers));
  dispatch(setActiveTutorialCenter(result.data?.tutorial_centers[0]?.id));

  return {
    ...result,
    pages: result.data?.pages,
    tutorial_centers: result.data?.tutorial_centers,
  };
};
