# Frontend

React/Next.js frontend for the Learning Path Recommender.

## Structure

```
app/          # Next.js app router pages
components/   # Reusable UI components
lib/          # Utility functions and API client
types/        # TypeScript type definitions
mocks/        # Mock data for development
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp ../.env.example .env.local
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
