export type PurchaseRequest = {
    id: number;
    date: string; // ISO 8601 date string
    pr_number: string;
    department: string | null;
    budget_number: string;
    fixed_asset_number: string | null;
    type: string | null;
    transportation: string | null;
    kind_of_request: string;
    acc: string;
    item_code: string | null;
    item_name: string | null;
    description_of_goods: string;
    specification: string;
    part: string | null;
    quantity: number;
    unit: string;
    est_unit_price: number;
    est_amount: number;
    currency: string;
    req_delivery: string; // ISO 8601 date string
    supplier: string;
    status: string;
    remark: string | null;
    purpose: string;
    requested: string;
    gen_manager: string;
    supervisor: string | null;
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
}
