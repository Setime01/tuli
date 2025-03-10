import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Querykeys } from "../queryKeys";
import { axiosClient } from "services/axiosClient";
import { baseURL } from "apiQuery/baseURL";
import { ContentResponseProps } from "./types";

interface ResponseProps {
  length: number;
  map(arg0: (data: any) => any): unknown;
  slice(arg0: number, arg1: number): any[];
  pages: number;
}

const getSuggestedContents = async ({}): Promise<ResponseProps> => {
  return await axiosClient
    .get(`${baseURL}/student/suggested/content`)
    .then((res) => res.data);
};

export const useGetSuggestedContents = () => {
  const result = useQuery<ResponseProps>(
    [Querykeys.SUGGESTED_CONTENTS],
    getSuggestedContents
  );

  // console.log("SUGGESTED_CONTENTS", result.data);

  return {
    ...result,
    pages: result.data?.pages,
    contents: result.data,
  };
};
