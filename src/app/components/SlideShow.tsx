'use client'
import { fetchPhotos } from '@/app/utils/api'
import { useEffect, useState, useCallback } from 'react'
import left_arrow from '@/app/assets/left_arrow.png'
import right_arrow from '@/app/assets/right_arrow.png'
import Image from 'next/image'
import PressableImage from './PressableImage'
import { motion, AnimatePresence } from 'framer-motion'

interface Photo {
  id: number
  url: string
  room: string
  scenery: string
  created_at: string
}

const useImageNavigator = (images: Photo[]) => {
  const [index, setIndex] = useState(Math.floor(Math.random() * images.length))

  const nextImage = useCallback(() => {
    setIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prevImage = useCallback(() => {
    setIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const randomImage = useCallback(() => {
    setIndex(Math.floor(Math.random() * images.length))
  }, [images.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextImage, prevImage])

  // Automatically switch images every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      // nextImage()
      randomImage()
    }, 7500)

    return () => clearInterval(intervalId)
  }, [nextImage])

  return { index, nextImage, prevImage, randomImage }
}

export default function SlideShow() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)

  const { index, nextImage, prevImage, randomImage } = useImageNavigator(photos)
  const songs = [
    'https://open.spotify.com/embed/track/65krtHkaYLPr0mEbjL61UP?utm_source=generator',
    'https://open.spotify.com/embed/track/6fXTqYvoguyHsWbYYfO3FS?utm_source=generator',
    'https://open.spotify.com/embed/track/5wVpm0cxsVIFNdpqdLuCTu?utm_source=generator',
    'https://open.spotify.com/embed/track/5hDKM0AWQKlvqvIe6FUhmP?utm_source=generator',
  ]
  /// 1163
  useEffect(() => {
    async function getData() {
      const data = await fetchPhotos()
      setPhotos(data)
      setLoading(false)
    }

    getData()
  }, [])

  if (loading)
    return (
      <div>
        {' '}
        <svg
          className="mr-3 size-10 animate-spin rounded-md bg-blue-500"
          viewBox="0 0 24 24"
        ></svg>
      </div>
    )

  return (
    <div className="relative w-full max-w-[963px]">
      <div className="relative h-[650px] w-full">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={photos[index].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.5 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Image
              src={photos[index].url}
              alt="photo"
              width={963}
              height={650}
              className="h-[650px] w-[963px] rounded-md"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Ensure spacing between slideshow and iframe */}
      <div className="mt-4 flex gap-2">
        <iframe
          style={{ borderRadius: '12px' }}
          src={songs[3]}
          width="100%"
          height="152"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  )
}
