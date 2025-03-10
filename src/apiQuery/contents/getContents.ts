import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Querykeys } from "../queryKeys";
import { axiosClient } from "services/axiosClient";
import { baseURL } from "apiQuery/baseURL";
import { ContentResponseProps, GroupedContentResponseProps } from "./types";

// interface ResponseProps {
//   contents: ContentResponseProps[];
//   pages: number;
// }

interface VariableProps {
  tutorial_center_id: string;
  subject_id?: string;
  page: number;
}

const getContents = async ({
  tutorial_center_id,
  subject_id,
  page,
}: VariableProps): Promise<GroupedContentResponseProps> => {
  let params = {};

  if (subject_id) {
    params = { ...params, subject_id };
  }

  if (page) {
    params = { ...params, page };
  }

  return await axiosClient
    .get(`${baseURL}/student/contents`, {
      params: {
        tutorial_center_id: String(tutorial_center_id),
        ...params,
      },
    })
    .then((res) => res.data);
};

export const useGetContents = ({
  tutorial_center_id,
  subject_id,
}: Omit<VariableProps, "page">) => {
  // const result = useQuery<ResponseProps>(
  //   [Querykeys.VIEW_CONTENTS, tutorial_center_id, subject_id, page],
  //   () => getContents({ tutorial_center_id, subject_id, page }),
  //   {
  //     keepPreviousData: true,
  //     enabled: Boolean(tutorial_center_id),
  //   }
  // );

  // // console.log("VIEW_CONTENTS", result.data);

  // return {
  //   ...result,
  //   pages: result.data?.pages,
  //   contents: result.data?.contents,
  // };

  const result = useInfiniteQuery<GroupedContentResponseProps>(
    [Querykeys.VIEW_CONTENTS, tutorial_center_id, subject_id],
    ({ pageParam = 1 }) =>
      getContents({ tutorial_center_id, subject_id, page: pageParam }),
    {
      keepPreviousData: true,
      enabled: Boolean(tutorial_center_id),
      getNextPageParam: (_lastPage, allPages) => {
        if (allPages.length < _lastPage.pages) return allPages.length + 1;
        else return undefined;
      },
    }
  );

  // console.log("VIEW_CONTENTS", result.data);

  return {
    ...result,
    groupedData: result.data?.pages, // useInfiniteQuery has a different response structure.
  };
};
