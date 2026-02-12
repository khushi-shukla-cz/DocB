
# RecruitEco - Recruiting Production Line Manager Selection System

## Project Overview
RecruitEco is a full-stack evaluation system built to rank candidates for a Recycling Production Line Manager role. It features a mock AI assessment engine, a real-time leaderboard, and detailed candidate analytics.

## Tech Stack
- **Frontend**: React + Vite, Tailwind CSS, Shadcn/UI, Recharts, Framer Motion
- **Backend**: Node.js + Express
- **Database**: SQLite with Drizzle ORM
- **Mock Data**: Faker.js

## Prerequisites
- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
The project uses SQLite, which requires no separate database server installation.

**Push the schema to create the database:**
```bash
npm run db:push
```

**Seed the database with sample candidate data:**
```bash
npm run db:seed
```

This will populate the database with 40 candidate profiles.

### 3. Run the Application
**Start the development server:**
```bash
npm run dev
```

The application will be available at: **http://localhost:5000**

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run db:push` - Push database schema changes
- `npm run db:seed` - Seed database with sample data
- `npm run check` - Run TypeScript type checking

## Project Structure
```
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities
├── server/              # Backend Express server
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API routes
│   ├── db.ts            # Database connection
│   └── seed.ts          # Database seeding script
├── shared/              # Shared types and schemas
│   └── schema.ts        # Database schema
└── db_scripts/          # SQL reference files

```

## AI Evaluation & Ranking
- **Prompts**: Located in `ai/prompts.md`
- **Scoring**: Candidates are evaluated on Crisis Management (40%), Sustainability (30%), and Team Motivation (30%)
- **Ranking**: The leaderboard automatically updates based on the weighted average of these scores

## Features
- 📊 Real-time candidate leaderboard
- 🎯 AI-powered candidate evaluation
- 📈 Detailed analytics and scoring breakdowns
- 🎨 Modern, responsive UI with Shadcn/UI components
- 🔍 Candidate search and filtering

## Assumptions & Tradeoffs
- **Mock AI**: To avoid API costs, responses are generated using structured templates in the backend
- **Ranking Logic**: Updates are performed per-evaluation to ensure the leaderboard is always current
- **UI Components**: Used Shadcn/UI for professional visual clarity as per assignment preference for modern dashboards
- **Database**: Switched from PostgreSQL to SQLite for easier local development and portability
