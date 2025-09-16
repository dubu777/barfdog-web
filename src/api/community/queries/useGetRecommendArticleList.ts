import { useSuspenseQuery } from "@tanstack/react-query";
import { RecommendArticle, UseSuspenseQueryCustomOptions } from "@/types";
import { queryKeys } from "@/constants";
import { getRecommendArticleList } from "@/api/community/community";

export function useGetRecommendArticleList(queryOptions?: UseSuspenseQueryCustomOptions<RecommendArticle[]>) {
  return useSuspenseQuery<RecommendArticle[]>({
    queryKey: [queryKeys.COMMUNITY.ARTICLE.BASE, queryKeys.COMMUNITY.ARTICLE.GET_RECOMMEND_ARTICLE_LIST],
    queryFn: () => getRecommendArticleList(),
    ...queryOptions,
  })
}