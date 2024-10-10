"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

import axiosInstance from "@/src/lib/AxiosInstance";

//sign up
export const registerUser = async (userData: FormData) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};

//login
export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    console.log(data);

    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};

export const changePassword = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/change-password",
      userData
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

//logout
export const logout = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const subscribeUser = async (userId: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/subscribe", userId);

    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};

//get user from token

export const getCurrentUser = async () => {
  const accessToken = await cookies().get("accessToken")?.value;

  let decodedToken = null;

  try {
    if (accessToken) {
      decodedToken = await jwtDecode(accessToken);

      return {
        _id: decodedToken._id,
        name: decodedToken.name,
        email: decodedToken.email,
        mobileNumber: decodedToken.mobileNumber,
        role: decodedToken.role,
        status: decodedToken.status,
        profilePhoto: decodedToken.profilePhoto,
        followers: decodedToken.followers,
        followings: decodedToken.followings,
      };
    }

    return decodedToken;
  } catch (error) {
    const data = {
      success: false,
      message: error,
    };

    return data;
  }
};
