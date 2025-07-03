'use client'
import React, { Suspense, useEffect, useState } from 'react'
import Search from './search'
import Repos from './repos'
import { fetchUserRepos, GitHubRepo } from '@/API'
import { REPOS_PER_PAGE } from '@/API/constants'
import { useSearchParams } from 'next/navigation'

const SearchRepos = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [page, setPage] = useState<number>(1)
  const hasNextPageRef = React.useRef<boolean>(true)
  const searchParams = useSearchParams()
  const [query, setQuery] = useState<string>(searchParams.get('search') || '')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const checkHasNextPage = (reposLength: number) => {
    if (reposLength < REPOS_PER_PAGE && hasNextPageRef.current) {
      hasNextPageRef.current = false
    }
    if (reposLength === REPOS_PER_PAGE && !hasNextPageRef.current) {
      hasNextPageRef.current = true
    }
  }

  const getRepos = async (query: string) => {
    fetchUserRepos(
      query,
      1,
      (nextRepos) => {
        checkHasNextPage(nextRepos.length)
        setPage(1)
        setRepos(nextRepos)
      },
      (error) => {
        setErrorMessage(error?.message || 'Something went wrong')
      }
    )
  }

  useEffect(() => {
    if (page !== 1) {
      fetchUserRepos(
        query,
        page,
        (nextRepos) => {
          checkHasNextPage(nextRepos.length)
          setRepos((prevRepos) => [...prevRepos, ...nextRepos])
        },
        (error) => {
          setErrorMessage(error.message || 'Something went wrong')
        }
      )
    }
  }, [page])

  return (
    <div className="overflow-auto">
      <Suspense fallback={<div>Loading repos...</div>}>
        <Search
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          getRepos={getRepos}
          query={query}
          setQuery={setQuery}
        />
      </Suspense>
      <Suspense fallback={<div>Loading repos...</div>}>
        <Repos
          repos={repos}
          setPage={setPage}
          hasNextPageRef={hasNextPageRef}
        />
      </Suspense>
    </div>
  )
}

export default SearchRepos
