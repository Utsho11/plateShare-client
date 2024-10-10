"use client";
import { useState } from "react";
import { Image } from "@nextui-org/image";

import { TRecipe } from "@/src/types";

const RecipeDetailsCard = ({ recipe }: { recipe: TRecipe }) => {
  const { name, images, description, ingredients } = recipe;
  const [selectedImage, setSelectedImage] = useState(images![0]);

  const handlePreviewClick = (image: any) => {
    setSelectedImage(image);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 p-5">
      {/* Image Gallery Section */}
      <div className="lg:w-1/2 flex flex-col">
        <div className="mb-5 rounded-lg overflow-hidden">
          <Image
            alt="Selected Recipe"
            className="object-cover sm:h-[400] h-[300]"
            src={selectedImage}
            width={600}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {images?.map((image, index) => (
            <button
              key={index + 1}
              className={`cursor-pointer border-2 rounded-lg overflow-hidden ${
                selectedImage === image ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => handlePreviewClick(image)}
            >
              <Image
                alt={`Preview ${index + 1}`}
                className="w-20 h-20 object-cover"
                src={image}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Details Section */}
      <div className="lg:w-1/2 flex flex-col gap-4">
        <h2 className="text-3xl font-bold">{name}</h2>
        <h3 className="text-xl font-semibold mb-2">Cooking Method:</h3>
        <p
          dangerouslySetInnerHTML={{ __html: description }}
          className="text-gray-700"
        />
        <div>
          <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
          <ul className="list-disc pl-5">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsCard;
