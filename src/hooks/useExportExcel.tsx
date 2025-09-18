// hooks/useExportExcel.ts
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

type ExportFn = (type: "all" | "uncompleted" | "completed") => Promise<Blob>;

export const useExportExcel = (exportFn?: ExportFn) => {
    const exportMutation = useMutation({
        mutationFn: exportFn,
        onSuccess: (blob) => {
            const url = window.URL.createObjectURL(
                new Blob([blob], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                })
            );

            const link = document.createElement("a");
            link.href = url;

            const prefix = "KM";
            const year = new Date().getFullYear();
            const month = String(new Date().getMonth() + 1).padStart(2, "0");
            const day = String(new Date().getDate()).padStart(2, "0");

            const fileName = `${prefix}_${day}${month}${year}_1.xlsx`;
            link.setAttribute("download", fileName);

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(url);
        },
        onError: (error) => {
            console.error("Error exporting to Excel:", error);
            toast.error("Failed to export Excel file");
        },
    });

    return {
        exportExcel: (type: "all" | "uncompleted" | "completed") =>
            exportMutation.mutate(type),
        isExporting: exportMutation.isPending,
    };
};
