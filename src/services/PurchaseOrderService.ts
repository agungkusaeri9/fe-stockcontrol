import { ApiResponse } from "@/types/api";
import { User } from "@/types/user";
import api from "@/utils/api";

export interface PaginationMeta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
}

const getAllPurchaseOrder = async (
  page?: number,
  limit?: number,
  search?: string,
): Promise<ApiResponse<any[]>> => {
  const response = await api.get<ApiResponse<any[]>>("purchase-orders", {
    params: { limit, search, page, paginate: true }
  });
  return response.data;
  
};


export default { getAllPurchaseOrder };
