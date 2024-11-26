import { Flame } from 'lucide-react'
import { Card } from './card'

export const StatsSkeletonLoader = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {Array(4).fill(null).map((_, i) => (
      <Card key={i} className="bg-black/40 border-orange-500/20">
        <div className="p-6 space-y-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10" />
            <div className="h-6 w-24 bg-orange-500/10 rounded" />
          </div>
          <div className="h-8 w-32 bg-orange-500/10 rounded" />
        </div>
      </Card>
    ))}
  </div>
)

export const StatsErrorState = () => (
  <div className="text-center p-8">
    <Flame className="w-12 h-12 text-orange-500 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-orange-500 mb-2">Failed to load stats</h3>
    <p className="text-gray-400">Please try again later</p>
  </div>
) 