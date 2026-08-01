"use client";

import React from "react";
import { IncomeBarData } from "@/types/dashboard";
import { incomeData } from "@/data/dashboard-config";

interface IncomeChartProps {
  data?: IncomeBarData[];
}

export function IncomeChart({ data = incomeData }: IncomeChartProps) {
  const maxVal = 50000;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100/80 shadow-2xs flex flex-col justify-between h-full">
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Total Income
          </h3>
          <p className="text-xs text-slate-400 font-normal">
            View your income in a certain period of time
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-4 text-xs text-slate-600 font-medium pt-1">
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-3.5 rounded-sm bg-striped-orange border border-orange-600/20" />
            <span>Profit</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-3.5 rounded-sm bg-slate-900" />
            <span>Loss</span>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative w-full h-64 pt-4 pb-2">
        {/* Y-axis grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6 text-xs text-slate-400 font-medium">
          {["50k", "40k", "30k", "20k", "10k", "0k"].map((label, idx) => (
            <div key={idx} className="flex items-center space-x-3 w-full">
              <span className="w-6 text-left text-[11px] text-slate-400">{label}</span>
              <div className="flex-1 border-b border-dashed border-slate-200" />
            </div>
          ))}
        </div>

        {/* Stacked Bars */}
        <div className="relative pl-9 h-full flex items-end justify-between pr-1">
          {data.map((item) => {
            const profitPercent = Math.min(100, (item.profit / maxVal) * 100);
            const lossPercent = Math.min(100, (item.loss / maxVal) * 100);

            return (
              <div
                key={item.month}
                className="group relative flex flex-col items-center h-full justify-end"
                style={{ width: "8.5%" }}
              >
                {/* Tooltip on hover */}
                <div className="absolute -top-10 hidden group-hover:flex z-20 flex-col items-center bg-slate-900 text-white text-[10px] p-2 rounded-lg shadow-lg whitespace-nowrap">
                  <div>Profit: ${item.profit.toLocaleString()}</div>
                  <div>Loss: ${item.loss.toLocaleString()}</div>
                </div>

                {/* Stacked Bar Container */}
                <div className="w-full flex flex-col justify-end items-center gap-1">
                  {/* Orange Striped Profit Section */}
                  <div
                    className="w-full bg-striped-orange rounded-t-xl transition-all duration-300 hover:opacity-90"
                    style={{ height: `${profitPercent}%` }}
                  />
                  {/* Dark Solid Loss Section */}
                  <div
                    className="w-full bg-slate-900 rounded-b-xl transition-all duration-300 hover:bg-slate-800"
                    style={{ height: `${lossPercent}%` }}
                  />
                </div>

                {/* Month Label */}
                <span className="mt-3 text-xs font-medium text-slate-500">
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
