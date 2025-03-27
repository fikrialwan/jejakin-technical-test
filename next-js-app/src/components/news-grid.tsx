import { NewsArticle } from "@/lib/types";
import { NewsCard } from "./news-card";

interface NewsGridProps {
  articles: NewsArticle[];
}

export function NewsGrid({ articles }: NewsGridProps) {
  if (!articles.length) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">No articles found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search query
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <NewsCard key={article.url} article={article} />
      ))}
    </div>
  );
}
