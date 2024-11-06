import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { formatNumber } from '@/lib/utils'

interface TokenCardProps {
  title: string
  value: number | string
  description: string
  icon: React.ReactNode
  change?: number
}

export default function TokenCard({ title, value, description, icon, change }: TokenCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="bg-gray-900 bg-opacity-50 border-orange-500/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-orange-400 text-lg font-medium">
            {title}
          </CardTitle>
          <div className="h-8 w-8 text-orange-400">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            {typeof value === 'number' ? formatNumber(value) : value}
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {description}
          </p>
          {change !== undefined && (
            <div className={`text-xs mt-2 ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
} 
