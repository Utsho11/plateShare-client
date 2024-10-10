"use client";
import { PostTable } from "@/src/components/table/PostTable";
import Loading from "@/src/components/UI/Loading";
import { useGetAllRecipe } from "@/src/hooks/recipe.hook";
import { TRecipe } from "@/src/types";

const PostManagementPage = () => {
  const { data: recipe, isPending } = useGetAllRecipe();

  if (isPending) {
    return <Loading />;
  }

  if (!recipe.data) {
    return <p>No users found</p>;
  }

  console.log(recipe.data);

  return <PostTable recipies={recipe?.data as TRecipe[]} />;
};

export default PostManagementPage;
