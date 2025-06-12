import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import type { MetaArgs } from "react-router";

export function meta(_args: MetaArgs) {
    return [
        { title: "Recuperar Senha" },
        {
            name: "Marketplace",
            content: "Página de recuperação de senha",
        },
    ];
}

type Entrada = {
    email: string;
}

const RecoverPassword = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Entrada>();

    const onSubmit = (data: Entrada) => {
        alert(`Se o email "${data.email}" estiver cadastrado, enviaremos instruções para a recuperação.`);
        navigate("/login");
    }

    return(
      <Card className='w-full max-w-sm'>
          <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent>
                  <div className="grid gap-4">
                      <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>

                          <Input
                              id="email"
                              type="email"
                              {...register("email", {
                                  required: "Digite seu email.",
                                  pattern: {
                                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                      message: "Email inválido.",
                                  },
                              })}
                          />
                          {errors.email && (
                              <span className="text-sm text-red-500">{errors.email.message}</span>
                          )}
                      </div>
                  </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2 mt-4">
                  <Button type="submit" className="w-full">
                      Verificar email
                  </Button>
              </CardFooter>
          </form>
      </Card>
    );
}

export default RecoverPassword;