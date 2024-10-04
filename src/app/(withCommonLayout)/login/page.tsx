"use client";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useUserLogin } from "@/src/hooks/auth.hook";
import PSForm from "@/src/componsnts/form/PSForm";
import PSInput from "@/src/componsnts/form/PSInput";
import loginValidationSchema from "@/src/schema/login.schema";
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  UserIcon,
} from "@/src/componsnts/icons";
import { useUser } from "@/src/context/user.provider";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const redirect = searchParams.get("redirect");

  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);

  return (
    <>
      {/* {isPending && <Loading />} */}
      <div
        className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center"
        style={{ padding: "7rem 0" }}
      >
        <h3 className="my-2 text-2xl font-bold">Login with PlateShare</h3>
        <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
        <div style={{ width: "25rem" }}>
          <PSForm
            resolver={zodResolver(loginValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <PSInput label="Email" name="email" type="email" />
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
                type={isVisible ? "text" : "password"}
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
                startContent={<UserIcon />}
                type="submit"
              >
                Login
              </Button>
            )}
          </PSForm>
          <div className="text-center" style={{ margin: "3rem" }}>
            Don&lsquo;t have account ? <Link href={"/register"}>Register</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
