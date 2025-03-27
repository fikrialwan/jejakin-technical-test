import { NewsGrid } from "@/components/news-grid";
import { ResponseNewsArticle } from "@/lib/types";

const fetchNews = async (query: string): Promise<ResponseNewsArticle> => {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}&q=${query}`
  );
  const data = await res.json();
  return data;
};

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";
  const news = await fetchNews(query);

  return (
    <>
      <NewsGrid articles={news.articles} />
    </>
  );
}
