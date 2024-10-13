"use client";

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

const Landing = () => {
  const router = useRouter();

  return (
    <div className="relative text-center h-96 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg">
      <h1 className="text-5xl font-extrabold text-white text-center">
        Discover, Share, and Savor Delicious Recipes!
      </h1>
      <Button
        className="absolute bottom-8"
        color="primary"
        size="lg"
        onClick={() => router.push(`/all-recipe`)}
      >
        Get Started
      </Button>
    </div>
  );
};

export default Landing;
