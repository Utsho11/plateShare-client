"use server";
import axiosInstance from "@/src/lib/AxiosInstance";
import { TComment } from "@/src/types";

export const getComment = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`comment/${id}`);

    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};

export const postComment = async (commentData: {
  recipeId: string;
  comment: string;
  userId: string;
}) => {
  try {
    const { data } = await axiosInstance.post(
      `comment/add-comment`,
      commentData
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

export const editComment = async (commentData: {
  commentId: string;
  comment: string;
}) => {
  try {
    const { data } = await axiosInstance.put(
      `comment/edit-comment`,
      commentData
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

export const deleteComment = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`comment/delete-comment/${id}`);

    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};
