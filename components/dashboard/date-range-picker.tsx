"use client";

import React, { useState } from "react";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DateRangePickerProps {
  initialRange?: string;
  onRangeChange?: (range: string) => void;
}

export function DateRangePicker({
  initialRange = "April 10, 2026 - May 11, 2026",
  onRangeChange,
}: DateRangePickerProps) {
  const [selectedRange, setSelectedRange] = useState(initialRange);

  const ranges = [
    "April 10, 2026 - May 11, 2026",
    "Last 30 Days",
    "Last 7 Days",
    "This Month",
    "Year to Date (2026)",
  ];

  const handleSelect = (range: string) => {
    setSelectedRange(range);
    if (onRangeChange) onRangeChange(range);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center space-x-2 bg-white border border-slate-200/80 rounded-full px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-all cursor-pointer">
          <CalendarIcon className="w-4 h-4 text-slate-500" />
          <span>{selectedRange}</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        {ranges.map((range) => (
          <DropdownMenuItem
            key={range}
            onClick={() => handleSelect(range)}
            className={selectedRange === range ? "font-bold text-[#136650]" : ""}
          >
            {range}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
