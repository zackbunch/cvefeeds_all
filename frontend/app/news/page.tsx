"use client";

import { useEffect, useState } from 'react';

interface CVEItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  severity?: string;
}

export default function NewsPage() {
  const [cves, setCVEs] = useState<CVEItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCVEs = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/latest-cves');
        if (!response.ok) {
          throw new Error('Failed to fetch CVEs');
        }
        const data = await response.json();
        console.log('Received CVE data:', data); // Debug log
        setCVEs(data);
      } catch (err) {
        console.error('Error fetching CVEs:', err); // Debug log
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCVEs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Latest CVEs</h1>
      <div className="grid gap-6">
        {cves.map((item, index) => {
          // Safely handle potentially undefined description
          const description = item?.description || '';
          
          // Extract severity from description if available
          const severityMatch = description.match(/Severity:<\/strong> ([\d.]+) \| ([A-Z]+)/);
          const severity = severityMatch ? severityMatch[2] : 'UNKNOWN';
          const severityScore = severityMatch ? severityMatch[1] : null;

          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">
                  <a href={item.link} target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 dark:text-blue-400 hover:underline">
                    {item.title || 'Untitled CVE'}
                  </a>
                </h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium
                  ${severity === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                    severity === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                    severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'}`}>
                  {severityScore ? `${severity} (${severityScore})` : severity}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4" 
                 dangerouslySetInnerHTML={{ __html: description }}></p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Published: {new Date(item.pubDate || '').toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 