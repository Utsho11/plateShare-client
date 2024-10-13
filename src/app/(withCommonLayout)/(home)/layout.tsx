import { ReactNode } from "react";

const Layout = ({
  children,
  testimonials,
  landing,
  footer,
}: {
  children: ReactNode;
  testimonials: ReactNode;
  landing: ReactNode;
  footer: ReactNode; // Assuming this is a footer component. Replace with actual component name if different.
}) => {
  return (
    <>
      {landing}
      {children}
      {testimonials}
      {footer}
    </>
  );
};

export default Layout;
