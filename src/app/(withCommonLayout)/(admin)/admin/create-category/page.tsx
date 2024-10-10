"use client";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";

import PSForm from "@/src/components/form/PSForm";
import PSInput from "@/src/components/form/PSInput";
import { AddIcon } from "@/src/components/icons";
import { usePostCategory } from "@/src/hooks/categories.hook";

const CreateCategory = () => {
  const { mutate: handlePostCategory, isPending } = usePostCategory();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // handle form submission

    handlePostCategory(data);
  };

  return (
    <div className="">
      <PSForm onSubmit={onSubmit}>
        <PSInput label="Category" name="name" />
        {isPending ? (
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
    </div>
  );
};

export default CreateCategory;
