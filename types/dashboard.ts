import { ReactNode } from "react";

export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: string | number;
  badgeVariant?: "primary" | "secondary" | "danger";
  isActive?: boolean;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export type StatCardData = {
  id: string;
  title: string;
  value: string | number;
  icon: string;
  trend: {
    direction: "up" | "down";
    percentage: string;
  };
  subtitle: string;
  accentColor?: string;
};

export type RevenueBarData = {
  day: string;
  value: number;
  formattedValue: string;
  isSelected?: boolean;
};

export type IncomeBarData = {
  month: string;
  profit: number;
  loss: number;
};

export type OrderStatus = "Pending" | "Completed" | "Processing" | "Cancelled";

export type OrderItem = {
  id: string;
  date: string;
  customerName: string;
  customerAvatar?: string;
  category: string;
  status: OrderStatus;
  itemsCount: number;
  itemsDetail: string;
  total: number;
};

export type UserProfile = {
  name: string;
  role: string;
  avatarUrl: string;
  email?: string;
};
