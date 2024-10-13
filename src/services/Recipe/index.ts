"use server";
import axiosInstance from "@/src/lib/AxiosInstance";

export const createRecipe = async (recipeData: FormData) => {
  try {
    const { data } = await axiosInstance.post(
      "/recipe/create-recipe",
      recipeData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};

export const getAllRecipe = async () => {
  try {
    const { data } = await axiosInstance.get("/recipe/");

    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};

export const getSingleRecipe = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`recipe/${id}`);

    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};

export const deleteRecipe = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`recipe/delete-recipe/${id}`);

    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};

export const updateRecipeStatus = async (payload: {
  recipeId: string;
  recipeStatus: string;
}) => {
  try {
    const { data } = await axiosInstance.put(
      `recipe/update-recipe-status`,
      payload,
    );

    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};

export const setVote = async (voteData: {
  voteType: string;
  recipeId: string;
}) => {
  try {
    const { data } = await axiosInstance.put(`recipe/vote-recipe`, voteData);

    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};

export const addRating = async (ratingData: {
  rating: number;
  recipeId: string;
}) => {
  try {
    const { data } = await axiosInstance.post(`rating/add-rating`, ratingData);

    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};

export const getRating = async () => {
  try {
    const { data } = await axiosInstance.get(`/rating/get-rating`);

    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};
