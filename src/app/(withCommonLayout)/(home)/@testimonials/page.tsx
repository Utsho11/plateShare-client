import Image from "next/image";

import person1 from "../../../../assests/person/User1.jpeg";
import person2 from "../../../../assests/person/User2.jpeg";
import person3 from "../../../../assests/person/User3.jpeg";

const Testimonials = () => {
  return (
    <div>
      <h2 className="text-4xl font-semibold mb-8 text-center">
        Community Highlights
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {/* Testimonial 1 */}
        <div
          className="
h-full w-full bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10 border border-gray-100 shadow-md p-6 max-w-sm text-center"
        >
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden mx-auto mb-4">
            <Image
              alt="Person 3"
              className="object-cover w-full h-full"
              height={100}
              src={person1}
              width={100}
            />
          </div>

          <p className="text-lg text-gray-600 italic mb-4">
            &quot;PlateShare has transformed the way I cook and share my
            recipes!&quot;
          </p>
          <p className="font-semibold text-gray-400">- User Testimonial</p>
        </div>

        {/* Testimonial 2 */}
        <div
          className="
h-full w-full bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10 border border-gray-100 shadow-md p-6 max-w-sm text-center"
        >
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden mx-auto mb-4">
            <Image
              alt="Person 3"
              className="object-cover w-full h-full"
              height={100}
              src={person2}
              width={100}
            />
          </div>

          <p className="text-lg text-gray-600 italic mb-4">
            &quot;I love discovering new dishes and connecting with other food
            lovers!&quot;
          </p>
          <p className="font-semibold text-gray-400">- User Testimonial</p>
        </div>

        {/* Testimonial 3 */}
        <div
          className="
h-full w-full bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10 border border-gray-100 shadow-md p-6 max-w-sm text-center"
        >
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden mx-auto mb-4">
            <Image
              alt="Person 3"
              className="object-cover w-full h-full"
              height={100}
              src={person3}
              width={100}
            />
          </div>

          <p className="text-lg text-gray-600 italic mb-4">
            &quot;The community is amazing! I’ve learned so much and found my
            go-to meals.&quot;
          </p>
          <p className="font-semibold text-gray-400">- User Testimonial</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
