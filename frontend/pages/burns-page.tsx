'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ExternalLink, Flame } from 'lucide-react'
import { TOKEN_INFO, CONTRACT_ADDRESS, ICON_SIZES, ASSETS } from '../constants'

interface BurnEvent {
  date: string
  amount: number
  txHash: string
}

export default function BurnsPage() {
  const [burnHistory, setBurnHistory] = useState<BurnEvent[]>([])
  const [totalBurned, setTotalBurned] = useState(Number(TOKEN_INFO.BURNED_TOKENS.replace(/,/g, '')))
  const [burnRate, setBurnRate] = useState(2.5)
  const [nextBurnDate, setNextBurnDate] = useState(new Date('2024-04-01'))

  useEffect(() => {
    // Simulated burn history data
    const mockBurnHistory = [
      { date: '2024-01-01', amount: 10000000, txHash: '0x123...abc' },
      { date: '2024-01-15', amount: 15000000, txHash: '0x456...def' },
      { date: '2024-02-01', amount: 20000000, txHash: '0x789...ghi' },
      { date: '2024-02-15', amount: 25000000, txHash: '0xabc...jkl' },
      { date: '2024-03-01', amount: 4779668.51, txHash: '0xdef...mno' },
    ]
    setBurnHistory(mockBurnHistory)
  }, [])

  const chartData = burnHistory.map(burn => ({
    date: burn.date,
    amount: burn.amount / 1000000, // Convert to millions for better display
  }))

  return (
    <div className="min-h-screen py-12 px-4">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={ASSETS.LOGO}
            alt="SOBA Logo"
            width={ASSETS.LOGO_DIMENSIONS.width}
            height={ASSETS.LOGO_DIMENSIONS.height}
            className="mx-auto mb-8 w-24 h-24"
          />
        </motion.div>
        <h1 className="text-4xl font-bold mb-4 text-orange-400">$SOBA Token Burns</h1>
        <p className="text-xl text-orange-300 mb-8">
          Track our deflationary mechanism in action
        </p>
      </div>

      {/* Burn Stats */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="p-6 rounded-lg shadow-lg bg-[#111]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center mb-4">
              <Flame className="w-8 h-8 mr-3 text-[#FF6B00]" />
              <h3 className="text-xl font-bold text-orange-400">Total Burned</h3>
            </div>
            <p className="text-3xl font-bold text-orange-300">{TOKEN_INFO.BURNED_TOKENS}</p>
            <p className="text-orange-400/60">$SOBA Tokens</p>
          </motion.div>
          <motion.div
            className="p-6 rounded-lg shadow-lg bg-[#111]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <Flame className="w-8 h-8 mr-3 text-[#FF6B00]" />
              <h3 className="text-xl font-bold text-orange-400">Burn Rate</h3>
            </div>
            <p className="text-3xl font-bold text-orange-300">{burnRate}%</p>
            <p className="text-orange-400/60">Per Month</p>
          </motion.div>
          <motion.div
            className="p-6 rounded-lg shadow-lg bg-[#111]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <Flame className="w-8 h-8 mr-3 text-[#FF6B00]" />
              <h3 className="text-xl font-bold text-orange-400">Next Burn</h3>
            </div>
            <p className="text-3xl font-bold text-orange-300">
              {nextBurnDate.toLocaleDateString()}
            </p>
            <p className="text-orange-400/60">Estimated Date</p>
          </motion.div>
        </div>
      </div>

      {/* Burn Chart */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="bg-[#111] p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-6 text-orange-400">Burn History</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#FF6B00" />
                <YAxis stroke="#FF6B00" />
                <Tooltip
                  contentStyle={{ background: '#111', border: '1px solid #FF6B00' }}
                  labelStyle={{ color: '#FF6B00' }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#FF6B00"
                  strokeWidth={2}
                  dot={{ fill: '#FF6B00' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Burn History Table */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#111] p-6 rounded-lg shadow-lg overflow-x-auto">
          <h3 className="text-xl font-bold mb-6 text-orange-400">Burn Transactions</h3>
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-800">
                <th className="px-6 py-3 text-orange-400">Date</th>
                <th className="px-6 py-3 text-orange-400">Amount</th>
                <th className="px-6 py-3 text-orange-400">Transaction</th>
              </tr>
            </thead>
            <tbody>
              {burnHistory.map((burn, index) => (
                <motion.tr 
                  key={burn.txHash || index}
                  className="border-t border-gray-800 hover:bg-gray-800/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <td className="px-6 py-4 text-orange-300">
                    {burn.date}
                  </td>
                  <td className="px-6 py-4 text-orange-300">
                    {burn.amount.toLocaleString()} SOBA
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`https://solscan.io/tx/${burn.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-400 hover:text-orange-300 flex items-center gap-2"
                    >
                      {burn.txHash.slice(0, 8)}...{burn.txHash.slice(-8)}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}