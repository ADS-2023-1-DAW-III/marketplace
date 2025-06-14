import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "cmdk";
// Altere o import para:
import { Popover, PopoverTrigger, PopoverContent } from "../../app/components/ui/popover"
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type Category = {
    value: string;
    label: string;
};

export default function CategoryFilter() {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>("");

    const categories: Category[] = [
        { value: "tech", label: "Tecnologia" },
        { value: "events", label: "Eventos" },
        { value: "transport", label: "Transporte" },
    ];

    const handleSelect = (value: string) => {
        setSelectedValue(value === selectedValue ? "" : value);
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button className="flex h-10 w-[180px] items-center justify-between rounded-md border px-3 py-2 text-sm">
                    {categories.find(c => c.value === selectedValue)?.label || "Selecione uma categoria"}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Buscar categoria..." />
                    <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                    <CommandGroup>
                        {categories.map((category) => (
                            <CommandItem
                                key={category.value}
                                value={category.value}
                                onSelect={(currentValue: string) => handleSelect(currentValue)}
                            >
                                {category.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}