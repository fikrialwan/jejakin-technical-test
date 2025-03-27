import { NewsGrid } from "@/components/news-grid";
import { MOCK_NEWS_ARTICLES } from "@/lib/mock-data";

export default function Home() {
  return (
    <>
      <NewsGrid articles={MOCK_NEWS_ARTICLES} />
    </>
  );
}
