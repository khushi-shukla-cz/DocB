
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// === TABLE DEFINITIONS ===

export const candidates = sqliteTable("candidates", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  yearsExperience: integer("years_experience").notNull(),
  // Storing skills as JSON string
  skills: text("skills", { mode: 'json' }).$type<string[]>().notNull(),
  createdAt: integer("created_at", { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const evaluations = sqliteTable("evaluations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  candidateId: integer("candidate_id").notNull().references(() => candidates.id),
  crisisScore: integer("crisis_management_score").notNull(),
  sustainabilityScore: integer("sustainability_score").notNull(),
  motivationScore: integer("team_motivation_score").notNull(),
  // Storing AI reasoning for display
  feedback: text("feedback").notNull(),
  evaluatedAt: integer("evaluated_at", { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

export const rankings = sqliteTable("rankings", {
  candidateId: integer("candidate_id").primaryKey().references(() => candidates.id),
  overallScore: real("overall_score").notNull(),
  rank: integer("rank").notNull(),
  updatedAt: integer("updated_at", { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// === RELATIONS ===

export const candidatesRelations = relations(candidates, ({ one, many }) => ({
  evaluation: one(evaluations, {
    fields: [candidates.id],
    references: [evaluations.candidateId],
  }),
  ranking: one(rankings, {
    fields: [candidates.id],
    references: [rankings.candidateId],
  }),
}));

export const evaluationsRelations = relations(evaluations, ({ one }) => ({
  candidate: one(candidates, {
    fields: [evaluations.candidateId],
    references: [candidates.id],
  }),
}));

export const rankingsRelations = relations(rankings, ({ one }) => ({
  candidate: one(candidates, {
    fields: [rankings.candidateId],
    references: [candidates.id],
  }),
}));

// === SCHEMAS ===

export const insertCandidateSchema = createInsertSchema(candidates).omit({ id: true, createdAt: true });
export const insertEvaluationSchema = createInsertSchema(evaluations).omit({ id: true, evaluatedAt: true });
export const insertRankingSchema = createInsertSchema(rankings).omit({ updatedAt: true });

// === TYPES ===

export type Candidate = typeof candidates.$inferSelect;
export type InsertCandidate = z.infer<typeof insertCandidateSchema>;

export type Evaluation = typeof evaluations.$inferSelect;
export type InsertEvaluation = z.infer<typeof insertEvaluationSchema>;

export type Ranking = typeof rankings.$inferSelect;
export type InsertRanking = z.infer<typeof insertRankingSchema>;

// Combined type for the dashboard
export type CandidateWithRanking = Candidate & {
  ranking?: Ranking;
  evaluation?: Evaluation;
};
