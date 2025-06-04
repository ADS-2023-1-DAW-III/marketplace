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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import './Login.css'

export function Login() {
  const form = useForm();

    return (
        <main className="flex flex-col md:flex-row">
            <div className="page-container">
                <div className="left">
                    <h1>
                        <span className="market">MARKET</span>
                        <span className="place">PLACE</span>
                    </h1>
                </div>
                <div className="right">
                    <Tabs defaultValue="account" className="w-full max-w-sm">
                        <TabsList>
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="register">Cadastrar</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">Form Login</TabsContent>
                        <TabsContent value="register">Form Register</TabsContent>
                    </Tabs>

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
                                            <Label htmlFor="password">Password</Label>
                                            <a
                                                href="#"
                                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                            >
                                                Forgot your password?
                                            </a>
                                        </div>
                                        <Input id="password" type="password" required />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                            <Button variant="outline" className="w-full">
                                Login with Google
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </main>
    );
}
