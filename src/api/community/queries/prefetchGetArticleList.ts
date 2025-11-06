import { QueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { ArticleList, RecommendArticle } from '@/types';
import { createSSRRequest } from "@/api/withAuthSSR";
import { getArticleList, getRecommendArticleList } from '../community';

export async function prefetchGetArticleList(queryClient: QueryClient) {
  const ssrAxios = createSSRRequest();
  return await queryClient.prefetchQuery<ArticleList>({
    queryKey: [queryKeys.COMMUNITY.ARTICLE.BASE, queryKeys.COMMUNITY.ARTICLE.GET_ARTICLE_LIST, 'ALL', 0],
    queryFn: () => getArticleList(
      {
        category: 'ALL',
        page: 0,
        instance: ssrAxios
      }
    ),
  });
}

export async function prefetchGetRecommendArticleList(queryClient: QueryClient) {
  const ssrAxios = createSSRRequest();
  return await queryClient.prefetchQuery<RecommendArticle[]>({
    queryKey: [queryKeys.COMMUNITY.ARTICLE.BASE, queryKeys.COMMUNITY.ARTICLE.GET_RECOMMEND_ARTICLE_LIST],
    queryFn: () => getRecommendArticleList(ssrAxios),
  });
}