import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";

export const useFetchData = (
    fetchFunction: Function,
    queryKey: string,
    usePagination: boolean = true,
) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(
        usePagination ? Number(searchParams.get("page")) || 1 : 1,
    );
    const [limit, setLimit] = useState(
        usePagination ? Number(searchParams.get("limit")) || 10 : 50,
    );

    const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
    const debouncedSearch = useDebounce(keyword, 500);
    const [pagination, setPagination] = useState<{
        curr_page: number;
        total_page: number;
        limit: number;
        total: number;
    } | null>(null);

    useEffect(() => {
        if (!usePagination) return;

        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("limit", limit.toString());
        newParams.set("page", currentPage.toString());
        if (keyword) newParams.set("keyword", keyword);
        router.push(`?${newParams.toString()}`, { scroll: false });
    }, [
        keyword,
        currentPage,
        limit,
        router,
        searchParams,
        usePagination,
    ]);

    const fetchData = async () => {
        const response = usePagination
            ? await fetchFunction(currentPage, limit, debouncedSearch)
            : await fetchFunction(debouncedSearch);

        if (usePagination) setPagination(response.pagination);
        return response.data;
    };

    const { data, isLoading, refetch } = useQuery({
        queryKey: usePagination
            ? [queryKey, currentPage, limit, debouncedSearch]
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
        fetchData
    };
};