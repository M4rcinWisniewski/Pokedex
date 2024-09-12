import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
            "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
            "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
            "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: 
            "text-foreground",
        dragon: 
            "border-transparent bg-[#6F35FC] text-primary-foreground hover:bg-primary/80",
        flying: 
            "border-transparent bg-[#A98FF3] text-primary-foreground hover:bg-primary/80",
        fire: 
            "border-transparent bg-[#EE8130] text-primary-foreground hover:bg-primary/80",
        water: 
            "border-transparent bg-[#6390F0] text-primary-foreground hover:bg-primary/80",
        electric: 
            "border-transparent bg-[#F7D02C] text-primary-foreground hover:bg-primary/80",
        grass: 
            "border-transparent bg-[#7AC74C] text-primary-foreground hover:bg-primary/80",
        ice : 
            "border-transparent bg-[#96D9D6] text-primary-foreground hover:bg-primary/80",
        fighting: 
            "border-transparent bg-[#C22E28] text-primary-foreground hover:bg-primary/80",
        poison: 
            "border-transparent bg-[#A33EA1] text-primary-foreground hover:bg-primary/80",
        ground: 
            "border-transparent bg-[#E2BF65] text-primary-foreground hover:bg-primary/80",
        psychic: 
            "border-transparent bg-[#F95587] text-primary-foreground hover:bg-primary/80",
        bug: 
            "border-transparent bg-[#A6B91A] text-primary-foreground hover:bg-primary/80",
        rock : 
            "border-transparent bg-[#96D9D6] text-primary-foreground hover:bg-primary/80",
        ghost: 
            "border-transparent bg-[#735797] text-primary-foreground hover:bg-primary/80",
        dark: 
            "border-transparent bg-[#705746] text-primary-foreground hover:bg-primary/80",
        steel: 
            "border-transparent bg-[#B7B7CE] text-primary-foreground hover:bg-primary/80",
        fairy: 
            "border-transparent bg-[#D685AD] text-primary-foreground hover:bg-primary/80",
        normal: 
            "border-transparent bg-[#A8A77A] text-primary-foreground hover:bg-primary/80",
      },

    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
