import { create } from 'zustand'

interface WebSocketStore {
  socket: WebSocket | null
  connect: () => void
  disconnect: () => void
}

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'wss://api.soba18.com/ws'

export const useWebSocket = create<WebSocketStore>((set, get) => ({
  socket: null,
  connect: () => {
    const socket = new WebSocket(WS_URL)
    
    socket.onopen = () => {
      console.log('WebSocket connected')
      socket.send(JSON.stringify({ type: 'subscribe', channels: ['burns', 'price', 'holders'] }))
    }
    
    set({ socket })
  },
  disconnect: () => {
    const { socket } = get()
    if (socket) {
      socket.close()
      set({ socket: null })
    }
  }
}))
