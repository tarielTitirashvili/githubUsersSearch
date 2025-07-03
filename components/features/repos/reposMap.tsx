import { GitHubRepo } from '@/API'
import React from 'react'
import RepoCard from './repoCard'
import RepoSkeleton from './repoSkeleton'

type Props = {
  repos: GitHubRepo[]
  loading: boolean
}

const ReposMap = (props: Props) => {
  const { repos, loading } = props
  return (
    <>
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
      {loading && <RepoSkeleton count={7} />}
    </>
  )
}

export default ReposMap
