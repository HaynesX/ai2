'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Instrument_Sans } from 'next/font/google'

const instrumentSans = Instrument_Sans({ subsets: ['latin'] })

const NeuroCarDescription = () => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.8 },
  }

  return (
    <motion.p
      className={`text-[15px] sm:text-[18px] font-normal`}
      initial="hidden"
      animate="visible"
      variants={variants}
      style={{color: 'rgba(255, 255, 255, .8)'}}
      transition={{ duration: 1, delay: 0.8}}
    >
        Through our innovative AI platform, we enable users with the capability to upload car images, identify precise details, and discover make, model, year in mere seconds.
    </motion.p>
  )
}

export default NeuroCarDescription
