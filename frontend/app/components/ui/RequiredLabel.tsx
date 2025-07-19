"use client"

import { Label, type LabelProps } from "./label"

export function RequiredLabel({ children, ...props }: LabelProps) {
  return (
    <Label {...props}>
      {children}
      <span className="text-primary[#103A57] ml-1" aria-hidden="true">*</span>
    </Label>
  )
}