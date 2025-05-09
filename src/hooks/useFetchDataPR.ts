import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";
type PaginatedResponse<T> = {
    data: T[];
    pagination: {
        curr_page: number;
        total_page: number;
        limit: number;
        total: number;
    };
};

type Filter = {
    start_date: string;
    end_date: string;
    pr_number: string;
}

export type FetchFunctionWithPagination<T> = (
  page?: number,
  limit?: number,
  keyword?: string,
  start_date?: string,
  end_date?: string,
  pr_number?: string
) => Promise<PaginatedResponse<T>>;

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const useFetchDataPurchaseRequest = (
    fetchFunction: FetchFunctionWithPagination<T>,
    queryKey: string,
    usePagination: boolean = true,
    filter: Filter
) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(
        usePagination ? Number(searchParams.get("page")) || 1 : 1
    );
    const [limit, setLimit] = useState(
        usePagination ? Number(searchParams.get("limit")) || 10 : 50
    );
    const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
    const debouncedSearch = useDebounce(keyword, 500);
    const [pagination, setPagination] = useState<PaginatedResponse<T>["pagination"] | null>(null);

    useEffect(() => {
        if (!usePagination) return;

        const newParams = new URLSearchParams(searchParams.toString());

        newParams.set("limit", limit.toString());
        newParams.set("page", currentPage.toString());

        if (keyword) {  newParams.set("keyword", keyword); } else { newParams.delete("keyword")}
        filter.start_date ? newParams.set("start_date", filter.start_date) : newParams.delete("start_date");
        filter.end_date ? newParams.set("end_date", filter.end_date) : newParams.delete("end_date");
        filter.pr_number ? newParams.set("pr_number", filter.pr_number) : newParams.delete("pr_number");

        router.push(`?${newParams.toString()}`, { scroll: false });
    }, [keyword, currentPage, limit, filter, usePagination, router, searchParams]);

    const fetchData = async (): Promise<T[]> => {
         const res = await (fetchFunction as FetchFunctionWithPagination<T>)(currentPage, limit, filter.start_date, filter.end_date,filter.pr_number);
            setPagination(res.pagination);
            return res.data;
    };

    const { data, isLoading, refetch } = useQuery<T[]>({
        queryKey: usePagination
            ? [queryKey, currentPage, limit,  filter.start_date, filter.end_date,filter.pr_number]
            : [queryKey],
        queryFn: fetchData,
    });

    return {
        data,
        isLoading,
        pagination,
        currentPage,
        limit,
        keyword,
        setKeyword,
        setCurrentPage,
        setLimit,
        refetch,
        fetchData,
    };
};
