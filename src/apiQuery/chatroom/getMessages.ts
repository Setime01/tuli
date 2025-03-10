import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Querykeys } from "../queryKeys";
import { axiosClient } from "services/axiosClient";
import { baseURL } from "apiQuery/baseURL";

interface MessageResponse {
  id: string;
  content: string;
  created_at: Date;
  user_id: string;
  first_name: string;
  last_name: string;
  room_id: string;
  color?: string
}

interface GroupedMessageResponseProps {
  messages: MessageResponse[];
  pages: number;
}

interface VariableProps {
  room_id: string;
  page: number;
}

export const getMessages = async ({
  room_id,
  page,
}: VariableProps): Promise<GroupedMessageResponseProps> => {

  return await axiosClient
    .get(`${baseURL}/rooms/${room_id}/messages`, {
      params: { room_id, page },
    })
    .then((res) => res.data);
};

export const useGetMessages = ({
  room_id
}: Omit<VariableProps, "page">) => {

  const result = useInfiniteQuery<GroupedMessageResponseProps>(
    [Querykeys.VIEW_MESSAGES, { room_id }],
    ({ pageParam = 1 }) =>
      getMessages({ room_id, page: pageParam }),
    {
      getNextPageParam: (_lastPage, allPages) => {
        if (allPages.length < _lastPage.pages) return allPages.length + 1;
        else return undefined;
      },
    }
  );

  return {
    ...result,
    groupedData: result.data?.pages, // useInfiniteQuery has a different response structure.
  };
};
