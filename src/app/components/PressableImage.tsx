'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { StaticImageData } from 'next/image'

const PressableImage = ({
  src,
  alt,
  onClick,
  onKeyDown,
  animateOnKeyDown,
}: {
  src: string | StaticImageData
  alt: string
  onClick?: () => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  animateOnKeyDown?: boolean
}) => {
  return (
    <motion.div
      whileTap={{ scale: 0.9, opacity: 0.8 }} // Shrinks and slightly fades when clicked
      animate={animateOnKeyDown ? { scale: 0.9, opacity: 0.8 } : {}} // Animate on key press
      className="cursor-pointer"
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={0} // Ensure the div is focusable for keyboard events
    >
      <Image src={src} alt={alt} width={80} height={80} className="h-20 w-20" />
    </motion.div>
  )
}

export default PressableImage
