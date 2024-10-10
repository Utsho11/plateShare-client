"use client";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

import { TRecipe } from "@/src/types";

const RecipeCard = ({ recipe }: { recipe: TRecipe }) => {
  const router = useRouter();

  const handleRecipe = (id: string) => {
    // Navigate to the recipe page using the id
    router.push(`/all-recipe/${id}`);
  };

  return (
    <div className="p-2 h-full w-full bg-gray-400 rounded-lg backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-400">
      <Image
        alt={recipe.name}
        className="h-40 overflow-hidden rounded text-white"
        height={200}
        src={recipe.images![0]}
        width="100%"
      />
      <div className="mt-4">
        <h3 className="text-xl font-bold">{recipe.name}</h3>
        <p className="text-sm">{recipe.category}</p>
      </div>
      <div className="mt-4">
        <div>
          <p className="text-sm">
            Time:{" "}
            {recipe.cookingTime &&
              `${parseInt(recipe.cookingTime.split(":")[0]) > 0 ? `${recipe.cookingTime.split(":")[0]}h ` : ""}${
                recipe.cookingTime.split(":")[1]
              }min`}
          </p>
          <span>{recipe.premium === "PREMIUM" ? "P" : ""}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <Button
          className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          color="primary"
          variant="solid"
          onClick={() => {
            handleRecipe(recipe._id);
          }}
        >
          View Recipe
        </Button>
      </div>
    </div>
  );
};

export default RecipeCard;
