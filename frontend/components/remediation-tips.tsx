"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Tip = {
  id: string
  title: string
  description: string
  severity: "high" | "medium" | "low"
}

const mockTips: Tip[] = [
  {
    id: "1",
    title: "Update and Patch Regularly",
    description: "Ensure all systems and software are up-to-date with the latest security patches.",
    severity: "high",
  },
  {
    id: "2",
    title: "Implement Multi-Factor Authentication",
    description: "Enable MFA across all user accounts to add an extra layer of security.",
    severity: "high",
  },
  {
    id: "3",
    title: "Use Strong, Unique Passwords",
    description: "Enforce the use of complex passwords and consider using a password manager.",
    severity: "medium",
  },
]

export function RemediationTips() {
  const [tips, setTips] = useState(mockTips)

  const getSeverityIcon = (severity: Tip["severity"]) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "medium":
        return <Info className="h-5 w-5 text-yellow-500" />
      case "low":
        return <CheckCircle className="h-5 w-5 text-green-500" />
    }
  }

  return (
    <div className="space-y-4">
      {tips.map((tip) => (
        <Card key={tip.id}>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            {getSeverityIcon(tip.severity)}
            <CardTitle className="ml-2 text-base sm:text-lg">{tip.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm sm:text-base">{tip.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" className="w-full">
        View All Tips
      </Button>
    </div>
  )
}

