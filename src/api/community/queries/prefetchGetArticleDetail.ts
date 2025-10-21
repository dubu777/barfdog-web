import { QueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { ArticleDetail } from '@/types';
import { createSSRRequest } from "@/api/withAuthSSR";
import { getArticleDetail } from '../community';

export async function prefetchGetArticleDetail(queryClient: QueryClient, articleId: number) {
  const ssrAxios = createSSRRequest();
  return await queryClient.prefetchQuery<ArticleDetail>({
    queryKey: [queryKeys.COMMUNITY.ARTICLE.BASE, queryKeys.COMMUNITY.ARTICLE.GET_ARTICLE_DETAIL, articleId],
    queryFn: () => getArticleDetail(articleId, ssrAxios),
  });
}
