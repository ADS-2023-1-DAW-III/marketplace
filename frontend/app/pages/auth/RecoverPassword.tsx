import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import type { MetaArgs } from "react-router";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "~/components/ui/form";

export function meta(_args: MetaArgs) {
    return [
        { title: "Recuperar Senha" },
        {
            name: "Marketplace",
            content: "Página de recuperação de senha",
        },
    ];
}

const formSchema = z.object({
    email: z.string().min(1, "Digite seu email.").email("Email inválido."),
});

const RecoverPassword = () => {
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        alert(`Se o email "${data.email}" estiver cadastrado, enviaremos instruções para a recuperação.`);
        navigate("/login");
    };

    return(
      <Card className='w-full max-w-sm'>
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardContent className='space-y-4'>
                      <FormField
                          control={form.control}
                          name='email'
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
                  </CardContent>

                  <CardFooter className="flex flex-col gap-2 mt-4">
                      <Button type="submit" className="w-full">
                          Verificar email
                      </Button>
                  </CardFooter>

              </form>
          </Form>
      </Card>
    );
}

export default RecoverPassword;