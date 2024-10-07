"use client";

import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          Oops! The page you&apos;re looking for doesn&lsquo;t exist or has been
          moved.
        </p>
        <button
          onClick={handleGoHome}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
