"use client"

import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkBox";

interface NegotiationSectionProps {
  isNegotiable: boolean;
  negotiationType: string;
  onNegotiationToggle: (checked: boolean) => void;
  onTypeChange: (value: string) => void;
  register: any;
}

export function NegotiationSection({
  isNegotiable,
  negotiationType,
  onNegotiationToggle,
  onTypeChange,
  register
}: NegotiationSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="allowNegotiation" 
          checked={isNegotiable}
          onCheckedChange={onNegotiationToggle}
        />
        <Label htmlFor="allowNegotiation" className="text-[#103A57] text-lg">
          Permitir negociações:
        </Label>
      </div>

      {isNegotiable && (
        <div className="pl-6 space-y-4">
          <Label className="text-[#103A57] text-lg">Tipos de negociação aceitos:</Label>
          <RadioGroup 
            value={negotiationType}
            onValueChange={onTypeChange}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="percentage" id="percentage" />
              <Label htmlFor="percentage">Porcentagem de desconto</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fixed" id="fixed" />
              <Label htmlFor="fixed">Valor fixo de desconto</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="free" id="free" />
              <Label htmlFor="free">Modo livre (permite sugestões)</Label>
            </div>
          </RadioGroup>

          {negotiationType === "percentage" && (
            <div className="space-y-2">
              <Label htmlFor="discountPercentage" className="text-[#103A57]">
                Porcentagem de desconto (%):
              </Label>
              <Input
                id="discountPercentage"
                type="number"
                min="0"
                max="100"
                {...register("discountPercentage")}
              />
            </div>
          )}

          {negotiationType === "fixed" && (
            <div className="space-y-2">
              <Label htmlFor="fixedDiscount" className="text-[#103A57]">
                Valor fixo de desconto (R$):
              </Label>
              <Input
                id="fixedDiscount"
                type="number"
                step="0.01"
                min="0"
                {...register("fixedDiscount")}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}