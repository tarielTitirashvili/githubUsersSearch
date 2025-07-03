"use client"

import Link from "next/link"
import { Github } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-black/80 border-b border-white/20 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 text-white font-semibold text-lg">
          <Github className="w-5 h-5" />
          <span>GitHub Finder</span>
        </Link>

        <nav className="space-x-4 text-white/80 text-sm">
          <Link href="/">Home</Link>
          {/* Future links can go here */}
        </nav>
      </div>
    </header>
  )
}