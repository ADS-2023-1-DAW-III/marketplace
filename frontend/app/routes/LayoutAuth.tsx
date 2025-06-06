import { Logo } from "~/components/ui/Logo";
import { Outlet } from "react-router";
import "../styles/global.css";
import AuthTabs from "~/components/ui/AuthTabs";

const LayoutAuth = () => {
  return (
    <main className="page-container">
      <div className="left">
        <Logo />
      </div>
      <div className="right">
        <main>
          <AuthTabs />
          <Outlet />
        </main>
      </div>
    </main>
  );
};

export default LayoutAuth;
