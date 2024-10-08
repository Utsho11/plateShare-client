import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  changePassword,
  loginUser,
  registerUser,
  subscribeUser,
} from "../services/AuthServices";

export const useUserRegistration = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User registration successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("User login successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_SUBSCRIPTION"],
    mutationFn: async (userId) => await subscribeUser(userId),
    onSuccess: (response) => {
      toast.loading("redirecting to payment page...");
      if (response.data) {
        window.location.href = response.data;
      }
      queryClient.invalidateQueries({ queryKey: ["GET_USERS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserChangePassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CHANGE_PASSWORD"],
    mutationFn: async (userData) => await changePassword(userData),
    onSuccess: () => {
      toast.success("Password change successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
