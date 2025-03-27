"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Newspaper } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CATEGORY_OPTIONS } from "@/lib/constants";
import { Button } from "./ui/button";
import Link from "next/link";
export function SearchHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [firstLoad, setFirstLoad] = useState(true);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
    } else {
      if (searchParams.has("category")) {
        router.push(`/?category=${searchParams.get("category")}&q=${query}`);
      } else {
        router.push(`/?q=${debouncedQuery}`);
      }
    }
  }, [debouncedQuery, router]);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-4 sm:h-20">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Newspaper className="h-6 w-6" />
            <span className="hidden sm:inline">NewsHub</span>
          </Link>
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search news..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="hidden md:block">
            <Select
              onValueChange={(value) => {
                if (searchParams.has("q")) {
                  router.push(`/?q=${searchParams.get("q")}&category=${value}`);
                } else {
                  router.push(`/?category=${value}`);
                }
              }}
              defaultValue={searchParams.get("category") || undefined}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((category) => (
                  <SelectItem
                    key={category.value}
                    value={category.value}
                    defaultChecked={
                      category.value === searchParams.get("category")
                    }
                  >
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {(searchParams.has("q") || searchParams.has("category")) && (
            <Button
              className="hidden md:block"
              onClick={() => router.push("/")}
            >
              Reset
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
