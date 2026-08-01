import { NavGroup, StatCardData, RevenueBarData, IncomeBarData, OrderItem, UserProfile } from "@/types/dashboard";

export const initialUserProfile: UserProfile = {
  name: "Oripio Studio",
  role: "Admin",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  email: "admin@oripio.design",
};

export const sidebarNavigation: NavGroup[] = [
  {
    title: "Menu",
    items: [
      { id: "dashboard", label: "Dashboard", href: "#", icon: "LayoutGrid", isActive: true },
      { id: "analytics", label: "Analytics", href: "#", icon: "LineChart", badge: 20 },
      { id: "insights", label: "Insights", href: "#", icon: "Sparkles" },
      { id: "updates", label: "Updates", href: "#", icon: "Clock" },
      { id: "customers", label: "Customers", href: "#", icon: "Users" },
    ],
  },
  {
    title: "Products",
    items: [
      { id: "store", label: "Store", href: "#", icon: "Store", badge: "99+" },
      { id: "discounts", label: "Discounts", href: "#", icon: "Ticket" },
      { id: "integration", label: "Integration", href: "#", icon: "Link2" },
      { id: "feedback", label: "Feedback", href: "#", icon: "MessageSquare" },
    ],
  },
  {
    title: "General",
    items: [
      { id: "settings", label: "Settings", href: "#", icon: "Settings" },
      { id: "help-desk", label: "Help Desk", href: "#", icon: "HelpCircle" },
    ],
  },
];

export const statCardsData: StatCardData[] = [
  {
    id: "total-sales",
    title: "Total Sales",
    value: "2500",
    icon: "ShoppingCart",
    trend: { direction: "up", percentage: "4.9%" },
    subtitle: "Last month: 2345",
  },
  {
    id: "new-customer",
    title: "New Customer",
    value: "110",
    icon: "UserPlus",
    trend: { direction: "up", percentage: "7.5%" },
    subtitle: "Last month: 89",
  },
  {
    id: "return-products",
    title: "Return Products",
    value: "72",
    icon: "Package",
    trend: { direction: "down", percentage: "6.0%" },
    subtitle: "Last month: 60",
  },
  {
    id: "total-revenue",
    title: "Total Revenue",
    value: "$8,220.64",
    icon: "DollarSign",
    trend: { direction: "up", percentage: "12.4%" },
    subtitle: "Last month: $620.00",
  },
];

export const revenueAnalyticsData: RevenueBarData[] = [
  { day: "Fri", value: 16000, formattedValue: "$16,000" },
  { day: "Sat", value: 13500, formattedValue: "$13,500" },
  { day: "Sun", value: 22430, formattedValue: "$22,430", isSelected: true },
  { day: "Mon", value: 13800, formattedValue: "$13,800" },
  { day: "Thu", value: 16200, formattedValue: "$16,200" },
  { day: "Wen", value: 22100, formattedValue: "$22,100" },
  { day: "Thus", value: 17500, formattedValue: "$17,500" },
];

export const incomeData: IncomeBarData[] = [
  { month: "00", profit: 22000, loss: 12000 },
  { month: "Jan", profit: 26000, loss: 10000 },
  { month: "Feb", profit: 24000, loss: 18000 },
  { month: "Mar", profit: 30000, loss: 14000 },
  { month: "Apr", profit: 28000, loss: 20000 },
  { month: "May", profit: 29000, loss: 14000 },
  { month: "Jun", profit: 22000, loss: 28000 },
  { month: "Jul", profit: 20000, loss: 19000 },
  { month: "Aug", profit: 20000, loss: 13000 },
];

export const mockOrders: OrderItem[] = [
  {
    id: "#878909",
    date: "2 Dec 2026",
    customerName: "Oliver John Brown",
    customerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    category: "Shoes, Shirt",
    status: "Pending",
    itemsCount: 2,
    itemsDetail: "1x Leather Boots, 1x Cotton Oxford Shirt",
    total: 789.0,
  },
  {
    id: "#878908",
    date: "1 Dec 2026",
    customerName: "Noah James Smith",
    customerAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
    category: "Sneakers, T-shirt",
    status: "Completed",
    itemsCount: 3,
    itemsDetail: "2x Graphic Tee, 1x Running Sneakers",
    total: 967.0,
  },
  {
    id: "#878907",
    date: "30 Nov 2026",
    customerName: "Sophia Grace Miller",
    customerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    category: "Watches, Belt",
    status: "Completed",
    itemsCount: 2,
    itemsDetail: "1x Classic Chronograph Watch, 1x Italian Belt",
    total: 1240.5,
  },
  {
    id: "#878906",
    date: "29 Nov 2026",
    customerName: "Liam Alexander Davis",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    category: "Jacket, Jeans",
    status: "Processing",
    itemsCount: 1,
    itemsDetail: "1x Denim Sherpa Jacket",
    total: 450.0,
  },
  {
    id: "#878905",
    date: "28 Nov 2026",
    customerName: "Emma Charlotte Wilson",
    customerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
    category: "Handbag, Glasses",
    status: "Completed",
    itemsCount: 4,
    itemsDetail: "1x Leather Tote Bag, 1x Polarized Sunglasses",
    total: 1580.0,
  },
];
