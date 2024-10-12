"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { Image } from "@nextui-org/image";

import { EditIcon } from "../../icons";

import { SidebarOptions } from "./SidebarOptions";
import { adminLinks, userLinks } from "./constants";

import { useUser } from "@/src/context/user.provider";

const Sidebar = () => {
  const { user } = useUser();

  return (
    <div>
      <div className="rounded-xl bg-[#170F21] p-2">
        <div className="h-full w-full rounded-md">
          <Image
            alt="item"
            className="object-cover object-center rounded-md"
            src={user?.profilePhoto as string}
          />
        </div>
        <div className="my-3 text-white">
          <h1 className="text-2xl font-semibold">{user?.name}</h1>
          <p className="break-words text-sm">{user?.email}</p>
        </div>
        {user?.role === "USER" ? (
          <Button
            as={Link}
            className="mt-2 w-full rounded-md"
            href={"/profile/edit-profile"}
          >
            <EditIcon /> Edit Profile
          </Button>
        ) : (
          <Button
            as={Link}
            className="mt-2 w-full rounded-md"
            href={"/admin/edit-admin"}
          >
            <EditIcon /> Edit Profile
          </Button>
        )}
      </div>
      <div className="mt-3 space-y-2 rounded-xl bg-default-100 p-2">
        <SidebarOptions
          links={user?.role === "ADMIN" ? adminLinks : userLinks}
        />
      </div>
    </div>
  );
};

export default Sidebar;
