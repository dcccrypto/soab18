import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'

interface WebSocketStore {
  socket: WebSocket | null
  connect: () => void
  disconnect: () => void
}

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'wss://api.soba18.com/ws'

type WebSocketState = StateCreator<
  WebSocketStore,
  [["zustand/devtools", never]],
  [],
  WebSocketStore
>

const createWebSocketStore: WebSocketState = (set, get) => ({
  socket: null,
  connect: () => {
    if (typeof window === 'undefined') return;
    
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
})

export const useWebSocket = create<WebSocketStore>()(
  devtools(
    createWebSocketStore,
    {
      name: 'websocket-store'
    }
  )
)
