import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Props = {
  src: string
  alt: string
  fallback: React.ReactNode
}

const CustomAvatar = (props: Props) => {
  const { src, alt = 'User Avatar', fallback = 'U' } = props
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}

export default CustomAvatar
