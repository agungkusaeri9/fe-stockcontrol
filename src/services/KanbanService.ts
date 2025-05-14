import { ApiResponse } from "@/types/api";
import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import { Kanban } from "@/types/kanban";
import api from "@/utils/api";
interface FromData {
    code: string;
    balance: number;
    description: string;
    specification: string;
    lead_time: number;
    machine_id?: number;
    machine_area_id?: number;
    max_quantity: number;
    min_quantity: number;
    rack_id?: number;
    uom: string;
}

const get: FetchFunctionWithPagination<Kanban> = async (
  page = 1,
  limit = 10,
  keyword = "",
  machine_id = null,
  machine_area_id = null,
  rack_id = null
): Promise<PaginatedResponse<Kanban>> => {

  console.log("keyword", keyword);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = {
    page,
    limit,
    paginate: true,
  };

  if(machine_id) params.machine_id = machine_id;
  if(machine_area_id) params.machine_area_id = machine_area_id;
  if(rack_id) params.rack_id = rack_id;
  if(keyword) params.keyword = keyword;

  const response = await api.get<PaginatedResponse<Kanban>>("kanbans", {params});
  return response.data;
};

const getWithoutPagination = async (
  keyword?: string,
): Promise<ApiResponse<Kanban[]>> => {
  const response = await api.get<ApiResponse<Kanban[]>>("kanbans", {
    params: { keyword},
  });
  return response.data;
  
};

const create = async (data: FromData) => {
  try {
    const response = await api.post("kanbans", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: number) => {
  try {
    const response = await api.get(`kanbans/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (id: number, data: FromData) => {
  try {
    const response = await api.put(`kanbans/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: number) => {
  try {
    const response = await api.delete(`kanbans/${id}`);
    return response.data;
  } catch (error) {
    console.log(`Successfully deleted operator with ID: ${id}`);
    throw error;
  }
};


const KanbanService =  { get, getWithoutPagination, create, getById, update, remove };
export default KanbanService;