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
  keyword = ""
): Promise<PaginatedResponse<PurchaseRequest>> => {
  const response = await api.get<PaginatedResponse<PurchaseRequest>>("purchase-requests", {
    params: { limit, keyword, page, paginate: true },
  });
  return response.data;
};



const purchaseRequestService = { get };
export default purchaseRequestService;