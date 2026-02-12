
-- Recruitment Production Line Manager Selection System - SQL Schema
-- MySQL Compatible

-- 1. Candidates Table
CREATE TABLE IF NOT EXISTS candidates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    years_experience INTEGER NOT NULL,
    skills JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Evaluations Table
CREATE TABLE IF NOT EXISTS evaluations (
    id SERIAL PRIMARY KEY,
    candidate_id INTEGER NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    crisis_management_score INTEGER NOT NULL CHECK (crisis_management_score BETWEEN 0 AND 100),
    sustainability_score INTEGER NOT NULL CHECK (sustainability_score BETWEEN 0 AND 100),
    team_motivation_score INTEGER NOT NULL CHECK (team_motivation_score BETWEEN 0 AND 100),
    feedback TEXT NOT NULL,
    evaluated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Rankings Table
CREATE TABLE IF NOT EXISTS rankings (
    candidate_id INTEGER PRIMARY KEY REFERENCES candidates(id) ON DELETE CASCADE,
    overall_score DOUBLE PRECISION NOT NULL,
    rank INTEGER NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_evaluations_candidate_id ON evaluations(candidate_id);
CREATE INDEX IF NOT EXISTS idx_rankings_overall_score ON rankings(overall_score DESC);
