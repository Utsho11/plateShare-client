"use client";

import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { usePathname, useRouter } from "next/navigation";

import { logout } from "@/src/services/AuthServices";
import { useUser } from "@/src/context/user.provider";
import { protectedRoutes } from "@/src/constants";
import { adminLinks, userLinks } from "./Sidebar/constants";

export default function NavbarDropdown() {
  const router = useRouter();
  const pathname = usePathname();

  const { user, setIsLoading: userLoading } = useUser();

  const handleLogout = () => {
    logout();
    userLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

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
      {/* {user?.role === "ADMIN" ? (
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem onClick={() => handleNavigation("/admin")}>
            My Profile
          </DropdownItem>
          <DropdownItem
            onClick={() => handleNavigation("/admin/create-category")}
          >
            Post Recipe
          </DropdownItem>
          <DropdownItem
            onClick={() => handleNavigation("/profile/change-password")}
          >
            Change Password
          </DropdownItem>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            onClick={() => handleLogout()}
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      ) : (
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem onClick={() => handleNavigation("/profile")}>
            Profile
          </DropdownItem>
          <DropdownItem
            onClick={() => handleNavigation("/profile/post-recipe")}
          >
            Post Recipe
          </DropdownItem>
          <DropdownItem
            onClick={() => handleNavigation("/profile/change-password")}
          >
            Change Password
          </DropdownItem>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            onClick={() => handleLogout()}
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      )} */}
      {user?.role === "Admin" ? (
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
