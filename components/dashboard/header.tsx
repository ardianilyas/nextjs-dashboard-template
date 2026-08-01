"use client";

import React from "react";
import { Search, Bell, HelpCircle, ChevronDown, PanelLeft } from "lucide-react";
import { UserProfile } from "@/types/dashboard";
import { initialUserProfile } from "@/data/dashboard-config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  user?: UserProfile;
  onOpenSearch?: () => void;
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
}

export function Header({
  user = initialUserProfile,
  onOpenSearch,
  onToggleSidebar,
  isSidebarCollapsed,
}: HeaderProps) {
  return (
    <header className="w-full bg-white rounded-3xl px-4 sm:px-5 py-2.5 border border-slate-100 shadow-2xs flex items-center justify-between mb-6 shrink-0">
      {/* Left Area: Shadcn UI style PanelLeft Sidebar Toggle & Search */}
      <div className="flex items-center space-x-2.5 flex-1 max-w-md">
        {/* Collapsible Sidebar Toggle Button (No background, transparent style) */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100/80 hover:text-slate-900 transition-all cursor-pointer shrink-0"
            title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <PanelLeft className="w-4 h-4" />
          </button>
        )}

        {/* Mobile Search Icon Button (visible only on mobile sm:hidden) */}
        <button
          onClick={onOpenSearch}
          className="sm:hidden w-8.5 h-8.5 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-all shrink-0"
          title="Search product"
        >
          <Search className="w-3.5 h-3.5 text-slate-500" />
        </button>

        {/* Desktop / Tablet Search Bar Input Pill (hidden on mobile, visible on sm and up) */}
        <div
          onClick={onOpenSearch}
          className="hidden sm:flex w-full items-center justify-between bg-slate-50/80 border border-slate-200/70 rounded-full px-3.5 py-1.5 text-xs text-slate-500 cursor-pointer hover:bg-slate-100/60 hover:border-slate-300 transition-all"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400 font-medium text-xs">Search product</span>
          </div>
          <div className="flex items-center space-x-1 bg-white border border-slate-200/80 rounded-md px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 shadow-2xs">
            <span>K</span>
            <span>⌘</span>
          </div>
        </div>
      </div>

      {/* Header Right Actions */}
      <div className="flex items-center space-x-2 sm:space-x-2.5">
        {/* Notification Bell */}
        <button
          onClick={() => alert("No new notifications")}
          className="relative w-8.5 h-8.5 rounded-full bg-slate-50 border border-slate-200/70 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-all"
          title="Notifications"
        >
          <Bell className="w-3.5 h-3.5 text-slate-500" />
          <span className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-[#136650] ring-2 ring-white" />
        </button>

        {/* Help Center Icon */}
        <button
          onClick={() => alert("Help Desk Support")}
          className="w-8.5 h-8.5 rounded-full bg-slate-50 border border-slate-200/70 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-all"
          title="Help Center"
        >
          <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
        </button>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-2 bg-slate-50 border border-slate-200/70 rounded-full p-1 pr-2.5 hover:bg-slate-100 transition-all cursor-pointer outline-none">
              <div className="w-7 h-7 rounded-full bg-[#136650] flex items-center justify-center text-white font-bold text-[11px] overflow-hidden shrink-0">
                {user.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>OS</span>
                )}
              </div>
              <div className="text-left hidden md:block">
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  {user.name}
                </p>
                <p className="text-[10px] font-medium text-slate-400">
                  {user.role}
                </p>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <p className="font-semibold text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-400 font-normal">{user.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Billing & Subscription</DropdownMenuItem>
            <DropdownMenuItem>Team Management</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 font-medium">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
