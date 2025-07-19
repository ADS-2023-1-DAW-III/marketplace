import { useNavigate, type MetaArgs } from "react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import camera from "~/assets/camera.png";
import { useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { useContext } from "react";
import { AuthContext } from "~/hooks/context/authContext";
import { useApi } from "~/hooks/services/api";
import { ErrorAlert, SuccessAlert } from "~/components/ui/alertMessages";
import { CardContent, CardFooter } from "~/components/ui/card";
import { useHookFormMask } from "use-mask-input";

export function meta(_args: MetaArgs) {
  return [
    { title: "Cadastro" },
    {
      name: "Marketplace",
      content: "Bem vindo a tela de cadastro do Marketplace",
    },
  ];
}

interface RegisterFormData {
  username: string;
  nome: string;
  email: string;
  cpf: string;
  contato: string;
  senha: string;
  habilidade: string;
  confirmarSenha?: string;
  foto?: File;
}

const Register = () => {
  const form = useForm<RegisterFormData>({
    defaultValues: {
      username: "",
      nome: "",
      email: "",
      cpf: "",
      contato: "",
      senha: "",
      habilidade: "",
      confirmarSenha: "",
    },
  });
  const useMask = useHookFormMask(form.register);
  const maskedCpf = useMask("cpf", "999.999.999-99");
  const maskedPhone = useMask("contato", "(99) 99999-9999");
  const senha = form.watch("senha");
  const selectedFile = form.watch("foto") as File | null;
  const { setToken, setUsername } = useContext(AuthContext);
  const navigate = useNavigate();
  const api = useApi();

  const handleSubmit = (data: RegisterFormData) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("nome", data.nome);
    formData.append("email", data.email);
    formData.append("cpf", data.cpf);
    formData.append("contato", data.contato);
    formData.append("senha", data.senha);
    formData.append("habilidades", data.habilidade);

    if (data.foto) {
      formData.append("file", data.foto);
    }
    api
      .post("/auth/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        SuccessAlert("Cadastro realizado com sucesso!");
        setToken(response.data.token);
        setUsername(response.data.userId);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          ErrorAlert(`${error.response.data.message}`);
        } else {
          ErrorAlert(
            `Erro ao cadastrar, tente novamente. Erro: ${error.response.data.message}`
          );
        }
      });
  };

  return (
    <div
      style={{ backgroundColor: "#ffffff" }}
      className="w-[450px] h-auto rounded-md shadow-md flex flex-col items-center justify-center p-5"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <FormField
                control={form.control}
                name="username"
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex-1">
                      <FormLabel className="mb-2">Username</FormLabel>
                      <FormControl>
                        <Input className="w-full py-5 text-lg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="foto"
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex-1">
                      <FormLabel className="flex flex-col items-center justify-center">
                        <div
                          style={{ backgroundColor: "#004C4C" }}
                          className="w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-[0_4px_8px_rgba(0,0,255,0.3)]"
                        >
                          <img
                            src={
                              selectedFile
                                ? URL.createObjectURL(selectedFile)
                                : camera
                            }
                            alt="camera"
                            className="w-[30px] h-[30px] object-cover rounded-full cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95"
                          />
                        </div>
                      </FormLabel>
                      <FormControl>
                        <div>
                          <label className="flex cursor-pointer items-center  border-0 hover:bg-gray-50 text-sm">
                            {selectedFile ? selectedFile.name : "Escolha foto"}
                            <Input
                              type="file"
                              className="hidden"
                              name={field.name}
                              ref={field.ref}
                              onBlur={field.onBlur}
                              onChange={(e) => {
                                const file = e.target.files?.[0] ?? undefined;
                                form.setValue("foto", file);
                              }}
                            />
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="nome"
              rules={{
                required: "Campo obrigatório",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input className="w-full py-5 text-lg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="contato"
              rules={{
                required: "Campo obrigatório",
                pattern: {
                  value: /^\(\d{2}\) 9\d{4}-\d{4}$/,
                  message: "Digite um número válido: DDD + 9 dígitos",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contato</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(00) 00000-0000"
                      className="w-full py-5 text-lg"
                      {...maskedPhone}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              rules={{
                required: "Campo obrigatório",
                pattern: {
                  value: /^\d{3}.\d{3}.\d{3}-\d{2}$/,
                  message: "Digite um número válido: XXX.XXX.XXX-XX",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="XXX.XXX.XXX-XX"
                      className="w-full py-5 text-lg"
                      {...maskedCpf}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="senha"
              rules={{ required: "Campo obrigatório" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="w-full py-5 text-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                    <Input
                      type="password"
                      className="w-full py-5 text-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="gap-2 mt-4">
            <FormField
              control={form.control}
              name="habilidade"
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
          </CardFooter>
        </form>
      </Form>
    </div>
  );
};

export default Register;
