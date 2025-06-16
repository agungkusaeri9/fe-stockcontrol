import { ApiResponse } from "@/types/api";
import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import { Rack } from "@/types/rack";
import api from "@/utils/api";
interface IForm {
  code:string;
}

const get: FetchFunctionWithPagination<Rack> = async (
  page = 1,
  limit = 10,
  keyword = ""
): Promise<PaginatedResponse<Rack>> => {
  const response = await api.get<PaginatedResponse<Rack>>("racks", {
    params: { limit, keyword, page, paginate: true },
  });
  return response.data;
};

const getWithoutPagination = async (
  keyword?: string,
): Promise<ApiResponse<Rack[]>> => {
  const response = await api.get<ApiResponse<Rack[]>>("racks", {
    params: { keyword, paginate: false },
  });
  return response.data;
};


const create = async (data: IForm) => {
  try {
    const response = await api.post("racks", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`racks/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: IForm) => {
  try {
    const response = await api.put(`racks/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number): Promise<void> => {
  try {
    const response =  await api.delete(`racks/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


const RackService = { get,getWithoutPagination, create, getById, update, remove };
export default RackService;