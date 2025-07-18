import { useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { useNavigate, type MetaArgs } from "react-router";
import { use, useContext, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "~/hooks/context/authContext";
import { ErrorAlert, SuccessAlert } from "~/components/ui/alertMessages";
import { useApi } from "~/hooks/services/api";

export function meta(_args: MetaArgs) {
  return [
    { title: "Login" },
    {
      name: "Marketplace",
      content: "Bem vindo a tela de login do Marketplace",
    },
  ];
}

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { setToken, setUsername } = useContext(AuthContext);
  const navigate = useNavigate();
  const api = useApi();

  const form = useForm<LoginForm>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginForm) => {
    api
      .post("/auth/login", { login: data.email, senha: data.password })
      .then((response) => {
        SuccessAlert("Login bem-sucedido! Redirecionando...");
        setToken(response.data.token);
        setUsername(response.data.userId);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          ErrorAlert(`Email ou senha inválidos. Erro: ${error.message}`);
        } else {
          ErrorAlert(
            `Erro ao fazer login, tente novamente. Erro: ${error.message}`
          );
        }
      });
  };

  return (
    <Card className="w-full max-w-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "Digite seu email.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Formato de e-mail inválido",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Digite seu email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              rules={{ required: "Digite sua senha." }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Digite sua senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="gap-2 mt-4">
            <Button type="submit">Entrar</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default Login;
