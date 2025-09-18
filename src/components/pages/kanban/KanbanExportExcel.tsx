import Button from "@/components/ui/button/Button";
import React, { useState } from "react";
import { useExportExcel } from "@/hooks/useExportExcel";
import KanbanService from "@/services/KanbanService";

const KanbanExportExcel = () => {
    const [isOpen, setIsOpen] = useState(false);

    // bikin adapter function biar hook tau harus panggil service mana
    const { exportExcel, isExporting } = useExportExcel((type) => {
        switch (type) {
            case "all":
                return KanbanService.exportAll();
            case "completed":
                return KanbanService.exportCompleted();
            default:
                return KanbanService.exportUncompleted();
        }
    });

    return (
        <div className="relative inline-block">
            <Button
                onClick={() => setIsOpen((prev) => !prev)}
                size="sm"
                variant="info"
                className="flex items-center gap-2 bg-a-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isExporting}
            >
                <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M14 2V8H20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8 13L10.5 15.5L16 10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                {isExporting ? "Exporting..." : "Export Excel"}

                {/* Arrow dropdown di kanan */}
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : "rotate-0"
                        }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </Button>

            {isOpen && (
                <div className="absolute mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <button
                        onClick={() => exportExcel("all")}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                        All
                    </button>
                    <button
                        onClick={() => exportExcel("uncompleted")}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                        Uncompleted
                    </button>
                    <button
                        onClick={() => exportExcel("completed")}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                        Completed
                    </button>
                </div>
            )}
        </div>
    );
};

export default KanbanExportExcel;
