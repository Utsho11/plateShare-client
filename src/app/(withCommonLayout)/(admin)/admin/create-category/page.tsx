"use client";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";

import PSForm from "@/src/components/form/PSForm";
import PSInput from "@/src/components/form/PSInput";
import { AddIcon, TrashIcon } from "@/src/components/icons";
import {
  useDeleteCategory,
  useGetCategories,
  usePostCategory,
} from "@/src/hooks/categories.hook";

const CreateCategory = () => {
  const { mutate: handlePostCategory, isPending: postCategoryPending } =
    usePostCategory();
  const { mutate: deleteCategory, isPending: deleteteCategoryPending } =
    useDeleteCategory();
  const { data: categoryData } = useGetCategories();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // handle form submission
    handlePostCategory(data);
  };

  const handleDeleteCategory = (id: string) => {
    deleteCategory(id);
  };

  if (!categoryData) {
    return <p>Loading Categories...</p>; // Display loading state while fetching categories data.
  }

  return (
    <div className="">
      <PSForm onSubmit={onSubmit}>
        <PSInput label="Category" name="name" />
        {postCategoryPending ? (
          <Button
            isLoading
            className="my-3 w-full bg-default-900 border-2 text-default"
            size="lg"
          >
            Loading
          </Button>
        ) : (
          <Button
            className="my-3 w-full bg-default-900 border-2 text-default"
            size="lg"
            startContent={<AddIcon />}
            type="submit"
          >
            Add Category
          </Button>
        )}
      </PSForm>
      <div className="my-2 p-2">
        <h3 className="text-3xl text-center mb-4">See All Categories</h3>
        <div className="grid grid-cols-2 bg-slate-400 p-2 rounded-lg my-2 text-center">
          <p>Category</p>
          <p>Action</p>
        </div>
        <div className="">
          {categoryData.data.map(
            (c: { _id: string; name: string }, index: number) => (
              <div
                key={index + 1}
                className="bg-slate-200 p-2 rounded-lg my-2 text-black grid grid-cols-2 text-center"
              >
                <p>{c.name}</p>
                <p>
                  {deleteteCategoryPending ? (
                    <Button isLoading className="bg-transparent" size="lg">
                      Loading
                    </Button>
                  ) : (
                    <Button
                      isIconOnly
                      className="bg-transparent"
                      size="lg"
                      startContent={<TrashIcon />}
                      type="submit"
                      onClick={() => handleDeleteCategory(c._id)}
                    />
                  )}
                </p>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
