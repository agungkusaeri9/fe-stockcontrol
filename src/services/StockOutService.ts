import { ApiResponse } from "@/types/api";
import { StockOut } from "@/types/stockOut";
import api from "@/utils/api";

export interface PaginationMeta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
}

const getAllStockOut = async (
  page?: number,
  limit?: number,
  search?: string,
): Promise<ApiResponse<StockOut[]>> => {
  const response = await api.get<ApiResponse<StockOut[]>>("stock-outs", {
    params: { limit, search, page, paginate: true }
  });
  return response.data;
  
};


const StockOutService = { getAllStockOut };
export default StockOutService;