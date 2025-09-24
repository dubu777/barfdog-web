import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { ArticleCategory, ArticleList, UseSuspenseQueryCustomOptions} from "@/types";
import { queryKeys } from "@/constants";
import { getArticleList } from "@/api/community/community";

export function useGetArticleList(category: ArticleCategory, page: number, queryOptions?: UseSuspenseQueryCustomOptions<ArticleList>) {
  return useSuspenseQuery<ArticleList>({
    queryKey: [queryKeys.COMMUNITY.ARTICLE.BASE, queryKeys.COMMUNITY.ARTICLE.GET_ARTICLE_LIST, category, page],
    queryFn: () => getArticleList({
      category,
      page,
    }),
    ...queryOptions,
  })
}

export async function prefetchGetArticleList(queryClient: QueryClient, category: ArticleCategory, page: number) {
  return queryClient.prefetchQuery<ArticleList>({
    queryKey: [queryKeys.COMMUNITY.ARTICLE.BASE, queryKeys.COMMUNITY.ARTICLE.GET_ARTICLE_LIST, category, page],
    queryFn: () => getArticleList({
      category,
      page,
    }),
  })
}