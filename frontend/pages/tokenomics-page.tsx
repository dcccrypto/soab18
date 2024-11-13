"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Zap, TrendingUp, Flame } from 'lucide-react'
import { TOKEN_INFO, ICON_SIZES } from '../constants'

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-gray-800 p-6 rounded-lg max-w-md w-full"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 text-orange-400">{title}</h2>
        <p className="text-gray-300 mb-6">{content}</p>
        <button
          onClick={onClose}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  )
}

export default function TokenomicsPage() {
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    title: '',
    content: ''
  })

  const openDialog = (title: string, content: string) => {
    setDialogState({
      isOpen: true,
      title,
      content
    })
  }

  const closeDialog = () => {
    setDialogState(prev => ({ ...prev, isOpen: false }))
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <Dialog
        isOpen={dialogState.isOpen}
        onClose={closeDialog}
        title={dialogState.title}
        content={dialogState.content}
      />

      {/* Token Distribution */}
      <div className="max-w-6xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-orange-400">$SOBA Tokenomics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            className="p-6 rounded-lg shadow-lg bg-[#111]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-2 text-orange-400">Total Supply</h3>
            <p className="text-3xl font-bold text-orange-300">{TOKEN_INFO.TOTAL_SUPPLY}</p>
            <p className="text-orange-400/60">$SOBA Tokens</p>
          </motion.div>
          <motion.div
            className="p-6 rounded-lg shadow-lg bg-[#111]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-2 text-orange-400">Circulating Supply</h3>
            <p className="text-3xl font-bold text-orange-300">{TOKEN_INFO.CIRCULATING_SUPPLY}</p>
            <p className="text-orange-400/60">$SOBA Tokens</p>
          </motion.div>
          <motion.div
            className="p-6 rounded-lg shadow-lg bg-[#111]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-2 text-orange-400">Burned Tokens</h3>
            <p className="text-3xl font-bold text-orange-300">{TOKEN_INFO.BURNED_TOKENS}</p>
            <p className="text-orange-400/60">$SOBA Tokens</p>
          </motion.div>
          <motion.div
            className="p-6 rounded-lg shadow-lg bg-[#111]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-2 text-orange-400">Founder Holdings</h3>
            <p className="text-3xl font-bold text-orange-300">{TOKEN_INFO.FOUNDER_HOLDINGS}</p>
            <p className="text-orange-400/60">$SOBA Tokens</p>
          </motion.div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="p-6 rounded-lg shadow-lg cursor-pointer bg-[#111]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openDialog("Fair Launch", "The $SOBA token was launched with complete transparency and fairness. No pre-sale or private allocation ensures every community member has an equal opportunity to participate.")}
        >
          <div className="flex items-center mb-4">
            <TrendingUp className="w-8 h-8 mr-3 text-[#FF6B00]" />
            <h3 className="text-xl font-bold text-orange-400">Fair Launch</h3>
          </div>
          <p className="text-orange-300">Equal opportunity for all participants</p>
        </motion.div>
        <motion.div
          className="p-6 rounded-lg shadow-lg cursor-pointer bg-[#111]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openDialog("Transparent", "Every aspect of $SOBA's tokenomics is publicly verifiable on the blockchain. We maintain complete transparency in all operations and token movements.")}
        >
          <div className="flex items-center mb-4">
            <Flame className="w-8 h-8 mr-3 text-[#FF6B00]" />
            <h3 className="text-xl font-bold text-orange-400">Transparent</h3>
          </div>
          <p className="text-orange-300">Fully verifiable on-chain</p>
        </motion.div>
        <motion.div
          className="p-6 rounded-lg shadow-lg cursor-pointer bg-[#111]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openDialog("Community-Driven", "The $SOBA community is at the heart of our project. We actively engage with our community through various social media platforms and involve them in key decisions, fostering a sense of ownership and shared success.")}
        >
          <div className="flex items-center mb-4">
            <Users className="w-8 h-8 mr-3 text-[#FF6B00]" />
            <h3 className="text-xl font-bold text-orange-400">Community-Driven</h3>
          </div>
          <p className="text-orange-300">Active engagement and decision-making</p>
        </motion.div>
        <motion.div
          className="p-6 rounded-lg shadow-lg cursor-pointer bg-[#111]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openDialog("Deflationary Model", "Our token burning mechanism regularly reduces the total supply of $SOBA, creating a deflationary effect. This approach aims to increase the scarcity and potential value of $SOBA over time.")}
        >
          <div className="flex items-center mb-4">
            <Zap className="w-8 h-8 mr-3 text-[#FF6B00]" />
            <h3 className="text-xl font-bold text-orange-400">Deflationary Model</h3>
          </div>
          <p className="text-orange-300">Regular token burns to reduce supply</p>
        </motion.div>
      </div>
    </div>
  )
}