import { Button } from "@nextui-org/button";
import Image from "next/image";
const Landing = () => {
  return (
    <div className="max-w-7xl mx-auto p-8 space-y-12">
      {/* Hero Section */}
      <div className="relative h-96 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg">
        <h1 className="text-5xl font-extrabold text-white text-center">
          Discover, Share, and Savor Delicious Recipes!
        </h1>
        <Button className="absolute bottom-8" color="primary" size="lg">
          Get Started
        </Button>
      </div>

      {/* Featured Recipes Section */}
      <div>
        <h2 className="text-4xl font-semibold mb-4 text-center">
          Featured Recipes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Recipe Cards */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={`/recipes/recipe${index + 1}.jpg`} // Placeholder for recipe images
                alt={`Recipe ${index + 1}`}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">Recipe {index + 1}</h3>
                <p className="text-gray-600">
                  Short description of the recipe goes here.
                </p>
                <Button className="mt-2" size="sm" color="secondary">
                  View Recipe
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-semibold mb-4 text-center">
          How It Works
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">1. Sign Up</h3>
            <p className="text-gray-600">
              Create an account to join our community and start sharing your
              favorite recipes.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">2. Browse Recipes</h3>
            <p className="text-gray-600">
              Discover a wide range of recipes from fellow food enthusiasts.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">3. Share Your Creations</h3>
            <p className="text-gray-600">
              Upload your own recipes and connect with others who share your
              passion for cooking.
            </p>
          </div>
        </div>
      </div>

      {/* Community Highlights Section */}
      <div>
        <h2 className="text-4xl font-semibold mb-4 text-center">
          Community Highlights
        </h2>
        <div className="text-center space-y-4">
          <p className="text-lg text-gray-600">
            "PlateShare has transformed the way I cook and share my recipes!" -
            User Testimonial
          </p>
          <p className="text-lg text-gray-600">
            "I love discovering new dishes and connecting with other
            foodlovers!" - User Testimonial
          </p>
        </div>
      </div>

      {/* Newsletter Signup Section */}
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-center">
        <h3 className="text-3xl font-semibold mb-4">Join Our Newsletter</h3>
        <p className="text-lg text-gray-600 mb-4">
          Subscribe for the latest recipes, cooking tips, and community news.
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          className="p-2 border border-gray-300 rounded-lg mr-2"
        />
        <Button color="primary" size="lg">
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default Landing;
