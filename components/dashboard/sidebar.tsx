"use client";

import React, { useState } from "react";
import {
  LayoutGrid,
  LineChart,
  Sparkles,
  Clock,
  Users,
  Store,
  Ticket,
  Link2,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { NavGroup, NavItem, SubNavItem } from "@/types/dashboard";
import { sidebarNavigation } from "@/data/dashboard-config";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const iconMap: Record<string, React.ReactNode> = {
  LayoutGrid: <LayoutGrid className="w-4 h-4" />,
  LineChart: <LineChart className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Clock: <Clock className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  Store: <Store className="w-4 h-4" />,
  Ticket: <Ticket className="w-4 h-4" />,
  Link2: <Link2 className="w-4 h-4" />,
  MessageSquare: <MessageSquare className="w-4 h-4" />,
  Settings: <Settings className="w-4 h-4" />,
  HelpCircle: <HelpCircle className="w-4 h-4" />,
};

interface SidebarProps {
  navigationGroups?: NavGroup[];
  activeId?: string;
  onSelectNav?: (id: string) => void;
  onCloseMobile?: () => void;
  isCollapsed?: boolean;
  className?: string;
}

export function Sidebar({
  navigationGroups = sidebarNavigation,
  activeId = "dashboard",
  onSelectNav,
  onCloseMobile,
  isCollapsed = false,
  className,
}: SidebarProps) {
  const [currentActive, setCurrentActive] = useState(activeId);
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({
    store: true, // Default open store sub-menu
  });

  const toggleSubMenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenSubMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNavClick = (item: NavItem) => {
    setCurrentActive(item.id);
    if (item.children) {
      setOpenSubMenus((prev) => ({ ...prev, [item.id]: !prev[item.id] }));
    }
    if (onSelectNav) onSelectNav(item.id);
    if (onCloseMobile && !item.children) onCloseMobile();
  };

  const handleSubItemClick = (subItem: SubNavItem) => {
    setCurrentActive(subItem.id);
    if (onSelectNav) onSelectNav(subItem.id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside
      className={cn(
        "bg-white rounded-3xl p-4 border border-slate-100 flex flex-col justify-between h-[calc(100vh-2.5rem)] shadow-2xs transition-all duration-300 relative",
        isCollapsed ? "w-20 px-3" : "w-64 px-5",
        className
      )}
    >
      <div className="flex flex-col space-y-6">
        {/* Brand Logo */}
        <div
          className={cn(
            "flex items-center h-10",
            isCollapsed ? "justify-center" : "justify-between px-1"
          )}
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#F05323] flex items-center justify-center text-white shadow-md shadow-orange-500/20 font-bold text-lg shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 stroke-current stroke-[2.5]"
              >
                <path
                  d="M7 17L17 7M17 7H9M17 7V15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {!isCollapsed && (
              <span className="text-xl font-extrabold tracking-tight text-slate-900 transition-opacity duration-200">
                Finexy
              </span>
            )}
          </div>

          {/* Mobile Close Button */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Section Groups */}
        <nav className="space-y-6 overflow-y-auto max-h-[calc(100vh-14rem)] pr-0.5">
          {navigationGroups.map((group) => (
            <div key={group.title} className="space-y-2">
              {!isCollapsed && (
                <h3 className="px-3 text-xs font-medium text-slate-400">
                  {group.title}
                </h3>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const hasChildren = Boolean(item.children && item.children.length > 0);
                  const isSubOpen = Boolean(openSubMenus[item.id]);
                  const isParentActive =
                    currentActive === item.id ||
                    (item.children && item.children.some((sub) => sub.id === currentActive));

                  // Collapsed view with Sub-Menu -> Dropdown Menu
                  if (isCollapsed && hasChildren) {
                    return (
                      <DropdownMenu key={item.id}>
                        <DropdownMenuTrigger asChild>
                          <button
                            title={item.label}
                            className={cn(
                              "w-full flex items-center justify-center p-3 rounded-xl text-sm font-medium transition-all group relative",
                              isParentActive
                                ? "bg-[#F05323] text-white shadow-sm shadow-orange-500/20"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                          >
                            <span
                              className={cn(
                                "transition-colors shrink-0",
                                isParentActive
                                  ? "text-white"
                                  : "text-slate-400 group-hover:text-slate-700"
                              )}
                            >
                              {iconMap[item.icon] || <LayoutGrid className="w-4 h-4" />}
                            </span>
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F05323] ring-2 ring-white" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right" align="start" className="w-48 ml-2">
                          <DropdownMenuLabel>{item.label}</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {item.children?.map((sub) => (
                            <DropdownMenuItem
                              key={sub.id}
                              onClick={() => handleSubItemClick(sub)}
                              className={cn(
                                currentActive === sub.id && "font-bold text-[#F05323]"
                              )}
                            >
                              {sub.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    );
                  }

                  // Normal expanded view (or non-child collapsed view)
                  return (
                    <div key={item.id} className="space-y-1">
                      <button
                        onClick={() => handleNavClick(item)}
                        title={isCollapsed ? item.label : undefined}
                        className={cn(
                          "w-full flex items-center rounded-xl text-sm font-medium transition-all group relative",
                          isCollapsed
                            ? "justify-center p-3"
                            : "justify-between px-3.5 py-2.5",
                          isParentActive
                            ? "bg-[#F05323] text-white shadow-sm shadow-orange-500/20"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        )}
                      >
                        <div
                          className={cn(
                            "flex items-center",
                            isCollapsed ? "justify-center" : "space-x-3"
                          )}
                        >
                          <span
                            className={cn(
                              "transition-colors shrink-0",
                              isParentActive
                                ? "text-white"
                                : "text-slate-400 group-hover:text-slate-700"
                            )}
                          >
                            {iconMap[item.icon] || <LayoutGrid className="w-4 h-4" />}
                          </span>
                          {!isCollapsed && <span>{item.label}</span>}
                        </div>

                        {/* Right side controls (Badge & Chevron) */}
                        {!isCollapsed && (
                          <div className="flex items-center space-x-2">
                            {item.badge !== undefined && (
                              <Badge
                                variant={isParentActive ? "secondary" : "badgeCount"}
                                className={cn(
                                  isParentActive && "bg-white/20 text-white font-semibold"
                                )}
                              >
                                {item.badge}
                              </Badge>
                            )}

                            {hasChildren && (
                              <span
                                onClick={(e) => toggleSubMenu(item.id, e)}
                                className="p-0.5 rounded hover:bg-white/20 transition-transform"
                              >
                                {isSubOpen ? (
                                  <ChevronDown className="w-3.5 h-3.5" />
                                ) : (
                                  <ChevronRight className="w-3.5 h-3.5" />
                                )}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Collapsed Badge Dot */}
                        {isCollapsed && item.badge !== undefined && (
                          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F05323] ring-2 ring-white" />
                        )}
                      </button>

                      {/* Nested Sub-Menu Items */}
                      {!isCollapsed && hasChildren && isSubOpen && (
                        <div className="ml-4 pl-3 border-l border-slate-200/80 space-y-1 py-1 animate-in fade-in slide-in-from-top-1 duration-200">
                          {item.children?.map((sub) => {
                            const isSubActive = currentActive === sub.id;
                            return (
                              <button
                                key={sub.id}
                                onClick={() => handleSubItemClick(sub)}
                                className={cn(
                                  "w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors text-left",
                                  isSubActive
                                    ? "text-[#F05323] font-bold bg-orange-50/80"
                                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                                )}
                              >
                                <span>{sub.label}</span>
                                {sub.badge && (
                                  <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded-full font-semibold text-slate-600">
                                    {sub.badge}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Log out Footer Button */}
      <div className="pt-2">
        <button
          onClick={() => alert("Logged out successfully")}
          title={isCollapsed ? "Log out" : undefined}
          className={cn(
            "w-full flex items-center rounded-xl text-sm font-medium text-red-500 bg-red-50/60 hover:bg-red-100/70 border border-red-100/80 transition-all",
            isCollapsed ? "justify-center p-3" : "space-x-3 px-3.5 py-2.5"
          )}
        >
          <LogOut className="w-4 h-4 text-red-500 shrink-0" />
          {!isCollapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );
}
