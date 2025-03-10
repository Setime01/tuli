import { useQuery } from "@tanstack/react-query";
import { Querykeys } from "../queryKeys";
import { axiosClient } from "services/axiosClient";
import { baseURL } from "apiQuery/baseURL";

interface RoomProps {
  id: string;
  name: string;
  description?: string;
  tutorial_center_id: number;
  created_at: string;
  updated_at: string;
}

const getRooms = async ({ userId }: { userId: string }): Promise<any> => {
  if(!userId.length) return
  return await axiosClient
    .get(`${baseURL}/rooms/user/${userId}`)
    .then((res) => {
      console.log(res.data)
      return res.data
    });
};

export const useGetChatrooms = ({userId}: {userId: string}) => {

     const result = useQuery<RoomProps>([Querykeys.VIEW_ROOMS, {userId}], () =>
    getRooms({userId})
  );

  return {
    ...result,
    rooms: result.data,
  };
};
