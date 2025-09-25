"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "./useDebounce";
import {
  FetchFunctionWithPagination,
  PaginatedResponse,
} from "@/types/fetch";

export function usePaginatedQuery<T>(
  key: string,
  fetchFunction: FetchFunctionWithPagination<T>
) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");
  const debouncedSearch = useDebounce(keyword, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: [key, page, limit, debouncedSearch],
    queryFn: async () => {
      const res: PaginatedResponse<T> = await fetchFunction(
        page,
        limit,
        debouncedSearch
      );
      return res;
    },
    keepPreviousData: true,
  });

  return {
    data: data?.data ?? [],
    pagination: data?.pagination,
    isLoading,
    isError,
    page,
    setPage,
    limit,
    setLimit,
    keyword,
    setKeyword,
  };
}
