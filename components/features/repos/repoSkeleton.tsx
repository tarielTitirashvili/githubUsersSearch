import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type Props = {
  count?: number
}

const RepoSkeleton = (props: Props) => {
  const { count = 7 } = props
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <li
          key={i}
          className="p-2 hover:bg-gray-100 cursor-pointer flex items-center w-full"
        >
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-26 w-73 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-50" />
              <Skeleton className="h-4 w-50" />
            </div>
          </div>
        </li>
      ))}
    </>
  )
}

export default RepoSkeleton
