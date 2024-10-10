"use client";

import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";

import { adminLinks, userLinks } from "./Sidebar/constants";

import { useUser } from "@/src/context/user.provider";

export default function NavbarDropdown() {
  const router = useRouter();

  const { user } = useUser();

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          className="cursor-pointer"
          name={user?.name}
          src={user?.profilePhoto}
        />
      </DropdownTrigger>
      {user?.role === "ADMIN" ? (
        <DropdownMenu aria-label="Static Actions">
          {adminLinks.map((link, index) => (
            <DropdownItem
              key={index + 1}
              onClick={() => handleNavigation(link.href)}
            >
              {link.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      ) : (
        <DropdownMenu aria-label="Static Actions">
          {userLinks.map((link, index) => (
            <DropdownItem
              key={index + 1}
              onClick={() => handleNavigation(link.href)}
            >
              {link.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </Dropdown>
  );
}

/**
 * <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            onClick={() => handleLogout()}
          >
            Logout
          </DropdownItem>
 * */
