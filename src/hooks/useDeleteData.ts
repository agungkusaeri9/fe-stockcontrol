import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { handleError } from "@/utils/handleErrors";

export const useDeleteData = (
  deleteFunction: (id: number) => Promise<any>,
  queryKey: any | any[],
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFunction,
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries(queryKey);
    },
    onError: (error) => {
      handleError(error);
    },
  });
};