"use client";
import { useRouter } from "next/navigation";

import PeopleCard from "@/src/components/card/peopleCard";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useGetUsers } from "@/src/hooks/users.hook";
import { IUser } from "@/src/types";

const FollowPeoplePage = () => {
  const { data: peopleData, isLoading, isPending } = useGetUsers();
  const router = useRouter();
  const { user } = useUser();

  if (!peopleData) {
    return <div>There is no people to follow.</div>;
  }

  const filterPeople = peopleData?.data?.filter(
    (user: IUser) => user.status === "ACTIVE"
  );

  if (isLoading || isPending) {
    return <Loading />;
  }

  if (!user) {
    return router.push("/login");
  }

  return (
    <div className="grid sm:grid-cols-3 gap-3 py-8">
      {filterPeople?.map((people: IUser) => (
        <PeopleCard key={people._id} people={people} user={user as IUser} />
      ))}
    </div>
  );
};

export default FollowPeoplePage;
