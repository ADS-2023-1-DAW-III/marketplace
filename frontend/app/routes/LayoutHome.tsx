import Header from "~/components/ui/Header";
import {Outlet} from "react-router";

export default function LayoutHome() {
  return (
    <main>
      <div className="bg-[#307B8E]">
          <Header />
          <Outlet />
      </div>
    </main>
);
}
