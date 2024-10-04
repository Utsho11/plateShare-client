"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import NextImage from "next/image";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { ChangeEvent, useState } from "react";

import registerValidationSchema from "@/src/schema/register.schema";
import PSForm from "@/src/componsnts/form/PSForm";
import PSInput from "@/src/componsnts/form/PSInput";
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  UserRoundPlus,
} from "@/src/componsnts/icons";
import { useUserRegistration } from "@/src/hooks/auth.hook";

export default function RegisterPage() {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { mutate: handleUserRegistration, isPending } = useUserRegistration();

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
    handleUserRegistration(formData);
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

  // if (isPending) {
  //   //  handle loading state
  // }

  return (
    <div
      className="flex h-[100vh-100px] flex-col items-center justify-center"
      style={{ padding: "5rem 0" }}
    >
      <h3 className="my-2 text-xl font-bold">Register with PlateShare</h3>
      <p className="mb-4">A social platform for recipe sharing.</p>
      <div style={{ width: "20rem" }}>
        <PSForm
          //! Only for development
          defaultValues={{
            name: "Utsho Roy",
            email: "roy@gmail.com",
            mobileNumber: "01711223344",
            password: "123456",
          }}
          resolver={zodResolver(registerValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="py-3">
            <PSInput label="Name" name="name" size="sm" />
          </div>
          <div className="py-3">
            <PSInput label="Email" name="email" size="sm" />
          </div>
          <div className="py-3">
            <PSInput label="Mobile Number" name="mobileNumber" size="sm" />
          </div>
          <div className="py-3">
            <PSInput
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
                </button>
              }
              label="Password"
              name="password"
              size="sm"
              type={isVisible ? "text" : "password"}
            />
          </div>
          {imagePreviews.length > 0 && (
            <div className="flex gap-5 my-5 flex-wrap">
              {imagePreviews.map((imageDataUrl) => (
                <div
                  key={imageDataUrl}
                  className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
                >
                  <Image
                    alt="item"
                    as={NextImage}
                    className="object-cover object-center rounded-md"
                    height={200}
                    src={imageDataUrl}
                    width={300}
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
              Upload Profile Photo
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
              startContent={<UserRoundPlus />}
              type="submit"
            >
              Registration
            </Button>
          )}
        </PSForm>
        <div className="text-center" style={{ padding: "2rem 0" }}>
          Already have an account ? <Link href={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
}
