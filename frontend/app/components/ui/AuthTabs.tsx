import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useNavigate } from "react-router";

const AuthTabs = () => {
  const navigate = useNavigate();

  return (
    <Tabs onValueChange={(val) => navigate(val)}>
      <TabsList>
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Cadastrar</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default AuthTabs;
