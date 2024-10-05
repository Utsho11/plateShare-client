import { Navbar } from "@/src/componsnts/UI/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
