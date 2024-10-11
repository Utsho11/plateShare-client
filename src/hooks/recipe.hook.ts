import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createRecipe,
  getAllRecipe,
  getSingleRecipe,
} from "../services/Recipe";

export const useGetAllRecipe = () => {
  return useQuery({
    queryKey: ["GET_RECIPE"],
    staleTime: 0,
    queryFn: async () => await getAllRecipe(),
  });
};
export const useGetSingleRecipe = (id: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_RECIPE"],
    queryFn: async () => await getSingleRecipe(id),
  });
};

export const useCreateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FormData>({
    mutationKey: ["RECIPE_CREATION"],
    mutationFn: async (recipeData) => await createRecipe(recipeData),
    onSuccess: () => {
      toast.success("Recipe created successfully.");

      queryClient.invalidateQueries({ queryKey: ["GET_RECIPE"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
