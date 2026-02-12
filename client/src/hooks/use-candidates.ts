import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type Candidate, type Evaluation, type Ranking } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

// Types from schema that might be inferred differently
export interface CandidateWithDetails extends Candidate {
  ranking?: Ranking;
  evaluation?: Evaluation;
}

// GET /api/candidates
export function useCandidates() {
  return useQuery({
    queryKey: [api.candidates.list.path],
    queryFn: async () => {
      const res = await fetch(api.candidates.list.path);
      if (!res.ok) throw new Error("Failed to fetch candidates");
      const data = await res.json();
      return api.candidates.list.responses[200].parse(data);
    },
  });
}

// GET /api/candidates/:id
export function useCandidate(id: number) {
  return useQuery({
    queryKey: [api.candidates.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.candidates.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch candidate details");
      const data = await res.json();
      return api.candidates.get.responses[200].parse(data);
    },
    enabled: !!id,
  });
}

// GET /api/leaderboard
export function useLeaderboard() {
  return useQuery({
    queryKey: [api.leaderboard.list.path],
    queryFn: async () => {
      const res = await fetch(api.leaderboard.list.path);
      if (!res.ok) throw new Error("Failed to fetch leaderboard");
      const data = await res.json();
      return api.leaderboard.list.responses[200].parse(data);
    },
  });
}

// POST /api/candidates/:id/evaluate
export function useEvaluateCandidate() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.evaluations.create.path, { id });
      const res = await fetch(url, {
        method: "POST",
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Evaluation failed");
      }
      
      const data = await res.json();
      return api.evaluations.create.responses[201].parse(data);
    },
    onSuccess: (_, id) => {
      // Invalidate relevant queries to refresh UI
      queryClient.invalidateQueries({ queryKey: [api.candidates.get.path, id] });
      queryClient.invalidateQueries({ queryKey: [api.leaderboard.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.candidates.list.path] });
      
      toast({
        title: "Evaluation Complete",
        description: "AI analysis has been successfully generated.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Evaluation Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}
