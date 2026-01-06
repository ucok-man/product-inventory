import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { IconType } from "react-icons/lib";

type Props = {
  icon: IconType;
  iconContainerClass?: string;
  iconClass?: string;
  label: string;
  value: string;
  className?: string;
};

export default function StatCard({
  icon,
  label,
  value,
  className,
  iconContainerClass,
  iconClass,
}: Props) {
  const Icon = icon;

  return (
    <Card className={cn("w-full border-0 shadow-sm", className)}>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className={cn(`rounded-lg p-2.5`, iconContainerClass)}>
            <Icon className={cn(`size-5`, iconClass)} />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">{label}</p>
            <p className="font-serif text-2xl font-semibold tracking-tight">
              {value}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
