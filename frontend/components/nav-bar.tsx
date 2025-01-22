'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl">
              cvefeeds
            </Link>
          </div>
          <div className="hidden sm:flex items-center">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/pricing">Pricing</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/api">API</Link>
            </Button>
          </div>
          <div className="sm:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/pricing">Pricing</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/api">API</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}

