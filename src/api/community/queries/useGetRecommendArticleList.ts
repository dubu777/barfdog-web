import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { RecommendArticle, UseSuspenseQueryCustomOptions } from "@/types";
import { queryKeys } from "@/constants";
import { getRecommendArticleList } from "@/api/community/community";

export { useGetRecommendArticleList, prefetchGetRecommendArticleList };

const getRecommendArticleListQueryKey = [queryKeys.COMMUNITY.ARTICLE.BASE, queryKeys.COMMUNITY.ARTICLE.GET_RECOMMEND_ARTICLE_LIST];

function useGetRecommendArticleList(queryOptions?: UseSuspenseQueryCustomOptions<RecommendArticle[]>) {
  return useSuspenseQuery<RecommendArticle[]>({
    queryKey: getRecommendArticleListQueryKey,
    queryFn: () => getRecommendArticleList(),
    ...queryOptions,
  })
}

async function prefetchGetRecommendArticleList(queryClient: QueryClient) {
  return queryClient.prefetchQuery<RecommendArticle[]>({
    queryKey: getRecommendArticleListQueryKey,
    queryFn: () => getRecommendArticleList(),
  })
}