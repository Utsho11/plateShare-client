import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  changePassword,
  loginUser,
  registerUser,
  sendEmail,
  subscribeUser,
} from "../services/AuthServices";

export const useUserRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FormData>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User registration successful.");

      queryClient.invalidateQueries({ queryKey: ["GET_USERS"] });
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
    onSuccess: () => {
      toast.loading("redirecting to payment page...");

      queryClient.invalidateQueries({ queryKey: ["GET_USERS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useSendEmail = () => {
  return useMutation<any, Error, FieldValues>({
    mutationFn: async (data) => await sendEmail(data),
    onSuccess: () => {
      toast.success("Email sent successfully.");
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
