import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IUser {
  _id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  mobileNumber: string;
  profilePhoto: string;
  followers?: string[];
  followings?: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
}

export type TRecipe = {
  _id: string;
  images?: string[];
  name: string;
  category: string;
  cookingTime: string;
  description: string;
  ingredients: string[];
  premium: string;
  email: string;
  isDeleted?: boolean;
  upvotes?: string[];
  downvotes?: string[];
};
