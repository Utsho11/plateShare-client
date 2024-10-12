"use client";
import { PostTable } from "@/src/components/table/PostTable";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useGetAllRecipe } from "@/src/hooks/recipe.hook";
import { TRecipe } from "@/src/types";

const MyRecipePage = () => {
  const { data: recipe, isPending } = useGetAllRecipe();
  const { user } = useUser();

  if (isPending) {
    return <Loading />;
  }

  if (!recipe.data) {
    return <p>No users found</p>;
  }
  const myRecipe = recipe.data.filter((r: TRecipe) =>
    r.email.includes(user?.email ?? ""),
  );

  return <PostTable recipies={myRecipe as TRecipe[]} />;
};

export default MyRecipePage;
