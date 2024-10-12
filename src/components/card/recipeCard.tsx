"use client";
import { useState } from "react";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { Chip } from "@nextui-org/chip";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { toast } from "sonner";

import { ClockIcon, DownvoteIcon, RateIcon, UpvoteIcon } from "../icons";

import { TRecipe } from "@/src/types";
import {
  useAddRating,
  useGetRating,
  useSetVote,
} from "@/src/hooks/recipe.hook";
import { useUser } from "@/src/context/user.provider";

export interface TRating {
  recipeId: string;
  recipeName: string;
  averageRating: number;
  totalRatings: number;
}

const RecipeCard = ({ recipe }: { recipe: TRecipe }) => {
  const { data: ratingData } = useGetRating();

  const router = useRouter();
  const { mutate: setVote } = useSetVote();
  const { mutate: addRating } = useAddRating();
  const { user } = useUser();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [rating, setRating] = useState(0); // State to store the user's rating

  let averageRating;

  if (ratingData) {
    const avgRating = ratingData?.data.filter(
      (Item: TRating) => Item.recipeId === recipe._id
    );

    averageRating = avgRating[0].averageRating;
  }

  const handleRatingSubmit = () => {
    const ratingData = {
      rating: rating,
      recipeId: recipe._id,
    };

    user && addRating(ratingData);

    onOpenChange(); // Close the modal after rating submission
  };

  if (!user && !recipe) {
    return <p>Loading...</p>;
  }
  if (!ratingData) {
    return <p>Loading...</p>;
  }

  const handleRecipe = (id: string) => {
    if (user && user.email) {
      if (recipe.recipeType === "FREE") {
        router.push(`/all-recipe/${id}`);
      } else if (recipe.recipeType === "PREMIUM" && user?.role === "PREMIUM") {
        router.push(`/all-recipe/${id}`);
      } else {
        toast.error("Only Premium Users can access this recipe!");
      }
    } else {
      toast.error("Please login to see the details!");
      router.push("/login");
    }
  };

  const handleVote = (id: string, vote: string) => {
    if (!user) {
      toast.warning("Login First!");
      router.push("/login");
    }
    const data = {
      voteType: vote,
      recipeId: id,
    };

    user && setVote(data);
  };

  return (
    <div className="p-2 h-full w-full bg-gray-400 rounded-lg backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-400">
      <Image
        alt={recipe.name}
        className="h-40 overflow-hidden rounded text-white"
        height={200}
        src={recipe.images![0]}
        width="100%"
      />
      <div className="mt-4">
        <h3 className="text-xl font-bold">{recipe.name}</h3>
        <p className="text-sm">{recipe.category}</p>
      </div>
      <div className="my-4">
        <div className="flex justify-between items-center my-4">
          <div className="flex gap-3">
            <ClockIcon />
            <p>
              {recipe.cookingTime &&
                `${parseInt(recipe.cookingTime.split(":")[0]) > 0 ? `${recipe.cookingTime.split(":")[0]}h ` : ""}${
                  recipe.cookingTime.split(":")[1]
                }min`}
            </p>
          </div>
          <div className="">
            {recipe.recipeType === "PREMIUM" ? (
              <Chip color="warning">Premium</Chip>
            ) : (
              <Chip color="primary">Free</Chip>
            )}
          </div>
        </div>
        <hr />
        <div className="flex gap-6 items-center justify-between my-4">
          <div className=" flex flex-col items-center align-middle gap-1">
            <p className="">{recipe.upvotes?.length} Like</p>
            <Button
              isIconOnly
              className="bg-transparent "
              onClick={() => handleVote(recipe._id, "upvotes")}
            >
              <UpvoteIcon
                isFilled={recipe.upvotes?.includes(user?.email ?? "")}
                size={20}
              />
            </Button>
          </div>
          <div className="flex flex-col items-center align-middle gap-1">
            <p className="">Ratings: {averageRating}</p>
            <Button
              isIconOnly
              className="flex items-center gap-2 bg-transparent"
              onPress={onOpen}
            >
              <RateIcon
                isFilled={recipe.downvotes?.includes(user?.email ?? "")}
                size={20}
              />
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Submit Your Rating
                    </ModalHeader>

                    <ModalBody>
                      <p>Select a rating:</p>
                      <div className="flex justify-center gap-2 my-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <RateIcon
                            key={star}
                            isFilled={star <= rating}
                            size={30}
                            onClick={() => setRating(star)} // Set the rating on icon click
                          />
                        ))}
                      </div>

                      <p className="text-gray-500">
                        Your rating helps others to choose better!
                      </p>
                    </ModalBody>

                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Cancel
                      </Button>
                      <Button
                        color="primary"
                        disabled={rating === 0} // Disable if no rating is selected
                        onPress={handleRatingSubmit}
                      >
                        Submit
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
          <div className="flex flex-col items-center align-middle gap-1">
            <p className="">{recipe.downvotes?.length} DisLike</p>
            <Button
              isIconOnly
              className="flex items-center gap-2 bg-transparent"
              onClick={() => handleVote(recipe._id, "downvotes")}
            >
              <DownvoteIcon
                isFilled={recipe.downvotes?.includes(user?.email ?? "")}
                size={20}
              />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <Button
          className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          color="primary"
          variant="solid"
          onClick={() => {
            handleRecipe(recipe._id);
          }}
        >
          View Recipe
        </Button>
      </div>
    </div>
  );
};

export default RecipeCard;
