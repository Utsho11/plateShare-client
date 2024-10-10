import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createRecipe, getAllRecipe } from "../services/Recipe";

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

export const useGetAllRecipe = () => {
  return useQuery({
    queryKey: ["GET_RECIPE"],
    queryFn: async () => await getAllRecipe(),
  });
};
