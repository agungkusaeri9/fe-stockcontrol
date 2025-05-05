import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";
import api from "@/utils/api";

export interface PaginationMeta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
}

interface CreateUser {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const getAllArea = async (
  page?: number,
  limit?: number,
  search?: string,
): Promise<ApiResponse<any[]>> => {
  const response = await api.get<ApiResponse<any[]>>("areas", {
    params: { limit, search, page, paginate: true }
  });
  return response.data;
  
};

const createUser = async (data: CreateUser) => {
  try {
    const response = await api.post("users", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id: number) => {
  try {
    const response = await api.get(`users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id: number, data: CreateUser) => {
  try {
    const response = await api.patch(`users/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id: number) => {
  try {
    const response = await api.delete(`users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteUsers = async (ids: number[]) => {
  try {
    const response = await api.delete(`users/deletes`, { data: { ids } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { getAllArea, createUser, getUserById, updateUser, deleteUser, deleteUsers };
