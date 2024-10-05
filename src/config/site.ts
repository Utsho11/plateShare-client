export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "PlateShare",
  description: "Share your repicies and found your recipies.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "All Recipies",
      href: "/all-recipies",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  dropdownMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Settings",
      href: "/profile/setting",
    },
    {
      label: " Create Post",
      href: "/profile/create-post",
    },
  ],
};
