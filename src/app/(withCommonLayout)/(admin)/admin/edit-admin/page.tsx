"use client";

import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { ChangeEvent, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import NextImage from "next/image";

import { IUser } from "@/src/types";
import PSForm from "@/src/components/form/PSForm";
import PSInput from "@/src/components/form/PSInput";
import { SaveIcon } from "@/src/components/icons";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useGetUsers, useUserUpdation } from "@/src/hooks/users.hook";

const EditAdminProfile = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);

  const { user } = useUser();
  const { mutate: handleUpdateProfile, isPending } = useUserUpdation(
    user?._id as string,
  );

  const { data: userData, isLoading } = useGetUsers();

  const currentUser = userData?.data?.filter(
    (u: IUser) => user && u._id === user._id,
  );

  //   useEffect(() => {
  //     if (isPending) {
  //       // Handle Loading satate
  //     }
  //   }, [isPending]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));

    for (let image of imageFiles) {
      formData.append("profilePhoto", image);
    }

    handleUpdateProfile(formData);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFiles([file]);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews([reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  // Check if data is still loading
  if (isLoading || !userData || !user) {
    return <Loading />;
  }

  return (
    <div className="">
      <div className="flex h-[100vh-100px] flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <h3 className="my-2 text-3xl font-bold">Update Admin Profile</h3>
        </div>
        <p className="mb-4">A social platform for recipe sharing.</p>
        <div className="w-[22rem]">
          {user && (
            <PSForm
              defaultValues={{
                name: currentUser[0]?.name,
                age: currentUser[0]?.age,
                location: currentUser[0]?.location,
                mobileNumber: currentUser[0]?.mobileNumber,
              }}
              onSubmit={onSubmit}
            >
              <div className="py-3">
                <PSInput label="Name" name="name" size="sm" />
              </div>

              <div className="py-3">
                <PSInput label="Age" name="age" size="sm" />
              </div>
              <div className="py-3">
                <PSInput label="Location" name="location" size="sm" />
              </div>
              <div className="py-3">
                <PSInput label="Mobile Number" name="mobileNumber" size="sm" />
              </div>
              {imagePreviews.length > 0 && (
                <div className="flex gap-5 my-5 flex-wrap">
                  {imagePreviews.map((imageDataUrl) => (
                    <div
                      key={imageDataUrl}
                      className="relative size-54 rounded-xl border-2 border-dashed border-default-300 p-2"
                    >
                      <Image
                        isZoomed
                        alt="item"
                        as={NextImage}
                        className="object-cover object-center rounded-md"
                        height={140}
                        src={imageDataUrl}
                        width={140}
                      />
                    </div>
                  ))}
                </div>
              )}
              <div className="py-4">
                <label
                  className="flex h-12 w-full cursor-pointer items-center justify-center border-2 border-default-200 rounded-lg text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                  htmlFor="image"
                >
                  Update Profile Photo
                </label>
                <input
                  className="hidden"
                  id="image"
                  type="file"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
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
                  startContent={<SaveIcon />}
                  type="submit"
                >
                  Update Admin
                </Button>
              )}
            </PSForm>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditAdminProfile;
