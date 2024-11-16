"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  indicatorClassName?: string
  value?: number
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>((props, ref) => {
  const { className = "", value, indicatorClassName, ...rest } = props
  
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={`relative h-2 w-full overflow-hidden rounded-full bg-black/20 ${className}`}
      {...rest}
    >
      <ProgressPrimitive.Indicator
        className={`h-full w-full flex-1 bg-orange-500 transition-all ${indicatorClassName}`}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress } 