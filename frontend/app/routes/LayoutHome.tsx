import Header from "~/components/ui/Header";
import { Outlet } from "react-router";

export default function LayoutHome() {
  return (
    <main>
      <div className="h-screen">
        <Header />
        <div className="h-[92vh]">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
