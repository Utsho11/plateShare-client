"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-700">
      <div className="bg-white p-10 rounded-lg shadow-lg flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-2">
          Oops! Something went wrong!
        </h2>
        <p className="text-center mb-4">
          We encountered an unexpected error. Please try again later or contact
          support if the issue persists.
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition-colors"
          onClick={() => reset()}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
