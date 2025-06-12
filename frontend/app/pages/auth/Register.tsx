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
import axios from "axios";

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
  const senha = form.watch("senha");

  const handleClick = () => {
    console.log("Imagem clicada!");
  };

  return (
    <div
      style={{ backgroundColor: "#ffffff" }}
      className="w-[450px] h-auto rounded-md shadow-md flex flex-col items-center justify-center p-5"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            const payload = {
              username: data.username,
              nome: data.username,
              email: data.email,
              senha: data.senha,
              abacate_id: "abc123",
            };

            axios
              .post("/auth/signup", payload)
              .then((response) => {
                console.log("Usuário criado:", response.data);
                localStorage.setItem("token", response.data.token);
              })
              .catch((error) => {
                console.error("Erro ao cadastrar:", error);
              });
          })}
        >
          {/* Nome */}
          <FormField
            control={form.control}
            name="username"
            rules={{ required: "Campo obrigatório" }}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1">
                    <FormLabel className="mb-2">Nome</FormLabel>
                    <FormControl>
                      <Input className="w-full py-5 text-lg" {...field} />
                    </FormControl>
                    <FormMessage />
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
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Campo obrigatório",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Formato de e-mail inválido",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="w-full py-5 text-lg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contato */}
          <FormField
            control={form.control}
            name="contato"
            rules={{ required: "Campo obrigatório" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contato</FormLabel>
                <FormControl>
                  <Input
                    placeholder="(00) 00000-0000"
                    className="w-full py-5 text-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Senha */}
          <FormField
            control={form.control}
            name="senha"
            rules={{ required: "Campo obrigatório" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" className="w-full py-5 text-lg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirmar senha */}
          <FormField
            control={form.control}
            name="confirmarSenha"
            rules={{
              required: "Campo obrigatório",
              validate: (value) =>
                value === senha || "As senhas não coincidem",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <Input type="password" className="w-full py-5 text-lg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Habilidades - agora é textarea */}
          <FormField
            control={form.control}
            name="habilidade"
            rules={{ required: "Digite uma habilidade" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Habilidades</FormLabel>
                <div className="flex items-end justify-between gap-1 mt-[-1px]">
                  <FormControl>
                    <textarea
                      className="w-[220px] h-[40px] py-1 px-1 border rounded-md resize-none"
                      rows={1}
                      placeholder="Digite suas habilidades..."
                      {...field}
                    />
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
