"use client";

import React, { useState } from "react";
import { Search, ArrowUpDown, ChevronDown, Filter, Eye } from "lucide-react";
import { OrderItem } from "@/types/dashboard";
import { mockOrders } from "@/data/dashboard-config";
import { formatCurrency } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderDetailsDialog } from "./order-details-dialog";

interface RecentOrdersTableProps {
  orders?: OrderItem[];
}

export function RecentOrdersTable({
  orders: initialOrders = mockOrders,
}: RecentOrdersTableProps) {
  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [selectedOrderForDialog, setSelectedOrderForDialog] =
    useState<OrderItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"date" | "total" | "id">("date");

  // Filtering
  const filteredOrders = orders
    .filter((order) => {
      const q = searchQuery.toLowerCase();
      return (
        order.id.toLowerCase().includes(q) ||
        order.customerName.toLowerCase().includes(q) ||
        order.category.toLowerCase().includes(q) ||
        order.status.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === "total") return b.total - a.total;
      if (sortBy === "id") return b.id.localeCompare(a.id);
      return 0; // Default date sort
    });

  const isAllSelected =
    filteredOrders.length > 0 &&
    filteredOrders.every((o) => selectedOrderIds.includes(o.id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedOrderIds([]);
    } else {
      setSelectedOrderIds(filteredOrders.map((o) => o.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedOrderIds.includes(id)) {
      setSelectedOrderIds(selectedOrderIds.filter((item) => item !== id));
    } else {
      setSelectedOrderIds([...selectedOrderIds, id]);
    }
  };

  const handleRowClick = (order: OrderItem) => {
    setSelectedOrderForDialog(order);
    setDialogOpen(true);
  };

  const handleUpdateStatus = (
    orderId: string,
    newStatus: OrderItem["status"]
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100/80 shadow-2xs">
      {/* Top Header & Table Search / Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          Recent orders
        </h3>

        <div className="flex items-center space-x-3">
          {/* Table Search Input */}
          <div className="relative w-48 sm:w-64">
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4 text-slate-400" />}
              className="h-9 rounded-full bg-slate-50 border-slate-200/80 text-xs focus:bg-white"
            />
          </div>

          {/* Sort By Dropdown Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-1.5 px-3 py-2 rounded-full border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-all cursor-pointer">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span>Sort by</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("date")}>
                Date (Newest)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("total")}>
                Highest Total
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("id")}>
                Order ID
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-semibold text-slate-400">
              <th className="py-3 px-3 w-10">
                <Checkbox
                  checked={isAllSelected}
                  onCheckedChange={toggleSelectAll}
                />
              </th>
              <th className="py-3 px-4">Order Id</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Items</th>
              <th className="py-3 px-4 text-right">Total</th>
              <th className="py-3 px-2 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="py-8 text-center text-slate-400 text-sm"
                >
                  No orders found matching your search.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => {
                const isSelected = selectedOrderIds.includes(order.id);
                return (
                  <tr
                    key={order.id}
                    className={`hover:bg-slate-50/80 transition-colors group cursor-pointer ${
                      isSelected ? "bg-slate-50" : ""
                    }`}
                    onClick={() => handleRowClick(order)}
                  >
                    <td
                      className="py-4 px-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => toggleSelectRow(order.id)}
                      />
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-900">
                      {order.id}
                    </td>
                    <td className="py-4 px-4 text-slate-500 font-medium text-xs">
                      {order.date}
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-900">
                      <div className="flex items-center space-x-2.5">
                        {order.customerAvatar && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={order.customerAvatar}
                            alt=""
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        )}
                        <span>{order.customerName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-500 text-xs">
                      {order.category}
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={
                          order.status === "Pending"
                            ? "pending"
                            : order.status === "Completed"
                            ? "completed"
                            : "processing"
                        }
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-slate-600 font-medium text-xs">
                      {order.itemsCount} Items
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-slate-900">
                      {formatCurrency(order.total)}
                    </td>
                    <td
                      className="py-4 px-2 text-right opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(order);
                      }}
                    >
                      <button className="p-1 rounded-md text-slate-400 hover:text-[#136650] hover:bg-emerald-50">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Dialog for Order Details */}
      <OrderDetailsDialog
        order={selectedOrderForDialog}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
