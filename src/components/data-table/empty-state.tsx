import { FileSearch, type LucideIcon } from "lucide-react";

type Props = {
  icon?: LucideIcon;
  title: string;
  description: string;
  className?: string;
};

export default function EmptyState({
  icon,
  title,
  description,
  className = "",
}: Props) {
  const Icon = icon ?? FileSearch;
  return (
    <div
      className={`flex min-h-75 w-full flex-col items-center justify-center ${className}`}
    >
      {Icon && (
        <div className="bg-secondary mb-6 rounded-full p-4">
          <Icon className="text-secondary-foreground h-8 w-8" />
        </div>
      )}
      <h3 className="text-foreground mb-1 text-base font-medium">{title}</h3>
      <p className="text-muted-foreground mb-4 max-w-sm text-center text-sm">
        {description}
      </p>
      <div className="from-muted to-border h-1 w-16 rounded-full bg-linear-to-r" />
    </div>
  );
}
