import { ApiResponse } from "@/types/api";
import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import api from "@/utils/api";
import { Sparepart } from "@/utils/sparepart";
interface IForm {
  name: string;
  specification: string;
  part_number:string;
  minimum_quantity:number;
  balance:number;
  machine_area_id:number;
  department_id:number;
  rack_id:number;
}

const get: FetchFunctionWithPagination<Sparepart> = async (
  page = 1,
  limit = 10,
  keyword = "",
  machine_area_id?: number,
  department_id?: number,
  rack_id?: number
): Promise<PaginatedResponse<Sparepart>> => {
  const response = await api.get<PaginatedResponse<Sparepart>>("spare-parts", {
    params: { limit, keyword, page, paginate: true, machine_area_id:machine_area_id ?? null, department_id, rack_id },
  });
  return response.data;
};

const getWithoutPagination = async (

): Promise<ApiResponse<Sparepart[]>> => {
  const response = await api.get<ApiResponse<Sparepart[]>>("spare-parts");
  return response.data;
  
};

const create = async (data: IForm) => {
  try {
    const response = await api.post("spare-parts", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`spare-parts/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: Sparepart) => {
  try {
    const response = await api.put(`spare-parts/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await api.delete(`spare-parts/${id}`);
    return response.data;
  } catch (error) {
    console.log(`Successfully deleted operator with ID: ${id}`);
    throw error;
  }
};


const SparePartService = { get, getWithoutPagination, create, getById, update, remove };
export default SparePartService;