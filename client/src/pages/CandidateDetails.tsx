import { useCandidate, useEvaluateCandidate } from "@/hooks/use-candidates";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles, BrainCircuit, Leaf, Users, AlertTriangle, Calendar } from "lucide-react";
import { CandidateRadar } from "@/components/CandidateRadar";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function CandidateDetails() {
  const { id } = useParams<{ id: string }>();
  const [_, setLocation] = useLocation();
  const { data: candidate, isLoading, error } = useCandidate(Number(id));
  const evaluateMutation = useEvaluateCandidate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground animate-pulse">Loading candidate profile...</p>
        </div>
      </div>
    );
  }

  if (error || !candidate) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <div className="p-4 rounded-full bg-destructive/10 text-destructive">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold">Candidate Not Found</h2>
        <Button variant="outline" onClick={() => setLocation("/")}>Back to Dashboard</Button>
      </div>
    );
  }

  const handleEvaluate = () => {
    evaluateMutation.mutate(Number(id));
  };

  const overallScore = candidate.ranking?.overallScore 
    ? Math.round(candidate.ranking.overallScore) 
    : 0;

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      {/* Header */}
      <div className="bg-background border-b border-border sticky top-0 z-10 backdrop-blur-md bg-background/80">
        <div className="container mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setLocation("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold font-display">{candidate.name}</h1>
              <p className="text-xs text-muted-foreground">Candidate ID: #{candidate.id}</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              {candidate.evaluation ? (
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                  <Sparkles className="w-3 h-3 mr-1" /> Evaluated
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  Pending Review
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Profile */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-3xl p-6 shadow-sm border border-border"
            >
              <div className="flex flex-col items-center text-center pb-6 border-b border-border">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl font-bold text-primary mb-4">
                  {candidate.name.charAt(0)}
                </div>
                <h2 className="text-2xl font-bold font-display">{candidate.name}</h2>
                <p className="text-muted-foreground">{candidate.yearsExperience} Years Experience</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  Applied {candidate.createdAt ? format(new Date(candidate.createdAt), 'MMM d, yyyy') : 'N/A'}
                </div>
              </div>
              
              <div className="pt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {(candidate.skills as string[]).map((skill: string, i: number) => (
                    <Badge key={i} variant="secondary" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>

            {candidate.ranking && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-primary text-primary-foreground rounded-3xl p-6 shadow-lg shadow-primary/20"
              >
                <h3 className="text-primary-foreground/80 font-medium mb-1">Overall Ranking</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold font-display">#{candidate.ranking.rank}</span>
                  <span className="text-lg opacity-80">Score: {overallScore}</span>
                </div>
                <p className="mt-4 text-sm text-primary-foreground/80 leading-relaxed">
                  Based on comprehensive AI analysis of crisis management, sustainability focus, and leadership capabilities.
                </p>
              </motion.div>
            )}
          </div>

          {/* Right Column: Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {!candidate.evaluation ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center bg-card rounded-3xl border border-dashed border-border p-8 text-center"
              >
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-6">
                  <BrainCircuit className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold font-display mb-2">Ready for Analysis</h3>
                <p className="text-muted-foreground max-w-md mb-8">
                  Run our AI model to evaluate {candidate.name} across crisis management, sustainability, and team motivation metrics.
                </p>
                <Button 
                  size="lg" 
                  onClick={handleEvaluate} 
                  disabled={evaluateMutation.isPending}
                  className="rounded-full px-8 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                >
                  {evaluateMutation.isPending ? (
                    <>Processing Analysis...</>
                  ) : (
                    <>Run AI Evaluation <Sparkles className="ml-2 w-4 h-4" /></>
                  )}
                </Button>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid gap-6"
                >
                  {/* Scores Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-6 rounded-3xl border-border bg-card shadow-sm">
                      <h3 className="font-semibold mb-6 flex items-center gap-2">
                        <BrainCircuit className="w-5 h-5 text-primary" />
                        Performance Radar
                      </h3>
                      <CandidateRadar evaluation={candidate.evaluation} />
                    </Card>

                    <div className="space-y-4">
                      <Card className="p-5 rounded-2xl border-border bg-card shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-red-100 text-red-600">
                              <AlertTriangle className="w-4 h-4" />
                            </div>
                            <span className="font-medium">Crisis Management</span>
                          </div>
                          <span className="font-bold text-lg">{candidate.evaluation.crisisScore}/100</span>
                        </div>
                        <Progress value={candidate.evaluation.crisisScore} className="h-2 bg-red-100 [&>div]:bg-red-500" />
                      </Card>

                      <Card className="p-5 rounded-2xl border-border bg-card shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                              <Leaf className="w-4 h-4" />
                            </div>
                            <span className="font-medium">Sustainability</span>
                          </div>
                          <span className="font-bold text-lg">{candidate.evaluation.sustainabilityScore}/100</span>
                        </div>
                        <Progress value={candidate.evaluation.sustainabilityScore} className="h-2 bg-emerald-100 [&>div]:bg-emerald-500" />
                      </Card>

                      <Card className="p-5 rounded-2xl border-border bg-card shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                              <Users className="w-4 h-4" />
                            </div>
                            <span className="font-medium">Team Motivation</span>
                          </div>
                          <span className="font-bold text-lg">{candidate.evaluation.motivationScore}/100</span>
                        </div>
                        <Progress value={candidate.evaluation.motivationScore} className="h-2 bg-blue-100 [&>div]:bg-blue-500" />
                      </Card>
                    </div>
                  </div>

                  {/* AI Feedback */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-card to-accent/20 rounded-3xl p-8 border border-border shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold font-display">AI Analysis Summary</h3>
                    </div>
                    <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed">
                      <p>{candidate.evaluation.feedback}</p>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
