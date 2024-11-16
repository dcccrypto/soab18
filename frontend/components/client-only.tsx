'use client'

import { useEffect, useState, type ReactNode } from 'react'

interface ClientOnlyProps {
  children: ReactNode
  fallback?: ReactNode
}

export const ClientOnly = ({ children, fallback = null }: ClientOnlyProps): JSX.Element | null => {
  const [hasMounted, setHasMounted] = useState<boolean>(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return fallback as JSX.Element | null
  }

  return <>{children}</>
}

ClientOnly.displayName = 'ClientOnly' 