import { useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import type { MetaArgs } from "react-router";
import {useState} from "react";

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
  const {
    register,
    handleSubmit,
    formState: {errors},
  }= useForm<LoginFormInputs>();

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="grid gap-2">
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="email" className={errors.email ? "text-red-500" : ""}>Email</Label>
                </div>
                <Input
                    id="email"
                    type="email"
                    {...register("email", {required: "Digite seu email."})}
                />
                {errors.email && (
                    <span className="text-sm text-red-500">
                      {errors.email.message}
                    </span>
                )}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className={errors.password ? "text-red-500" : ""}>Senha</Label>
                </div>
                <Input
                    id="password"
                    type="password"
                    {...register("password", {required: "Digite sua senha."})}
                />
                {errors.password && (
                    <span className="text-sm text-red-500">
                      {errors.password.message}
                    </span>
                )}
              </div>

              {loginError && (
                  <div className="text-red-500 text-sm text-center">{loginError}</div>
              )}

            </div>
          </CardContent>
          <CardFooter className="gap-2 mt-4">
            <Button type="submit">Entrar</Button>
            <Button type='button' variant="outline">Esqueci minha senha</Button>
          </CardFooter>
        </form>
      </Card>
  );
};

export default Login;
