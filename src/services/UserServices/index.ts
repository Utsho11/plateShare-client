"use server";
import { FieldValues } from "react-hook-form";

import axiosInstance from "@/src/lib/AxiosInstance";

export const getUsers = async () => {
  try {
    const { data } = await axiosInstance.get("/users");

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const addFollowing = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      "/users/add-following",
      userData
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
