import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";
import api from "@/utils/api";
interface IForm {
  code:string;
  name: string;
}

const get = async (
  page?: number,
  limit?: number,
  keyword?: string,
): Promise<ApiResponse<any[]>> => {
  const response = await api.get<ApiResponse<any[]>>("racks", {
    params: { limit, keyword, page, paginate:true },
  });
  return response.data;
  
};

const getWithoutPagination = async (
  page?: number,
  limit?: number,
  keyword?: string,
): Promise<ApiResponse<any[]>> => {
  const response = await api.get<ApiResponse<any[]>>("racks", {
    params: { limit:100, keyword, page : 1 },
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

const remove = async (id: number) => {
  try {
    const response = await api.delete(`racks/${id}`);
    return response.data;
  } catch (error) {
    console.log(`Successfully deleted operator with ID: ${id}`);
    throw error;
  }
};


export default { get,getWithoutPagination, create, getById, update, remove };
