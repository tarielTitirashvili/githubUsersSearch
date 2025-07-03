import { GitHubUser } from '@/API'
import UserSuggestionItem from './suggestionItem'
import UserSuggestionsEmpty from './UserSuggestionsEmpty'
import UserSuggestionSkeleton from './UserSuggestionSkeleton'
import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { Dialog } from '@radix-ui/react-dialog'
import { useOutsideClick } from '@/hooks/useOutsideClick'

type Props = {
  loading: boolean
  suggestions: GitHubUser[]
  onSelect: (username: string) => void
  skeletonCount?: number
  query: string
  page: number
  hasMore: boolean
  setPage: (page: number | ((prev: number) => number)) => void
  setLoading: (loading: boolean) => void
  newPageShouldBeLoadedRef: React.MutableRefObject<boolean>
  close: () => void
  inputIsFocusedRef: React.MutableRefObject<boolean>
}

export default function UserSuggestions({
  suggestions,
  onSelect,
  loading,
  skeletonCount = 5,
  query,
  hasMore,
  page,
  setPage,
  setLoading,
  newPageShouldBeLoadedRef,
  close,
  inputIsFocusedRef,
}: Props) {
  // if (suggestions.length === 0) return null
  const containerRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      if (
        container.scrollTop + container.clientHeight >=
          container.scrollHeight - 150 &&
        hasMore &&
        !loading &&
        !newPageShouldBeLoadedRef.current
      ) {
        newPageShouldBeLoadedRef.current = true
        setLoading(true)
        setPage((prev: number) => prev + 1)
      }
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [hasMore])

  useOutsideClick(containerRef as React.RefObject<HTMLElement>, () => {
    if(inputIsFocusedRef.current) {
      return
    }
    close()
  })

  return (
    <Dialog>
      <ul
        ref={containerRef}
        className="absolute w-xs bg-white border rounded shadow mt-1 z-10 max-h-[310px] overflow-auto"
      >
        <span className="relative">
          <X
            className="sticky top-2 left-70 z-50 cursor-pointer"
            onClick={close}
          />
        </span>
        {(!loading || (loading && page !== 1)) &&
          suggestions.map((user) => (
            <UserSuggestionItem key={user.id} user={user} onSelect={onSelect} />
          ))}
        {loading && <UserSuggestionSkeleton count={skeletonCount} />}
        {!loading && suggestions.length === 0 && query.length > 0 && (
          <UserSuggestionsEmpty />
        )}
      </ul>
    </Dialog>
  )
}
