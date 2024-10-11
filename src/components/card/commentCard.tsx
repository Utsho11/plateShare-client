"use client";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

import PSForm from "../form/PSForm";
import PSTextArea from "../form/PSTextArea";
import { EditIcon, TrashIcon } from "../icons";

import {
  useDeleteComment,
  useEditComment,
  usePostComment,
} from "@/src/hooks/comment.hook";
import { TComment } from "@/src/types";
import { useUser } from "@/src/context/user.provider";

const CommentCard = ({
  recipeId,
  comments,
}: {
  recipeId: string;
  comments: TComment[];
}) => {
  const { mutate: deleteComment } = useDeleteComment();
  const { mutate: postComment } = usePostComment();
  const { mutate: editComment } = useEditComment();

  const { user } = useUser();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [commentId, setCommentId] = useState("");

  if (!user) {
    return <div>Please login to comment.</div>;
  }

  const handleEditMode = (commentId: string) => {
    setCommentId(commentId);
    setEditMode((prev) => !prev);
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment(commentId);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const commentData = {
      comment: data.comment,
      recipeId: recipeId,
      userId: user._id,
    };

    postComment(commentData);
  };

  const editSubmit: SubmitHandler<FieldValues> = (data) => {
    const updatedData = {
      commentId: commentId,
      comment: data.comment,
    };

    setEditMode(false);
    editComment(updatedData);
  };

  return (
    <div className="">
      <div className="">
        <PSForm onSubmit={onSubmit}>
          <PSTextArea label="Write a comment" name="comment" />
          <Button className="my-4" type="submit">
            Post comment
          </Button>
        </PSForm>
      </div>
      <hr className="my-2" />
      <div>
        <h2 className="text-3xl font-semibold my-2">All Comments:</h2>
        <div className="">
          {comments?.map((comment: TComment) => (
            <div key={comment._id} className="my-4">
              <Card className="sm:w-1/2 p-2">
                <CardHeader className="flex justify-between">
                  <div className="flex gap-5">
                    <Avatar
                      isBordered
                      radius="full"
                      size="md"
                      src={comment?.userId?.profilePhoto[0]}
                    />
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h4 className="text-small font-semibold leading-none text-default-600">
                        {comment?.userId?.name}
                      </h4>
                      <h5 className="text-small tracking-tight text-default-400">
                        @{comment?.userId?.email}
                      </h5>
                    </div>
                  </div>
                  {user._id === comment?.userId?._id ? (
                    <div className="flex gap-2 align-middle">
                      <Button
                        isIconOnly
                        className="bg-transparent"
                        onClick={() => {
                          handleEditMode(comment._id as string);
                        }}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        isIconOnly
                        className="bg-transparent"
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        <TrashIcon />
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                  {editMode && commentId === comment._id ? (
                    <PSForm onSubmit={editSubmit}>
                      <PSTextArea label="Edit your comment" name="comment" />
                      <Button className="my-2" type="submit">
                        OK
                      </Button>
                    </PSForm>
                  ) : (
                    <p>{comment.comment}</p>
                  )}
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
