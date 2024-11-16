import { useRouter } from 'next/router'
import { useEffect } from 'react'
import LandingPage from './landing-page'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirect /index to /
    if (router.pathname === '/index') {
      router.replace('/')
    }
  }, [router])

  return <LandingPage />
} 
