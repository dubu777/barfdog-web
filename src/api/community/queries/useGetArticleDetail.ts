import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { ArticleDetail, UseSuspenseQueryCustomOptions } from "@/types";
import { queryKeys } from "@/constants";
import { getArticleDetail } from "@/api/community/community";

export { useGetArticleDetail, prefetchGetArticleDetail };

function useGetArticleDetail(articleId: number, queryOptions?: UseSuspenseQueryCustomOptions<ArticleDetail>) {
  return useSuspenseQuery<ArticleDetail>({
    queryKey: [queryKeys.COMMUNITY.ARTICLE.BASE, queryKeys.COMMUNITY.ARTICLE.GET_ARTICLE_DETAIL, articleId],
    queryFn: () => getArticleDetail(articleId),
    ...queryOptions,
  })
}

async function prefetchGetArticleDetail(queryClient: QueryClient, articleId: number) {
  return queryClient.prefetchQuery<ArticleDetail>({
    queryKey: [queryKeys.COMMUNITY.ARTICLE.BASE, queryKeys.COMMUNITY.ARTICLE.GET_ARTICLE_DETAIL, articleId],
    queryFn: () => getArticleDetail(articleId),
  })
}