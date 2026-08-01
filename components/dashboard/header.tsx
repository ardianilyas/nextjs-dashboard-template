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
    <header className="w-full bg-white rounded-3xl px-4 sm:px-5 py-3 border border-slate-100 shadow-2xs flex items-center justify-between mb-6 shrink-0">
      {/* Left Area: Shadcn UI style PanelLeft Sidebar Toggle & Search */}
      <div className="flex items-center space-x-3 flex-1 max-w-md">
        {/* Shadcn UI Blocks Sidebar Toggle Button */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl border border-slate-200/80 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer shadow-2xs shrink-0"
            title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <PanelLeft className="w-5 h-5" />
          </button>
        )}

        {/* Mobile Search Icon Button (visible only on mobile sm:hidden) */}
        <button
          onClick={onOpenSearch}
          className="sm:hidden w-10 h-10 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-all shrink-0"
          title="Search product"
        >
          <Search className="w-4.5 h-4.5 text-slate-600" />
        </button>

        {/* Desktop / Tablet Search Bar Input Pill (hidden on mobile, visible on sm and up) */}
        <div
          onClick={onOpenSearch}
          className="hidden sm:flex w-full items-center justify-between bg-slate-50/80 border border-slate-200/80 rounded-full px-4 py-2 text-sm text-slate-500 cursor-pointer hover:bg-slate-100/60 hover:border-slate-300 transition-all"
        >
          <div className="flex items-center space-x-2.5">
            <Search className="w-4 h-4 text-slate-400" />
            <span className="text-slate-400 font-medium">Search product</span>
          </div>
          <div className="flex items-center space-x-1 bg-white border border-slate-200/80 rounded-md px-2 py-0.5 text-[11px] font-semibold text-slate-500 shadow-2xs">
            <span>K</span>
            <span>⌘</span>
          </div>
        </div>
      </div>

      {/* Header Right Actions */}
      <div className="flex items-center space-x-2.5 sm:space-x-3">
        {/* Notification Bell */}
        <button
          onClick={() => alert("No new notifications")}
          className="relative w-10 h-10 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-all"
          title="Notifications"
        >
          <Bell className="w-4.5 h-4.5 text-slate-600" />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[#F05323] ring-2 ring-white" />
        </button>

        {/* Help Center Icon */}
        <button
          onClick={() => alert("Help Desk Support")}
          className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-all"
          title="Help Center"
        >
          <HelpCircle className="w-4.5 h-4.5 text-slate-600" />
        </button>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-2.5 sm:space-x-3 bg-slate-50 border border-slate-200/80 rounded-full p-1 pr-3 hover:bg-slate-100 transition-all cursor-pointer outline-none">
              <div className="w-8 h-8 rounded-full bg-[#F05323] flex items-center justify-center text-white font-bold text-xs overflow-hidden shrink-0">
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
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
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
