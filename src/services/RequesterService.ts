import { ApiResponse } from "@/types/api";
import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import { Requester } from "@/types/requester";
import api from "@/utils/api";

type formData = {
  name:string;
  group_id:number | null; 
}
const get: FetchFunctionWithPagination<Requester> = async (
  page = 1,
  limit = 10,
  keyword = ""
): Promise<PaginatedResponse<Requester>> => {
  const response = await api.get<PaginatedResponse<Requester>>("requesters", {
    params: { limit, keyword, page, paginate: true },
  });
  return response.data;
};


const getWithoutPagination = async (

): Promise<ApiResponse<Requester[]>> => {
  const response = await api.get<ApiResponse<Requester[]>>("requesters");
  return response.data;
  
};

const create = async (data: formData) => {
  try {
    const response = await api.post("requesters", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`requesters/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: formData) => {
  try {
    const response = await api.put(`requesters/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await api.delete(`requesters/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


const RequesterService =  { get, getWithoutPagination, create, getById, update, remove };
export default RequesterService;