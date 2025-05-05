import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { handleError } from "@/utils/handleErrors";

export const useUpdateData = <T>(
  updateFunction: (id: number, formData: T) => Promise<any>,
  id: number | undefined,
  queryKey: string,
  redirectUrl: string,
): UseMutationResult<any, unknown, T, unknown> => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: T) => {
      if (!id) throw new Error("ID diperlukan");
      return await updateFunction(id, formData);
    },
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries([queryKey, id]);
      queryClient.invalidateQueries([queryKey]);
      router.push(redirectUrl);
    },
    onError: (error: any) => {
      handleError(error);
    },
  });
};
