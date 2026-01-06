import StatCard from "@/components/stat-card";
import { formatCurrency } from "@/lib/utils";
import { GrMoney } from "react-icons/gr";
import { LuPackagePlus } from "react-icons/lu";
import { PiStackPlusDuotone } from "react-icons/pi";

export default function ProductSummaries() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <StatCard
        icon={LuPackagePlus}
        iconContainerClass="bg-primary/10"
        iconClass="size-6 text-primary"
        label="Total Products"
        value="100"
      />

      <StatCard
        icon={GrMoney}
        iconContainerClass="bg-primary/10"
        iconClass="size-6 text-primary"
        label="Inventory Value"
        value={formatCurrency(10_000_000)}
      />

      <StatCard
        icon={PiStackPlusDuotone}
        iconContainerClass="bg-orange-500/10"
        iconClass="size-6 text-orange-500"
        label="Total Items"
        value="100"
      />
    </div>
  );
}
