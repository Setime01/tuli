import axios from "axios";
import { baseURL } from "apiQuery/baseURL";
import { toast } from "react-toastify";

interface RequestType {
  id: string;
  parent_name: string;
  parent_phone_number: string;
  parent_address?: string;
}
export const addParent = async ({
  id,
  parent_name,
  parent_phone_number,
  parent_address,
}: RequestType) => {
    const data: RequestType = {
      parent_name,
      parent_phone_number,
      id,
    }
  
  if (parent_address) {
    data.parent_address = parent_address
  }
    try {
      const res = await axios.post(`${baseURL}/auth/add-parent`, data);

      console.log("ADD_PARENT", res.data);

      return res?.data;
    } catch (error: any) {
      // console.log("ADD_PARENT_ERROR", error);
      toast.error(error.response?.data?.message);
      throw error;
    }
}
