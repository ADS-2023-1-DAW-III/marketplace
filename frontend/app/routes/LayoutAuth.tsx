import { Logo } from "~/components/ui/Logo";
import { Outlet } from "react-router";
import "../styles/global.css";

const LayoutAuth = () => {
    return(
        <main className="page-container">
            <div className="left">
                <Logo />
            </div>
            <div className="right">
                <Outlet />
            </div>
        </main>
    );
}

export default LayoutAuth;