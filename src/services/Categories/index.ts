"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { FieldValues } from "react-hook-form";

export const getCategories = async () => {
  try {
    const { data } = await axiosInstance.get("/category/");

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const postCategory = async (category: FieldValues) => {
  try {
    const res = await axiosInstance.post("/category/create-category", category);

    return res.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
