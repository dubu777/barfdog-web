"use client";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header/Header";
import { ArticleCategory, CommunityListItem } from "@/types";
import { ARTICLE_CATEGORY } from "@/constants/community";
import {
  prefetchGetArticleDetail,
  useGetArticleDetail,
} from "@/api/community/queries/useGetArticleDetail";
import DetailSection from "../../common/detailSection/DetailSection";

export default function ArticleDetail({
  articleId,
  category,
}: {
  articleId: number;
  category: string;
}) {
  const router = useRouter();

  const { data } = useGetArticleDetail(articleId);
  const articleDetail = data.articleDetail;

  const title = `[${ARTICLE_CATEGORY[category].label}] ${articleDetail?.title}`;

  // 이전/다음 포스트 제목 포맷팅 헬퍼 함수
  const formatPostTitle = (post: CommunityListItem | null) => {
    if (!post) return null;
    const postCategoryLabel =
      ARTICLE_CATEGORY[post.category as ArticleCategory]?.label ?? "";
    return {
      ...post,
      title: `[${postCategoryLabel}] ${post.title ?? ""}`,
    };
  };

  return (
    <>
      <Header
        showCloseButton
        centerTitle="아티클"
        onClose={() => router.back()}
      />
      <DetailSection
        id={articleDetail.id}
        title={title}
        createdDate={articleDetail.createdDate}
        contents={articleDetail.contents}
        category="article"
        categoryLabel="아티클"
        categoryPointLabel={ARTICLE_CATEGORY["ALL"].label}
        prevPost={formatPostTitle(data?.previous)}
        nextPost={formatPostTitle(data?.next)}
        prefetchFn={prefetchGetArticleDetail}
      />
    </>
  );
}
