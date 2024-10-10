"use client";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { useUserLogin } from "@/src/hooks/auth.hook";
import PSForm from "@/src/components/form/PSForm";
import PSInput from "@/src/components/form/PSInput";
import loginValidationSchema from "@/src/schema/login.schema";
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  LoginIcon,
  Logo,
} from "@/src/components/icons";
import { useUser } from "@/src/context/user.provider";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const redirect = searchParams.get("redirect");

  const {
    mutate: handleUserLogin,
    isPending,
    isSuccess,
    data: userLoginResponse,
  } = useUserLogin();

  useEffect(() => {
    if (userLoginResponse && !userLoginResponse.success) {
      toast.error(userLoginResponse.message);
    }
  }, [userLoginResponse]);

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
      <div className="flex h-[calc(100vh-100px)] w-full flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <Logo />
          <h3 className="my-2 text-2xl font-bold">Login with PlateShare</h3>
        </div>
        <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
        <div className="w-[22rem]">
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
                startContent={<LoginIcon />}
                type="submit"
              >
                Login
              </Button>
            )}
          </PSForm>
          <div className="text-center">
            Don&lsquo;t have account ?{" "}
            <Link
              className="hover:text-primary-500 underline"
              href={"/register"}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
