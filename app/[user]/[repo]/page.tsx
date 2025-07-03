// app/[user]/[repo]/page.tsx

import { ParamsType } from '@/API/user/repo'
import { Metadata } from 'next'
import React from 'react'
import Repo from './repo'

type Props = {
  params: ParamsType
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  // this function can also be asynchronous and based on request we can return metadata and this does't works in client side apps
  const repoParams = await props.params

  return {
    title: `github repo ${repoParams?.user ? repoParams.repo : ''}`,
  }
}

export default async function RepoPage({
  params,
}: {
  params: { user: string; repo: string }
}) {
  const repoParams: ParamsType = await params


  return (
    <main className="p-4">
      <h1 className="text-xl font-bold">
        <Repo repoParams={repoParams} />
        {
          // repo.full_name
        }
      </h1>

    </main>
  )
}
