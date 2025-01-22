import { NavBar } from "@/components/nav-bar"
import { Search } from "@/components/search"
import { Sidebar } from "@/components/sidebar"
import { StatsDonut } from "@/components/stats-donut"
import { ExploitedVulnerabilities } from "@/components/exploited-vulnerabilities"
import { CvssDistribution } from "@/components/cvss-distribution"
import { VulnerabilityTrends } from "@/components/vulnerability-trends"
import { RemediationTips } from "@/components/remediation-tips"
import { ExportButton } from "@/components/export-button"

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4 lg:ml-64">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h1 className="text-2xl font-bold mb-4 sm:mb-0">Vulnerability Dashboard</h1>
              <ExportButton />
            </div>
            <Search />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="md:col-span-2">
                <div className="bg-white rounded-lg shadow p-4">
                  <h2 className="text-xl font-semibold mb-4">New/Updated CVEs</h2>
                  <StatsDonut />
                </div>
              </div>
              <div>
                <div className="bg-white rounded-lg shadow p-4">
                  <h2 className="text-xl font-semibold mb-4">Known Exploited Vulnerabilities</h2>
                  <ExploitedVulnerabilities />
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="bg-white rounded-lg shadow p-4">
                  <h2 className="text-xl font-semibold mb-4">Distribution of vulnerabilities by CVSS scores</h2>
                  <CvssDistribution />
                </div>
              </div>
              <div>
                <div className="bg-white rounded-lg shadow p-4">
                  <h2 className="text-xl font-semibold mb-4">Remediation & Mitigation Tips</h2>
                  <RemediationTips />
                </div>
              </div>
              <div className="md:col-span-3">
                <div className="bg-white rounded-lg shadow p-4">
                  <h2 className="text-xl font-semibold mb-4">Vulnerabilities by type & year</h2>
                  <VulnerabilityTrends />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

