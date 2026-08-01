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
      {
        id: "customers",
        label: "Customers",
        href: "#",
        icon: "Users",
        children: [
          { id: "all-customers", label: "All Customers", href: "#" },
          { id: "customer-segments", label: "Segments", href: "#", badge: "New" },
        ],
      },
    ],
  },
  {
    title: "Products",
    items: [
      {
        id: "store",
        label: "Store",
        href: "#",
        icon: "Store",
        badge: "99+",
        children: [
          { id: "product-catalog", label: "Product Catalog", href: "#" },
          { id: "categories", label: "Categories", href: "#" },
          { id: "inventory", label: "Inventory", href: "#" },
        ],
      },
      {
        id: "discounts",
        label: "Discounts",
        href: "#",
        icon: "Ticket",
        children: [
          { id: "coupons", label: "Coupon Codes", href: "#" },
          { id: "promotions", label: "Promotions", href: "#" },
        ],
      },
      { id: "integration", label: "Integration", href: "#", icon: "Link2" },
      { id: "feedback", label: "Feedback", href: "#", icon: "MessageSquare" },
    ],
  },
  {
    title: "General",
    items: [
      {
        id: "settings",
        label: "Settings",
        href: "#",
        icon: "Settings",
        children: [
          { id: "general-settings", label: "General", href: "#" },
          { id: "security", label: "Security & API", href: "#" },
        ],
      },
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
];
