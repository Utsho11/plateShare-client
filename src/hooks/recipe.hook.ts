import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  addRating,
  createRecipe,
  deleteRecipe,
  getAllRecipe,
  getRating,
  getSingleRecipe,
  setVote,
  updateRecipeStatus,
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

export const useUpdateRecipeStatusIntoDB = () => {
  const queryClient = useQueryClient();

  return useMutation<
    any,
    Error,
    {
      recipeId: string;
      recipeStatus: string;
    }
  >({
    mutationKey: ["UPDATE_RECIPE_STATUS"],
    mutationFn: async (data) => await updateRecipeStatus(data),
    onSuccess: () => {
      toast.success("Recipe Status Changed successfully.");

      queryClient.invalidateQueries({ queryKey: ["GET_RECIPE"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteRecipeIntoDB = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_RECIPE"],
    mutationFn: async (id) => await deleteRecipe(id),
    onSuccess: () => {
      toast.success("Recipe is deleted successfully.");

      queryClient.invalidateQueries({ queryKey: ["GET_RECIPE"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
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

export const useSetVote = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { voteType: string; recipeId: string }>({
    mutationKey: ["SET_VOTE"],
    mutationFn: async (voteData) => await setVote(voteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_RECIPE"] });
      toast.success("Vote updated successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useAddRating = () => {
  const queryClient = useQueryClient();

  return useMutation<
    any,
    Error,
    {
      rating: number;
      recipeId: string;
    }
  >({
    mutationKey: ["ADD_RATING"],
    mutationFn: async (ratingData) => await addRating(ratingData),
    onSuccess: () => {
      toast.success("Rating successfully done.");

      queryClient.invalidateQueries({ queryKey: ["GET_RATING"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetRating = () => {
  return useQuery({
    queryKey: ["GET_RATING"],
    queryFn: async () => await getRating(),
  });
};
