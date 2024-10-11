"use client";
import CommentCard from "@/src/components/card/commentCard";
import RecipeDetailsCard from "@/src/components/card/recipeDetailsCard";
import Loading from "@/src/components/UI/Loading";
import { useGetComment } from "@/src/hooks/comment.hook";
import { useGetSingleRecipe } from "@/src/hooks/recipe.hook";
import { TComment, TRecipe } from "@/src/types";

interface IProps {
  params: {
    id: string;
  };
}

const RecipeDetailsPage = ({ params: { id } }: IProps) => {
  const { data: recipe, isPending } = useGetSingleRecipe(id);
  const { data: comments, isLoading: isCommentLoading } = useGetComment(id);

  if (isPending || isCommentLoading) {
    return <Loading />;
  }

  return (
    <div>
      <RecipeDetailsCard recipe={recipe?.data as TRecipe} />
      <hr className="my-8" />
      <CommentCard comments={comments?.data as TComment[]} recipeId={id} />
    </div>
  );
};

export default RecipeDetailsPage;
