import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, type MetaArgs } from "react-router-dom";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { SuccessAlert, ErrorAlert } from "~/components/ui/AlertMessages";
import { Plus } from "lucide-react";
import { ImageUpload } from "~/components/ui/ImageUpload";
import { Checkbox } from "~/components/ui/checkBox";
import { AuthContext } from "~/hooks/context/authContext";
import { useApi } from "~/hooks/services/api";
import { Textarea } from "~/components/ui/textArea";

export function meta(_args: MetaArgs) {
  return [
    { title: "Cadastrar Serviço" },
    { name: "description", content: "Cadastre novos serviços no marketplace" },
  ];
}

const serviceSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  value: z.number().min(0.01),
  categories: z.array(z.string().min(1)),
  allowNegotiation: z.boolean(),
  estimatedTime: z.string().min(1),
  customTime: z.string().optional(),
  files: z.instanceof(File).optional(),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

type Categoria = {
  id: string;
  nome: string;
};

export default function CadastrarServico() {
  const { token } = useContext(AuthContext);
  const api = useApi();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showCustomTimeInput, setShowCustomTimeInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<Categoria[]>([]);

  const [tempSelectValue, setTempSelectValue] = useState<string | undefined>(
    undefined
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      allowNegotiation: false,
      estimatedTime: "",
      categories: [],
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categorias");
        setCategories(response.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        ErrorAlert("Não foi possível carregar as categorias.");
      }
    };
    fetchCategories();
  }, []);

  const parseDurationToMinutes = (duration: string): number => {
    const unit = duration.slice(-1);
    const value = parseInt(duration.slice(0, -1));
    switch (unit) {
      case "h":
        return value * 60;
      case "d":
        return value * 24 * 60;
      case "w":
        return value * 7 * 24 * 60;
      case "m":
        return value * 30 * 24 * 60;
      default:
        return value;
    }
  };

  const onSubmit = async (data: ServiceFormData) => {
    setIsSubmitting(true);
    try {
      if (!token) {
        ErrorAlert("Você precisa estar logado para cadastrar um serviço.");
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append("titulo", data.title);
      formData.append("descricao", data.description);
      formData.append("preco", data.value.toString());
      formData.append("eh_negociavel", data.allowNegotiation.toString());
      formData.append(
        "duracao",
        parseDurationToMinutes(data.estimatedTime).toString()
      );
      formData.append("id_prestador", token);

      data.categories.forEach((cat) => {
        formData.append("categorias", cat);
      });

      if (data.files) {
        formData.append("files", data.files);
      }

      await api.post("/servicos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      SuccessAlert("Serviço cadastrado com sucesso!");
      reset();
      setPreviewImage(null);
      setSelectedCategories([]);
      setTempSelectValue(undefined);
    } catch (error) {
      console.error(error);
      ErrorAlert("Erro ao cadastrar serviço.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
      setValue("files", file);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setValue("files", undefined);
  };

  const handleTimeChange = (value: string) => {
    setValue("estimatedTime", value);
    if (value === "custom") {
      setShowCustomTimeInput(true);
    } else {
      setShowCustomTimeInput(false);
    }
  };

  const handleCategorySelect = (value: string) => {
    if (!selectedCategories.includes(value)) {
      const updated = [...selectedCategories, value];
      setSelectedCategories(updated);
      setValue("categories", updated);
    }
  };

  const handleCategoryRemove = (value: string) => {
    const updated = selectedCategories.filter((v) => v !== value);
    setSelectedCategories(updated);
    setValue("categories", updated);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="w-3/4 mx-auto bg-[#307B8E] rounded-2xl py-3 px-6 text-white">
          <h1 className="text-center text-[24px] md:text-[30px] font-bold">
            Cadastrar Serviço
          </h1>
        </div>

        <Card className="mt-6 shadow-lg">
          <CardContent className="pt-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <ImageUpload
                previewImage={previewImage}
                onRemove={removeImage}
                onChange={handleImageChange}
              />

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-[#103A57] text-lg">
                    Título:
                  </Label>
                  <Input
                    id="title"
                    placeholder="Digite o título do serviço"
                    {...register("title")}
                    className={errors.title ? "border-destructive" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-[#103A57] text-lg"
                  >
                    Descrição:
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva detalhadamente o serviço"
                    {...register("description")}
                    className={errors.description ? "border-destructive" : ""}
                    rows={4}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="value" className="text-[#103A57] text-lg">
                    Valor R$:
                  </Label>
                  <Input
                    id="value"
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    {...register("value", { valueAsNumber: true })}
                    className={errors.value ? "border-destructive" : ""}
                  />
                  {errors.value && (
                    <p className="text-sm text-destructive">
                      {errors.value.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="categories"
                    className="text-[#103A57] text-lg"
                  >
                    Categorias:
                  </Label>
                  <Select
                    value={tempSelectValue}
                    onValueChange={(value) => {
                      handleCategorySelect(value);
                      setTempSelectValue(undefined);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.nome} value={category.nome}>
                          {category.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCategories.map((catId) => {
                      const label =
                        categories.find((c) => c.nome === catId)?.nome || catId;
                      return (
                        <span
                          key={catId}
                          className="bg-[#307B8E] text-white rounded-full px-3 py-1 text-sm flex items-center gap-1"
                        >
                          {label}
                          <button
                            type="button"
                            onClick={() => handleCategoryRemove(catId)}
                            className="ml-1 text-white hover:text-red-400"
                          >
                            X
                          </button>
                        </span>
                      );
                    })}
                  </div>

                  {errors.categories && (
                    <p className="text-sm text-destructive">
                      {errors.categories.message}
                    </p>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="allowNegotiation"
                      {...register("allowNegotiation")}
                      onCheckedChange={(checked) => {
                        setValue("allowNegotiation", !!checked);
                      }}
                    />
                    <Label
                      htmlFor="allowNegotiation"
                      className="text-[#103A57] text-lg"
                    >
                      Permitir negociação
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="estimatedTime"
                    className="text-[#103A57] text-lg"
                  >
                    Tempo estimado para execução:
                  </Label>
                  <Select onValueChange={handleTimeChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o tempo estimado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1h">Até 1 hora</SelectItem>
                      <SelectItem value="2h">1-2 horas</SelectItem>
                      <SelectItem value="4h">2-4 horas</SelectItem>
                      <SelectItem value="1d">1 dia</SelectItem>
                      <SelectItem value="2d">2 dias</SelectItem>
                      <SelectItem value="1w">1 semana</SelectItem>
                      <SelectItem value="2w">2 semanas</SelectItem>
                      <SelectItem value="1m">1 mês</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>

                  {showCustomTimeInput && (
                    <div className="mt-2">
                      <Input
                        placeholder="Digite o tempo personalizado (ex: 3h30min)"
                        {...register("customTime")}
                        onChange={(e) =>
                          setValue("estimatedTime", e.target.value)
                        }
                      />
                    </div>
                  )}

                  {errors.estimatedTime && (
                    <p className="text-sm text-destructive">
                      {errors.estimatedTime.message}
                    </p>
                  )}
                </div>
              </div>

              <CardFooter className="flex justify-end gap-4 pt-6 px-0 pb-0">
                <Button
                  variant="outline"
                  className="border-[#307B8E] text-[#307B8E] hover:bg-[#307B8E]/10"
                  asChild
                >
                  <Link to="/servicos_prestados">Cancelar</Link>
                </Button>
                <Button
                  type="submit"
                  className="bg-[#307B8E] hover:bg-[#307B8E]/90"
                  disabled={isSubmitting}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Enviando..." : "Publicar"}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
