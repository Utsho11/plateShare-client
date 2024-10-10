"use client";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

import { TRecipe } from "@/src/types";

const RecipeCard = ({ recipe }: { recipe: TRecipe }) => {
  const router = useRouter();

  const handleRecipe = (id: string) => {
    // Navigate to the recipe page using the id
    router.push(`/recipe/${id}`);
  };

  return (
    <div className="p-2 w-full">
      <Image
        alt={recipe.name}
        className="rounded-lg shadow-md object-cover"
        height={200}
        src={recipe.images![0]}
        width="100%"
      />
      <div className="mt-4">
        <h3 className="text-xl font-bold">{recipe.name}</h3>
        <p className="text-sm">{recipe.category}</p>
      </div>
      <div className="mt-4">
        <div className="">
          <p className="text-sm">
            Time:{" "}
            {recipe.cookingTime &&
              `${parseInt(recipe.cookingTime.split(":")[0]) > 0 ? `${recipe.cookingTime.split(":")[0]}h ` : ""}${
                recipe.cookingTime.split(":")[1]
              }min`}
          </p>
          <p>{recipe.premium === "PREMIUM" ? <p>P</p> : <p>{""}</p>}</p>
        </div>
        <p>Rating: 5</p>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <Button
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
