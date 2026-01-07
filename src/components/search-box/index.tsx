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
  const [, setPage] = useQueryState("page");
  const [, setPageSize] = useQueryState("pageSize");

  const [search, setSearch] = useQueryState("search");
  const [localValue, setLocalValue] = useState(search ?? "");
  const [debounced] = useDebounceValue(localValue, 500);

  useEffect(() => {
    if (localValue && localValue !== search) {
      setSearch(localValue, {});
    } else if (!localValue && search) {
      setSearch(null);
    }

    setPage(null);
    setPageSize(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  return (
    <div
      className={cn(
        "border-input flex w-full items-center rounded-lg border px-3.5 lg:max-w-xs",
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
