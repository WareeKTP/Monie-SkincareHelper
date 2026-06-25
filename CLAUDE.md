# Project Context
When working with this codebase, prioritize readability over cleverness. Ask clarifying questions before making architectural changes.

## About This Project
This project is called "Monie" it is web application for Skincare routine helper
Frontend - React
Backend - TypeScript
API - Express.js
Database - PostgreSQL

## Key Directories
- `app/frontend/` - html and others relate to frontend 
- `app/backend/` - API route handlers and others relate to backend 
- `app/db/` - Database data and schema
- `design/` - For all Design and Planning

## Standards
- This project must be microservice-based
- Frontend and Backend use skill "ponytail" for prevent Over Engineering
- Frontend use skill "impeccable" to fix frontend and prevent AI Slop
- Use an existed design for building and ask user before making changes.

## Common Commands
```bash
docker-compose up # Deploy project
```

## Notes

All routes use `/api/v1` prefix. JWT tokens expire after 24 hours.