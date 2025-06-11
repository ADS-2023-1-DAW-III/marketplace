import {Logo} from "~/components/ui/Logo";
import AuthTabs from "~/components/ui/AuthTabs";
import {Outlet} from "react-router";

const LayoutMin = () => {
    return(
        <main className="flex h-screen w-screen">
            <div className="flex-1 bg-white flex justify-center items-center">
                <Logo />
            </div>

            <div className="flex-1 bg-[#A9D3C5] flex flex-col justify-center items-center gap-4 p-4">
                <main>
                    <Outlet />
                </main>
            </div>
        </main>
    );
}

export default LayoutMin;