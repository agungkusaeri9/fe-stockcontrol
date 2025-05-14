import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import { StockOut } from "@/types/stockOut";
import api from "@/utils/api";

export interface PaginationMeta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
}

const get: FetchFunctionWithPagination<StockOut> = async (
  page = 1,
  limit = 10,
  start_date?: string,
  end_date?: string,
  keyword?: string
): Promise<PaginatedResponse<StockOut>> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = {
    page,
    limit,
    paginate: true,
  };
  
  if (start_date)  params.start_date = start_date;
  if (end_date) params.end_date = end_date;
  if (keyword) params.keyword = keyword;

  const response = await api.get<PaginatedResponse<StockOut>>("stock-outs", { params });
  return response.data;
};



const StockOutService = { get };
export default StockOutService;