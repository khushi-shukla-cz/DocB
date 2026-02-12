import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';
import { Evaluation } from "@shared/schema";

interface CandidateRadarProps {
  evaluation: Evaluation;
}

export function CandidateRadar({ evaluation }: CandidateRadarProps) {
  const data = [
    {
      subject: 'Crisis Mgmt',
      A: evaluation.crisisScore,
      fullMark: 100,
    },
    {
      subject: 'Sustainability',
      A: evaluation.sustainabilityScore,
      fullMark: 100,
    },
    {
      subject: 'Team Motivation',
      A: evaluation.motivationScore,
      fullMark: 100,
    },
  ];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 600 }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={false} 
            axisLine={false} 
          />
          <Radar
            name="Score"
            dataKey="A"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            fill="hsl(var(--primary))"
            fillOpacity={0.2}
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '8px', 
              border: 'none', 
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
            }}
            formatter={(value) => [`${value}/100`, 'Score']}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
