import { useLeaderboard } from "@/hooks/use-candidates";
import { MetricCard } from "@/components/MetricCard";
import { CandidateCard } from "@/components/CandidateCard";
import { Users, Trophy, Activity, Leaf } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: candidates, isLoading } = useLeaderboard();

  // Calculate metrics
  const totalCandidates = candidates?.length || 0;
  const avgScore = candidates?.length 
    ? Math.round(candidates.reduce((acc, c) => acc + (c.ranking?.overallScore || 0), 0) / candidates.length)
    : 0;
  const highPotential = candidates?.filter(c => (c.ranking?.overallScore || 0) > 85).length || 0;

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      {/* Top Navigation / Hero */}
      <header className="bg-background border-b border-border sticky top-0 z-10 backdrop-blur-md bg-background/80">
        <div className="container mx-auto max-w-7xl px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display tracking-tight">RecruitEco</h1>
              <p className="text-xs text-muted-foreground font-medium">Production Manager Pipeline</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-primary">
              HR
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-4 py-8">
        {/* Intro */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold font-display mb-2">Dashboard Overview</h2>
          <p className="text-muted-foreground max-w-2xl">
            Track and evaluate candidates for the Recycling Production Line Manager role. 
            AI-driven insights help prioritize sustainability and crisis management skills.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <MetricCard 
            label="Total Candidates" 
            value={totalCandidates} 
            icon={<Users className="w-6 h-6" />}
            trend="up"
            trendValue="+2 this week"
            delay={0}
          />
          <MetricCard 
            label="Average Score" 
            value={avgScore} 
            icon={<Activity className="w-6 h-6" />}
            trend="neutral"
            trendValue="Stable"
            delay={0.1}
          />
          <MetricCard 
            label="High Potential (>85)" 
            value={highPotential} 
            icon={<Trophy className="w-6 h-6" />}
            trend="up"
            trendValue="+1 identified"
            delay={0.2}
          />
        </div>

        {/* Leaderboard Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-display flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              Candidate Leaderboard
            </h3>
            {/* Could add filters here later */}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 rounded-2xl bg-card border border-border animate-pulse" />
              ))}
            </div>
          ) : candidates?.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-3xl border border-dashed border-border">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-1">No Candidates Yet</h3>
              <p className="text-muted-foreground">Add candidates to the database to start evaluating.</p>
            </div>
          ) : (
            <motion.div 
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {candidates?.map((candidate, index) => (
                <CandidateCard 
                  key={candidate.id} 
                  candidate={candidate} 
                  rank={index + 1} 
                />
              ))}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
