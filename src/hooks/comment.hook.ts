import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  deleteComment,
  editComment,
  getComment,
  postComment,
} from "../services/CommentServices";

export const useGetComment = (id: string) => {
  return useQuery({
    queryKey: ["GET_COMMENT"],
    queryFn: async () => await getComment(id),
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["DELETE_COMMENT"],
    mutationFn: async (commentId: string) => await deleteComment(commentId),
    onSuccess: () => {
      toast.success("Comment deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["GET_COMMENT"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete the comment.");
    },
  });
};

export const usePostComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["POST_COMMENT"],
    mutationFn: async (newCommentData: {
      comment: string;
      recipeId: string;
      userId: string;
    }) => await postComment(newCommentData),
    onSuccess: () => {
      toast.success("Comment posted successfully.");
      queryClient.invalidateQueries({ queryKey: ["GET_COMMENT"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to post the comment.");
    },
  });
};

export const useEditComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["EDIT_COMMENT"],
    mutationFn: async (updatedCommentData: {
      commentId: string;
      comment: string;
    }) => await editComment(updatedCommentData),
    onSuccess: () => {
      toast.success("Comment updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["GET_COMMENT"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update the comment.");
    },
  });
};
