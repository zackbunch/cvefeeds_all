package main

import (
	"encoding/xml"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
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

type CVEFeed struct {
	Items []CVEItem `xml:"channel>item"`
}

type CVEItem struct {
	Title       string `xml:"title" json:"title"`
	Link        string `xml:"link" json:"link"`
	Description string `xml:"description" json:"description"`
	PubDate     string `xml:"pubDate" json:"pubDate"`
}

var (
	cveCache      []CVEItem
	cacheMutex    sync.Mutex
	lastFetch     time.Time
	cacheDuration = 25 * time.Minute
)

func main() {
	r := gin.Default()

	// Enable CORS
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// API routes
	api := r.Group("/api")
	{
		api.GET("/top-cves", handleTopCVEs)
		api.GET("/latest-cves", handleLatestCVEs)
	}

	log.Println("Starting server on :8080")
	r.Run(":8080")
}

// Fetch the latest CVEs from the RSS feed
func fetchLatestCVEs() ([]CVEItem, error) {
	resp, err := http.Get("https://cvefeed.io/rssfeed/latest.xml")
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var feed CVEFeed
	if err := xml.NewDecoder(resp.Body).Decode(&feed); err != nil {
		return nil, err
	}

	return feed.Items, nil
}

func handleTopCVEs(c *gin.Context) {
	// Example data for now
	cves := []CVE{
		{
			ID:          "CVE-2024-0001",
			Description: "Example vulnerability description",
			Severity:    9.8,
			Published:   "2024-03-20T00:00:00Z",
			LastMod:     "2024-03-21T00:00:00Z",
		},
	}

	c.JSON(http.StatusOK, cves)
}

func handleLatestCVEs(c *gin.Context) {
	cacheMutex.Lock()
	defer cacheMutex.Unlock()

	// Check if cache is still valid
	if time.Since(lastFetch) <= cacheDuration && len(cveCache) > 0 {
		c.JSON(http.StatusOK, cveCache)
		return
	}

	// Fetch fresh data
	resp, err := http.Get("https://cvefeed.io/rssfeed/latest.xml")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch CVE feed"})
		return
	}
	defer resp.Body.Close()

	var feed CVEFeed
	if err := xml.NewDecoder(resp.Body).Decode(&feed); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse CVE feed"})
		return
	}

	// Update cache
	cveCache = feed.Items
	lastFetch = time.Now()

	c.JSON(http.StatusOK, cveCache)
}
