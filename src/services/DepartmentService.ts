import { ApiResponse } from "@/types/api";
import api from "@/utils/api";

type Department = {
  name: string;
  code: string;
  number: string;
}

const get = async (
  page?: number,
  limit?: number,
  keyword?: string,
): Promise<ApiResponse<Department[]>> => {
  const response = await api.get<ApiResponse<Department[]>>("departments", {
    params: { limit, keyword, page, paginate:true },
  });
  return response.data;
  
};

const getWithoutPagination = async (
  page?: number,
  limit?: number,
  keyword?: string,
): Promise<ApiResponse<any[]>> => {
  const response = await api.get<ApiResponse<any[]>>("departments", {
    params: { limit:50, keyword, page : 1 },
  });
  return response.data;
  
};

const create = async (data: Department) => {
  try {
    const response = await api.post("departments", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`departments/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: Department) => {
  try {
    const response = await api.put(`departments/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await api.delete(`departments/${id}`);
    return response.data;
  } catch (error) {
    console.log(`Successfully deleted operator with ID: ${id}`);
    throw error;
  }
};


export default { get,getWithoutPagination, create, getById, update, remove };
