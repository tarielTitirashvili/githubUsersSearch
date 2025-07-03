import { BASE_URL, USERS_PER_PAGE } from './constants'

export type GitHubUser = {
  login: string
  id: number
  avatar_url: string
  html_url: string
  // add more fields as needed
}

type GitHubSearchResponse = {
  items: GitHubUser[]
  total_count: number
  incomplete_results: boolean
}

export const getUsersApi = async (
  searchKey: string,
  page: number = 1,
  setLoading: (value: boolean) => void,
  setErrorMessage: (value: string) => void,
  setSuggestions: (users: GitHubUser[]) => void,
  setPageCount: (count: number) => void
): Promise<GitHubUser[] | undefined> => {
  const reset = () => {
    setErrorMessage('')
    setSuggestions([])
  }
  if (!searchKey || searchKey.length === 0) {
    reset()
    return
  }
  try {
    setLoading(true)
    const response = await fetch(
      `${BASE_URL}/search/users?q=${searchKey}&per_page=${USERS_PER_PAGE}&page=${page}`,
      { method: 'GET' }
    )
    const data: GitHubSearchResponse = await response.json()
    setSuggestions(data.items || [])
    setPageCount(Math.ceil(data.total_count / USERS_PER_PAGE))

    if (!response.ok) {
      throw new Error(
        data.hasOwnProperty('errors')
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (data as any).message
          : // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (data as any).message || 'Something went wrong'
      )
    }

    setErrorMessage('')
  } catch (e) {
    console.error('Error fetching users:', e)
    setSuggestions([])
    if (e instanceof Error) {
      setErrorMessage(e.message || 'Something went wrong')
    } else {
      setErrorMessage('Something went wrong')
    }
    return
  } finally {
    setLoading(false)
  }
}

export type GitHubRepo = {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  owner: {
    login: string
    avatar_url: string
  }
}

export const fetchUserRepos = async (
  username: string,
  onSuccess: (repos: GitHubRepo[]) => void
) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${username}/repos`)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to fetch repositories')
    }

    const data = await response.json()
    onSuccess(data)
  } catch (error) {
    console.error('Error fetching repos:', error)
    return null
  }
}
