"use client";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { useEffect, useState } from "react";

import { IUser } from "@/src/types";
import { useAddFollower } from "@/src/hooks/users.hook";

const PeopleCard = ({ people, user }: { people: IUser; user: IUser }) => {
  const [isFollowed, setIsFollowed] = useState(false);

  const { mutate: handleFollower, isPending, isSuccess } = useAddFollower();

  useEffect(() => {
    // Check if the logged-in user is already following this person
    if (people.followers?.includes(user?._id as string)) {
      setIsFollowed(true);
    }
  }, [people.followers, user?._id]);

  const handleFollow = (id: string) => {
    let actionType;

    if (isFollowed) {
      actionType = "unfollow";
    } else {
      actionType = "follow";
    }

    const follwerData = {
      actionType: actionType,
      id: id,
    };

    handleFollower(follwerData);

    setIsFollowed((prevState) => !prevState);
  };

  return (
    <>
      {people._id === user._id ? (
        ""
      ) : (
        <Card className="max-w-full">
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src={people.profilePhoto}
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  {people.name}
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  @{people.name}
                </h5>
              </div>
            </div>
            <Button
              className={
                isFollowed
                  ? "bg-transparent text-foreground border-default-200"
                  : ""
              }
              color="primary"
              radius="full"
              size="sm"
              variant={isFollowed ? "bordered" : "solid"}
              onClick={() => handleFollow(people._id as string)}
            >
              {isFollowed ? "Unfollow" : "Follow"}
            </Button>
          </CardHeader>
          <CardBody className="px-3 py-0 text-small text-default-400">
            <p>
              Frontend developer and UI/UX enthusiast. Join me on this coding
              adventure!
            </p>
            <span className="pt-2">
              #FrontendWithZoey
              <span aria-label="computer" className="py-2" role="img">
                💻
              </span>
            </span>
          </CardBody>
          <CardFooter className="gap-5">
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">
                {people.followings?.length}
              </p>
              <p className=" text-default-400 text-small">Followings</p>
            </div>
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">
                {people.followers?.length}
              </p>
              <p className="text-default-400 text-small">Followers</p>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default PeopleCard;
