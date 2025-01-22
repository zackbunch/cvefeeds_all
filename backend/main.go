package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type CVE struct {
	ID          string  `json:"id"`
	Description string  `json:"description"`
	Severity    float64 `json:"severity"`
	Published   string  `json:"published"`
	LastMod     string  `json:"last_modified"`
}

func main() {
	http.HandleFunc("/api/top-cves", handleTopCVEs)
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
