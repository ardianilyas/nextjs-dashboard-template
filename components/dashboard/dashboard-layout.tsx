"use client";

import React, { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { CommandSearchDialog } from "./command-search-dialog";
import { UserProfile, NavGroup } from "@/types/dashboard";

interface DashboardLayoutProps {
  children?: React.ReactNode;
  title?: string;
  user?: UserProfile;
  navigationGroups?: NavGroup[];
  activeNavId?: string;
  onSelectNav?: (id: string) => void;
  headerAction?: React.ReactNode;
}

export function DashboardLayout({
  children,
  title = "Sales Overview",
  user,
  navigationGroups,
  activeNavId = "dashboard",
  onSelectNav,
  headerAction,
}: DashboardLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F8] text-slate-900 flex p-3 sm:p-5 font-sans items-start">
      {/* Desktop Sticky Sidebar */}
      <div className="hidden lg:block shrink-0 sticky top-5">
        <Sidebar
          navigationGroups={navigationGroups}
          activeId={activeNavId}
          onSelectNav={onSelectNav}
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-10 p-3 max-w-xs w-full">
            <Sidebar
              navigationGroups={navigationGroups}
              activeId={activeNavId}
              onSelectNav={onSelectNav}
              onCloseMobile={() => setMobileSidebarOpen(false)}
              className="h-full w-full static top-0"
            />
          </div>
        </div>
      )}

      {/* Main Right Content Layout Area */}
      <main className="flex-1 flex flex-col min-w-0 lg:pl-5 transition-all duration-300">
        {/* Header Bar with PanelLeft Toggle */}
        <Header
          user={user}
          onOpenSearch={() => setSearchDialogOpen(true)}
          onToggleSidebar={handleToggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        {/* Dynamic Title Bar */}
        {title && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 px-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              {title}
            </h1>
            {headerAction}
          </div>
        )}

        {/* Main Children / Page Content Slot */}
        <div className="flex-1 space-y-6">{children}</div>
      </main>

      {/* Global Cmd+K Search Dialog */}
      <CommandSearchDialog
        open={searchDialogOpen}
        onOpenChange={setSearchDialogOpen}
      />
    </div>
  );
}
