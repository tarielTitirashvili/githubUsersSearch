// import Image from "next/image";
// import { Button } from "@/components/ui/button"

// import { Github } from 'lucide-react'
import { Suspense } from 'react'
import SearchRepos from './searchRepos'

export default function Home() {
  
  return (
    <main className='flex flex-col items-center justify-center min-h-screen p-4'>
      <form role='search'>
        {/* <Github /> */}
        <Suspense fallback={<div>Loading input...</div>}>
          <SearchRepos />
        </Suspense>
      </form>
    </main>
  );
}
