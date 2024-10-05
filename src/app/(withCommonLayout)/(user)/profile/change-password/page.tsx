"use client";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

import PSForm from "@/src/componsnts/form/PSForm";
import PSInput from "@/src/componsnts/form/PSInput";
import { Logo } from "@/src/componsnts/icons";
import { logout } from "@/src/services/AuthServices";
import { useUserChangePassword } from "@/src/hooks/auth.hook";

const Page = () => {
  const { mutate: handleChangePassword, isPending } = useUserChangePassword();
  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleChangePassword(data);
    logout();
    router.push("/login");
  };

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="flex">
            <Logo />
            <p className="font-bold text-inherit">PlateShare</p>
          </div>
          <h3 className="my-2 text-2xl font-bold">Change Your Password</h3>
          <p className="text-sm">
            You have to login after changing the password.
          </p>
        </div>
        <div className="w-[22rem]">
          <PSForm onSubmit={onSubmit}>
            <div className="py-3">
              <PSInput label="Old Password" name="oldPassword" type="text" />
            </div>
            <div className="py-3">
              <PSInput label="New Password" name="newPassword" type="text" />
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
                type="submit"
              >
                Change Password
              </Button>
            )}
          </PSForm>
        </div>
      </div>
    </>
  );
};

export default Page;
