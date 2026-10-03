import { createContext, useContext } from 'react'

export type CursorVariant = 'default' | 'text' | 'project' | 'button' | 'hidden'

export interface CursorContextType {
  setCursorVariant: (variant: CursorVariant) => void
}

export const CursorContext = createContext<CursorContextType | undefined>(undefined)

export const useCursor = () => {
  const context = useContext(CursorContext)
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider')
  }
  return context
}
