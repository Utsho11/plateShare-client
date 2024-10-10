import { Navbar } from "@/src/components/UI/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
