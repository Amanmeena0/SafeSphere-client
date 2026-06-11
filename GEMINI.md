# Project Overview

SafeSphere is a civic-tech platform that allows citizens to file FIRs, view crime statistics, and access public safety resources.

## Tech Stack

Frontend:
- React
- TypeScript
- Tailwind CSS
- Mapbox GL JS

Backend:
- FastAPI
- PostgreSQL
- SQLAlchemy
- Redis
- Celery

## Code Standards

- Use TypeScript strict mode
- Use functional React components
- Prefer custom hooks for reusable logic
- Use async/await instead of promise chains
- Follow REST API conventions

## Frontend Structure

src/
├── components/
├── pages/
├── hooks/
├── services/
├── types/
└── utils/

## Backend Structure

app/
├── api/
├── services/
├── models/
├── schemas/
├── core/
└── workers/

## Commands

Frontend:
```bash
npm run dev
npm run build