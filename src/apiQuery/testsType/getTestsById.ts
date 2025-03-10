import { useQuery } from "@tanstack/react-query";
import { Querykeys } from "../queryKeys";
import { axiosClient } from "services/axiosClient";
import { baseURL } from "apiQuery/baseURL";
import { BaseTestsProps } from "./types";

interface ResponseProps {
  test: any;
  pages: number;
}

const getTestsById = async (id: string): Promise<ResponseProps> => {
  let params = {};

  return await axiosClient
    .get(`${baseURL}/student/tests/${id}`)
    .then((res) => res.data);
};

export const useGetTestsById = (id: string) => {
  const result = useQuery<ResponseProps>([Querykeys.VIEW_TESTS, { id }], () =>
    getTestsById(id)
  );

  // console.log("VIEW_TESTS_BY_ID", result.data);

  return {
    ...result,
    pages: result.data?.pages,
    test: result.data?.test,
  };
};
