"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DateRangePicker } from "@/components/dashboard/date-range-picker";
import { Layout } from "lucide-react";

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("dashboard");

  return (
    <DashboardLayout
      title={
        activeNav === "dashboard"
          ? "Sales Overview"
          : `${activeNav.charAt(0).toUpperCase() + activeNav.slice(1)}`
      }
      activeNavId={activeNav}
      onSelectNav={(id) => setActiveNav(id)}
      headerAction={<DateRangePicker />}
    >
      {/* Blank Dashboard Page Content Template Placeholder */}
      <div className="w-full min-h-[520px] bg-white rounded-3xl border-2 border-dashed border-slate-200/80 p-8 flex flex-col items-center justify-center text-center space-y-4 shadow-2xs">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#136650] border border-emerald-100 flex items-center justify-center">
          <Layout className="w-7 h-7" />
        </div>
        <div className="max-w-md space-y-1">
          <h3 className="text-lg font-bold text-slate-900">
            Dashboard Content Area
          </h3>
          <p className="text-xs text-slate-400">
            This blank card placeholder is ready for your web application theme
            content, widgets, tables, or analytics.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
