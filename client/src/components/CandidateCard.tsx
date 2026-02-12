import { motion } from "framer-motion";
import { Link } from "wouter";
import { CandidateWithDetails } from "@/hooks/use-candidates";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Briefcase, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface CandidateCardProps {
  candidate: CandidateWithDetails;
  rank: number;
}

export function CandidateCard({ candidate, rank }: CandidateCardProps) {
  const isTopThree = rank <= 3;
  const overallScore = candidate.ranking?.overallScore 
    ? Math.round(candidate.ranking.overallScore) 
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300",
        "hover:shadow-lg hover:border-primary/20",
        isTopThree && "border-primary/30 bg-gradient-to-br from-card to-accent/20"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl font-display text-xl font-bold shadow-sm",
            rank === 1 ? "bg-amber-100 text-amber-700" :
            rank === 2 ? "bg-slate-100 text-slate-700" :
            rank === 3 ? "bg-orange-100 text-orange-800" :
            "bg-secondary text-muted-foreground"
          )}>
            #{rank}
          </div>
          
          <div>
            <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {candidate.name}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase className="h-3.5 w-3.5" />
              <span>{candidate.yearsExperience} Years Exp.</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          {overallScore !== null ? (
            <div className="flex flex-col items-end">
              <span className="text-2xl font-bold text-foreground">{overallScore}</span>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Overall</span>
            </div>
          ) : (
            <Badge variant="outline" className="border-dashed">Pending Eval</Badge>
          )}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {candidate.skills.slice(0, 3).map((skill, i) => (
            <Badge key={i} variant="secondary" className="bg-secondary/50 font-normal">
              {skill}
            </Badge>
          ))}
          {candidate.skills.length > 3 && (
            <Badge variant="outline" className="bg-transparent text-muted-foreground font-normal">
              +{candidate.skills.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            {candidate.evaluation && (
              <>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Crisis</span>
                  <span className="font-mono text-sm font-medium">{candidate.evaluation.crisisScore}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Sustain</span>
                  <span className="font-mono text-sm font-medium">{candidate.evaluation.sustainabilityScore}</span>
                </div>
              </>
            )}
          </div>

          <Link href={`/candidates/${candidate.id}`}>
            <Button size="sm" className="rounded-full px-4 group-hover:translate-x-1 transition-transform duration-300">
              View Profile <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-2xl transition-all group-hover:from-primary/10" />
    </motion.div>
  );
}
