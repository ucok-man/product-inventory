import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { IconType } from "react-icons/lib";
import { Skeleton } from "../ui/skeleton";

type Props = {
  icon: IconType;
  iconContainerClass?: string;
  iconClass?: string;
  label: string;
  value: string;
  className?: string;
  isLoading: boolean;
};

export default function StatCard({
  icon,
  label,
  value,
  className,
  iconContainerClass,
  iconClass,
  isLoading,
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

            {isLoading ? (
              <Skeleton className="my-1 h-6 w-24" />
            ) : (
              <p className="my-0.5 font-serif text-xl font-semibold tracking-tight lg:my-0 lg:text-2xl">
                {value}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
