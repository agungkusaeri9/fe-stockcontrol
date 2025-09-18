import { ApiResponse } from "@/types/api";
import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import { Machine } from "@/types/machine";
import { SubMachine } from "@/types/subMachine";
import api from "@/utils/api";

interface IForm {
  code: string;
}

export const get = async (
  machine_id: number,
  page: number = 1,
  limit: number = 10,
  keyword: string = ""
): Promise<PaginatedResponse<SubMachine>> => {
  const response = await api.get<PaginatedResponse<SubMachine>>("sub-machines", {
    params: { machine_id, page, limit, keyword, paginate: true },
  });
  return response.data;
};


const getWithoutPagination = async (
  machine_id: number,
): Promise<ApiResponse<SubMachine[]>> => {
  const response = await api.get<ApiResponse<SubMachine[]>>("sub-machines", {
    params: { machine_id },
  });
  return response.data;
};

const create = async (data: IForm) => {
  try {
    const response = await api.post("sub-machines", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`sub-machines/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: IForm) => {
  try {
    const response = await api.put(`sub-machines/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await api.delete(`sub-machines/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const SubMachineService = { get, getWithoutPagination, create, getById, update, remove };
export default SubMachineService;