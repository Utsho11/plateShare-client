"use client";

import PeopleCard from "@/src/components/card/peopleCard";
import { useUser } from "@/src/context/user.provider";
import { useGetUsers } from "@/src/hooks/users.hook";
import { IUser } from "@/src/types";

const FollowersPage = () => {
  const { user } = useUser();
  const { data: allUsers } = useGetUsers();

  if (!allUsers) {
    return <p>No user found</p>;
  }
  if (!user) {
    return <p>No user found</p>;
  }
  console.log(allUsers.data);

  const followers: IUser[] = allUsers.data.filter(
    (u: IUser) =>
      u._id !== user._id && u.followings && u.followings.includes(user._id)
  );

  console.log(followers);

  return (
    <div className="grid sm:grid-cols-2 gap-3 py-8">
      {followers?.map((people: IUser) => (
        <PeopleCard key={people._id} people={people} user={user as IUser} />
      ))}
    </div>
  );
};

export default FollowersPage;
