import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Querykeys } from "../queryKeys";
import { axiosClient } from "services/axiosClient";
import { baseURL } from "apiQuery/baseURL";
import { BaseTestsProps, GroupedTestResponseProps } from "./types";

// interface ResponseProps {
//   tests: BaseTestsProps[];
//   pages: number;
// }

interface VariableProps {
  tutorial_center_id: string;
  exam_type_id?: string;
  page: number;
  all?: boolean;
}

const getTests = async ({
  tutorial_center_id,
  exam_type_id,
  page,
  all = false,
}: VariableProps): Promise<GroupedTestResponseProps> => {
  let params = {};

  if (tutorial_center_id) {
    params = { ...params, tutorial_center_id };
  }

  if (exam_type_id) {
    params = { ...params, exam_type_id };
  }

  if (page) {
    params = { ...params, page };
  }

  if (all) {
    params = { ...params, page, all };
  }

  return await axiosClient
    .get(`${baseURL}/student/tests`, {
      params: { ...params },
    })
    .then((res) => res.data);
};

export const useGetTests = ({
  tutorial_center_id,
  exam_type_id,
  all,
}: Omit<VariableProps, "page">) => {
  // const result = useQuery<ResponseProps>(
  //   [Querykeys.VIEW_TESTS, { page, exam_type_id, tutorial_center_id }],
  //   () => getTests({ tutorial_center_id, exam_type_id, page, all })
  // );

  // // console.log("VIEW_TESTS", result.data);

  // return {
  //   ...result,
  //   pages: result.data?.pages,
  //   tests: result.data?.tests,
  // };

  const result = useInfiniteQuery<GroupedTestResponseProps>(
    [Querykeys.VIEW_TESTS, { exam_type_id, tutorial_center_id }],
    ({ pageParam = 1 }) =>
      getTests({ tutorial_center_id, exam_type_id, page: pageParam, all }),
    {
      getNextPageParam: (_lastPage, allPages) => {
        if (allPages.length < _lastPage.pages) return allPages.length + 1;
        else return undefined;
      },
    }
  );

  // console.log("VIEW_TESTS", result.data);

  return {
    ...result,
    groupedData: result.data?.pages, // useInfiniteQuery has a different response structure.
  };
};
