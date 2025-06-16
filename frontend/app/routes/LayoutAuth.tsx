import { Logo } from "~/components/ui/Logo";
import { Outlet } from "react-router";
import AuthTabs from "~/components/ui/AuthTabs";

const LayoutAuth = () => {
  return (
    <main className="flex h-screen w-screen">
      <div className="flex-1 bg-white flex justify-center items-center">
        <Logo />
      </div>
      <div className="flex-1 bg-[#A9D3C5] flex flex-col justify-center items-center gap-4 p-4">
        <main>
          <AuthTabs />
          <Outlet />
        </main>
      </div>
    </main>
  );
};

export default LayoutAuth;
