import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { handleError } from "@/utils/handleErrors";

export const useCreateData = <T>(
  createFunction: (formData: T) => Promise<any>,
  queryKey: string[],
  redirectUrl: string,
): UseMutationResult<any, unknown, T, unknown> => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: T) => {
      return await createFunction(formData);
    },
    onSuccess: (response) => {
      toast.success(response.message || "Data berhasil ditambahkan.");
      queryClient.invalidateQueries({ queryKey });
      router.push(redirectUrl);
    },
    onError: (error: unknown) => {
      handleError(error);
    },
  });
};
