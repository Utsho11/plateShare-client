import { ReactNode } from "react";

const Layout = ({
  children,
}: {
  children: ReactNode;
  recentPosts: ReactNode;
}) => {
  return <>{children}</>;
};

export default Layout;
