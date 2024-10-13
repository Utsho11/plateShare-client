"use client";
import { useState } from "react";
import { Input } from "@nextui-org/input";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";

import RecipeCard from "@/src/components/card/recipeCard";
import Loading from "@/src/components/UI/Loading";
import { useGetAllRecipe } from "@/src/hooks/recipe.hook";
import { TCategory, TRecipe } from "@/src/types";
import { SearchIcon } from "@/src/components/icons";
import { useGetCategories } from "@/src/hooks/categories.hook";

const AllRecipePage = () => {
  const { data: recipeData, isPending } = useGetAllRecipe();
  const { data: categoryData } = useGetCategories();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Track selected category
  const [sortOrder, setSortOrder] = useState<string>(""); // Track sorting criteria

  if (!recipeData || !categoryData) {
    return <div>Loading..</div>; // Return message if no recipe or category data is available
  }

  const filterRecipe = recipeData?.data?.filter(
    (recipe: TRecipe) => recipe.recipeStatus === "PUBLISH",
  );

  // Search and category filtering function
  const filteredRecipesBySearch = filterRecipe?.filter((recipe: TRecipe) => {
    const nameMatch = recipe.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const categoryMatch = recipe.category
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const ingredientsMatch = recipe.ingredients.some((ingredient: string) =>
      ingredient.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Filter by selected category if one is chosen
    const matchesSelectedCategory =
      !selectedCategory || recipe.category === selectedCategory;

    return (
      (nameMatch || categoryMatch || ingredientsMatch) &&
      matchesSelectedCategory
    );
  });

  // Sort the filtered recipes based on the selected sort order
  const sortedRecipes = [...(filteredRecipesBySearch || [])].sort((a, b) => {
    const aUpvotes = a.upvotes ? a.upvotes.length : 0; // Handle undefined or empty array
    const bUpvotes = b.upvotes ? b.upvotes.length : 0; // Handle undefined or empty array
    const aDownvotes = a.downvotes ? a.downvotes.length : 0; // Handle undefined or empty array
    const bDownvotes = b.downvotes ? b.downvotes.length : 0; // Handle undefined or empty array

    if (sortOrder === "upvotes") {
      return bUpvotes - aUpvotes; // Sort by upvotes (highest first)
    } else if (sortOrder === "downvotes") {
      return bDownvotes - aDownvotes; // Sort by downvotes (highest first)
    } else {
      return 0; // No sorting
    }
  });

  if (isPending) {
    return <Loading />; // Return loading spinner while fetching data
  }

  return (
    <div>
      <h1 className="text-center text-3xl sm:my-8 my-6">All Recipes</h1>

      <div className="sm:flex justify-between items-center space-y-4 mb-6">
        {/* Search Bar */}
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[20rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Search Recipes"
          startContent={<SearchIcon />}
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Category Dropdown */}
        <div className="h-full font-normal p-2 rounded-lg">
          Filter By Category:{" "}
          <Dropdown>
            <DropdownTrigger>
              <button className="border border-gray-300 rounded-lg p-1 text-default-500 bg-default-400/20 dark:bg-default-500/20">
                {selectedCategory ? selectedCategory : "Select A Category"}
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Select a category">
              <DropdownSection>
                <DropdownItem
                  key={"!"}
                  onClick={() => setSelectedCategory(null)}
                >
                  All Categories
                </DropdownItem>
                {categoryData.data.map((category: TCategory) => (
                  <DropdownItem
                    key={category._id} // Ensure category has a unique ID if it's an object
                    onClick={() => setSelectedCategory(category.name)} // Adjust based on your data structure
                  >
                    {category.name}
                  </DropdownItem>
                ))}
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* Sorting Dropdown */}
        <div className="h-full font-normal p-2 rounded-lg">
          Sort By:{" "}
          <Dropdown>
            <DropdownTrigger>
              <button className="border border-gray-300 rounded-lg p-1 text-default-500 bg-default-400/20 dark:bg-default-500/20">
                {sortOrder
                  ? sortOrder.charAt(0).toUpperCase() + sortOrder.slice(1)
                  : "Select Sort Order"}
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Select sort order">
              <DropdownSection>
                <DropdownItem onClick={() => setSortOrder("upvotes")}>
                  Upvotes
                </DropdownItem>
                <DropdownItem onClick={() => setSortOrder("downvotes")}>
                  Downvotes
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="grid sm:grid-cols-3 lg:gap-3 py-8">
        {sortedRecipes.length ? (
          sortedRecipes.map((recipe: TRecipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))
        ) : (
          <p className="text-center col-span-3">No recipes found</p>
        )}
      </div>
    </div>
  );
};

export default AllRecipePage;
