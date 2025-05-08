import { ApiResponse } from "@/types/api";
import { Reminder } from "@/types/reminder";
import api from "@/utils/api";

export interface PaginationMeta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
}

const getAllReminder = async (
  page?: number,
  limit?: number,
  search?: string,
): Promise<ApiResponse<Reminder[]>> => {
  const response = await api.get<ApiResponse<Reminder[]>>("reminders", {
    params: { limit, search, page, paginate: true }
  });
  return response.data;
  
};


const ReminderService = { getAllReminder };
export default ReminderService;