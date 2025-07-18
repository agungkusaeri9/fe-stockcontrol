import Button from '@/components/ui/button/Button'
import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import KanbanService from '@/services/KanbanService'

const KanbanExportExcel = () => {

    const exportMutation = useMutation({
        mutationFn: () => KanbanService.exportUncompleted(),
        onSuccess: (blob) => {
            const url = window.URL.createObjectURL(new Blob([blob], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }));

            const link = document.createElement('a');
            link.href = url;

            let fileName = '';
            const prefix = 'KM';
            const year = new Date().getFullYear();
            const month = String(new Date().getMonth() + 1).padStart(2, '0');
            const day = String(new Date().getDate()).padStart(2, '0');

            fileName = `${prefix}_${day}${month}${year}_1.xlsx`;

            link.setAttribute('download', fileName);

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(url);
        },
        onError: (error) => {
            console.error('Error exporting to Excel:', error);
            toast.error('Failed to export Excel file');
        }
    });

    const handleExport = () => {
        exportMutation.mutate();
    };

    // if (exportMutation.isPending) {
    //     return <Loading />;
    // }

    return (
        <Button
            onClick={handleExport}
            size="sm"
            variant="info"
            className="flex items-center gap-2 bg-a-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={exportMutation.isPending}
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
            {exportMutation.isPending ? 'Exporting...' : 'Export Uncompleted'}
        </Button>
    )
}

export default KanbanExportExcel
