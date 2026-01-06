/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ArrowDownNarrowWide } from "lucide-react";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";

type Props = {
  labelValueMap: Record<string, string>;
  label: string;
  className?: string;
  iconClassName?: string;
};

export default function SortBox({
  labelValueMap,
  label,
  className,
  iconClassName,
}: Props) {
  const safeValues = Object.values(labelValueMap);

  const [sortBy, setSortBy] = useQueryState("sortBy");
  const [localValue, setLocalValue] = useState<string>(() => {
    const isValid = sortBy && safeValues.includes(sortBy);
    return isValid ? sortBy : "";
  });

  useEffect(() => {
    if (localValue && localValue !== sortBy) {
      setSortBy(localValue);
    } else if (!localValue && sortBy) {
      setSortBy(null);
    }
  }, [localValue, sortBy, setSortBy]);

  const handleValueChange = (value: string) => {
    setLocalValue(value);
  };

  return (
    <Select value={localValue} onValueChange={handleValueChange}>
      <SelectTrigger
        className={cn(
          "border-input focus-visible:border-input w-52 gap-2 rounded-lg border py-4 focus-visible:ring-0",
          className,
        )}
      >
        <ArrowDownNarrowWide
          className={cn("text-primary size-5 shrink-0", iconClassName)}
        />
        <SelectValue
          placeholder={<span className="text-muted-foreground">{label}</span>}
        />
      </SelectTrigger>
      <SelectContent position="popper" className="w-52">
        {Object.entries(labelValueMap).map(([itemLabel, value]) => (
          <SelectItem
            key={value}
            value={value}
            className="cursor-pointer transition-colors"
          >
            {itemLabel}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
