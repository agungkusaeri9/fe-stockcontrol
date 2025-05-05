import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";
import api from "@/utils/api";
interface IForm {
  name: string;
  specification: string;
  part_number:string;
  minimun_quantity:number;
  balance:number;
  machine_area_id:number;
  department_id:number;
  rack_id:number;
}

const get = async (
  page?: number,
  limit?: number,
  keyword?: string,
): Promise<ApiResponse<any[]>> => {
  const response = await api.get<ApiResponse<any[]>>("spare-parts", {
    params: { limit, keyword, page, paginate:true },
  });
  return response.data;
  
};

const getWithoutPagination = async (

): Promise<ApiResponse<any[]>> => {
  const response = await api.get<ApiResponse<any[]>>("spare-parts");
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

const update = async (id: number, data: any) => {
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


export default { get, getWithoutPagination, create, getById, update, remove };
