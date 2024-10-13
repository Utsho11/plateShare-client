import { Button } from "@nextui-org/button";
import Image from "next/image";

import person1 from "../../../assests/person/User1.jpeg";
import person2 from "../../../assests/person/User2.jpeg";
import person3 from "../../../assests/person/User3.jpeg";

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-12">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-4">
          Welcome to PlateShare
        </h1>
        <p className="text-md sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
          PlateShare is a vibrant online community where passionate home cooks,
          professional chefs, and food lovers come together to share their love
          of food. Whether you’re a novice or a seasoned cook, PlateShare is the
          place to discover and share amazing recipes from around the world.
        </p>
      </div>

      {/* Mission Section */}
      <div className="text-center bg-gradient-to-r from-pink-50 to-purple-50 p-8 sm:p-10 rounded-xl shadow-lg">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-4">Our Mission</h2>
        <p className="text-md sm:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
          At PlateShare, our mission is to build a community where food
          enthusiasts can easily discover new recipes, share their culinary
          creations, and learn from others. We believe in the power of food to
          bring people together, and we aim to foster a space for creativity,
          education, and delicious exploration.
        </p>
      </div>

      {/* Team Section */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-green-50 p-8 sm:p-10 rounded-xl shadow-lg">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
          Meet Our Team
        </h2>
        <p className="text-md sm:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
          PlateShare is brought to you by a diverse team of food lovers,
          developers, and creatives who are committed to providing a platform
          that helps you explore new flavors and techniques. We are passionate
          about food, technology, and making the culinary world more accessible
          to everyone.
        </p>
      </div>

      {/* Team Images with Names */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
        <div className="flex flex-col items-center hover:scale-105 transition-transform">
          <Image
            alt="Team Member 1"
            className="rounded-xl shadow-md object-cover"
            height={300}
            src={person1}
            width={300}
          />
          <h3 className="mt-2 text-lg font-semibold">Alice Johnson</h3>
        </div>
        <div className="flex flex-col items-center hover:scale-105 transition-transform">
          <Image
            alt="Team Member 2"
            className="rounded-xl shadow-md object-cover"
            height={300}
            src={person2}
            width={300}
          />
          <h3 className="mt-2 text-lg font-semibold">Bob Smith</h3>
        </div>
        <div className="flex flex-col items-center hover:scale-105 transition-transform">
          <Image
            alt="Team Member 3"
            className="rounded-xl shadow-md object-cover"
            height={300}
            src={person3}
            width={300}
          />
          <h3 className="mt-2 text-lg font-semibold">Merry Davis</h3>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="text-center bg-gradient-to-r from-yellow-50 to-red-50 p-8 sm:p-10 rounded-xl shadow-lg">
        <h3 className="text-3xl sm:text-4xl font-semibold mb-4">
          Join Us on Our Culinary Journey!
        </h3>
        <p className="text-md sm:text-lg text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
          Whether you’re here to discover recipes, share your creations, or
          connect with other foodies, PlateShare is excited to have you. Join us
          and be a part of a community that celebrates the joy of cooking and
          eating together.
        </p>
        <Button
          className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600"
          color="primary"
          size="lg"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default AboutPage;
