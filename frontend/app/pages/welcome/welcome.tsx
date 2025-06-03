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
import { Button } from "~/components/ui/button";

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
        <div className="flex gap-4 items-center">
          <span className="text-blue-500 text-5xl font-bold">M A R K E T</span>
          <span className="bg-blue-300 text-white text-5xl font-bold px-1 py-0">
            PLACE
          </span>
        </div>
      </div>


      <div className="w-1/2 bg-blue-400 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-[450px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(() => console.log("enviado"))}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex-1">
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input className="w-full py-6 text-lg" {...field} />
                        </FormControl>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-[50px] h-[50px] rounded-full bg-blue-500 flex items-center justify-center shadow-[0_4px_8px_rgba(0,0,255,0.3)]">
                          <img
                            src={camera}
                            alt="camera"
                            className="w-[30px] h-[30px] object-cover rounded-full"
                          />
                        </div>
                        <span className="text-xs mt-1">Adicione foto</span>
                      </div>
                    </div>

                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input className="w-full py-6 text-lg" {...field} />
                    </FormControl>

                    <FormLabel>Contato</FormLabel>
                    <FormControl>
                      <Input className="w-full py-6 text-lg" {...field} />
                    </FormControl>

                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input className="w-full py-6 text-lg" {...field} />
                    </FormControl>

                    <FormLabel>Confirmar senha</FormLabel>
                    <FormControl>
                      <Input className="w-full py-6 text-lg" {...field} />
                    </FormControl>

                    <FormLabel>Habilidades</FormLabel>
                    <FormControl>{/* Habilidades aqui */}</FormControl>

                    <FormMessage />
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
