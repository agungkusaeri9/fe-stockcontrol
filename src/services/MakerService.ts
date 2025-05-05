import { ApiResponse } from "@/types/api";
import { Maker } from "@/types/maker";
import { User } from "@/types/user";
import api from "@/utils/api";

const get = async (
  page?: number,
  limit?: number,
  keyword?: string,
): Promise<ApiResponse<Maker[]>> => {
  const response = await api.get<ApiResponse<Maker[]>>("makers");
  return response.data;
  
};

const getWithoutPagination = async (

): Promise<ApiResponse<Maker[]>> => {
  const response = await api.get<ApiResponse<Maker[]>>("makers");
  return response.data;
  
};

const create = async (data: Maker) => {
  try {
    const response = await api.post("makers", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`makers/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: Maker) => {
  try {
    const response = await api.put(`makers/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await api.delete(`makers/${id}`);
    return response.data;
  } catch (error) {
    console.log(`Successfully deleted operator with ID: ${id}`);
    throw error;
  }
};


export default { get, getWithoutPagination, create, getById, update, remove };
