"use client";
import PeopleCard from "@/src/components/card/peopleCard";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useGetUsers } from "@/src/hooks/users.hook";
import { IUser } from "@/src/types";
import { useRouter } from "next/navigation";

const FollowPeoplePage = () => {
  const { data: peopleData, isLoading, isPending } = useGetUsers();

  const router = useRouter();

  const { user } = useUser();

  if (isLoading || isPending) {
    return <Loading />;
  }

  if (!user) {
    return router.push("/login");
  }

  if (!peopleData) {
    return <div>There is no people to follow.</div>;
  }

  return (
    <div className="grid sm:grid-cols-3 gap-3 py-8">
      {peopleData?.data?.map((people: IUser) => (
        <PeopleCard key={people._id} people={people} user={user as IUser} />
      ))}
    </div>
  );
};

export default FollowPeoplePage;
