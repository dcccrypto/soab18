import { ButtonHTMLAttributes } from 'react'
import { VariantProps } from 'class-variance-authority'

export interface ButtonBaseProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<any> {
  asChild?: boolean
}
