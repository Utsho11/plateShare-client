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
    throw new Error(error);
  }
};
