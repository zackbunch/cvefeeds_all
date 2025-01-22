# CVE Tracker

CVE Tracker is a web application designed to provide users with the latest information on Common Vulnerabilities and Exposures (CVEs). The application fetches CVE data from an external RSS feed and allows users to search through historic CVE data.

## Features

- Display the latest CVEs from the CVE feed.
- Search functionality for historic CVE data.
- User-friendly interface with navigation and sidebar.
- Responsive design for mobile and desktop users.

## Tech Stack

- **Frontend**: 
  - React
  - Next.js
  - TypeScript
  - Tailwind CSS

- **Backend**: 
  - Go
  - Gin framework
  - PostgreSQL/MongoDB/Elasticsearch (depending on your choice)

## Installation

### Prerequisites

- Go (version 1.21 or higher)
- Node.js (version 14 or higher)


### Backend Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   go mod tidy
   ```

3. Run the backend server:
   ```bash
   go run main.go
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the frontend development server:
   ```bash
   npm run dev
   ```

## Usage

- Open your browser and navigate to `http://localhost:3000` to access the application.
- Use the sidebar to navigate between different sections, including the newsfeed for the latest CVEs.

## Screenshot

![Main Page Screenshot](/assets/dashboard.png)


## Acknowledgments

- [CVE Feed](https://cvefeed.io) for providing the CVE data.
- [Gin](https://github.com/gin-gonic/gin) for the web framework.
- [Next.js](https://nextjs.org/) for the frontend framework.