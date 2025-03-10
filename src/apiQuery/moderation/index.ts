import { useCallback } from "react";
import axios from "axios";
import { baseURL } from "apiQuery/baseURL";
import { toast } from "react-toastify";

interface RequestProps {
  content: string
  description?: string
}
  
type ReportType = 'AI_CHAT' | 'GROUP_CHAT'

export const reportAi = async ({
  content,
  description
}: RequestProps) => {
  const data: RequestProps & { type: ReportType } = { content, type: 'AI_CHAT' }
  
  if (description) {
    data.description = description
  }
    try {
      const res = await axios.post(`${baseURL}/moderation/ai`, data);

      console.log("AI_REPORT", res.data);

      return res?.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      throw error;
    }
}

type ChatRequestProps = RequestProps & {
  message_id: string
}

export const reportGroupChat = async ({
  content,
  message_id,
  description
}: ChatRequestProps) => {
  const data: ChatRequestProps & { type: ReportType } = { content, message_id, type: 'GROUP_CHAT' }
  
  if (!message_id) {
    return toast.error("Report could not send for some reasons.")
  }
  if (description) {
    data.description = description
  }
    try {
      const res = await axios.post(`${baseURL}/moderation/group-chat`, data);

      console.log("GROUP_CHAT_REPORT", res.data);

      return res?.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message);
      throw error;
    }
}
