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
  const response = await api.get<ApiResponse<any[]>>("machine-areas", {
    params: { limit, keyword, page, paginate:true },
  });
  return response.data;
  
};

const getWithoutPagination = async (
  page?: number,
  limit?: number,
  keyword?: string,
): Promise<ApiResponse<any[]>> => {
  const response = await api.get<ApiResponse<any[]>>("machine-areas", {
    params: { limit:50, keyword, page : 1 },
  });
  return response.data;
  
};

const create = async (data: IForm) => {
  try {
    const response = await api.post("machine-areas", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`machine-areas/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: IForm) => {
  try {
    const response = await api.put(`machine-areas/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await api.delete(`machine-areas/${id}`);
    return response.data;
  } catch (error) {
    console.log(`Successfully deleted operator with ID: ${id}`);
    throw error;
  }
};


export default { get, getWithoutPagination, create, getById, update, remove };
