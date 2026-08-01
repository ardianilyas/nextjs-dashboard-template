"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { RevenueBarData } from "@/types/dashboard";
import { revenueAnalyticsData } from "@/data/dashboard-config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RevenueChartProps {
  data?: RevenueBarData[];
}

export function RevenueChart({ data = revenueAnalyticsData }: RevenueChartProps) {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(2); // Default 'Sun'
  const [period, setPeriod] = useState("This Week");

  const maxVal = 30000;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100/80 shadow-2xs flex flex-col justify-between h-full">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          Revenue analytics
        </h3>

        {/* Period Selector Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-all cursor-pointer">
              <span>{period}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setPeriod("This Week")}>
              This Week
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPeriod("Last Week")}>
              Last Week
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setPeriod("This Month")}>
              This Month
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Chart Canvas Area */}
      <div className="relative w-full h-64 pt-6 pb-2">
        {/* Background Grid Y-axis lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6 text-xs text-slate-400 font-medium">
          {["30k", "25k", "20k", "15k", "10k", "5k", "0k"].map((label, idx) => (
            <div key={idx} className="flex items-center space-x-3 w-full">
              <span className="w-7 text-left text-[11px] text-slate-400">{label}</span>
              <div className="flex-1 border-b border-dashed border-slate-200" />
            </div>
          ))}
        </div>

        {/* Bars Container */}
        <div className="relative pl-10 h-full flex items-end justify-between pr-2">
          {data.map((item, index) => {
            const heightPercent = Math.min(100, (item.value / maxVal) * 100);
            const isSelected = selectedDayIndex === index;

            return (
              <div
                key={item.day}
                onClick={() => setSelectedDayIndex(index)}
                className="relative flex flex-col items-center group cursor-pointer h-full justify-end"
                style={{ width: "12%" }}
              >
                {/* Floating Tooltip Pill for Active Bar */}
                {isSelected && (
                  <div className="absolute -top-3 z-20 flex flex-col items-center animate-in fade-in zoom-in-95 duration-150">
                    <div className="bg-[#136650] text-white text-xs font-bold px-3 py-1 rounded-xl shadow-md shadow-emerald-900/30 whitespace-nowrap">
                      {item.formattedValue}
                    </div>
                    {/* Circle Dot Indicator matching image */}
                    <div className="w-3.5 h-3.5 rounded-full bg-white border-2 border-[#136650] -mt-0.5 shadow-xs" />
                  </div>
                )}

                {/* Textured Bar */}
                <div
                  className={`w-full rounded-2xl transition-all duration-300 relative overflow-hidden ${
                    isSelected
                      ? "bg-striped-green-dark ring-2 ring-[#136650] ring-offset-2 scale-102"
                      : "bg-striped-green hover:bg-striped-green-dark opacity-95 hover:opacity-100"
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />

                {/* X-axis Day Label */}
                <span
                  className={`mt-3 text-xs font-medium transition-colors ${
                    isSelected ? "text-slate-900 font-bold" : "text-slate-500"
                  }`}
                >
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
