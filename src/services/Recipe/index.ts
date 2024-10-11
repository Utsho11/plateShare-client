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
      }
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
