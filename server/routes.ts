
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { faker } from '@faker-js/faker';

// Mock AI Logic based on realistic rubrics
function mockAIEvaluation() {
  // Assumptions: 
  // 1. Crisis Management (40%) - Focuses on immediate safety and understaffed logistics.
  // 2. Sustainability (30%) - Focuses on waste stream optimization and ISO 14001.
  // 3. Team Motivation (30%) - Focuses on conflict resolution in high-stress shifts.
  const crisisScore = Math.floor(Math.random() * 41) + 60; 
  const sustainabilityScore = Math.floor(Math.random() * 41) + 60;
  const motivationScore = Math.floor(Math.random() * 41) + 60;
  
  // Ranking Logic: Weighted Average
  const overallScore = Number(((crisisScore * 0.4) + (sustainabilityScore * 0.3) + (motivationScore * 0.3)).toFixed(1));
  
  // Tradeoffs: Feedback is template-based for performance, simulating structured AI prompts.
  let feedback = "";
  if (overallScore > 90) feedback = "Exceptional candidate. Demonstrated proactive safety protocols and deep waste-stream optimization knowledge. High motivation potential.";
  else if (overallScore > 80) feedback = "Strong profile. Good technical grasp of recycling regulations, though crisis management was slightly reactive.";
  else feedback = "Average candidate. Solid foundation in sustainability but requires more experience in team leadership under pressure.";

  return { crisisScore, sustainabilityScore, motivationScore, overallScore, feedback };
}

// Seed Function
async function seedCandidates() {
  const count = await storage.countCandidates();
  if (count > 0) return;

  console.log("Seeding 40 candidates...");
  
  const RECYCLING_SKILLS = [
    "Safety Compliance", "Lean Manufacturing", "Waste Management", "Team Leadership",
    "ISO 14001", "Process Optimization", "Hazardous Material Handling", "Quality Control",
    "OSHA Standards", "Supply Chain Management", "Equipment Maintenance", "Data Analysis"
  ];

  for (let i = 0; i < 40; i++) {
    const skills = faker.helpers.arrayElements(RECYCLING_SKILLS, { min: 3, max: 5 });
    
    const candidate = await storage.createCandidate({
      name: faker.person.fullName(),
      yearsExperience: faker.number.int({ min: 1, max: 15 }),
      skills: skills
    });

    // Randomly evaluate some candidates initially
    if (Math.random() > 0.4) {
      const scores = mockAIEvaluation();
      await storage.createEvaluation({
        candidateId: candidate.id,
        crisisScore: scores.crisisScore,
        sustainabilityScore: scores.sustainabilityScore,
        motivationScore: scores.motivationScore,
        feedback: scores.feedback
      });

      await storage.updateRanking({
        candidateId: candidate.id,
        overallScore: scores.overallScore,
        rank: 0
      });
    }
  }

  // Initial ranking update
  const leaderboard = await storage.getLeaderboard();
  for (let i = 0; i < leaderboard.length; i++) {
    const cand = leaderboard[i];
    if (cand.ranking) {
      await storage.updateRanking({
        candidateId: cand.id,
        overallScore: cand.ranking.overallScore,
        rank: i + 1
      });
    }
  }

  console.log("Seeding complete.");
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Candidates List
  app.get(api.candidates.list.path, async (req, res) => {
    const candidates = await storage.getCandidates();
    res.json(candidates);
  });

  // Get Candidate
  app.get(api.candidates.get.path, async (req, res) => {
    const id = Number(req.params.id);
    const candidate = await storage.getCandidate(id);
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });
    res.json(candidate);
  });

  // Mock AI Evaluation
  app.post(api.evaluations.create.path, async (req, res) => {
    const id = Number(req.params.id);
    const candidate = await storage.getCandidate(id);
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

    // 1. Run Mock AI
    const scores = mockAIEvaluation();
    
    // 2. Save Evaluation
    const evaluation = await storage.createEvaluation({
      candidateId: id,
      crisisScore: scores.crisisScore,
      sustainabilityScore: scores.sustainabilityScore,
      motivationScore: scores.motivationScore,
      feedback: scores.feedback
    });

    // 3. Update Ranking
    // For simplicity, rank is just random for now or recalculated. 
    // In a real app, we'd query all scores and rank them.
    // Here we'll just save the score.
    await storage.updateRanking({
      candidateId: id,
      overallScore: scores.overallScore,
      rank: 0 // Placeholder, we'll need to re-rank everyone or just store score
    });

    // 4. Re-calculate Ranks for everyone (naive approach for small dataset)
    const leaderboard = await storage.getLeaderboard();
    // Update ranks based on sort order
    for (let i = 0; i < leaderboard.length; i++) {
      const cand = leaderboard[i];
      if (cand.ranking) {
        await storage.updateRanking({
          candidateId: cand.id,
          overallScore: cand.ranking.overallScore,
          rank: i + 1
        });
      }
    }

    res.status(201).json(evaluation);
  });

  // Leaderboard
  app.get(api.leaderboard.list.path, async (req, res) => {
    const leaderboard = await storage.getLeaderboard();
    res.json(leaderboard);
  });

  // Run seeding
  seedCandidates().catch(console.error);

  return httpServer;
}
