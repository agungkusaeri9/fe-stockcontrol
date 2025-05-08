import { ApiResponse } from "@/types/api";
import { StockIn } from "@/types/stockIn";
import api from "@/utils/api";

export interface PaginationMeta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
}

const getAllStockIn = async (
  page?: number,
  limit?: number,
  search?: string,
): Promise<ApiResponse<StockIn[]>> => {
  const response = await api.get<ApiResponse<StockIn[]>>("stock-ins", {
    params: { limit, search, page, paginate: true }
  });
  return response.data;
  
};


const StockInService = { getAllStockIn };
export default StockInService;