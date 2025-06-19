import { useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { useNavigate, type MetaArgs } from "react-router";
import { useContext } from "react";
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
import { AuthContext } from "~/hooks/context/AuthContext";
import { ErrorAlert, SuccessAlert } from "~/components/ui/alertMessages";

export function meta(_args: MetaArgs) {
  return [
    { title: "Login" },
    {
      name: "Marketplace",
      content: "Bem vindo a tela de login do Marketplace",
    },
  ];
}

const formSchema = z.object({
  email: z.string().min(1, "Digite seu email.").email("Email inválido."),
  password: z.string().min(1, "Digite sua senha."),
});

const Login = () => {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const mockEmail = "usuario@teste.com";
    const mockSenha = "12345";

    if (data.email == mockEmail && data.password == mockSenha) {
      SuccessAlert("Login bem sucedido! Redirecionando...");
      setToken("mock-token-12345"); //Simula o armazenamento do token
      navigate("/");
    } else {
      ErrorAlert("Email ou senha inválidos.");
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              rules={{ required: "Digite seu email." }}
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
