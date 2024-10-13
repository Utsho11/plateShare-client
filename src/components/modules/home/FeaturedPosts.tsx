"use client";

import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useGetAllRecipe } from "@/src/hooks/recipe.hook";
import { TRecipe } from "@/src/types";

const FeaturedPosts = () => {
  const { data: recipeData } = useGetAllRecipe();
  const router = useRouter();

  if (!recipeData) {
    return <div>Loading..</div>; // Return message if no recipe or category data is available
  }

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-12">
      {/* Hero Section */}

      {/* Featured Recipes Section */}
      <div>
        <h2 className="text-4xl font-semibold mb-4 text-center">
          Featured Recipes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Recipe Cards */}
          {recipeData.data.slice(0, 2).map((r: TRecipe, index: number) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                alt={`Recipe ${index + 1}`}
                className="w-full h-48 object-cover"
                height={300}
                src={r.images![0]} // Placeholder for recipe images
                width={400}
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">{r.name}</h3>
                <div className="flex justify-between my-2">
                  <p className="text-gray-600">{r.category}</p>
                  <Chip
                    color={r.recipeType === "PREMIUM" ? "warning" : "secondary"}
                  >
                    {r.recipeType}
                  </Chip>
                </div>
                <Button
                  className="mt-2"
                  color="primary"
                  size="sm"
                  onClick={() => router.push("all-recipe")}
                >
                  View more...
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Highlights Section */}
    </div>
  );
};

export default FeaturedPosts;
