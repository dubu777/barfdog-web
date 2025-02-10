import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { BlogArticle, UseSuspenseQueryCustomOptions } from "@/types";
import { queryKeys } from "@/constants";
import { getBlogArticleList } from "@/api/community/community";

export { useGetBlogArticleList, prefetchGetBlogArticleList };

const getBlogArticleListQueryKey = [queryKeys.COMMUNITY.BLOG.BASE, queryKeys.COMMUNITY.BLOG.GET_BLOG_ARTICLE_LIST];

function useGetBlogArticleList(queryOptions?: UseSuspenseQueryCustomOptions<BlogArticle[]>) {
  return useSuspenseQuery<BlogArticle[]>({
    queryKey: getBlogArticleListQueryKey,
    queryFn: () => getBlogArticleList(),
    ...queryOptions,
  })
}

async function prefetchGetBlogArticleList(queryClient: QueryClient) {
  return queryClient.prefetchQuery<BlogArticle[]>({
    queryKey: getBlogArticleListQueryKey,
    queryFn: () => getBlogArticleList(),
  })
}