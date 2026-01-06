"use client";

import StatCard from "@/components/stat-card";
import { formatCurrency } from "@/lib/utils";
import { api } from "@/trpc/react";
import { GrMoney } from "react-icons/gr";
import { LuPackagePlus } from "react-icons/lu";
import { PiStackPlusDuotone } from "react-icons/pi";

export default function ProductSummaries() {
  const { data, error, isPending } = api.product.aggregate.useQuery();

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <StatCard
        icon={LuPackagePlus}
        iconContainerClass="bg-primary/10"
        iconClass="size-6 text-primary"
        label="Total Products"
        value={String(data?.totalProduct ?? 0)}
        isLoading={isPending}
      />

      <StatCard
        icon={GrMoney}
        iconContainerClass="bg-primary/10"
        iconClass="size-6 text-primary"
        label="Inventory Value"
        value={formatCurrency(data?.totalAmount ?? 0)}
        isLoading={isPending}
      />

      <StatCard
        icon={PiStackPlusDuotone}
        iconContainerClass="bg-orange-500/10"
        iconClass="size-6 text-orange-500"
        label="Total Quantity"
        value={String(data?.totalQty ?? 0)}
        isLoading={isPending}
      />
    </div>
  );
}
