import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

import { getCategories, postCategory } from "../services/Categories";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["GET_CATEGORIES"],
    queryFn: async () => await getCategories(),
  });
};

export const usePostCategory = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["ADD_CATEGORY"],
    mutationFn: async (data) => await postCategory(data),
    onSuccess: () => {
      toast.success("Category created successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
