
export type ParamsType = {
  user: string
  repo: string
}

export type GitHubRepoDetails =  {
  id: number
  name: string
  description: string | null
  owner: {
    login: string
    avatar_url: string
  }
  stargazers_count: number
  forks_count: number
  language: string | null
  html_url: string
}

export async function getRepo(params: ParamsType) {
  try {
    const res: Response = await fetch(`https://api.github.com/repos/${params.user}/${params.repo}`, {
      next: { revalidate: 60 }, // optional: ISR for 60 seconds
    })
    if (!res.ok) {
      throw new Error('Failed to fetch repo')
    }
    const data = await res.json()
    return data as GitHubRepoDetails
  }catch (error) {
    console.error('Error fetching repo:', error)
    if (error instanceof Error) {
      throw new Error(error.message || 'Something went wrong')
    } else {
      throw new Error('Something went wrong')
    }    
  }
}