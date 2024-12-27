'use client';
import * as styles from './ItemList.css';
import { ellipsis } from "@/styles/common.css";
import { useEffect, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prefetchGetBlogList, useGetBlogList } from "@/api/community/queries/useGetBlogList";
import { useQueryClient } from "@tanstack/react-query";
import { usePagination } from "@/hooks/usePagination";
import Text from "@/components/common/text/Text";
import Pagination from "@/components/common/pagination/Pagination";
import useDynamicQueryPush from "@/hooks/useDynamicQueryPush";
import useSanitizedHTML from "@/hooks/useSanitizedHTML";
import { formatDate } from "@/utils/dateUtils";
import { BlogCategory } from "@/types";

const blogCategory: Record<BlogCategory, { name: string; value: string }> = {
  all: { name: '전체', value: 'all' },
  nutrition: { name: '영양', value: 'nutrition' },
  health: { name: '건강', value: 'health' },
  life: { name: '생애', value: 'life' },
}

const ItemList = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') as BlogCategory || 'all';
  const { pushWithQuery } = useDynamicQueryPush();
  
  const { currentPage, totalPages, setPaginationData, onPageChange } = usePagination({
    prefetchFn: (page: number) => prefetchGetBlogList(queryClient, category, page),
    pushWithQuery,
  })
  const paginationProps = useMemo(() => ({
    currentPage,
    totalPages,
    onPageChange,
  }), [currentPage, totalPages, onPageChange]);
  
  const queryClient = useQueryClient();
  const { data } = useGetBlogList(category, currentPage);
  const blogList = data?.blogList || [];
  const processedBlogList = blogList.map(blog => {
    const snippet = useSanitizedHTML(blog.contents, 5, 119);
    return {
      ...blog,
      snippet,
    };
  });

  useEffect(() => {
    if (data.page) {
      setPaginationData(data.page);
    }
  }, [data.page, setPaginationData]);

  const handleCategoryFilter = (category: BlogCategory) => {
    pushWithQuery(pathname, { category, page: 1 });
    setPaginationData({...data.page, number: 0});
  }
  const blogCategoryList = Object.values(blogCategory);
  return (
    <article>
      <div className={styles.categoryFilter}>
        {blogCategoryList.map(item => (
          <button
            key={item.value}
            className={styles.categoryButton({ active: category === item.value })}
            onClick={() => handleCategoryFilter(item.value as BlogCategory)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className={styles.blogList({ isEmpty: blogList.length === 0 })}>
        {blogList.length === 0 ?
          <Text type='description' size='sm' color='grey'>
            등록된 블로그가 없습니다.
          </Text>
          : <ul>
            {processedBlogList.map(blog => {
              const categoryKR = blogCategory[blog.category.toLowerCase() as BlogCategory].name;
              return (
                <li key={blog.id}>
                  <Link href={`/community/blog/${blog.id}`} className={styles.blogItem}>
                    <div className={styles.blogInfo}>
                      <Text type='description' size='sm' color='grey' weight='bold'>
                        {categoryKR}
                      </Text>
                      <Text type='title' size='md' weight='bold' align='left' className={ellipsis({ lineSize: 'line1', align: 'left' })}>
                        {blog.title}
                      </Text>
                      <Text type='description' size='md' color='grey' weight='normal' align='left' className={ellipsis({ lineSize: 'line5', wordBreak: 'keep', whiteSpace: 'pre' })}>
                        {blog.snippet}
                      </Text>
                      <Text type='description' size='sm' color='grey'>
                        {formatDate(blog.createdDate, 'onlyDate')}
                      </Text>
                    </div>
                    <Image src={blog.url} alt={blog.title} width={240} height={240} className={styles.blogImage} />
                  </Link>
                </li>
              )
            })}
          </ul>
        }
      </div>
      <Pagination {...paginationProps} />
    </article>
  );
};

export default ItemList;