'use client';
import { useSearchParams } from "next/navigation";
import { prefetchGetArticleDetail, useGetArticleDetail } from "@/api/community/queries/useGetArticleDetail";
import { ARTICLE_CATEGORY } from "@/constants/community";
import DetailSection from "@/components/pages/community/common/detailSection/DetailSection";

const ArticleDetail = ({ articleId }: { articleId: number }) => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'ALL';
  const categoryLabel = ARTICLE_CATEGORY[category].label;

  const { data } = useGetArticleDetail(articleId);
  const articleDetail = data.articleDetail;

  const title = `[${categoryLabel}] ${articleDetail.title}`;

  return (
    <DetailSection
      id={articleDetail.id}
      title={title}
      createdDate={articleDetail.createdDate}
      contents={articleDetail.contents}
      category='article'
      categoryLabel='아티클'
      categoryPointLabel={ARTICLE_CATEGORY[category].label}
      prevPost={data?.previous || null}
      nextPost={data?.next || null}
      prefetchFn={prefetchGetArticleDetail}
    />
  );
};

export default ArticleDetail;