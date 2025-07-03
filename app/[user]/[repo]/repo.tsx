import { getRepo, GitHubRepoDetails, ParamsType } from '@/API/user/repo'
import React from 'react'
import { notFound } from 'next/navigation'
import BackButton from '@/components/shared/backButton'
import Avatar from '@/components/shared/avatar'
import { GitBranch } from 'lucide-react'
import { Github } from 'lucide-react'

type Props = {
  repoParams: ParamsType
}

const Repo = async (props: Props) => {
  const { repoParams } = props

  let repo: GitHubRepoDetails | null = null

  try {
    repo = await getRepo(repoParams)
  } catch (error: unknown) {
    console.error('Failed to fetch repo:', error)

    if (error === 404) notFound()
  }

  if (!repo) {
    return notFound()
  }
  return (
    <div className="h-screen text-center w-full p-6">
      <BackButton />
      <div className="mt-4">
        <div className="flex justify-between gap-2 border-b-1 rounded-sm p-3">
          <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-md shadow-sm">
            <Avatar
              src={repo?.owner.avatar_url}
              alt={`${repo?.owner.login} avatar picture`}
              fallback={`${repo?.owner.login} avatar picture`}
            />
            <p className="text-base font-semibold text-gray-800">{repo.name}</p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <GitBranch className="text-gray-500" />
              <span className="font-medium">{repo.forks_count}</span>
              <span>Fork{repo.forks_count !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">⭐</span>
              <span className="font-medium">{repo.stargazers_count}</span>
              <span>Star{repo.stargazers_count !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
          <div className="space-y-2 text-sm text-gray-700 mt-2">
            <p className="flex items-center gap-2">
              <span className="text-yellow-500">⭐</span>
              <span className="font-medium">Description:</span>{' '}
              {repo.description || 'No description'}
            </p>
            <p className="flex items-center gap-2">
              <span className="text-yellow-500">💻</span>
              <span className="font-medium">Language:</span>{' '}
              {repo.language || 'N/A'}
            </p>
            <p className="flex items-center gap-2">
              <span className="text-yellow-500">👤</span>
              <span className="font-medium">Owner:</span> {repo.owner?.login}
            </p>
          </div>
          <a
            href={repo.html_url}
            target="_blank"
            className="inline-flex items-center justify-start gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 transition-colors mt-2"
          >
            <Github className="w-4 h-4" />
            View on GitHub
          </a>
      </div>
    </div>
  )
}

export default Repo
