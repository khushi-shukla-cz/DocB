
import { z } from 'zod';
import { insertCandidateSchema, insertEvaluationSchema, candidates, evaluations, rankings } from './schema';

export const errorSchemas = {
  notFound: z.object({ message: z.string() }),
  validation: z.object({ message: z.string(), field: z.string().optional() }),
  internal: z.object({ message: z.string() }),
};

export const api = {
  candidates: {
    list: {
      method: 'GET' as const,
      path: '/api/candidates' as const,
      responses: {
        200: z.array(z.custom<any>()), // Returns CandidateWithRanking[]
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/candidates/:id' as const,
      responses: {
        200: z.custom<any>(), // Returns CandidateWithRanking
        404: errorSchemas.notFound,
      },
    },
  },
  evaluations: {
    create: {
      method: 'POST' as const,
      path: '/api/candidates/:id/evaluate' as const,
      responses: {
        201: z.custom<typeof evaluations.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  leaderboard: {
    list: {
      method: 'GET' as const,
      path: '/api/leaderboard' as const,
      responses: {
        200: z.array(z.custom<any>()), // Returns top candidates with rankings
      },
    },
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
