"use client"

import { useState, useEffect } from "react"
import {
  Shield,
  Calendar,
  Type,
  AlertTriangle,
  Users,
  BarChart3,
  Search,
  Newspaper,
  Box,
  GitBranch,
  Target,
  ShieldCheck,
  Network,
  BarChart2,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const navigation = [
  {
    title: "Vulnerabilities",
    items: [
      { title: "By Date", icon: Calendar, href: "#" },
      { title: "By Type", icon: Type, href: "#" },
      { title: "Known Exploited", icon: AlertTriangle, href: "#" },
      { title: "Assigners", icon: Users, href: "#" },
      { title: "CVSS Scores", icon: BarChart3, href: "#" },
      { title: "EPSS Scores", icon: BarChart3, href: "#" },
      { title: "Search", icon: Search, href: "#" },
    ],
  },
  {
    title: "Vulnerable Software",
    items: [
      { title: "Vendors", icon: Shield, href: "#" },
      { title: "Products", icon: Box, href: "#" },
      { title: "Version Search", icon: Search, href: "#" },
    ],
  },
  {
    title: "Vulnerability Intel.",
    items: [
      { title: "Newsfeed", icon: Newspaper, href: "#" },
      { title: "Open Source Vulns", icon: GitBranch, href: "#" },
      { title: "Emerging", icon: AlertTriangle, href: "#" },
    ],
  },
  {
    title: "Attack Vectors",
    items: [
      { title: "Common Vectors", icon: Target, href: "#" },
      { title: "Emerging Threats", icon: AlertTriangle, href: "#" },
      { title: "Mitigation Strategies", icon: ShieldCheck, href: "#" },
    ],
  },
  {
    title: "Decision Trees",
    items: [
      { title: "Vulnerability Assessment", icon: GitBranch, href: "#" },
      { title: "Incident Response", icon: Network, href: "#" },
      { title: "Risk Prioritization", icon: BarChart2, href: "#" },
    ],
  },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen || !isMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="h-full overflow-y-auto p-4">
          {navigation.map((section) => (
            <div key={section.title} className="mb-4">
              <h2 className="mb-2 text-sm font-semibold text-muted-foreground">{section.title}</h2>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    onClick={() => isMobile && setIsOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}

