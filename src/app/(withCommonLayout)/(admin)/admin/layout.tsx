import { ReactNode } from "react";

import Container from "@/src/componsnts/UI/Container";
import Sidebar from "@/src/componsnts/UI/Sidebar";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <div className="my-3 flex w-full gap-12">
        <div className="hidden md:block w-2/5">
          <Sidebar />
        </div>
        <div className="w-full md:w-4/5">{children}</div>
      </div>
    </Container>
  );
}
