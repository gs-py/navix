'use client'

import { useState, useEffect, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsMobile } from '../../hooks'
import { CursorContext, type CursorVariant } from './CursorContext'

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [variant, setCursorVariant] = useState<CursorVariant>('default')
  const isMobile = useIsMobile()
  const [isTouchDevice] = useState(() => 
    typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : false
  )
  
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  
  const springConfig = { stiffness: 500, damping: 50 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', updateMousePosition)
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [mouseX, mouseY])

  const variants = {
    default: {
      width: 20,
      height: 20,
      backgroundColor: 'transparent',
      border: '1px solid #F7F7F7',
      mixBlendMode: 'difference' as const,
    },
    text: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: 'none',
      mixBlendMode: 'difference' as const,
    },
    project: {
      width: 100,
      height: 100,
      backgroundColor: '#13FF00',
      border: 'none',
      mixBlendMode: 'normal' as const,
    },
    button: {
      width: 50,
      height: 50,
      backgroundColor: 'transparent',
      border: '2px solid #13FF00',
      mixBlendMode: 'difference' as const,
    },
    hidden: {
      width: 0,
      height: 0,
      opacity: 0,
    }
  }

  return (
    <CursorContext.Provider value={{ setCursorVariant }}>
      {children}
      {!isMobile && !isTouchDevice && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center font-[family-name:var(--font-display)] text-black font-bold text-xs tracking-widest"
          style={{
            x,
            y,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={variants[variant]}
          transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
        >
          {variant === 'project' && <span>VIEW</span>}
        </motion.div>
      )}
    </CursorContext.Provider>
  )
}
