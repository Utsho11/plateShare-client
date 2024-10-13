"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Image } from "@nextui-org/image";

import { EditIcon } from "../../icons";
import Loading from "../Loading";

import { SidebarOptions } from "./SidebarOptions";
import { adminLinks, userLinks } from "./constants";

import { useUser } from "@/src/context/user.provider";
import { IUser } from "@/src/types";
import { useGetUsers } from "@/src/hooks/users.hook";

const Sidebar = () => {
  const { user } = useUser();

  const { data: userData, isLoading } = useGetUsers();

  // Check if data is still loading
  if (isLoading || !userData || !user) {
    return <Loading />;
  }

  const currentUser = userData?.data?.filter((u: IUser) => u._id === user._id);

  return (
    <div>
      <div className="rounded-xl bg-[#170F21] p-2">
        <div className="h-full w-full rounded-md">
          <Image
            alt="item"
            className="object-cover object-center rounded-md"
            src={currentUser[0]?.profilePhoto as string}
          />
        </div>
        <div className="my-3 text-white">
          <h1 className="text-2xl font-semibold">{currentUser[0]?.name}</h1>
          <p className="break-words text-sm">{currentUser[0]?.email}</p>
        </div>
        {currentUser[0]?.role === "ADMIN" ? (
          <Button
            as={Link}
            className="mt-2 w-full rounded-md"
            href={"/admin/edit-admin"}
          >
            <EditIcon /> Edit Profile
          </Button>
        ) : (
          <Button
            as={Link}
            className="mt-2 w-full rounded-md"
            href={"/profile/edit-profile"}
          >
            <EditIcon /> Edit Profile
          </Button>
        )}
      </div>
      <div className="mt-3 space-y-2 rounded-xl bg-default-100 p-2">
        <SidebarOptions
          links={currentUser[0]?.role === "ADMIN" ? adminLinks : userLinks}
        />
      </div>
    </div>
  );
};

export default Sidebar;
