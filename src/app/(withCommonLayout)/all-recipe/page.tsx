"use client";
import RecipeCard from "@/src/components/card/recipeCard";
import Loading from "@/src/components/UI/Loading";
import { useGetAllRecipe } from "@/src/hooks/recipe.hook";
import { TRecipe } from "@/src/types";

const AllRecipePage = () => {
  const { data: recipeData, isPending } = useGetAllRecipe();

  if (isPending) {
    return <Loading />; // Return loading spinner while fetching data
  }

  if (!recipeData) {
    return <div>No recipes found.</div>; // Return message if no recipe data is available
  }

  return (
    <div className="">
      <h1 className="text-center text-3xl sm:my-8 my-6">All Recipies</h1>
      <div className="" />
      <div className="grid sm:grid-cols-3 lg:gap-3 py-8">
        {recipeData?.data?.map((recipe: TRecipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default AllRecipePage;
