"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { Button } from "@nextui-org/button";
import { usePathname, useRouter } from "next/navigation";
import { Tooltip } from "@nextui-org/tooltip";

import NavbarDropdown from "./NavbarDropdown";

import { LoginIcon, Logo, LogOutIcon } from "@/src/components/icons";
import { ThemeSwitch } from "@/src/components/UI/theme-switch";
import { siteConfig } from "@/src/config/site";
import { useUser } from "@/src/context/user.provider";
import { logout } from "@/src/services/AuthServices";
import { protectedRoutes } from "@/src/constants";

export const Navbar = () => {
  const { user, setIsLoading: userLoading } = useUser();
  const router = useRouter();

  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    userLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo size={36} />
            <p className="font-bold text-inherit">PlateShare</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        {user?.email ? (
          <NavbarItem className="hidden sm:flex gap-2">
            <NavbarDropdown />
            <Tooltip content="Logout" placement="bottom">
              <Button isIconOnly color="danger" onClick={() => handleLogout()}>
                <LogOutIcon />
              </Button>
            </Tooltip>
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden sm:flex gap-2">
            <Button
              className="bg-gradient-to-tr from-blue-500 to-slate-700 text-white shadow-lg"
              startContent={<LoginIcon />}
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col items-center gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarMenuItem>
          ))}
        </div>
        <div className="mx-4 mt-2 flex flex-col items-center gap-2">
          {user?.email ? (
            <NavbarItem className="flex flex-col gap-2">
              <NavbarDropdown />
              <Tooltip content="Logout" placement="bottom">
                <Button
                  isIconOnly
                  color="danger"
                  onClick={() => handleLogout()}
                >
                  <LogOutIcon />
                </Button>
              </Tooltip>
            </NavbarItem>
          ) : (
            <NavbarItem className="flex gap-2">
              <Button
                className="bg-gradient-to-tr from-blue-500 to-slate-700 text-white shadow-lg"
                startContent={<LoginIcon />}
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            </NavbarItem>
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
