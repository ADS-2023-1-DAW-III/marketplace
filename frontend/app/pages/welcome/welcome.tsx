import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/RegisterForm";
import camera from "~/assets/camera.png";
import { useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import upload from "~/assets/upload.png";

export function DropdownSelect() {
  const options = [
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "js", label: "JavaScript" },
    { value: "react", label: "React" },
  ];
}

export function Welcome() {
  const form = useForm();

  return (
    <main className="flex min-h-screen">
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div  style={{ color: "#004C4C" }} className="flex gap-4 items-center">
          <span className="text-7xl font-bold">M A R K E T</span>
          <span style={{ backgroundColor: "#004C4C" }} className="text-white text-7xl font-bold px-1 py-0">
            PLACE
          </span>
        </div>
      </div>  

      <div  style={{ backgroundColor: "#004C4C" }} className="w-1/2 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-[500px]">
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
                          <Input className="w-full py-6 text-lg " {...field} />
                        </FormControl>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div style={{ backgroundColor: "#004C4C" }} className="w-[50px] h-[50px] rounded-full flex items-center justify-center shadow-[0_4px_8px_rgba(0,0,255,0.3)]">
                          <img
                            src={camera}
                            alt="camera"
                            className="w-[30px] h-[30px] object-cover rounded-full"
                          />
                        </div>
                        <span className="text-xs mt-1"><a href="">Adicone foto</a></span>
                      </div>
                    </div>

                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input className="w-[435px] py-6 text-lg" {...field} />
                    </FormControl>

                    <FormLabel>Contato</FormLabel>
                    <FormControl>
                      <Input className="w-[435px] py-6 text-lg" {...field} />
                    </FormControl>

                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input className="w-[435px] py-6 text-lg" {...field} />
                    </FormControl>

                    <FormLabel>Confirmar senha</FormLabel>
                    <FormControl>
                      <Input className="w-[435px] py-6 text-lg" {...field} />
                    </FormControl>
                      <FormLabel>Habilidades</FormLabel>
                      <div className="flex items-end justify-between gap-1 mt-[-18px]">
                        <FormControl>
                          <select
                            className="w-[220px] py-1 px-1 border rounded-md"
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
                          className="w-[150px] hover:bg-blue-600 text-white font-semibold py-3 px-5 rounded-md shadow-md transition duration-300 ease-in-out"
                        >
                          Criar Conta
                        </button>
                      </div>


                  <FormMessage />
                    <div className="text-center mt-1">
                      <span>Já possui uma conta? </span>
                      <a href="/login" className="text-blue-600 hover:underline">Entrar</a>
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
