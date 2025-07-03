import { GitHubRepo } from '@/API'
import CustomAvatar from '@/components/shared/avatar'
import { Computer, Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  repos: GitHubRepo[]
}

const Repos = (props: Props) => {
  const { repos } = props

  return (
    <div>
      <ul className="flex flex-col gap-2 overflow-auto h-[50vh] max-w-[340px]">
        {repos.length > 0 && (
          <>
            <Computer />
            <h3>
              {repos.length > 0
                ? 'Repos off user ' + repos[0].owner.login
                : 'Repos'}
            </h3>
            {repos.map((repo) => (
              <Link
                href={`/${repo.owner.login}/${repo.name}`}
                key={repo.id}
                className="block border rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition p-4"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="shrink-0">
                    <CustomAvatar
                      src={repo.owner.avatar_url}
                      alt={`Avatar of ${repo.owner.login}`}
                      fallback={`avatar picture for ${repo.owner.login}`}
                    />
                  </div>
                  {/* Repo Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h2 className="text-lg font-semibold text-gray-900">
                        {repo.name}
                      </h2>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          window.open(
                            repo.html_url,
                            '_blank',
                            'noopener noreferrer'
                          )
                        }}
                        className="text-sm text-blue-500 hover:underline"
                      >
                        Open
                      </button>
                    </div>

                    {repo.description && (
                      <p className="text-sm text-gray-700 mt-1">
                        {repo.description}
                      </p>
                    )}

                    {/* Stars */}
                    <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
                      <Star width={15} />
                      {repo.stargazers_count}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}
      </ul>
    </div>
  )
}

export default Repos
