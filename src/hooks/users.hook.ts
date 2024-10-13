import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

import {
  addFollowing,
  deleteUser,
  getUsers,
  updateUser,
  updateUserStatus,
} from "../services/UserServices";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["GET_USERS"],
    queryFn: async () => await getUsers(),
  });
};

export const useUserUpdation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async (userData) => await updateUser(id, userData),
    onSuccess: () => {
      toast.success("User is updated successful.");

      queryClient.invalidateQueries({ queryKey: ["GET_USERS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateUserStatusIntoDB = () => {
  const queryClient = useQueryClient();

  return useMutation<
    any,
    Error,
    {
      userId: string;
      status: string;
    }
  >({
    mutationKey: ["UPDATE_USER_STATUS"],
    mutationFn: async (data) => await updateUserStatus(data),
    onSuccess: () => {
      toast.success("User Status Changed successfully.");

      queryClient.invalidateQueries({ queryKey: ["GET_USERS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteUserIntoDB = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_USER"],
    mutationFn: async (id) => await deleteUser(id),
    onSuccess: () => {
      toast.success("User is deleted successfully.");

      queryClient.invalidateQueries({ queryKey: ["GET_USERS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useAddFollower = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["ADD_FOLLOWER"],
    mutationFn: async (userData) => await addFollowing(userData),
    onSuccess: () => {
      toast.success("Successfully done.");
      queryClient.invalidateQueries({ queryKey: ["GET_USERS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
