import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { BlogDetail, UseSuspenseQueryCustomOptions } from "@/types";
import { queryKeys } from "@/constants";
import { getBlogDetail } from "@/api/community/community";

export { useGetBlogDetail, prefetchGetBlogDetail };

function useGetBlogDetail(blogId: number, queryOptions?: UseSuspenseQueryCustomOptions<BlogDetail>) {
  return useSuspenseQuery<BlogDetail>({
    queryKey: [queryKeys.COMMUNITY.BLOG.BASE, queryKeys.COMMUNITY.BLOG.GET_BLOG_DETAIL, blogId],
    queryFn: () => getBlogDetail(blogId),
    ...queryOptions,
  })
}

async function prefetchGetBlogDetail(queryClient: QueryClient, blogId: number) {
  return queryClient.prefetchQuery<BlogDetail>({
    queryKey: [queryKeys.COMMUNITY.BLOG.BASE, queryKeys.COMMUNITY.BLOG.GET_BLOG_DETAIL, blogId],
    queryFn: () => getBlogDetail(blogId),
  })
}