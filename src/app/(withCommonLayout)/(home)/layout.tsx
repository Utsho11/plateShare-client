import { ReactNode } from "react";

const Layout = ({
  children,
  testimonials,
  landing,
}: {
  children: ReactNode;
  testimonials: ReactNode;
  landing: ReactNode;
}) => {
  return (
    <>
      {landing}
      {children}
      {testimonials}
    </>
  );
};

export default Layout;
