import { NewsGrid } from "@/components/news-grid";
import { ResponseNewsArticle } from "@/lib/types";

const fetchNews = async (
  query: string,
  category?: string
): Promise<ResponseNewsArticle> => {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}&q=${query}&category=${category}`
  );
  const data = await res.json();
  return data;
};

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string; category?: string };
}) {
  const query = searchParams.q || "";
  const category = searchParams.category || "";
  const news = await fetchNews(query, category);

  return (
    <>
      <NewsGrid articles={news.articles} />
    </>
  );
}
