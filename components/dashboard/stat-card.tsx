import React from "react";
import {
  ShoppingCart,
  UserPlus,
  Package,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { StatCardData } from "@/types/dashboard";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  ShoppingCart: <ShoppingCart className="w-4 h-4 text-slate-700" />,
  UserPlus: <UserPlus className="w-4 h-4 text-slate-700" />,
  Package: <Package className="w-4 h-4 text-slate-700" />,
  DollarSign: <DollarSign className="w-4 h-4 text-slate-700" />,
};

interface StatCardProps {
  data: StatCardData;
}

export function StatCard({ data }: StatCardProps) {
  const isUp = data.trend.direction === "up";

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
      {/* Top Header: Title & Round Icon */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{data.title}</span>
        <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
          {iconMap[data.icon] || <ShoppingCart className="w-4 h-4 text-slate-700" />}
        </div>
      </div>

      {/* Value & Trend Pill */}
      <div className="flex items-baseline space-x-3">
        <span className="text-3xl font-extrabold tracking-tight text-slate-900">
          {data.value}
        </span>
        {data.trend && (
          <span
            className={cn(
              "inline-flex items-center space-x-0.5 px-2 py-0.5 rounded-full text-xs font-semibold",
              isUp
                ? data.id === "new-customer"
                  ? "bg-amber-50 text-amber-700 border border-amber-100/60"
                  : "bg-emerald-50 text-emerald-600 border border-emerald-100/60"
                : "bg-rose-50 text-rose-500 border border-rose-100/60"
            )}
          >
            {isUp ? (
              <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
            ) : (
              <ArrowDownRight className="w-3 h-3 stroke-[2.5]" />
            )}
            <span>{data.trend.percentage}</span>
          </span>
        )}
      </div>

      {/* Subtitle */}
      <p className="text-xs text-slate-400 font-normal">
        {data.subtitle}
      </p>
    </div>
  );
}
