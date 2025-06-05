import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useNavigate, useLocation, Outlet } from "react-router";

const AuthTabs = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const currentTab = location.pathname.includes("register") ? "register" : "login";

    return (
        <Tabs value={currentTab} onValueChange={(val) => navigate(val)}>
            <TabsList>
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Cadastrar</TabsTrigger>
            </TabsList>

            <Outlet />
        </Tabs>
    );
}

export default AuthTabs;
