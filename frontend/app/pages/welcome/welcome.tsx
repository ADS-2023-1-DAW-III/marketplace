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
import FormToggle from "~/components/ui/toggleForm";

export function Welcome() {
  const [isLogin, setIsLogin] = useState(false);
  const form = useForm();

  const toggleForm = (value: boolean) => setIsLogin(value);

  const handleClick = () => {
    console.log('Imagem clicada!');
  };

  return (
    <main className="flex min-h-screen">
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div style={{ color: "#004C4C" }} className="flex gap-4 items-center">
          <span className="text-7xl font-bold">M A R K E T</span>
          <span
            style={{ backgroundColor: "#004C4C" }}
            className="text-white text-7xl font-bold px-1 py-0"
          >
            PLACE
          </span>
        </div>
      </div>

        <div
          style={{ backgroundColor: "#004C4C" }}
          className="w-1/2 flex flex-col items-center justify-center relative"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-[500px] mt-16">
              <FormToggle isLogin={isLogin} toggleForm={toggleForm} /> {/* Aqui você usa o novo componente */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(() => console.log("enviado"))}>
              {!isLogin && (
                <>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex-1">
                            <FormLabel className="mb-2">Nome</FormLabel>
                            <FormControl>
                              <Input
                                className="w-full py-6 text-lg"
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <div
                              style={{ backgroundColor: "#004C4C" }}
                              className="w-[50px] h-[50px] rounded-full flex items-center justify-center shadow-[0_4px_8px_rgba(0,0,255,0.3)]"
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
                            className="w-full py-6 text-lg"
                            {...form.register("email")}
                          />
                        </FormControl>

                        <FormLabel>Contato</FormLabel>
                        <FormControl>
                          <Input
                            className="w-full py-6 text-lg"
                            {...form.register("contato")}
                          />
                        </FormControl>

                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            className="w-full py-6 text-lg"
                            {...form.register("senha")}
                          />
                        </FormControl>

                        <FormLabel>Confirmar senha</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            className="w-full py-6 text-lg"
                            {...form.register("confirmarSenha")}
                          />
                        </FormControl>

                        <FormLabel>Habilidades</FormLabel>
                        <div className="flex items-end justify-between gap-1 mt-[-12px]">
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
                            className="w-[150px] opacity-100 hover:opacity-80 text-white font-semibold py-3 px-5 rounded-md shadow-md transition duration-300 ease-in-out"
                          >
                            Criar Conta
                          </button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
