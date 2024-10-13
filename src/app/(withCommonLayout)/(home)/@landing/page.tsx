"use client";

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

const Landing = () => {
  const router = useRouter();

  return (
    <div
      className="relative text-center h-96 flex items-center justify-center bg-cover bg-center rounded-lg"
      style={{
        backgroundImage:
          'url("https://www.shutterstock.com/image-photo/raw-ingredients-readymade-pizza-on-260nw-1926054275.jpg")',
      }}
    >
      {/* Overlay to adjust contrast */}
      <div className="absolute inset-0 bg-black opacity-50 rounded-lg" />

      <h1 className="text-5xl font-extrabold text-white z-10">
        Discover, Share, and Savor Delicious Recipes!
      </h1>
      <Button
        className="absolute bottom-8 z-10"
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
