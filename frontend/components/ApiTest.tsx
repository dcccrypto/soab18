import { useState, useEffect } from 'react'
import { api } from '@/services/api'

export function ApiTest() {
  const [status, setStatus] = useState<string>('Checking API connection...')

  useEffect(() => {
    async function checkHealth() {
      try {
        const health = await api.getHealth()
        setStatus(`API Connected: ${health.status}`)
      } catch (error) {
        setStatus(`Error: ${error instanceof Error ? error.message : 'Failed to connect to API'}`)
      }
    }

    checkHealth()
  }, [])

  return (
    <div className="p-4 bg-black/50 rounded-lg border border-orange-500/20">
      <p className="text-orange-400">{status}</p>
    </div>
  )
}