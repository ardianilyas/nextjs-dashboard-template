import React from "react";
import { StatCardData } from "@/types/dashboard";
import { StatCard } from "./stat-card";
import { statCardsData } from "@/data/dashboard-config";

interface StatsGridProps {
  stats?: StatCardData[];
}

export function StatsGrid({ stats = statCardsData }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <StatCard key={stat.id} data={stat} />
      ))}
    </div>
  );
}
