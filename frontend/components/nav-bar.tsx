'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
  }

  return (
    <nav className="bg-gray-800 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white text-xl font-bold">CVE Tracker</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/"
                  className={`${isActive("/")} rounded-md px-3 py-2 text-sm font-medium`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/news"
                  className={`${isActive("/news")} rounded-md px-3 py-2 text-sm font-medium`}
                >
                  Newsfeed
                </Link>
                <Button variant="ghost" asChild>
                  <Link href="/login" className="text-white">Login</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/pricing" className="text-white">Pricing</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/api" className="text-white">API</Link>
                </Button>
              </div>
            </div>
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
              <Link href="/login" className="text-white">Login</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/pricing" className="text-white">Pricing</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/api" className="text-white">API</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}

