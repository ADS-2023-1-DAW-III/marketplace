import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { ImagePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    title: z.string().min(1, "Título é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatória"),
    types: z.array(z.string()).min(1, "Selecione pelo menos um tipo"),
    photos: z
        .any()
        .refine((files) => files?.length <= 6, "Máximo de 6 fotos"),
    zipCode: z
        .string()
        .regex(/^\d{5}-?\d{3}$/, "CEP inválido")
        .min(1, "CEP é obrigatório"),
});

const typesColumn1 = [
    "Serviços domésticos",
    "Babá",
    "Reparação / Conserto / Reforma",
    "Informática",
    "Transporte / Mudanças",
    "Serviços domésticos",
];

const typesColumn2 = [
    "Outros",
    "Eventos / Festas",
    "Saúde / Beleza",
    "Tradução",
    "Profissionais liberais",
];

export default function ServiceForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            types: ["Outros"],
            photos: null,
            zipCode: "",
        },
    });

    const selectedTypes = form.watch("types");

    const toggleType = (type: string) => {
        const current = selectedTypes ?? [];
        const updated = current.includes(type)
            ? current.filter((t) => t !== type)
            : [...current, type];
        form.setValue("types", updated);
    };

    function onSubmit(values: any) {
        // TODO: Integration API
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: Conserto de ventilador" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                                <Textarea className="min-h-[100px]" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="types"
                    render={() => (
                        <FormItem>
                            <FormLabel>Tipo</FormLabel>
                            <div className="grid grid-cols-2 gap-x-8 mt-2">
                                {[typesColumn1, typesColumn2].map((column, colIndex) => (
                                    <div key={colIndex} className="space-y-3">
                                        {column.map((type, index) => {
                                            const id = `${type.replace(/\s/g, "")}-${colIndex}-${index}`;
                                            return (
                                                <FormItem key={id} className="flex flex-row items-start space-x-2 space-y-0">
                                                    <FormControl>
                                                        <Checkbox
                                                            id={id}
                                                            checked={selectedTypes?.includes(type)}
                                                            onCheckedChange={() => toggleType(type)}
                                                        />
                                                    </FormControl>
                                                    <FormLabel htmlFor={id} className="font-normal">
                                                        {type}
                                                    </FormLabel>
                                                </FormItem>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="photos"
                    render={({ field: { onChange, ...fieldProps } }) => (
                        <FormItem>
                            <FormLabel>Fotos</FormLabel>
                            <FormDescription>Adicione até 6 fotos</FormDescription>
                            <FormControl>
                                <label
                                    htmlFor="photos-input"
                                    className="relative flex flex-col items-center justify-center w-[180px] h-[140px] border-2 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50"
                                >
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <ImagePlus className="w-10 h-10 mb-2 text-blue-600" aria-hidden="true" />
                                        <p className="font-semibold text-blue-600 text-sm">Adicionar fotos</p>
                                        <p className="text-xs text-gray-500">JPG, GIF e PNG somente</p>
                                    </div>
                                    <input
                                        id="photos-input"
                                        type="file"
                                        {...form.register("photos")}
                                        className="hidden"
                                        multiple
                                        accept="image/png, image/jpeg, image/gif"
                                    />
                                </label>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>CEP</FormLabel>
                            <FormControl>
                                <Input placeholder="00000-000" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Enviar anúncio
                </Button>
            </form>
        </Form>
    );
}
