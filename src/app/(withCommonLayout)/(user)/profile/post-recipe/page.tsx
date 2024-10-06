"use client";
import "react-quill/dist/quill.snow.css";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { Button } from "@nextui-org/button";
import { ChangeEvent, useState } from "react";

import { useGetCategories } from "@/src/hooks/categories.hook";
import PSInput from "@/src/componsnts/form/PSInput";
import PSSelect from "@/src/componsnts/form/PSSelect";
import PSRichTextEditor from "@/src/componsnts/form/PSRichTextEditor";
import PSTimePicker from "@/src/componsnts/form/PSTimePicker";
import { AddIcon, ImageIcon, TrashIcon } from "@/src/componsnts/icons";
import { useCreateRecipe } from "@/src/hooks/recipe.hook";
import { useUser } from "@/src/context/user.provider";

export default function PostRecipePage() {
  const {
    data: categoriesData,
    isLoading: categoryLoading,
    isSuccess: categorySuccess,
  } = useGetCategories();

  const { mutate: handleCreateRecipe, isPending } = useCreateRecipe();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  let categoryOption: { key: string; label: string }[] = [];

  if (categoriesData?.data && !categoryLoading) {
    categoryOption = categoriesData.data
      .sort()
      .map((category: { _id: string; name: string }) => ({
        key: category.name,
        label: category.name,
      }));
  }
  const methods = useForm();
  const { control, handleSubmit } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const handleFieldAppend = () => {
    append({ name: "ingredients" });
  };

  const { user } = useUser();
  const onSubmit = (data: any) => {
    const cookingTimeObj = data.cookingTime;
    const formattedCookingTime = `${String(cookingTimeObj.hour).padStart(2, "0")}:${String(cookingTimeObj.minute).padStart(2, "0")}`;

    const formData = new FormData();

    const postData = {
      ...data,
      ingredients: data.ingredients.map((ing: { value: string }) => ing.value),
      cookingTime: formattedCookingTime,
      email: user?.email,
    };

    formData.append("data", JSON.stringify(postData));

    for (let image of imageFiles) {
      formData.append("recipeImages", image);
    }

    handleCreateRecipe(formData);
  };

  return (
    <div className="h-[100vh-100px] bg-[#170F21] text-white p-5 rounded">
      <div className="text-center my-2">
        <h1 className="text-3xl font-semibold">Post Your Recipe</h1>
      </div>
      <hr className="mx-5 my-5" />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-2 gap-3 my-5">
            <PSInput label="Recipe Name" name="name" />
            <PSSelect
              disabled={!categorySuccess}
              label="Category"
              name="category"
              options={categoryOption}
            />
          </div>
          <div className="grid lg:grid-cols-2 gap-3 my-3">
            <PSTimePicker label="Cooking Time" name="cookingTime" />
            <PSSelect
              label="Repice Type"
              name="premium"
              options={[
                { key: "premium", label: "premium" },
                { key: "non-premium", label: "non-premium" },
              ]}
            />
          </div>
          <div className="my-3 border-dashed border-2 rounded-xl p-2">
            <div className="flex items-center justify-between my-2">
              <h1 className="text-xl font-semibold">Add Recipe Ingredients:</h1>
              <Button isIconOnly onClick={() => handleFieldAppend()}>
                <AddIcon />
              </Button>
            </div>

            <div className="space-y-5">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <PSInput
                    label="Ingredients"
                    name={`ingredients.${index}.value`}
                  />
                  <Button
                    isIconOnly
                    className="h-14 w-16"
                    onClick={() => remove(index)}
                  >
                    <TrashIcon />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="border-2 border-dashed rounded-xl p-2">
            <PSRichTextEditor label="Recipe Description" name="description" />
            <div className="min-w-fit flex-1">
              <label
                className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                htmlFor="image"
              >
                <ImageIcon /> Upload image
              </label>
              <input
                multiple
                className="hidden"
                id="image"
                type="file"
                onChange={(e) => handleImageChange(e)}
              />
            </div>
            {imagePreviews.length > 0 && (
              <div className="flex gap-5 my-5 flex-wrap">
                {imagePreviews.map((imageDataUrl) => (
                  <div
                    key={imageDataUrl}
                    className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
                  >
                    <img
                      alt="item"
                      className="h-full w-full object-cover object-center rounded-md"
                      src={imageDataUrl}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="my-5">
            {isPending ? (
              <Button isLoading>Loading...</Button>
            ) : (
              <Button type="submit">Post Recipe</Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
