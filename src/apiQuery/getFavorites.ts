import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "services/axiosClient";
import { baseURL } from "apiQuery/baseURL";
import { useDispatch } from "react-redux";
import { Querykeys } from "./queryKeys";

interface ResponseProps {
  favoriteSubjects: {
    created_at: string;
    id: number;
    image: string;
    name: string;
    updated_at: string;
  }[];
  favoriteTests: {
    active: boolean;
    allow_retake: boolean;
    created_at: string;
    duration: number;
    exam_type_id: number;
    id: string;
    name: string;
    short_description: string;
    show_answers: boolean;
    solution: string;
    subject_id: number;
    tutorial_center_id: string;
    updated_at: string;
    year: string;
  }[];
}

const getFavorites = async (): Promise<ResponseProps> => {
  return await axiosClient
    .get(`${baseURL}/student/favorites`)
    .then((res) => res.data);
};

export const useGetFavorites = () => {
  const result = useQuery<ResponseProps>(
    [Querykeys.VIEW_FAVORITES],
    getFavorites
  );

  // console.log("VIEW_FAVORITES", result.data);

  return {
    ...result,
    favoriteSubjects: result?.data?.favoriteSubjects,
    favoriteTests: result?.data?.favoriteTests,
  };
};
