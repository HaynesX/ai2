'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Instrument_Sans } from 'next/font/google'
import localFont from '@next/font/local'

const instrumentSans = Instrument_Sans({ subsets: ['latin'] })
const myFont = localFont({ src: '../public/fonts/DentonTest-Regular.otf' })

const NeuroCarTitle = () => {
  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  }

  // Using an ease-out curve for smoother ending
  const transitionSettings = {
    duration: 0.5,
    delay: 0.5,
    ease: [0.22, 1, 0.36, 1]  // This is a cubic bezier curve for "ease-out" effect
  }

  return (
    <motion.h1
    // bg-gradient-to-r from-pink-600 via-violet-500 to-purple-400 bg-clip-text text-transparent
      className={`${myFont.className} leading-[1] text-[48px] sm:text-[64px] font-medium text-center z-[999]`}
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={transitionSettings}
    >
      NeuroCar AI
    </motion.h1>
  )
}

export default NeuroCarTitle
