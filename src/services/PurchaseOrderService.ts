import { FetchFunctionWithPagination, PaginatedResponse } from "@/types/fetch";
import { PurchaseOrder } from "@/types/purchaseOrder";
import api from "@/utils/api";

export interface PaginationMeta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
}

const get: FetchFunctionWithPagination<PurchaseOrder> = async (
  page = 1,
  limit = 10,
  keyword = ""
): Promise<PaginatedResponse<PurchaseOrder>> => {
  const response = await api.get<PaginatedResponse<PurchaseOrder>>("purchase-orders", {
    params: { limit, keyword, page, paginate: true },
  });
  return response.data;
};

const getById = async (
  id:number
): Promise<any> => {
  const response = await api.get<PaginatedResponse<PurchaseOrder>>(`purchase-orders/${id}`);
  return response.data;
};



const PurchaseOrderService = { get,getById };
export default PurchaseOrderService;