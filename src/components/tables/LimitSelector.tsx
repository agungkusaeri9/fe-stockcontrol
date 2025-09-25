interface Props {
    limit: number;
    setLimit: (val: number) => void;
}

export function LimitSelector({ limit, setLimit }: Props) {
    return (
        <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Rows:</span>
            <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
            >
                {[5, 10, 20, 50].map((size) => (
                    <option key={size} value={size}>
                        {size}
                    </option>
                ))}
            </select>
        </div>
    );
}
