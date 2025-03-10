import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Querykeys } from "../queryKeys";
import { toast } from "react-toastify";
import { axiosClient } from "services/axiosClient";
import { baseURL } from "apiQuery/baseURL";
import { SubjectProps } from "./types";

interface ResponseProps {
  subjects: SubjectProps[];
  pages: number;
}

const getSubjects = async ({
  page,
  all = false,
}: {
  page: number;
  all?: boolean;
}): Promise<ResponseProps> => {
  let params = {};

  if (page) {
    params = { ...params, page };
  }

  if (all) {
    params = { ...params, page, all };
  }

  return await axiosClient
    .get(`${baseURL}/subjects`, {
      params,
    })
    .then((res) => res.data);
};

export const useGetSubjects = ({
  page,
  all,
}: {
  page: number;
  all?: boolean;
}) => {
  const result = useQuery<ResponseProps>([Querykeys.VIEW_SUBJECTS, page], () =>
    getSubjects({ page })
  );

  // console.log("VIEW_SUBJECTS", result.data);

  return {
    ...result,
    pages: result.data?.pages,
    subjects: result.data?.subjects,
  };
};
