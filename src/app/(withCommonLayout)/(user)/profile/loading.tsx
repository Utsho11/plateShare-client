"use client";

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500 border-solid border-transparent" />
        <p className="text-gray-700 text-lg font-medium">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
