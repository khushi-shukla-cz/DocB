
import { db } from "./db";
import { 
  candidates, evaluations, rankings, 
  type Candidate, type InsertCandidate,
  type Evaluation, type InsertEvaluation,
  type Ranking, type InsertRanking,
  type CandidateWithRanking
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Candidates
  getCandidates(): Promise<CandidateWithRanking[]>;
  getCandidate(id: number): Promise<CandidateWithRanking | undefined>;
  createCandidate(candidate: InsertCandidate): Promise<Candidate>;
  
  // Evaluations
  createEvaluation(evaluation: InsertEvaluation): Promise<Evaluation>;
  getEvaluation(candidateId: number): Promise<Evaluation | undefined>;
  
  // Rankings
  updateRanking(ranking: InsertRanking): Promise<Ranking>;
  getLeaderboard(): Promise<CandidateWithRanking[]>;
  
  // Seeding helper
  countCandidates(): Promise<number>;
}

export class DatabaseStorage implements IStorage {
  async getCandidates(): Promise<CandidateWithRanking[]> {
    const results = await db.select({
      candidate: candidates,
      ranking: rankings,
      evaluation: evaluations
    })
    .from(candidates)
    .leftJoin(rankings, eq(candidates.id, rankings.candidateId))
    .leftJoin(evaluations, eq(candidates.id, evaluations.candidateId));
    
    return results.map(row => ({
      ...row.candidate,
      ranking: row.ranking || undefined,
      evaluation: row.evaluation || undefined
    }));
  }

  async getCandidate(id: number): Promise<CandidateWithRanking | undefined> {
    const results = await db.select({
      candidate: candidates,
      ranking: rankings,
      evaluation: evaluations
    })
    .from(candidates)
    .leftJoin(rankings, eq(candidates.id, rankings.candidateId))
    .leftJoin(evaluations, eq(candidates.id, evaluations.candidateId))
    .where(eq(candidates.id, id));
    
    if (results.length === 0) return undefined;
    
    const row = results[0];
    return {
      ...row.candidate,
      ranking: row.ranking || undefined,
      evaluation: row.evaluation || undefined
    };
  }

  async createCandidate(candidate: InsertCandidate): Promise<Candidate> {
    const [newCandidate] = await db.insert(candidates).values({
      name: candidate.name,
      yearsExperience: candidate.yearsExperience,
      skills: candidate.skills,
    }).returning();
    return newCandidate;
  }

  async createEvaluation(evaluation: InsertEvaluation): Promise<Evaluation> {
    const [newEval] = await db.insert(evaluations).values(evaluation).returning();
    return newEval;
  }

  async getEvaluation(candidateId: number): Promise<Evaluation | undefined> {
    const [evalResults] = await db.select().from(evaluations).where(eq(evaluations.candidateId, candidateId));
    return evalResults;
  }

  async updateRanking(ranking: InsertRanking): Promise<Ranking> {
    // Upsert ranking
    const [updatedRanking] = await db.insert(rankings)
      .values(ranking)
      .onConflictDoUpdate({
        target: rankings.candidateId,
        set: { 
          overallScore: ranking.overallScore,
          rank: ranking.rank,
          updatedAt: new Date()
        }
      })
      .returning();
    return updatedRanking;
  }

  async getLeaderboard(): Promise<CandidateWithRanking[]> {
    const results = await db.select({
      candidate: candidates,
      ranking: rankings,
      evaluation: evaluations
    })
    .from(rankings)
    .innerJoin(candidates, eq(rankings.candidateId, candidates.id))
    .leftJoin(evaluations, eq(candidates.id, evaluations.candidateId))
    .orderBy(desc(rankings.overallScore))
    .limit(10); // Limit to top 10 for leaderboard
    
    return results.map(row => ({
      ...row.candidate,
      ranking: row.ranking,
      evaluation: row.evaluation || undefined
    }));
  }

  async countCandidates(): Promise<number> {
    const result = await db.select({ count: candidates.id }).from(candidates);
    return result.length;
  }
}

export const storage = new DatabaseStorage();
