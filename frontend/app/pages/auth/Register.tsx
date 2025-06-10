import type { MetaArgs } from "react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/RegisterForm";
import camera from "~/assets/camera.png";
import { useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { useState } from "react";

export function meta(_args: MetaArgs) {
  return [
    { title: "Cadastro" },
    {
      name: "Marketplace",
      content: "Bem vindo a tela de cadastro do Marketplace",
    },
  ];
}

const Register = () => {
  const [isLogin, setIsLogin] = useState(false);
  const form = useForm();

  const handleClick = () => {
    console.log("Imagem clicada!");
  };
  return (
    <div
      style={{ backgroundColor: "#ffffff" }}
      className="w-[450px] h-[450px] rounded-md shadow-md flex flex-col items-center justify-center relative"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => console.log("enviado"))}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1">
                    <FormLabel className="mb-2">Nome</FormLabel>
                    <FormControl>
                      <Input className="w-full py-5 text-lg" {...field} />
                    </FormControl>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <div
                      style={{ backgroundColor: "#004C4C" }}
                      className="w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-[0_4px_8px_rgba(0,0,255,0.3)]"
                    >
                      <img
                        src={camera}
                        alt="camera"
                        className="w-[30px] h-[30px] object-cover rounded-full cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95"
                        onClick={handleClick}
                      />
                    </div>
                    <span className="text-xs mt-1">
                      <a href="#">Adicionar foto</a>
                    </span>
                  </div>
                </div>

                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="w-full py-5 text-lg"
                    {...form.register("email")}
                  />
                </FormControl>

                <FormLabel>Contato</FormLabel>
                <FormControl>
                  <Input
                    placeholder="(00) 00000-0000"
                    className="w-full py-5 text-lg"
                    {...form.register("contato")}
                  />
                </FormControl>

                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="w-full py-5 text-lg"
                    {...form.register("senha")}
                  />
                </FormControl>

                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="w-full py-5 text-lg"
                    {...form.register("confirmarSenha")}
                  />
                </FormControl>

                <FormLabel>Habilidades</FormLabel>
                <div className="flex items-end justify-between gap-1 mt-[-1px]">
                  <FormControl>
                    <select
                      className="w-[220px] py-2 px-2 border rounded-md"
                      {...form.register("habilidade")}
                    >
                      <option value="">Select</option>
                      <option value="html">HTML</option>
                      <option value="css">CSS</option>
                      <option value="js">JavaScript</option>
                      <option value="react">React</option>
                    </select>
                  </FormControl>

                  <button
                    style={{ backgroundColor: "#004C4C" }}
                    type="submit"
                    className="w-[150px] opacity-100 hover:opacity-80 text-white font-semibold py-2 px-5 rounded-md shadow-md transition duration-300 ease-in-out"
                  >
                    Criar Conta
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default Register;
