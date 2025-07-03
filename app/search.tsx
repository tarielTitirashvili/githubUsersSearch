'use client'
import React, { useEffect, useRef } from 'react'
import SearchInput from '@/components/features/search/searchInput'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from '@/hooks/debounce'
import { getUsersApi, GitHubUser } from '@/API'
import UserSuggestions from '@/components/features/userSuggestions/suggestions'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { AlertDialogDemo } from '@/components/shared/errorModal'

type Props = {
  query: string
  getRepos: (query: string) => void
  errorMessage: string
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  setQuery: React.Dispatch<React.SetStateAction<string>>
}

const Search = ({ getRepos, query, setQuery, errorMessage, setErrorMessage }: Props) => {
  const searchParams = useSearchParams()

  const [suggestions, setSuggestions] = useState<GitHubUser[]>([])
  const [loading, setLoading] = useState<boolean>(
    searchParams.get('search') ? true : false
  )
  const touchedRef = useRef<boolean>(false)
  const searchClicked = useRef<boolean>(false)
  const router = useRouter()
  // pagination
  const [page, setPage] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>(1)
  const newPageShouldBeLoadedRef = useRef<boolean>(false)
  const [suggestionsOpen, setSuggestionsOpen] = useState<boolean>(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputIsFocusedRef = useRef<boolean>(false)

  const close = () => {
    touchedRef.current = false
    searchClicked.current = false
    setSuggestionsOpen(false)
  }

  useOutsideClick(inputRef as React.RefObject<HTMLElement>, () => {
    if (inputIsFocusedRef.current) {
      inputIsFocusedRef.current = false
      return
    }
  })

  const open = () => {
    inputIsFocusedRef.current = true
    setSuggestionsOpen(true)
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (query) {
      params.set('search', query)
    } else {
      params.delete('search')
    }
    router.replace(`?${params.toString()}`, { scroll: false })
  }, [query])

  useDebounce(
    [query],
    () => {
      if (!searchClicked.current) {
        if (!touchedRef.current && query.length) {
          touchedRef.current = true
        }
        if (touchedRef.current || query.length > 0) {
          getUsersApi(
            query,
            page,
            setLoading,
            setErrorMessage,
            setSuggestions,
            setPageCount
          )
        }
      } else {
        searchClicked.current = false
      }
    },
    300
  )
  useEffect(() => {
    if (newPageShouldBeLoadedRef.current) {
      getUsersApi(
        query,
        page,
        setLoading,
        setErrorMessage,
        (users: GitHubUser[]) => {
          newPageShouldBeLoadedRef.current = false
          setSuggestions((prev) => [...prev, ...users])
        },
        setPageCount
      )
    }
  }, [page])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (touchedRef.current) {
      setLoading(true)
    }
    setQuery(value)
  }

  const handleClickSearch = () => {
    searchClicked.current = true
    setLoading(true)
    getUsersApi(
      query,
      page,
      setLoading,
      setErrorMessage,
      setSuggestions,
      setPageCount
    )
  }

  const handleSelect = (username: string) => {
    getRepos(username)
    close()
    setQuery(username)
  }

  return (
    <div>
      {errorMessage && (
        <AlertDialogDemo
          errorMessage={errorMessage}
          onClose={() => {
            setErrorMessage('')
          }}
        />
      )}
      <div className="w-xs flex justify-center p-2">
        <SearchInput
          placeholder="Search GitHub Users"
          value={query}
          changeHandler={handleChange}
          searchClick={handleClickSearch}
          onFocus={open}
          inputRef={inputRef}
        />
      </div>
      {((suggestions.length > 0 && !errorMessage && suggestionsOpen) ||
        (suggestions.length === 0 && query.length > 0 && suggestionsOpen)) && (
        <UserSuggestions
          inputIsFocusedRef={inputIsFocusedRef}
          suggestions={suggestions}
          onSelect={handleSelect}
          loading={loading}
          page={page}
          query={query}
          setPage={setPage}
          hasMore={pageCount > page}
          setLoading={setLoading}
          newPageShouldBeLoadedRef={newPageShouldBeLoadedRef}
          close={close}
        />
      )}
    </div>
  )
}

export default Search
