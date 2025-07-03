import { useEffect } from 'react'

export function useOutsideClick(
  ref: React.RefObject<HTMLElement> | null,
  callback: () => void,
) {
  useEffect(() => {
    if (ref === null || ref.current === null) {
      return
    }
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [ref, callback])
}
