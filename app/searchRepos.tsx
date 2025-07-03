'use client'
import React, { Suspense, useState } from 'react'
import Search from './search'
import Repos from './repos'
import { fetchUserRepos, GitHubRepo } from '@/API'

const SearchRepos = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([])

  const getRepos = async (query: string) => {
    fetchUserRepos(query, (repos) => {
      setRepos(repos)
    })
  }

  return (
    <div className="overflow-auto">
      <Suspense fallback={<div>Loading repos...</div>}>
        <Search getRepos={getRepos} />
      </Suspense>
      <Suspense fallback={<div>Loading repos...</div>}>
        <Repos repos={repos} />
      </Suspense>
    </div>
  )
}

export default SearchRepos
