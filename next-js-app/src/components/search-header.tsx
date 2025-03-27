"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Newspaper } from "lucide-react";
import { useRouter } from "next/navigation";
export function SearchHeader() {
  const router = useRouter();
  const [firstLoad, setFirstLoad] = useState(true);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
    } else {
      router.push(`/?q=${debouncedQuery}`);
    }
  }, [debouncedQuery, router]);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-4 sm:h-20">
          <div className="flex items-center gap-2 font-semibold">
            <Newspaper className="h-6 w-6" />
            <span className="hidden sm:inline">NewsHub</span>
          </div>
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search news..."
              className="max-w-2xl"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
