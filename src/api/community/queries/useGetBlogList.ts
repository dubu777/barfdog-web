import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { BlogCategory, BlogList, UseSuspenseQueryCustomOptions } from "@/types";
import { queryKeys } from "@/constants";
import { getBlogList } from "@/api/community/community";

export { useGetBlogList, prefetchGetBlogList };

function useGetBlogList(category: BlogCategory, page: number, queryOptions?: UseSuspenseQueryCustomOptions<BlogList>) {
  return useSuspenseQuery<BlogList>({
    queryKey: [queryKeys.COMMUNITY.BLOG.BASE, queryKeys.COMMUNITY.BLOG.GET_BLOG_LIST, category, page],
    queryFn: () => getBlogList(category, page),
    keepPreviousData: true,
    ...queryOptions,
  })
}

async function prefetchGetBlogList(queryClient: QueryClient, category: BlogCategory, page: number) {
  return queryClient.prefetchQuery<BlogList>({
    queryKey: [queryKeys.COMMUNITY.BLOG.BASE, queryKeys.COMMUNITY.BLOG.GET_BLOG_LIST, category, page],
    queryFn: () => getBlogList(category, page),
  })
}