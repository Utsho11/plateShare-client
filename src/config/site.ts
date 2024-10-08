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
      href: "/all-recipe",
    },
    {
      label: "Follow People",
      href: "/follow-people",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact us",
      href: "/contact",
    },
  ],
};
