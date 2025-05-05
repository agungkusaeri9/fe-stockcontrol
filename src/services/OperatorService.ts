import { ApiResponse } from "@/types/api";
import api from "@/utils/api";

export interface PaginationMeta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
}

interface CreateOperator {
  name: string;
  nik: string;
}

const getAllOperator = async (
  page?: number,
  limit?: number,
  keyword?: string,
): Promise<ApiResponse<any[]>> => {
  const response = await api.get<ApiResponse<any[]>>("operators", {
    params: { limit, keyword, page, paginate:true },
  });
  return response.data;
  
};

const createOperator = async (data: CreateOperator) => {
  try {
    const response = await api.post("operators", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getOperatorById = async (id: number) => {
  try {
    const response = await api.get(`operators/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateOperator = async (id: number, data: CreateOperator) => {
  try {
    const response = await api.put(`operators/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const deleteOperator = async (id: number) => {
  try {
    const response = await api.delete(`operators/${id}`);
    return response.data;
  } catch (error) {
    console.log(`Successfully deleted operator with ID: ${id}`);
    throw error;
  }
};

export default { getAllOperator, createOperator, getOperatorById, updateOperator, deleteOperator };