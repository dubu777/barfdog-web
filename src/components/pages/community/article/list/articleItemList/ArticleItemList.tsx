'use client';
import * as styles from './ArticleItemList.css';
import { ellipsis } from '@/styles/common.css';
import { articleOverlay } from "@/components/pages/community/article/list/ArticleList.css";
import { Fragment, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/components/common/pagination/Pagination";
import Text from "@/components/common/text/Text";
import TabBar from "@/components/common/tabBar/TabBar";
import Divider from "@/components/common/divider/Divider";
import EmptyState from "@/components/pages/mypage/common/emptyState/EmptyState";
import useFilterTabs from '@/hooks/useFilterTabs';
import { usePagination } from "@/hooks/usePagination";
import { useQueryClient } from "@tanstack/react-query";
import { prefetchGetArticleList, useGetArticleList } from "@/api/community/queries/useGetArticleList";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { ArticleCategory } from "@/types";
import { ARTICLE_CATEGORY } from "@/constants/community";

function getRowHeight(index: number): number {
  const mod = index % 6;
  if (mod === 0 || mod === 3 || mod === 5 ) return 186;
  if (mod === 2) return 281;
  return 233.5;
}

export default function ArticleItemList({ mode }: { mode: 'board' | 'gallery' }) {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const category = searchParams.get('category') as ArticleCategory || 'ALL';
  const { pushWithQuery } = useDynamicQueryPush();
  
  const { currentPage, totalPages, setPaginationData, onPageChange } = usePagination({
    prefetchFn: (page: number) => prefetchGetArticleList(queryClient, category, page),
    pushWithQuery,
  })

  const paginationProps = useMemo(() => ({
    currentPage,
    totalPages,
    onPageChange,
  }), [currentPage, totalPages, onPageChange]);
  
  const { data } = useGetArticleList(category, currentPage);
  const articleList = data?.articleList || [];
  const isGallery = mode === 'gallery';

  const articleCategoryList = Object.entries(ARTICLE_CATEGORY).map(([value, { label }]) => ({label, value}));

  const { defaultTabIndex, handleFilterChange } = useFilterTabs({
    filterKey: 'category',
    defaultValue: 'ALL',
    tabs: articleCategoryList,
  })

  useEffect(() => {
    if (data.page) {
      setPaginationData({ ...data.page });
    }
  }, [data.page, setPaginationData]);

  const handleCategoryFilter = (category: ArticleCategory) => {
    handleFilterChange(category, { page: 1 })
    setPaginationData({ ...data.page });
  }

  return (
    <article className={styles.articleListContainer}>
      <article className={styles.categoryFilter}>
        <TabBar
          variant='chips'
          tabs={articleCategoryList.map(tab => ({
            ...tab,
            onInit: async () => {
              handleCategoryFilter(tab.value as ArticleCategory);
            }
          }))}
          defaultIndex={defaultTabIndex}
          width={68}
          justifyContent='flexStart'
        />
      </article>
      <div className={styles.articleList({ isEmpty: articleList.length === 0 })}>
        {articleList.length === 0 ?
          <EmptyState title='등록된 블로그가 없습니다.' />
          : <>
            <div className={isGallery? styles.articleGallery : ''}>
              {articleList.map((article, index) => {
                const rowHeight = getRowHeight(index);
                return (
                  <Fragment key={index}>
                    <Link
                      href={`/community/article/${article.id}?category=${category}`}
                      style={{ gridRowEnd: `span ${Math.ceil(rowHeight / 10)}` }}
                      className={styles.articleItem({ mode })}
                    >
                      {article?.displayImageUrl?.url && 
                        <Image
                          src={article.displayImageUrl?.url}
                          alt={article.title}
                          width={600}
                          height={isGallery ? 300 : 96}
                          style={{
                            objectFit: "cover",
                            height: isGallery ? "100%" : "96px",
                            width: isGallery ? 300 : 96,
                          }}
                        />
                      }
                      <div className={`${styles.articleContents({ mode })} ${isGallery ? articleOverlay : ''}`}>
                        {isGallery
                          ? <>
                            <Text type='caption' color='white'>{ARTICLE_CATEGORY[article.category].label}</Text>
                            <Text type='label3' color='white' className={ellipsis({ lineSize: 'line1' })}>
                              {article.title}
                            </Text>
                          </>
                          : <div className={styles.articleItemTitle}>
                            <Text type='label3' color='gray900' className={styles.articleItemCategory}>[{ARTICLE_CATEGORY[article.category].label}]</Text>
                            <Text type='label3' color='gray900' className={ellipsis({ lineSize: 'line1' })}>
                              {article.title}
                            </Text>
                          </div>
                        }
                        {!isGallery && <Text type='label4'>{format(new Date(article.createdDate), 'yyyy-MM-dd')}</Text>}
                      </div>
                    </Link>
                    {!isGallery && <Divider thickness={2} color='gray50' />}
                  </Fragment>
                );
              })}
            </div>
            <Pagination {...paginationProps} />
          </>
        }
      </div>
    </article>
  );
};