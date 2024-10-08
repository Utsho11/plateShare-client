"use client";

import { Input } from "@nextui-org/input";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface IProps {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  endContent?: ReactNode;
  startContent?: ReactNode;
}

export default function PSInput({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
  endContent,
  startContent,
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Input
      {...register(name)}
      endContent={endContent}
      errorMessage={(errors[name]?.message as string) || ""}
      isInvalid={!!errors[name]}
      label={label}
      required={required}
      size={size}
      startContent={startContent}
      type={type}
      variant={variant}
    />
  );
}
