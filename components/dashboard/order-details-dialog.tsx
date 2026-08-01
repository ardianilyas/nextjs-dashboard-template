"use client";

import React from "react";
import { OrderItem } from "@/types/dashboard";
import { formatCurrency } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Calendar, User, ShoppingBag, CreditCard } from "lucide-react";

interface OrderDetailsDialogProps {
  order: OrderItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStatus?: (orderId: string, newStatus: OrderItem["status"]) => void;
}

export function OrderDetailsDialog({
  order,
  open,
  onOpenChange,
  onUpdateStatus,
}: OrderDetailsDialogProps) {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between pr-6">
            <DialogTitle className="text-xl font-extrabold text-slate-900">
              Order {order.id}
            </DialogTitle>
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
          </div>
          <DialogDescription className="text-slate-400 text-xs">
            Placed on {order.date}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-3">
          {/* Customer Info Box */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#F05323] text-white flex items-center justify-center font-bold text-sm overflow-hidden">
              {order.customerAvatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={order.customerAvatar}
                  alt={order.customerName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-5 h-5" />
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                {order.customerName}
              </p>
              <p className="text-xs text-slate-400">Category: {order.category}</p>
            </div>
          </div>

          {/* Details list */}
          <div className="space-y-2 border-t border-b border-slate-100 py-3 text-xs text-slate-600">
            <div className="flex justify-between py-1">
              <span className="text-slate-400 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5" /> Item details:
              </span>
              <span className="font-semibold text-slate-800">
                {order.itemsDetail}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5" /> Quantity:
              </span>
              <span className="font-semibold text-slate-800">
                {order.itemsCount} Items
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Date:
              </span>
              <span className="font-semibold text-slate-800">{order.date}</span>
            </div>
            <div className="flex justify-between py-1 text-sm font-bold text-slate-900 pt-2 border-t border-slate-100">
              <span className="flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-[#F05323]" /> Total Amount:
              </span>
              <span className="text-[#F05323] text-base">
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {onUpdateStatus && order.status === "Pending" && (
            <Button
              onClick={() => {
                onUpdateStatus(order.id, "Completed");
                onOpenChange(false);
              }}
            >
              Mark Completed
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
