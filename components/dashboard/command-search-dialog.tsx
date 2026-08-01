"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Store, Users, LineChart, Settings, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CommandSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandSearchDialog({
  open,
  onOpenChange,
}: CommandSearchDialogProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  const quickLinks = [
    { label: "Sales Overview & Analytics", icon: <LineChart className="w-4 h-4 text-[#136650]" /> },
    { label: "Recent Product Store Items", icon: <Store className="w-4 h-4 text-blue-500" /> },
    { label: "Customer Directory & Insights", icon: <Users className="w-4 h-4 text-emerald-600" /> },
    { label: "Orders & Transaction Logs", icon: <ShoppingBag className="w-4 h-4 text-purple-500" /> },
    { label: "System & Store Settings", icon: <Settings className="w-4 h-4 text-slate-500" /> },
  ];

  const filteredLinks = quickLinks.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-4">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-base font-semibold text-slate-900">
            Quick Search & Navigation
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            autoFocus
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            icon={<Search className="w-4 h-4 text-slate-400" />}
            className="rounded-xl bg-slate-50 border-slate-200"
          />

          <div className="space-y-1 max-h-60 overflow-y-auto">
            <p className="px-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Quick Actions
            </p>
            {filteredLinks.length === 0 ? (
              <p className="px-3 py-4 text-xs text-slate-400 text-center">
                No matching results found
              </p>
            ) : (
              filteredLinks.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    alert(`Navigating to: ${item.label}`);
                    onOpenChange(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors text-left"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
