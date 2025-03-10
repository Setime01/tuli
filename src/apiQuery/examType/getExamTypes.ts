import { useQuery } from "@tanstack/react-query";
import { Querykeys } from "../queryKeys";
import { axiosClient } from "services/axiosClient";
import { baseURL } from "apiQuery/baseURL";
import { BaseExamTypesProps } from "./types";
import { useDispatch } from "react-redux";
import { setExamTypes } from "state/global";

interface ResponseProps {
  examTypes: BaseExamTypesProps[];
  pages: number;
}

const getExamTypes = async ({
  page,
}: {
  page: number;
}): Promise<ResponseProps> => {
  let params = {};

  if (page) {
    params = { ...params, page };
  }

  return await axiosClient
    .get(`${baseURL}/exam-types`, {
      params: { ...params },
    })
    .then((res) => res.data);
};

export const useGetExamTypes = ({ page }: { page: number }) => {
  const dispatch = useDispatch();

  const result = useQuery<ResponseProps>(
    [Querykeys.VIEW_EXAM_TYPES, page],
    () => getExamTypes({ page }),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 2, // 2 minutes
    }
  );

  dispatch(setExamTypes(result.data?.examTypes));

  // console.log("VIEW_EXAM_TYPES", result.data);

  return {
    ...result,
    pages: result.data?.pages,
    examTypes: result.data?.examTypes,
  };
};
