'use client'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { OctagonAlert } from 'lucide-react'
import { useEffect } from 'react'

type Props = {
  errorMessage?: string
  duration?: number
  onClose: () => void
}

export function AlertDialogDemo(props: Props) {
  const { errorMessage, duration = 2000, onClose = () => {} } = props

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer) // cleanup on unmount
  }, [onClose, duration])

  return (
    <AlertDialog open={!!errorMessage}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <OctagonAlert color="red" />
            Error occurred
          </AlertDialogTitle>
          <AlertDialogDescription>
            {errorMessage ||
              'An error occurred while fetching data. Please try again later.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}
