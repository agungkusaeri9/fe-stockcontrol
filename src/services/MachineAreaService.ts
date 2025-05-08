import { ApiResponse } from "@/types/api";
import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import { MachineArea } from "@/types/machineArea";
import api from "@/utils/api";
interface IForm {
  code:string;
  name: string;
}

const get: FetchFunctionWithPagination<MachineArea> = async (
  page = 1,
  limit = 10,
  keyword = ""
): Promise<PaginatedResponse<MachineArea>> => {
  const response = await api.get<PaginatedResponse<MachineArea>>("machine-areas", {
    params: { limit, keyword, page, paginate: true },
  });
  return response.data;
};


const getWithoutPagination = async (
  keyword?: string,
): Promise<ApiResponse<MachineArea[]>> => {
  const response = await api.get<ApiResponse<MachineArea[]>>("machine-areas", {
    params: { keyword },
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


const MachineAreaService = { get, getWithoutPagination, create, getById, update, remove };
export default MachineAreaService;