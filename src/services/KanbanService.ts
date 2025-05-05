import { ApiResponse } from "@/types/api";
import { Kanban } from "@/types/kanban";
import { User } from "@/types/user";
import api from "@/utils/api";
interface FromData {
  js_code:string;
  quantity: string;
  lead_time: string;
  spare_part_id: number;
  supplier_id: number;
  maker_id: number;
  rack_id: number; 
}

const get = async (
  page?: number,
  limit?: number,
  keyword?: string,
): Promise<ApiResponse<Kanban[]>> => {
  const response = await api.get<ApiResponse<Kanban[]>>("kanbans", {
    params: { limit, keyword, page, paginate:true },
  });
  return response.data;
  
};

const getWithoutPagination = async (
  page?: number,
  limit?: number,
  keyword?: string,
): Promise<ApiResponse<Kanban[]>> => {
  const response = await api.get<ApiResponse<Kanban[]>>("kanbans", {
    params: { limit:50, keyword, page : 1 },
  });
  return response.data;
  
};

const create = async (data: FromData) => {
  try {
    const response = await api.post("kanbans", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`kanbans/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: FromData) => {
  try {
    const response = await api.put(`kanbans/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await api.delete(`kanbans/${id}`);
    return response.data;
  } catch (error) {
    console.log(`Successfully deleted operator with ID: ${id}`);
    throw error;
  }
};


export default { get, getWithoutPagination, create, getById, update, remove };
