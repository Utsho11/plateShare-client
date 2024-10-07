"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error); // Log the error to an error reporting service
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700">
      <div className="bg-white p-10 rounded-lg shadow-lg flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-2">
          Oops! Something went wrong!
        </h2>
        <p className="text-center mb-4">
          We encountered an unexpected error. Please try again later or contact
          support if the issue persists.
        </p>
        <button
          onClick={() => reset()}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
