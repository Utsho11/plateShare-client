"use client";
import { UserTable } from "@/src/components/table/UserTable";
import Loading from "@/src/components/UI/Loading";
import { useGetUsers } from "@/src/hooks/users.hook";
import { IUser } from "@/src/types";

const UserManagementPage = () => {
  const { data: user, isPending } = useGetUsers();

  if (isPending) {
    return <Loading />;
  }

  if (!user.data) {
    return <p>No users found</p>;
  }

  return <UserTable users={user?.data as IUser[]} />;
  //   return <p>Usr</p>;
};

export default UserManagementPage;
