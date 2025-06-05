import { useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"

import LayoutAuth from "~/routes/LayoutAuth";
import AuthTabs from "~/pages/auth/AuthTabs";

const Login = () =>  {
  const form = useForm();

    return (
        <main>
            <LayoutAuth />
            <AuthTabs />
            <Card className="w-full max-w-sm">
                <CardHeader>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Senha</Label>
                                </div>
                                <Input id="password" type="password" required />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="gap-2">
                    <Button type="submit">
                        Entrar
                    </Button>
                    <Button variant="outline">
                        Esqueci minha senha
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}

export default Login;
