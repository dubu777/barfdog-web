'use client';
import * as styles from './ArticleItemList.css';
import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import Text from "@/components/common/text/Text";
import Pagination from "@/components/common/pagination/Pagination";
import DefaultText from "@/components/common/defaultText/DefaultText";
import { usePagination } from "@/hooks/usePagination";
import { useQueryClient } from "@tanstack/react-query";
import { prefetchGetArticleList, useGetArticleList } from "@/api/community/queries/useGetArticleList";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { ArticleCategory } from "@/types";
import { ARTICLE_CATEGORY } from "@/constants/community";
import { articleImage, articleOverlay } from "@/components/pages/community/article/articleList/ArticleList.css";

const ArticleItemList = () => {
  const pathname = usePathname();
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
  
  const queryClient = useQueryClient();
  const { data } = useGetArticleList(category, currentPage);
  const articleList = data?.articleList || [];

  const articleCategoryList = Object.entries(ARTICLE_CATEGORY).map(([value, { label }]) => ({label, value}));
  const [mode, setMode] = useState<'board' | 'gallery'>('board');

  useEffect(() => {
    if (data.page) {
      setPaginationData(data.page);
    }
  }, [data.page, setPaginationData]);

  const handleCategoryFilter = (category: ArticleCategory) => {
    pushWithQuery(pathname, { category, page: 1 });
    setPaginationData({...data.page, number: 0});
  }

  return (
    <article className={styles.articleListContainer}>
      <div className={styles.categoryFilter}>
        {articleCategoryList.map(item => (
          <button
            key={item.value}
            className={styles.categoryButton({ active: category === item.value })}
            onClick={() => handleCategoryFilter(item.value as ArticleCategory)}
          >
            {item.label}
          </button>
        ))}
        <button onClick={() => setMode(mode === 'board' ? 'gallery' : 'board')}>{mode}</button>
      </div>
      <div className={styles.articleList({ isEmpty: articleList.length === 0 })}>
        {articleList.length === 0 ?
          <Text type='description' size='sm' color='grey'>
            등록된 블로그가 없습니다.
          </Text>
          : <div className={mode === 'gallery' ? styles.articleGallery : ''}>
            {articleList.map((article, index) => {
              const rowHeight = index % 4 === 0 || index % 4 === 3 ? 186 : 233.5;
              const imageSize = mode === 'gallery' ? 300 : 96
              return (
                <Link
                  href={`/community/article/${article.id}`}
                  key={index}
                  style={{ gridRowEnd: `span ${Math.ceil(rowHeight / 10)}` }}
                  className={styles.articleItem({ mode })}
                >
                  <Image
                    src={article.url}
                    alt={article.title}
                    width={imageSize}
                    height={imageSize}
                    className={articleImage}
                  />
                  <div className={`${styles.articleContents} ${mode === 'gallery' ? articleOverlay : ''}`}>
                    {mode === 'gallery'
                      ? <>
                        <DefaultText type='caption' color='white'>{ARTICLE_CATEGORY[article.category].label}</DefaultText>
                        <DefaultText type='label3' color='white'>{article.title}</DefaultText>
                      </>
                      : <DefaultText type='label3' color='gray900'>[{ARTICLE_CATEGORY[article.category].label}] {article.title}</DefaultText>
                    }
                    {mode === 'board' && <DefaultText type='label4'>{format(new Date(article.createdDate), 'yyyy-MM-dd')}</DefaultText>}
                  </div>
                </Link>
              );
            })}
          </div>
        }
      </div>
      <Pagination {...paginationProps} />
    </article>
  );
};

export default ArticleItemList;