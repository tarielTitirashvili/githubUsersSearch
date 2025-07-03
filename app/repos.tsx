import { GitHubRepo } from '@/API'
import ReposMap from '@/components/features/repos/reposMap'
import { Computer } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
  repos: GitHubRepo[]
  setPage?: React.Dispatch<React.SetStateAction<number>>
  hasNextPageRef?: React.MutableRefObject<boolean>
}

const Repos = (props: Props) => {
  const { repos, setPage, hasNextPageRef } =props
  const containerRef = useRef<HTMLUListElement | null>(null)
  const loadingRef = useRef(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container || !setPage) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container

      // Trigger 150px before reaching bottom
      const nearBottom = scrollTop + clientHeight >= scrollHeight - 150
      if (nearBottom && !loadingRef.current && hasNextPageRef?.current) {
        setLoading(true)
        loadingRef.current = true
        setPage((prevPage: number): number => prevPage + 1)
      }
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [setPage, hasNextPageRef])

  // Reset loading flag when repos change
  useEffect(() => {
    setLoading(false)
    loadingRef.current = false
  }, [repos, hasNextPageRef])

  return (
    <div>
      <ul
        ref={containerRef}
        className="flex flex-col gap-2 overflow-x-hidden overflow-y-auto h-[50vh] max-w-[340px]"
      >
        {repos.length > 0 && (
          <>
            <Computer />
            <h3>
              {repos.length > 0
                ? 'Repos off user ' + repos[0].owner.login
                : 'Repos'}
            </h3>
            <ReposMap repos={repos} loading={loading} />
          </>
        )}
      </ul>
    </div>
  )
}

export default Repos
