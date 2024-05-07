'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Instrument_Sans } from 'next/font/google'

const instrumentSans = Instrument_Sans({ subsets: ['latin'] })

const NeuroCarDescription = () => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <motion.p
      className={`${instrumentSans.className} text-[16px]`}
      initial="hidden"
      animate="visible"
      variants={variants}
      style={{color: 'rgba(255, 255, 255, .55)'}}
      transition={{ duration: 1, delay: 0.8}}
    >
        Through our innovative AI platform, we enable users with the capability to upload car images, identify precise details, and discover <span className='bg-gradient-to-r via-violet-500 from-purple-400 to-pink-600 bg-clip-text text-transparent'>make, model, year</span> in mere seconds.
    </motion.p>
  )
}

export default NeuroCarDescription
