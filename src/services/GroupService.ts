import { ApiResponse } from "@/types/api";
import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import { Group } from "@/types/group";
import { Maker } from "@/types/maker";
import api from "@/utils/api";

type formData = {
  name:string;
  description?:string | null | undefined; 
}
const get: FetchFunctionWithPagination<Maker> = async (
  page = 1,
  limit = 10,
  keyword = ""
): Promise<PaginatedResponse<Maker>> => {
  const response = await api.get<PaginatedResponse<Maker>>("groups", {
    params: { limit, keyword, page, paginate: true },
  });
  return response.data;
};


const getWithoutPagination = async (

): Promise<ApiResponse<Group[]>> => {
  const response = await api.get<ApiResponse<Group[]>>("groups");
  return response.data;
  
};

const create = async (data: formData) => {
  try {
    const response = await api.post("groups", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`groups/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: formData) => {
  try {
    const response = await api.put(`groups/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await api.delete(`groups/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


const GroupService =  { get, getWithoutPagination, create, getById, update, remove };
export default GroupService;