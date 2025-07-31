import { useState, useContext } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link, type MetaArgs } from "react-router-dom"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textArea"
import { Card, CardContent, CardFooter } from "~/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "~/components/ui/select"
import { SuccessAlert, ErrorAlert } from "~/components/ui/AlertMessages"
import { Plus } from "lucide-react"
import { ImageUpload } from "~/components/ui/ImageUpload"
import { Checkbox } from "~/components/ui/checkBox"
import { AuthContext } from "~/hooks/context/authContext"

export function meta(_args: MetaArgs) {
  return [
    { title: "Cadastrar Serviço" },
    { name: "description", content: "Cadastre novos serviços no marketplace" }
  ]
}

const serviceSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  value: z.number().min(0.01),
  category: z.string().min(1),
  allowNegotiation: z.boolean(),
  estimatedTime: z.string().min(1),
  customTime: z.string().optional(),
  image: z.instanceof(File).optional()
})

type ServiceFormData = z.infer<typeof serviceSchema>

const categories = [
  { value: "tech", label: "Tecnologia" },
  { value: "events", label: "Eventos" },
  { value: "transport", label: "Transporte" },
  { value: "home", label: "Serviços Domésticos" },
  { value: "education", label: "Educação" }
]

export default function CadastrarServico() {
  const { token, userId } = useContext(AuthContext)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [showCustomTimeInput, setShowCustomTimeInput] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      allowNegotiation: false,
      estimatedTime: "",
      category: ""
    }
  })

  const parseDurationToMinutes = (duration: string): number => {
    if (duration === 'custom') {
      return 60;
    }

    const unit = duration.slice(-1);
    const value = parseInt(duration.slice(0, -1));

    switch (unit) {
      case 'h': return value * 60;
      case 'd': return value * 24 * 60;
      case 'w': return value * 7 * 24 * 60;
      case 'm': return value * 30 * 24 * 60;
      default: return value;
    }
  }

  const onSubmit = async (data: ServiceFormData) => {
    setIsSubmitting(true)
    try {
      if (!token || !userId) {
        ErrorAlert("Você precisa estar logado para cadastrar um serviço.")
        setIsSubmitting(false)
        return
      }

      const durationInMinutes = parseDurationToMinutes(
        data.estimatedTime === 'custom' ? data.customTime || data.estimatedTime : data.estimatedTime
      )

      const formData = new FormData()
      formData.append('titulo', data.title)
      formData.append('descricao', data.description)
      formData.append('preco', data.value.toString())
      formData.append('eh_negociavel', data.allowNegotiation.toString())
      formData.append('duracao', durationInMinutes.toString())
      formData.append('categorias', JSON.stringify([data.category]))
      formData.append('id_prestador', userId)

      if (data.image) {
        formData.append('files', data.image)
      }

      const response = await fetch('http://localhost:8080/servicos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Erro ao cadastrar serviço')
      }

      const responseData = await response.json()
      SuccessAlert(responseData.message || 'Serviço cadastrado com sucesso!')
      reset()
      setPreviewImage(null)
    } catch (error) {
      ErrorAlert(error.message || 'Erro ao cadastrar serviço')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setPreviewImage(URL.createObjectURL(file))
      setValue("image", file)
    }
  }

  const removeImage = () => {
    setPreviewImage(null)
    setValue("image", undefined)
  }

  const handleTimeChange = (value: string) => {
    setValue("estimatedTime", value)
    setShowCustomTimeInput(value === "custom")
    if (value !== "custom") {
      setValue("customTime", undefined)
    }
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="w-3/4 mx-auto bg-[#307B8E] rounded-2xl py-3 px-6 text-white"> 
          <h1 className="text-center text-[24px] md:text-[30px] font-bold">Cadastrar Serviço</h1>
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
                  <Label htmlFor="title" className="text-[#103A57] text-lg">Título:</Label>
                  <Input
                    id="title"
                    placeholder="Digite o título do serviço"
                    {...register("title")}
                    className={errors.title ? "border-destructive" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-[#103A57] text-lg">Descrição:</Label>
                  <Textarea
                    id="description"
                    placeholder="Descreva detalhadamente o serviço"
                    {...register("description")}
                    className={errors.description ? "border-destructive" : ""}
                    rows={4}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">{errors.description.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="value" className="text-[#103A57] text-lg">Valor R$:</Label>
                  <Input
                    id="value"
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    {...register("value", { valueAsNumber: true })}
                    className={errors.value ? "border-destructive" : ""}
                  />
                  {errors.value && (
                    <p className="text-sm text-destructive">{errors.value.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-[#103A57] text-lg">Categoria:</Label>
                  <Select onValueChange={(value) => setValue("category", value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-destructive">{errors.category.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="allowNegotiation" 
                    {...register("allowNegotiation")}
                    onCheckedChange={(checked) => {
                      setValue("allowNegotiation", !!checked)
                    }}
                  />
                  <Label htmlFor="allowNegotiation" className="text-[#103A57] text-lg">
                    Permitir negociação
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedTime" className="text-[#103A57] text-lg">Tempo estimado para execução:</Label>
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
                        onChange={(e) => setValue("estimatedTime", e.target.value)}
                      />
                    </div>
                  )}
                  
                  {errors.estimatedTime && (
                    <p className="text-sm text-destructive">{errors.estimatedTime.message}</p>
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
  )
}