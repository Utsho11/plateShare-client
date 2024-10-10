"use client";
import PeopleCard from "@/src/components/card/peopleCard";
import { useUser } from "@/src/context/user.provider";
import { useGetUsers } from "@/src/hooks/users.hook";
import { IUser } from "@/src/types";

const FollowPeoplePage = () => {
  const { data: peopleData } = useGetUsers();

  const { user } = useUser();

  return (
    <div className="grid sm:grid-cols-3 gap-3 py-8">
      {peopleData?.data?.map((people: IUser) => (
        <PeopleCard key={people._id} people={people} user={user as IUser} />
      ))}
    </div>
  );
};

export default FollowPeoplePage;
