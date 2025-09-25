import { Pagination } from "@/hooks/usePaginatedQuery";

interface Props {
    pagination?: Pagination;
    page: number;
    setPage: (page: number) => void;
}

export function PaginationController({ pagination, page, setPage }: Props) {
    if (!pagination) return null;

    const { totalPages } = pagination;

    const renderPages = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            // kalau halaman <= 7, tampil semua
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (page <= 3) {
                pages.push(1, 2, 3, 4, "...", totalPages);
            } else if (page >= totalPages - 2) {
                pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
            }
        }

        return pages.map((p, idx) => {
            if (p === "...") {
                return (
                    <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 select-none">
                        ...
                    </span>
                );
            }

            const isActive = p === pagination.page;
            return (
                <button
                    key={p}
                    onClick={() => setPage(Number(p))}
                    className={`px-3 py-1.5 rounded-md border transition-colors ${isActive
                        ? "bg-blue-600 text-white border-blue-600"
                        : "text-gray-600 border-gray-300 hover:bg-gray-100"
                        }`}
                >
                    {p}
                </button>
            );
        });
    };

    return (
        <div className="flex items-center justify-center gap-2 text-sm mt-4">
            {/* First */}
            <button
                onClick={() => setPage(1)}
                disabled={!pagination.hasPreviousPage}
                className="px-3 py-1.5 rounded-md border text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
            >
                First
            </button>

            {/* Prev */}
            <button
                onClick={() => setPage(Math.max(page - 1, 1))}
                disabled={!pagination.hasPreviousPage}
                className="px-3 py-1.5 rounded-md border text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
            >
                Prev
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">{renderPages()}</div>

            {/* Next */}
            <button
                onClick={() => setPage(Math.min(page + 1, totalPages))}
                disabled={!pagination.hasNextPage}
                className="px-3 py-1.5 rounded-md border text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
            >
                Next
            </button>

            {/* Last */}
            <button
                onClick={() => setPage(totalPages)}
                disabled={!pagination.hasNextPage}
                className="px-3 py-1.5 rounded-md border text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
            >
                Last
            </button>
        </div>
    );
}
