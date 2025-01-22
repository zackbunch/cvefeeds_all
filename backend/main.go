package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"
)

type CVE struct {
	ID          string  `json:"id"`
	Description string  `json:"description"`
	Severity    float64 `json:"severity"`
	Published   string  `json:"published"`
	LastMod     string  `json:"last_modified"`
}

type NewsItem struct {
	Title       string    `json:"title"`
	Description string    `json:"description"`
	URL         string    `json:"url"`
	Source      string    `json:"source"`
	PublishedAt time.Time `json:"publishedAt"`
}

func main() {
	http.HandleFunc("/api/top-cves", handleTopCVEs)
	http.HandleFunc("/api/security-news", handleSecurityNews)
	log.Println("Starting server on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func handleTopCVEs(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// TODO: Implement actual CVE fetching logic
	// This is just example data
	cves := []CVE{
		{
			ID:          "CVE-2024-0001",
			Description: "Example vulnerability description",
			Severity:    9.8,
			Published:   "2024-03-20T00:00:00Z",
			LastMod:     "2024-03-21T00:00:00Z",
		},
	}

	json.NewEncoder(w).Encode(cves)
}

func handleSecurityNews(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// Example news data - we'll replace this with real API calls later
	news := []NewsItem{
		{
			Title:       "Major Security Vulnerability Found in Popular Framework",
			Description: "Researchers have discovered a critical vulnerability affecting millions of users...",
			URL:         "https://example.com/security-news/1",
			Source:      "Security Weekly",
			PublishedAt: time.Now().Add(-24 * time.Hour),
		},
		{
			Title:       "New Ransomware Strain Targets Healthcare Sector",
			Description: "A sophisticated ransomware operation has been detected targeting healthcare institutions...",
			URL:         "https://example.com/security-news/2",
			Source:      "Threat Post",
			PublishedAt: time.Now().Add(-48 * time.Hour),
		},
	}

	json.NewEncoder(w).Encode(news)
}
