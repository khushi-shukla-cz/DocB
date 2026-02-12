import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface MetricCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
  delay?: number;
}

export function MetricCard({ 
  label, 
  value, 
  icon, 
  trend, 
  trendValue, 
  className,
  delay = 0 
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cn(
        "bg-card rounded-2xl p-6 shadow-sm border border-border/50",
        "hover:shadow-lg hover:border-primary/20 transition-all duration-300",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <h3 className="text-3xl font-bold font-display tracking-tight text-foreground">{value}</h3>
        </div>
        {icon && (
          <div className="p-3 bg-primary/10 rounded-xl text-primary">
            {icon}
          </div>
        )}
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className={cn(
            "font-medium px-2 py-0.5 rounded-full text-xs",
            trend === "up" && "text-emerald-700 bg-emerald-100",
            trend === "down" && "text-rose-700 bg-rose-100",
            trend === "neutral" && "text-blue-700 bg-blue-100",
          )}>
            {trendValue}
          </span>
          <span className="text-muted-foreground">vs last month</span>
        </div>
      )}
    </motion.div>
  );
}
