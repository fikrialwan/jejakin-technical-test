"use client";

export default function Error() {
  return (
    <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Something went wrong</h3>
        <p className="text-sm text-muted-foreground">Try refreshing the page</p>
      </div>
    </div>
  );
}
