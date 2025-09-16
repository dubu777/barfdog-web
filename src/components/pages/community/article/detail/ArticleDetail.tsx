'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { prefetchGetArticleDetail, useGetArticleDetail } from "@/api/community/queries/useGetArticleDetail";
import { ARTICLE_CATEGORY } from "@/constants/community";
import DetailSection from "@/components/pages/community/common/detailSection/DetailSection";
import Header from "@/components/layout/header/Header";

export default function ArticleDetail({ articleId }: { articleId: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'ALL';
  const categoryLabel = ARTICLE_CATEGORY[category].label;

  const { data } = useGetArticleDetail(articleId);
  const articleDetail = data.articleDetail;

  const title = `[${categoryLabel}] ${articleDetail.title}`;

  return (
    <>
      <Header
        showBackButton
        centerTitle='아티클'
        onBack={() => router.back()}
      />
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
    </>
  );
};