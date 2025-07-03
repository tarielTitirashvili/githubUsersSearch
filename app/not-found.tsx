import BackButton from "@/components/shared/backButton"
import React from "react"

function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen text-center w-full'>
      <h2>Page Not Found</h2>
      &nbsp;
      <h1>404 Error</h1>
      <hr />
      <BackButton />
    </div>
  )
}

export default NotFound