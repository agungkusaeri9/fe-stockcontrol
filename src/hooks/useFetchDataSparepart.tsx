import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";
import { ApiResponse } from "@/types/fetch";

export type FetchFunctionWithPagination<T> = (
    page?: number,
    limit?: number,
    keyword?: string,
    machine_area_id?: string,
    department_id?: string,
    rack_id?: string,
) => Promise<PaginatedResponse<T>>;

export type FetchFunctionWithoutPagination<T> = (
    keyword?: string
) => Promise<ApiResponse<T[]>>;


type PaginatedResponse<T> = {
    data: T[];
    pagination: {
        curr_page: number;
        total_page: number;
        limit: number;
        total: number;
    };
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const useFetchDataSparepart = (
    fetchFunction: FetchFunctionWithPagination<T> | FetchFunctionWithoutPagination<T>,
    queryKey: string,
    usePagination: boolean = true,
) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [filters, setFilters] = useState({
        machine_area_id: searchParams.get("machine_area_id") || "",
        department_id: searchParams.get("department_id") || "",
        rack_id: searchParams.get("rack_id") || "",
    });

    const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);
    const [limit, setLimit] = useState(searchParams.get("limit") || 10);
    // const [machineArea, setMachineArea] = useState(searchParams.get("machine_area_id") || "");
    // const [department, setDepartment] = useState(searchParams.get("department_id") || "");
    // const [rack, setRack] = useState(searchParams.get("rack_id") || "");
    const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
    const debouncedSearch = useDebounce(keyword, 500);
    const [pagination, setPagination] = useState<PaginatedResponse<T>["pagination"] | null>(null);

    useEffect(() => {
        const newParams = new URLSearchParams();

        newParams.set("page", currentPage.toString());
        newParams.set("limit", limit.toString());
        if (keyword) newParams.set("keyword", keyword);

        // Tambahkan semua filters ke URL
        if (filters.machine_area_id) newParams.set("machine_area_id", filters.machine_area_id);
        if (filters.department_id) newParams.set("department_id", filters.department_id);
        if (filters.rack_id) newParams.set("rack_id", filters.rack_id);

        router.push(`?${newParams.toString()}`, { scroll: false });
    }, [keyword, currentPage, limit, filters]); // cukup ini saja

    const fetchData = async (): Promise<T[]> => {

        const res = await (fetchFunction as FetchFunctionWithPagination<T>)(Number(currentPage), Number(limit), debouncedSearch, filters.machine_area_id, filters.department_id, filters.rack_id);
        setPagination(res.pagination);
        return res.data;
    };

    const { data, isLoading, refetch } = useQuery<T[]>({
        queryKey: [queryKey, currentPage, limit, debouncedSearch, filters.machine_area_id, filters.department_id, filters.rack_id],
        queryFn: fetchData,
    });

    return {
        data,
        isLoading,
        pagination,
        currentPage,
        limit,
        filters,
        keyword,
        setKeyword,
        setCurrentPage,
        setLimit,
        refetch,
        fetchData,
        setFilters
    };
};
