'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'

const BackButton = () => {
  const router = useRouter()

  return (
    <Button className='flex items-center gap-2 cursor-pointer' variant={'outline'} onClick={router.back}>
      <ArrowLeft />
      Back
    </Button>
  )
}

export default BackButton
