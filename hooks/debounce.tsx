import { useEffect } from 'react'

export const useDebounce = (
  values: unknown[] = [],
  callback: () => void = () => {},
  duration: number = 300
) => {
  
  useEffect(() => {
    const timer = setTimeout(callback, duration)

    return () => {
      clearTimeout(timer)
    }
  }, [...values, duration])
}