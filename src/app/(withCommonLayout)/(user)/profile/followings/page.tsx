"use client";
import PeopleCard from "@/src/components/card/peopleCard";
import { useUser } from "@/src/context/user.provider";
import { useGetUsers } from "@/src/hooks/users.hook";
import { IUser } from "@/src/types";

const FollowingPage = () => {
  const { user } = useUser();
  const { data: allUsers } = useGetUsers();

  if (!allUsers) {
    return <p>No user found</p>;
  }
  if (!user) {
    return <p>No user found</p>;
  }

  const followers: IUser[] = allUsers.data.filter(
    (u: IUser) =>
      u._id !== user._id && u.followers && u.followers.includes(user._id),
  );

  return (
    <div className="grid sm:grid-cols-2 gap-3 py-8">
      {followers?.map((people: IUser) => (
        <PeopleCard key={people._id} people={people} user={user as IUser} />
      ))}
    </div>
  );
};

export default FollowingPage;
