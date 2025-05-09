import { ApiResponse } from "@/types/api";
import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import { PurchaseRequest } from "@/types/purchaseRequest";
import api from "@/utils/api";

export interface PaginationMeta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
}

const get: FetchFunctionWithPagination<PurchaseRequest> = async (
  page = 1,
  limit = 10,
  start_date?: string,
  end_date?: string,
  pr_number?: string
): Promise<PaginatedResponse<PurchaseRequest>> => {
  const params: any = {
    page,
    limit,
    paginate: true,
  };
  
  if (start_date)  params.start_date = start_date;
  if (end_date) params.end_date = end_date;
  if (pr_number) params.keyword = pr_number;

  const response = await api.get<PaginatedResponse<PurchaseRequest>>("purchase-requests", { params });
  return response.data;
};

const getById = async (
  id:number
): Promise<any> => {
  const response = await api.get<PaginatedResponse<PurchaseRequest>>(`purchase-requests/${id}`);
  return response.data;
};




const PurchaseRequestService = { get, getById };
export default PurchaseRequestService;