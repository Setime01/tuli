import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "services/axiosClient";
import { baseURL } from "apiQuery/baseURL";
import { useDispatch } from "react-redux";
import { Querykeys } from "../queryKeys";

interface ResponseProps {
  averageScore: number;
  content_study_count: number;
  position: number;
  test_taken_count: number;
  user: {
    country: string;
    created_at: string;
    email: string;
    email_verified: boolean;
    first_name: string;
    gender: string;
    id: string;
    image: string;
    last_name: string;
    phone_number: string;
    phone_verified: boolean;
    role: "USER";
    subscribed: boolean;
    updated_at: string;
    tutorial_centers_belonged_to: Array<{
      created_at: string;
      id: string;
      name: string;
      updated_at: string;
    }>;
    parent?: any
  };
}

const getProfile = async (): Promise<ResponseProps> => {
  return await axiosClient
    .get(`${baseURL}/student/profile`)
    .then((res) => res.data);
};

export const useGetProfile = () => {
  const result = useQuery<ResponseProps>([Querykeys.VIEW_PROFILE], getProfile);

  // console.log("VIEW_PROFILE", result.data);

  return {
    ...result,
    profile: result.data,
  };
};
