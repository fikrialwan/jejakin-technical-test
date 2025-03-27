"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewsArticle } from "@/lib/types";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  const [errorImage, setErrorImage] = useState(false);
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-2 text-lg">{article.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {article.source.name} • {format(new Date(article.publishedAt), "PPP")}
        </p>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        {article.urlToImage && !errorImage ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={article.urlToImage}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setErrorImage(true)}
            />
          </div>
        ) : (
          <div className="aspect-video w-full rounded-lg bg-muted" />
        )}
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {article.description}
        </p>
        <Link
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm font-medium text-primary hover:underline"
        >
          Read more
        </Link>
      </CardContent>
    </Card>
  );
}
