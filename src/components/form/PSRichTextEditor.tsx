"use client";

import "react-quill/dist/quill.snow.css";
import { Controller, useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface IProps {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  errorMessage?: string;
}

export default function PSRichTextEditor({
  label,
  name,
  required = false,
  placeholder = "",
}: IProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="my-3 h-[16rem]">
      <label className="font-semibold mb-5 text-lg">{label}:</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <ReactQuill
            className={errors[name] ? "border-red-500" : ""}
            placeholder={placeholder}
            style={{ height: "10rem" }}
            theme="snow"
            value={field.value || ""}
            onBlur={field.onBlur}
            onChange={field.onChange}
          />
        )}
        rules={{ required: required ? `${label} is required` : false }}
      />
      {errors[name] && (
        <p className="text-red-500">{errors[name]?.message as string}</p>
      )}
    </div>
  );
}
