import { useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import {type MetaArgs, useNavigate} from "react-router";
import {useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";

export function meta(_args: MetaArgs) {
  return [
    { title: "Login" },
    {
      name: "Marketplace",
      content: "Bem vindo a tela de login do Marketplace",
    },
  ];
}

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const form = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    const mockEmail = 'usuario@teste.com';
    const mockSenha = '12345';

    if(data.email == mockEmail && data.password == mockSenha){
      alert('Login bem sucedido! Redirecionando...');
    } else {
      setLoginError('Email ou senha inválidos.')
    }
  };

  return (
      <Card className="w-full max-w-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className='space-y-4'>
              <FormField
                  control={form.control}
                  name="email"
                  rules={{ required: "Digite seu email." }}
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Digite seu email" {...field} />
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
                          <Input type="password" placeholder="Digite sua senha" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )}
              />

              {loginError && (
                  <div className="text-red-500 text-sm text-center">{loginError}</div>
              )}
            </CardContent>

            <CardFooter className="gap-2 mt-4">
              <Button type="submit">Entrar</Button>
              <Button
                  type='button'
                  variant="outline"
                  onClick={() => navigate("/recuperar-senha")}
              >
                Esqueci minha senha
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
  );
};

export default Login;
