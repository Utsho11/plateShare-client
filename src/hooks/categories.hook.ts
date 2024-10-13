import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

import {
  deleteCategory,
  getCategories,
  postCategory,
} from "../services/Categories";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["GET_CATEGORIES"],
    queryFn: async () => await getCategories(),
  });
};

export const usePostCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["ADD_CATEGORY"],
    mutationFn: async (data) => await postCategory(data),
    onSuccess: () => {
      toast.success("Category created successful.");

      queryClient.invalidateQueries({ queryKey: ["GET_CATEGORIES"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["DELETE_CATEGORY"],
    mutationFn: async (commentId: string) => await deleteCategory(commentId),
    onSuccess: () => {
      toast.success("Category deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["GET_CATEGORIES"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete the comment.");
    },
  });
};
