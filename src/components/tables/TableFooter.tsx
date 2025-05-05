import React from "react";
import Pagination from "./Pagination";

const TableFooter = ({
    pagination,
    onPageChange,
}: {
    pagination: { curr_page: number; total_page: number; limit: number; total: number };
    onPageChange: (page: number) => void;
}) => {
    const { curr_page, total_page, limit, total } = pagination;

    // Hitung entri awal dan akhir
    const startEntry = total === 0 ? 0 : (curr_page - 1) * limit + 1;
    const endEntry = Math.min(curr_page * limit, total);

    // Hitung total halaman
    const totalPages = Math.ceil(total / limit);

    return (
        <div className="mt-5 flex items-center justify-between text-gray-500 dark:text-gray-400 px-5 py-3">
            <p className="text-sm font-medium">
                Showing {startEntry} to {endEntry} of {total} entries
            </p>

            {totalPages > 0 && (
                <Pagination
                    currentPage={curr_page}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
};

export default TableFooter;
