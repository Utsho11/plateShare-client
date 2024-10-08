import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

import { addFollowing, getUsers } from "../services/UserServices";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["GET_USERS"],
    queryFn: async () => await getUsers(),
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
