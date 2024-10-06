import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createRecipe } from "../services/Recipe";

export const useCreateRecipe = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["RECIPE_CREATION"],
    mutationFn: async (recipeData) => await createRecipe(recipeData),
    onSuccess: () => {
      toast.success("Recipe created successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
