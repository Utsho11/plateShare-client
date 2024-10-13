"use server";
import { FieldValues } from "react-hook-form";

import axiosInstance from "@/src/lib/AxiosInstance";

export const getUsers = async () => {
  try {
    const { data } = await axiosInstance.get("/users");

    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};

export const updateUser = async (userId: string, userData: FormData) => {
  try {
    // Make the request to the update user endpoint
    const { data } = await axiosInstance.put(
      `/users/update-user/${userId}`,
      userData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return data; // Return the response data
  } catch (error: any) {
    // Return error message in a consistent format
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to update user",
    };
  }
};

export const updateUserStatus = async (payload: {
  userId: string;
  status: string;
}) => {
  try {
    const { data } = await axiosInstance.put(
      `users/update-user-status`,
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

export const deleteUser = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`users/delete-user/${id}`);

    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};

export const addFollowing = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      "/users/add-following",
      userData,
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
