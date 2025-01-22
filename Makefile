.PHONY: up down logs logs-frontend logs-backend build rebuild clean

# Docker Compose commands
up:
	docker-compose up -d

down:
	docker-compose down

# Logging commands
logs:
	docker-compose logs -f

logs-frontend:
	docker-compose logs -f frontend

logs-backend:
	docker-compose logs -f backend

# Build commands
build:
	docker-compose build

rebuild:
	docker-compose build --no-cache

# Cleanup commands
clean:
	docker-compose down -v
	docker system prune -f

# Development commands
dev-frontend:
	cd frontend && npm run dev

dev-backend:
	cd backend && go run main.go

# Status command
status:
	docker-compose ps

# Helper command
help:
	@echo "Available commands:"
	@echo "  up              - Start all containers in detached mode"
	@echo "  down            - Stop all containers"
	@echo "  logs            - View logs from all containers"
	@echo "  logs-frontend   - View frontend logs"
	@echo "  logs-backend    - View backend logs"
	@echo "  build           - Build all containers"
	@echo "  rebuild         - Rebuild all containers without cache"
	@echo "  clean           - Remove all containers and prune system"
	@echo "  dev-frontend    - Run frontend in development mode"
	@echo "  dev-backend     - Run backend in development mode"
	@echo "  status          - Show status of containers" 