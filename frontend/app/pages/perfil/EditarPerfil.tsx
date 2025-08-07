import { type MetaArgs } from "react-router";
import { useForm } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";

import { useApi } from "~/hooks/services/api";
import { AuthContext } from "~/hooks/context/authContext";
import { ErrorAlert, SuccessAlert } from "~/components/ui/AlertMessages";
import { useContext, useState } from "react"; 

export function meta(_args: MetaArgs) {
  return [
    { title: "Editar Perfil" },
    {
      name: "Marketplace",
      content: "Edite as informações do seu perfil no Marketplace",
    },
  ];
}

const formSchema = z.object({
  nomeUsuario: z.string().min(1, "Nome de usuário é obrigatório."),
  email: z.string().email("Formato de e-mail inválido."),
  confirmarEmail: z.string().email("Formato de e-mail inválido."),
  contato: z.string().min(1, "Contato é obrigatório."),
  senhaAtual: z.string().optional(),
  novaSenha: z.string()
    .optional()
    .refine((val) => !val || val.length >= 6, "A nova senha deve ter no mínimo 6 caracteres."),
  habilidades: z.string().optional(),
}).refine((data) => data.email === data.confirmarEmail, {
  message: "Os e-mails não correspondem.",
  path: ["confirmarEmail"],
}).refine((data) => {
    if (data.novaSenha && !data.senhaAtual) {
        return false;
    }
    return true;
}, {
    message: "Senha atual é obrigatória para definir uma nova senha.",
    path: ["senhaAtual"],
});

type EditarPerfilForm = z.infer<typeof formSchema>;

const EditarPerfil = () => {
  const navigate = useNavigate();
  const form = useForm<EditarPerfilForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeUsuario: "",
      email: "",
      confirmarEmail: "",
      contato: "",
      senhaAtual: "",
      novaSenha: "",
      habilidades: "",
    },
  });

  const api = useApi();
  const { username } = useContext(AuthContext); 
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: EditarPerfilForm) => {
    setIsLoading(true);
    try {
      const payload: any = {
        nome: data.nomeUsuario,
        email: data.email,
        contato: data.contato,
        habilidades: data.habilidades,
      };

      if (data.novaSenha) {
        payload.senhaAtual = data.senhaAtual;
        payload.novaSenha = data.novaSenha;
      }

      const response = await api.put(`/pessoas/${username}`, payload); 

      if (response.status === 200 || response.status === 204) {
        SuccessAlert("Perfil atualizado com sucesso!");
        navigate('/perfil');
      } else {
        ErrorAlert("Erro ao atualizar perfil. Tente novamente.");
      }
    } catch (error: any) {
      console.error("Erro ao submeter formulário:", error);
      if (error.response) {
        const errorMessage = error.response.data.message || "Ocorreu um erro.";
        ErrorAlert(`Erro: ${errorMessage}`);
      } else {
        ErrorAlert(`Erro de conexão: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 container mx-auto max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Editar Perfil</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-md">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="seu@email.com" {...field} className="bg-gray-100 border-gray-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmarEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Confirme seu e-mail" {...field} className="bg-gray-100 border-gray-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="contato"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contato</FormLabel>
                  <FormControl>
                    <Input placeholder="(XX) XXXXX-XXXX" {...field} className="bg-gray-100 border-gray-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nomeUsuario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuário</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu usuário" {...field} className="bg-gray-100 border-gray-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="senhaAtual"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Digite sua senha" {...field} className="bg-gray-100 border-gray-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="novaSenha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Digite sua nova senha" {...field} className="bg-gray-100 border-gray-200" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="habilidades"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adicionar Habilidades</FormLabel>
                <FormControl>
                  <Input placeholder="Digite a nova Habilidade" {...field} className="bg-gray-100 border-gray-200" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 justify-end pt-4">
            <Button 
              type="button" 
              variant="outline" 
              className="bg-red-700 hover:bg-red-800 text-white"
              onClick={() => navigate('/perfil')}
            >
              Cancelar
            </Button>
            <Button type="submit" className="bg-[#307B8E] hover:bg-[#265D6B]" disabled={isLoading}>
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditarPerfil;