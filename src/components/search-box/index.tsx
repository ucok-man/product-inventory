import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "../ui/input";

type Props = {
  placeholder: string;
};

export default function SearchBox({ placeholder }: Props) {
  const [search, setSearch] = useQueryState("search");
  const [localValue, setLocalValue] = useState(search ?? "");
  const [debounced] = useDebounceValue(localValue, 500);

  useEffect(() => {
    if (localValue && localValue !== search) {
      setSearch(localValue);
    } else if (!localValue && search) {
      setSearch(null);
    }
  }, [debounced, localValue, search, setSearch]);

  return (
    <div
      className={cn(
        "border-input flex w-full max-w-xs items-center rounded-lg border px-3.5",
      )}
    >
      <SearchIcon className="text-primary size-5 shrink-0" />
      <Input
        placeholder={placeholder}
        className="h-8 w-full border-none bg-transparent! focus-visible:ring-0"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />
    </div>
  );
}
