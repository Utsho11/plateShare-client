"use client";
import RecipeDetailsCard from "@/src/components/card/recipeDetailsCard";
import Loading from "@/src/components/UI/Loading";
import { useGetSingleRecipe } from "@/src/hooks/recipe.hook";
import { TRecipe } from "@/src/types";

interface IProps {
  params: {
    id: string;
  };
}

const RecipeDetailsPage = ({ params: { id } }: IProps) => {
  const { data: recipe, isPending } = useGetSingleRecipe(id);

  if (isPending) {
    return <Loading />;
  }

  return <RecipeDetailsCard recipe={recipe?.data as TRecipe} />;
};

export default RecipeDetailsPage;
