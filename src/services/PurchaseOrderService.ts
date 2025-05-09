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
  start_date?: string,
  end_date?: string,
  po_number?: string
): Promise<PaginatedResponse<PurchaseOrder>> => {
  const params: any = {
    page,
    limit,
    paginate: true,
  };
  
  if (start_date)  params.start_date = start_date;
  if (end_date) params.end_date = end_date;
  if (po_number) params.keyword = po_number;

  const response = await api.get<PaginatedResponse<PurchaseOrder>>("purchase-orders", { params });
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